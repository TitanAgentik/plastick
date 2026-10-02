import {
  decodeSku,
  EXTRA_PRICES,
  partName,
  priceOf,
  type PartKind,
} from "./catalog";

export const PART_KINDS = [
  "face",
  "bezel",
  "body",
  "strap",
  "hands",
  "marks",
  "knob",
  "led",
  "logo",
  "buckle",
] as const;

export type CheckoutLine =
  | { kind: "watch"; sku: string; qty: number }
  | {
      kind: "part";
      partKind: PartKind;
      partId: string;
      customColor?: string;
      qty: number;
    };

export type QuotedLine = { name: string; amount: number; qty: number };

export function quoteLines(items: CheckoutLine[]): QuotedLine[] {
  return items.map((item) => {
    if (item.kind === "watch") {
      const build = decodeSku(item.sku);
      if (!build) throw new Error("Unknown watch build.");
      return {
        name: `PLAS/TICK · ${item.sku}`,
        amount: priceOf(build),
        qty: item.qty,
      };
    }
    const name = partName(item.partKind, item.partId);
    const extra = item.customColor ? 6 : 0;
    const tint = item.customColor?.includes("/")
      ? item.customColor
          .split("/")
          .filter(Boolean)
          .map((c) => `#${c}`)
          .join(" / ")
          .toUpperCase()
      : item.customColor?.toUpperCase();
    return {
      name: tint ? `${name} · ${tint}` : name,
      amount: EXTRA_PRICES[item.partKind] + extra,
      qty: item.qty,
    };
  });
}

export function quoteTotal(lines: QuotedLine[]) {
  return lines.reduce((n, l) => n + l.amount * l.qty, 0);
}

export const MEMBER_OFF = 10;
export const CRYPTO_OFF = 15;

export function memberPrice(subtotal: number, member: boolean) {
  if (!member) return subtotal;
  return Math.round(subtotal * (100 - MEMBER_OFF)) / 100;
}

export function cryptoPrice(amount: number) {
  return Math.round(amount * (100 - CRYPTO_OFF)) / 100;
}

export function money(n: number) {
  return Number.isInteger(n) ? String(n) : n.toFixed(2);
}
