import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PayForm } from "@/components/pay";
import { Button } from "@/components/ui/button";
import { WatchPreview } from "@/components/watch";
import {
  cartTotal,
  itemLabel,
  itemPrice,
  useCart,
  type CartItem,
} from "@/lib/cart";
import { confirmPaymentIntent } from "@/lib/checkout";
import { EXTRA_PRICES, getStrap, isHeroBuild, partPreviewBuild } from "@/lib/catalog";
import { CRYPTO_OFF, MEMBER_OFF, memberPrice, money } from "@/lib/quote";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

type Search = { paid?: string; payment_intent?: string };

export const Route = createFileRoute("/cart")({
  validateSearch: (raw: Record<string, unknown>): Search => ({
    paid: typeof raw.paid === "string" ? raw.paid : undefined,
    payment_intent:
      typeof raw.payment_intent === "string" ? raw.payment_intent : undefined,
  }),
  component: CartPage,
});

function CartPage() {
  const { paid, payment_intent } = useSearch({ from: "/cart" });
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const addPart = useCart((s) => s.addPart);
  const clear = useCart((s) => s.clear);
  const [locked, setLocked] = useState(false);
  const [order, setOrder] = useState<string | undefined>();
  const [kept, setKept] = useState<CartItem | null>(null);
  const [ready, setReady] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const { user, isPending } = useCurrentUserState();
  const member = Boolean(user);
  const subtotal = cartTotal(items);
  const total = memberPrice(subtotal, member);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (paid !== "1" || !payment_intent) return;
    let alive = true;
    setConfirming(true);
    void confirmPaymentIntent({ data: { paymentIntentId: payment_intent } })
      .then((result) => {
        if (!alive) return;
        if (result.paid) {
          const watch =
            useCart.getState().items.find((i) => i.kind === "watch") ?? null;
          setKept(watch);
          clear();
          setLocked(true);
        } else {
          toast("Payment still pending.");
        }
      })
      .catch((err: unknown) => {
        toast(err instanceof Error ? err.message : "Could not confirm payment.");
      })
      .finally(() => {
        if (alive) setConfirming(false);
      });
    return () => {
      alive = false;
    };
  }, [paid, payment_intent, clear]);

  const firstWatch =
    kept?.kind === "watch"
      ? kept
      : items.find((i) => i.kind === "watch");

  if (!ready) {
    return <div className="min-h-[40vh]" />;
  }

  if (confirming) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center sm:px-6">
        <p className="text-sm text-muted">Confirming Stripe payment…</p>
      </div>
    );
  }

  if (locked) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center sm:px-6">
        <p className="text-xs tracking-[0.2em] text-muted uppercase">
          Paid
        </p>
        <h1 className="mt-2 font-display text-5xl tracking-tight">
          It's yours.
        </h1>
        <p className="mt-4 text-muted">
          Stripe has the charge. Build card is in the box. Photograph it. Remix
          it. Spare parts ship in the same mailer if you added them.
        </p>
        {order ? (
          <p className="mt-3 font-mono text-sm text-muted">Order {order}</p>
        ) : null}
        {firstWatch && firstWatch.kind === "watch" ? (
          <div className="mx-auto mt-8 max-w-xs overflow-hidden rounded-lg border border-border bg-surface">
            <WatchPreview build={firstWatch.build} size="card" />
            <p className="border-t border-border p-3 font-mono text-xs text-muted">
              {itemLabel(firstWatch)}
            </p>
          </div>
        ) : null}
        <Button asChild className="mt-8">
          <Link to="/build">Build another</Link>
        </Button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center sm:px-6">
        <h1 className="font-display text-5xl tracking-tight">Bag is empty.</h1>
        <p className="mt-3 text-muted">Lock a wrist, or grab extra parts.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Button asChild>
            <Link to="/build">Build yours</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/parts">Shop parts</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto grid min-w-0 max-w-5xl gap-6 overflow-x-hidden px-4 py-6 sm:px-6 sm:py-10 lg:grid-cols-[1fr_22rem] lg:items-start">
      <div className="min-w-0">
        <h1 className="font-display text-3xl tracking-tight sm:text-4xl">
          Lock this build.
        </h1>
        <ul className="mt-5 divide-y divide-border border-y border-border">
          {items.map((item) => (
            <li key={item.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:gap-4">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <Thumb item={item} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm">{itemLabel(item)}</p>
                  <p className="text-xs text-muted">
                    {item.kind === "watch" && isHeroBuild(item.build)
                      ? "Hero · 2 day ship"
                      : item.kind === "watch"
                        ? "Custom · 5–8 days"
                        : "Module · ships with the watch"}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 sm:justify-end">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="size-10 rounded-md border border-border text-lg sm:size-9"
                    onClick={() => setQty(item.id, item.qty - 1)}
                    aria-label="Decrease"
                  >
                    −
                  </button>
                  <span className="w-6 text-center font-mono text-sm tabular-nums">
                    {item.qty}
                  </span>
                  <button
                    type="button"
                    className="size-10 rounded-md border border-border text-lg sm:size-9"
                    onClick={() => setQty(item.id, item.qty + 1)}
                    aria-label="Increase"
                  >
                    +
                  </button>
                </div>
                <p className="w-12 text-right font-mono text-sm tabular-nums">
                  ${itemPrice(item)}
                </p>
                <button
                  type="button"
                  className="text-xs text-muted hover:text-fg"
                  onClick={() => remove(item.id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>

        {firstWatch && firstWatch.kind === "watch" ? (
          <div className="mt-5 rounded-lg border border-border p-4">
            <p className="text-sm">Add a spare strap. That's how this trends.</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3"
              onClick={() => {
                addPart("strap", firstWatch.build.strap);
                toast("Spare strap added.");
              }}
            >
              {getStrap(firstWatch.build.strap).name} · ${EXTRA_PRICES.strap}
            </Button>
          </div>
        ) : null}
      </div>

      <aside className="min-w-0 rounded-lg border border-border bg-surface p-4 lg:sticky lg:top-20">
        <p className="text-xs tracking-[0.16em] text-muted uppercase">
          Checkout
        </p>
        <p className="mt-1 font-display text-3xl tabular-nums">${money(total)}</p>
        <div className="mt-3 space-y-1.5 text-sm">
          <p className="flex justify-between gap-3 text-muted">
            <span>Subtotal</span>
            <span className="font-mono tabular-nums">${money(subtotal)}</span>
          </p>
          {member ? (
            <p className="flex justify-between gap-3 text-fg">
              <span>Member {MEMBER_OFF}% off</span>
              <span className="font-mono tabular-nums">
                −${money(subtotal - total)}
              </span>
            </p>
          ) : (
            <p className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-muted">
              <span>Member {MEMBER_OFF}% off</span>
              <Link
                to="/login"
                search={{ next: "/cart" }}
                className="text-fg underline-offset-2 hover:underline"
              >
                Sign in to unlock
              </Link>
            </p>
          )}
          <p className="flex justify-between gap-3">
            <span>Shipping</span>
            <span className="font-medium text-fg">Free</span>
          </p>
        </div>
        <p className="mt-2 text-xs text-muted">
          {member
            ? `Signed in. ${MEMBER_OFF}% off is on. Crypto takes another ${CRYPTO_OFF}% off. Free shipping.`
            : isPending
              ? `Free shipping. Crypto pays ${CRYPTO_OFF}% less.`
              : `Sign in for ${MEMBER_OFF}% off. Crypto takes ${CRYPTO_OFF}% off either way. Guest checkout still works.`}
        </p>
        <PayForm
          items={items}
          total={total}
          onPaid={(id) => {
            setKept(items.find((i) => i.kind === "watch") ?? null);
            setOrder(id);
            clear();
            setLocked(true);
          }}
        />
      </aside>
    </div>
  );
}

function Thumb({ item }: { item: CartItem }) {
  if (item.kind === "watch") {
    return (
      <div className="size-16 overflow-hidden rounded-sm bg-bg">
        <WatchPreview build={item.build} size="thumb" />
      </div>
    );
  }
  return (
    <div className="size-16 overflow-hidden rounded-sm bg-bg">
      <WatchPreview
        build={
          item.partKind === "strap" && item.customColor?.includes("/")
            ? {
                ...partPreviewBuild(item.partKind, item.partId),
                strapTint: item.customColor.split("/")[0] || undefined,
                strapLow: item.customColor.split("/")[1] || undefined,
              }
            : partPreviewBuild(item.partKind, item.partId)
        }
        tint={
          item.customColor && !item.customColor.includes("/")
            ? { kind: item.partKind, color: item.customColor }
            : undefined
        }
        size="thumb"
      />
    </div>
  );
}
