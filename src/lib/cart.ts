import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  encodeSku,
  EXTRA_PRICES,
  getDesign,
  partName,
  priceOf,
  type Build,
  type PartKind,
} from "./catalog";

export type CartWatch = {
  kind: "watch";
  id: string;
  build: Build;
  qty: number;
};

export type CartPart = {
  kind: "part";
  id: string;
  partKind: PartKind;
  partId: string;
  customColor?: string;
  qty: number;
};

export type CartItem = CartWatch | CartPart;

type CartState = {
  items: CartItem[];
  addWatch: (build: Build) => void;
  addPart: (
    partKind: PartKind,
    partId: string,
    customColor?: string,
  ) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

function partPrice(kind: PartKind, custom?: string) {
  return EXTRA_PRICES[kind] + (custom ? 6 : 0);
}

export function itemPrice(item: CartItem) {
  if (item.kind === "watch") return priceOf(item.build) * item.qty;
  return partPrice(item.partKind, item.customColor) * item.qty;
}

export function itemLabel(item: CartItem) {
  if (item.kind === "watch") return `Plas/Tick · ${getDesign(item.build.design).name}`;
  const name = partName(item.partKind, item.partId);
  if (item.customColor?.includes("/")) {
    const [short, long] = item.customColor.split("/");
    const bits = [
      short ? `#${short}` : "",
      long ? `#${long}` : "",
    ].filter(Boolean);
    return `${name} · ${bits.join(" / ").toUpperCase()}`;
  }
  if (item.customColor) return `${name} · ${item.customColor.toUpperCase()}`;
  return name;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addWatch: (build) => {
        const sku = encodeSku(build);
        const id = `watch-${sku}`;
        const existing = get().items.find((i) => i.id === id);
        if (existing && existing.kind === "watch") {
          set({
            items: get().items.map((i) =>
              i.id === id ? { ...i, qty: i.qty + 1 } : i,
            ),
          });
          return;
        }
        set({
          items: [...get().items, { kind: "watch", id, build, qty: 1 }],
        });
      },
      addPart: (partKind, partId, customColor) => {
        const tint = customColor?.toLowerCase();
        const id = tint
          ? `part-${partKind}-${partId}-${tint}`
          : `part-${partKind}-${partId}`;
        const existing = get().items.find((i) => i.id === id);
        if (existing && existing.kind === "part") {
          set({
            items: get().items.map((i) =>
              i.id === id ? { ...i, qty: i.qty + 1 } : i,
            ),
          });
          return;
        }
        set({
          items: [
            ...get().items,
            { kind: "part", id, partKind, partId, customColor: tint, qty: 1 },
          ],
        });
      },
      setQty: (id, qty) => {
        if (qty <= 0) {
          set({ items: get().items.filter((i) => i.id !== id) });
          return;
        }
        set({
          items: get().items.map((i) => (i.id === id ? { ...i, qty } : i)),
        });
      },
      remove: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
      clear: () => set({ items: [] }),
    }),
    { name: "plastick-cart" },
  ),
);

export function cartCount(items: CartItem[]) {
  return items.reduce((n, i) => n + i.qty, 0);
}

export function cartTotal(items: CartItem[]) {
  return items.reduce((n, i) => n + itemPrice(i), 0);
}
