import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { type CartItem } from "@/lib/cart";
import { encodeSku } from "@/lib/catalog";
import {
  COINS,
  completeCryptoPay,
  completeDemoPay,
  completeWalletPay,
  createCryptoCharge,
  createPayPalOrder,
  capturePayPalOrder,
  authorizeAffirm,
  createPaymentIntent,
  getPayConfig,
  quoteCrypto,
  type Coin,
} from "@/lib/checkout";
import type { CheckoutLine } from "@/lib/quote";
import { CRYPTO_OFF, cryptoPrice } from "@/lib/quote";
import { cn } from "@/lib/utils";

function linesFromCart(items: CartItem[]): CheckoutLine[] {
  return items.map((item) =>
    item.kind === "watch"
      ? { kind: "watch", sku: encodeSku(item.build), qty: item.qty }
      : {
          kind: "part",
          partKind: item.partKind,
          partId: item.partId,
          customColor: item.customColor,
          qty: item.qty,
        },
  );
}

function luhn(num: string) {
  const d = num.replace(/\D/g, "");
  if (d.length < 13 || d.length > 19) return false;
  let sum = 0;
  let alt = false;
  for (let i = d.length - 1; i >= 0; i--) {
    let n = Number(d[i]);
    if (alt) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alt = !alt;
  }
  return sum % 10 === 0;
}

function formatCard(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatExpiry(value: string) {
  const d = value.replace(/\D/g, "").slice(0, 4);
  if (d.length < 3) return d;
  return `${d.slice(0, 2)}/${d.slice(2)}`;
}

function expiryOk(value: string) {
  const m = value.match(/^(\d{2})\/(\d{2})$/);
  if (!m) return false;
  const month = Number(m[1]);
  const year = 2000 + Number(m[2]);
  if (month < 1 || month > 12) return false;
  const now = new Date();
  return new Date(year, month, 1) > now;
}

type Method = "card" | "paypal" | "paylater" | "affirm" | "crypto";

export function PayForm({
  items,
  total,
  onPaid,
}: {
  items: CartItem[];
  total: number;
  onPaid: (order?: string) => void;
}) {
  const [method, setMethod] = useState<Method>("card");
  const [mode, setMode] = useState<"loading" | "stripe" | "demo">("loading");
  const [publishableKey, setPublishableKey] = useState<string | null>(null);
  const [coinbase, setCoinbase] = useState(false);
  const [paypal, setPaypal] = useState(false);
  const [paypalClientId, setPaypalClientId] = useState<string | null>(null);
  const [affirmLive, setAffirmLive] = useState(false);
  const [affirmKey, setAffirmKey] = useState<string | null>(null);
  const [affirmScript, setAffirmScript] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const stripePromise = useMemo(
    () => (publishableKey ? loadStripe(publishableKey) : null),
    [publishableKey],
  );

  useEffect(() => {
    void getPayConfig()
      .then((cfg) => {
        setMode(cfg.stripe ? "stripe" : "demo");
        setPublishableKey(cfg.publishableKey);
        setCoinbase(cfg.coinbase);
        setPaypal(cfg.paypal);
        setPaypalClientId(cfg.paypalClientId);
        setAffirmLive(cfg.affirm);
        setAffirmKey(cfg.affirmPublicKey);
        setAffirmScript(cfg.affirmScript);
      })
      .catch(() => setMode("demo"));
  }, []);

  async function startStripe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const address = String(form.get("address") || "").trim();
    setBusy(true);
    try {
      const result = await createPaymentIntent({
        data: { items: linesFromCart(items), name, email, address },
      });
      setClientSecret(result.clientSecret);
    } catch (err) {
      toast(err instanceof Error ? err.message : "Stripe checkout failed.");
    } finally {
      setBusy(false);
    }
  }

  async function payDemo(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const address = String(form.get("address") || "").trim();
    const number = card.replace(/\D/g, "");
    if (!luhn(number)) {
      toast("Card number looks off.");
      return;
    }
    if (!expiryOk(expiry)) {
      toast("Expiry must be a future month.");
      return;
    }
    if (!/^\d{3,4}$/.test(cvc)) {
      toast("CVC is 3 or 4 digits.");
      return;
    }
    setBusy(true);
    try {
      const result = await completeDemoPay({
        data: { items: linesFromCart(items), name, email, address },
      });
      onPaid(result.order);
    } catch (err) {
      toast(err instanceof Error ? err.message : "Payment failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-4 min-w-0">
      <div className="grid grid-cols-2 gap-1 rounded-md border border-border p-1 sm:grid-cols-5">
        {(
          [
            ["card", "Card"],
            ["paypal", "PayPal"],
            ["paylater", "Pay Later"],
            ["affirm", "Affirm"],
            ["crypto", "Crypto"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setMethod(id)}
            className={cn(
              "h-10 rounded-sm text-xs sm:text-sm",
              id === "crypto" && "col-span-2 sm:col-span-1",
              method === id ? "bg-fg text-bg" : "text-muted hover:text-fg",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {method === "crypto" ? (
        <CryptoForm
          items={items}
          total={total}
          coinbase={coinbase}
          onPaid={onPaid}
        />
      ) : method === "paypal" || method === "paylater" || method === "affirm" ? (
        <WalletForm
          kind={method}
          live={method === "affirm" ? affirmLive : paypal}
          clientId={paypalClientId}
          affirmKey={affirmKey}
          affirmScript={affirmScript}
          items={items}
          total={total}
          onPaid={onPaid}
        />
      ) : mode === "loading" ? (
        <p className="mt-4 text-sm text-muted">Loading payment…</p>
      ) : mode === "stripe" && clientSecret && stripePromise ? (
        <div className="mt-4">
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: {
                theme: "night",
                variables: {
                  colorPrimary: "#f3efe4",
                  colorBackground: "#121210",
                  colorText: "#f3efe4",
                  colorDanger: "#e24a3a",
                  borderRadius: "6px",
                },
              },
            }}
          >
            <StripeFields total={total} onPaid={() => onPaid()} />
          </Elements>
        </div>
      ) : mode === "stripe" ? (
        <form className="mt-4 flex min-w-0 flex-col gap-2.5" onSubmit={(e) => void startStripe(e)}>
          <div className="grid gap-2.5 sm:grid-cols-2">
            <Field label="Name" name="name" autoComplete="name" />
            <Field label="Email" name="email" type="email" autoComplete="email" />
          </div>
          <Field label="Ship to" name="address" autoComplete="street-address" />
          <Button type="submit" size="lg" className="mt-1 w-full" disabled={busy}>
            {busy ? "Opening Stripe…" : `Continue to Stripe — $${total}`}
          </Button>
          <PayNote>
            Card details stay on Stripe. We never see the number.
          </PayNote>
        </form>
      ) : (
        <form className="mt-4 flex min-w-0 flex-col gap-2.5" onSubmit={(e) => void payDemo(e)}>
          <div className="grid gap-2.5 sm:grid-cols-2">
            <Field label="Name" name="name" autoComplete="name" />
            <Field label="Email" name="email" type="email" autoComplete="email" />
          </div>
          <Field label="Ship to" name="address" autoComplete="street-address" />
          <div className="rounded-md border border-border bg-bg p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs tracking-[0.16em] text-muted uppercase">Card</p>
              <span className="font-display text-sm tracking-tight">stripe</span>
            </div>
            <label className="mt-2 block text-xs text-muted">
              Number
              <input
                required
                inputMode="numeric"
                autoComplete="cc-number"
                placeholder="ACCT-000015"
                value={card}
                onChange={(e) => setCard(formatCard(e.target.value))}
                className="mt-1 h-11 w-full min-w-0 rounded-md border border-border bg-elevated px-3 font-mono text-sm text-fg outline-none focus:ring-2 focus:ring-ring/70"
              />
            </label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <label className="block min-w-0 text-xs text-muted">
                Expiry
                <input
                  required
                  inputMode="numeric"
                  autoComplete="cc-exp"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  className="mt-1 h-11 w-full min-w-0 rounded-md border border-border bg-elevated px-3 font-mono text-sm text-fg outline-none focus:ring-2 focus:ring-ring/70"
                />
              </label>
              <label className="block min-w-0 text-xs text-muted">
                CVC
                <input
                  required
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  placeholder="123"
                  value={cvc}
                  onChange={(e) =>
                    setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))
                  }
                  className="mt-1 h-11 w-full min-w-0 rounded-md border border-border bg-elevated px-3 font-mono text-sm text-fg outline-none focus:ring-2 focus:ring-ring/70"
                />
              </label>
            </div>
          </div>
          <Button type="submit" size="lg" className="w-full" disabled={busy}>
            {busy ? "Charging…" : `Pay with card — $${total}`}
          </Button>
          <PayNote>
            Stripe test checkout. Use ACCT-000015, any future expiry, any CVC.
          </PayNote>
        </form>
      )}
    </div>
  );
}

function money(n: number) {
  return (Math.round(n * 100) / 100).toFixed(2);
}

type ShipFields = {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
};

function readShip(form: HTMLFormElement | null): ShipFields | null {
  if (!form) return null;
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const address = String(data.get("address") || "").trim();
  const city = String(data.get("city") || "").trim();
  const state = String(data.get("state") || "").trim();
  const zip = String(data.get("zip") || "").trim();
  if (!name || !email || address.length < 3) return null;
  return { name, email, address, city, state, zip };
}

type PayPalButtons = {
  FUNDING: { PAYPAL: string; PAYLATER: string };
  Buttons: (opts: {
    fundingSource: string;
    style?: { layout?: string; shape?: string; label?: string; height?: number };
    createOrder: () => Promise<string>;
    onApprove: (data: { orderID: string }) => Promise<void>;
    onError?: () => void;
  }) => { isEligible: () => boolean; render: (el: HTMLElement) => Promise<void> };
};

type AffirmCheckout = {
  checkout: (opts: Record<string, unknown>) => void;
  ui: { ready: (cb: () => void) => void };
};

declare global {
  interface Window {
    paypal?: PayPalButtons;
    affirm?: AffirmCheckout & {
      checkout: AffirmCheckout["checkout"] & {
        open: (opts: {
          onSuccess: (res: { checkout_token: string }) => void;
          onFail: () => void;
        }) => void;
      };
    };
  }
}

function WalletForm({
  kind,
  live,
  clientId,
  affirmKey,
  affirmScript,
  items,
  total,
  onPaid,
}: {
  kind: "paypal" | "paylater" | "affirm";
  live: boolean;
  clientId: string | null;
  affirmKey: string | null;
  affirmScript: string | null;
  items: CartItem[];
  total: number;
  onPaid: (order?: string) => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);
  const [sdk, setSdk] = useState(false);
  const payLater = kind === "paylater";
  const affirm = kind === "affirm";
  const four = money(total / 4);
  const monthly = money(total / 12);

  useEffect(() => {
    if (!live || affirm || !clientId) return;
    const id = "paypal-js";
    const src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(clientId)}&currency=USD&intent=capture&enable-funding=paylater&disable-funding=card,venmo,credit`;
    let script = document.getElementById(id) as HTMLScriptElement | null;
    const boot = () => setSdk(true);
    if (window.paypal) {
      boot();
      return;
    }
    if (!script) {
      script = document.createElement("script");
      script.id = id;
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    }
    script.addEventListener("load", boot);
    return () => script?.removeEventListener("load", boot);
  }, [live, affirm, clientId]);

  useEffect(() => {
    if (!live || affirm || !sdk || !boxRef.current || !window.paypal) return;
    const paypal = window.paypal;
    const el = boxRef.current;
    el.innerHTML = "";
    const source = payLater ? paypal.FUNDING.PAYLATER : paypal.FUNDING.PAYPAL;
    const buttons = paypal.Buttons({
      fundingSource: source,
      style: {
        layout: "vertical",
        shape: "rect",
        label: payLater ? "paylater" : "paypal",
        height: 45,
      },
      createOrder: async () => {
        const ship = readShip(formRef.current);
        if (!ship) {
          toast("Add your name, email, and a ship-to address first.");
          throw new Error("missing ship");
        }
        const order = await createPayPalOrder({
          data: { ...ship, items: linesFromCart(items) },
        });
        return order.id;
      },
      onApprove: async (data) => {
        const result = await capturePayPalOrder({ data: { orderId: data.orderID } });
        onPaid(result.order);
      },
      onError: () => toast("PayPal could not finish that payment."),
    });
    if (!buttons.isEligible()) {
      el.innerHTML = "";
      return;
    }
    void buttons.render(el);
  }, [live, affirm, sdk, payLater, items, onPaid]);

  async function payPreview(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const ship = readShip(e.currentTarget);
    if (!ship) return;
    setBusy(true);
    try {
      const result = await completeWalletPay({
        data: { ...ship, items: linesFromCart(items), method: kind },
      });
      onPaid(result.order);
    } catch (err) {
      toast(err instanceof Error ? err.message : "Payment failed.");
    } finally {
      setBusy(false);
    }
  }

  async function openAffirm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const ship = readShip(e.currentTarget);
    if (!ship || !affirmKey || !affirmScript) return;
    setBusy(true);
    try {
      await loadAffirm(affirmKey, affirmScript);
      const cents = Math.round(total * 100);
      window.affirm?.checkout({
        merchant: {
          user_confirmation_url: `${window.location.origin}/cart`,
          user_cancel_url: `${window.location.origin}/cart`,
          user_confirmation_url_action: "GET",
          name: "Plas/Tick",
        },
        shipping: {
          name: { full: ship.name },
          address: {
            line1: ship.address,
            city: ship.city || "St. Petersburg",
            state: ship.state || "FL",
            zipcode: ship.zip || "33701",
            country: "USA",
          },
          email: ship.email,
        },
        items: [
          {
            display_name: "Plas/Tick",
            sku: "plas-tick",
            unit_price: cents,
            qty: 1,
          },
        ],
        currency: "USD",
        total: cents,
      });
      window.affirm?.checkout.open({
        onSuccess: (res) => {
          void authorizeAffirm({ data: { checkoutToken: res.checkout_token } })
            .then((result) => onPaid(result.order))
            .catch((err: unknown) =>
              toast(err instanceof Error ? err.message : "Affirm did not authorize."),
            )
            .finally(() => setBusy(false));
        },
        onFail: () => {
          setBusy(false);
          toast("Affirm checkout closed.");
        },
      });
    } catch (err) {
      setBusy(false);
      toast(err instanceof Error ? err.message : "Affirm failed to load.");
    }
  }

  const label = affirm ? "Affirm" : payLater ? "PayPal Pay Later" : "PayPal";

  return (
    <form
      ref={formRef}
      className="mt-4 flex min-w-0 flex-col gap-2.5"
      onSubmit={(e) => {
        if (live && !affirm) {
          e.preventDefault();
          return;
        }
        void (affirm && live ? openAffirm(e) : payPreview(e));
      }}
    >
      <div className="rounded-md border border-border bg-bg p-3">
        <p className="text-xs tracking-[0.16em] text-muted uppercase">{label}</p>
        <p className="mt-1 text-sm text-fg">
          {payLater
            ? `4 payments of $${four}`
            : affirm
              ? `As low as $${monthly}/mo`
              : `Pay $${money(total)} now`}
        </p>
        <p className="mt-1 text-xs text-muted">
          {payLater
            ? "PayPal Pay in 4. First payment today, then every 2 weeks. No extra cost at checkout."
            : affirm
              ? `Example: 4 payments of $${four}, or about $${monthly}/mo over 12 months. Subject to approval.`
              : "PayPal balance, bank, or card. You finish on PayPal."}
        </p>
      </div>
      <div className="grid gap-2.5 sm:grid-cols-2">
        <Field label="Name" name="name" autoComplete="name" />
        <Field label="Email" name="email" type="email" autoComplete="email" />
      </div>
      <Field label="Ship to" name="address" autoComplete="street-address" />
      <div className="grid grid-cols-3 gap-2">
        <Field label="City" name="city" autoComplete="address-level2" />
        <Field label="State" name="state" autoComplete="address-level1" />
        <Field label="ZIP" name="zip" autoComplete="postal-code" />
      </div>
      {live && !affirm ? <div ref={boxRef} className="min-h-12" /> : null}
      {live && !affirm ? (
        sdk ? null : <p className="text-xs text-muted">Loading PayPal…</p>
      ) : (
        <Button type="submit" size="lg" className="w-full" disabled={busy}>
          {busy ? "Opening…" : `Continue with ${label} — $${money(total)}`}
        </Button>
      )}
      <PayNote>
        {live && !affirm
          ? payLater
            ? "Opens PayPal Pay Later. Approval depends on the amount and your PayPal account."
            : "Opens PayPal. We never see your PayPal login."
          : live && affirm
            ? "Opens Affirm. Approval and the monthly amount are decided there."
            : affirm
              ? "Preview checkout. Add AFFIRM_PUBLIC_KEY and AFFIRM_PRIVATE_KEY to charge Affirm for real."
              : "Preview checkout. Add PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET to charge PayPal for real."}
      </PayNote>
    </form>
  );
}

function loadAffirm(publicKey: string, scriptUrl: string) {
  return new Promise<void>((resolve, reject) => {
    const w = window as Window & { _affirm_config?: Record<string, string> };
    w._affirm_config = {
      public_api_key: publicKey,
      script: scriptUrl,
      locale: "en_US",
      country_code: "USA",
    };
    if (window.affirm) {
      resolve();
      return;
    }
    const existing = document.getElementById("affirm-js");
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Affirm failed to load.")));
      return;
    }
    const script = document.createElement("script");
    script.id = "affirm-js";
    script.src = scriptUrl;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Affirm failed to load."));
    document.body.appendChild(script);
  });
}

function CryptoForm({
  items,
  total,
  coinbase,
  onPaid,
}: {
  items: CartItem[];
  total: number;
  coinbase: boolean;
  onPaid: (order?: string) => void;
}) {
  const [coin, setCoin] = useState<Coin>("btc");
  const [busy, setBusy] = useState(false);
  const [quotes, setQuotes] = useState<
    Array<{
      coin: Coin;
      ticker: string;
      name: string;
      amount: string;
      address: string | null;
    }>
  >([]);

  useEffect(() => {
    void quoteCrypto({ data: { items: linesFromCart(items) } })
      .then((q) => setQuotes(q.coins))
      .catch(() => toast("Could not load crypto rates."));
  }, [items]);

  const due = cryptoPrice(total);
  const picked = quotes.find((c) => c.coin === coin) ?? quotes[0];

  async function pay(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const address = String(form.get("address") || "").trim();
    const payload = {
      items: linesFromCart(items),
      name,
      email,
      address,
      coin,
    };
    setBusy(true);
    try {
      if (coinbase) {
        const charge = await createCryptoCharge({ data: payload });
        if (charge.hostedUrl) {
          window.location.href = charge.hostedUrl;
          return;
        }
      }
      const result = await completeCryptoPay({ data: payload });
      onPaid(result.order);
    } catch (err) {
      toast(err instanceof Error ? err.message : "Crypto payment failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="mt-4 flex min-w-0 flex-col gap-2.5" onSubmit={(e) => void pay(e)}>
      <div className="grid gap-2.5 sm:grid-cols-2">
        <Field label="Name" name="name" autoComplete="name" />
        <Field label="Email" name="email" type="email" autoComplete="email" />
      </div>
      <Field label="Ship to" name="address" autoComplete="street-address" />
      <div className="rounded-md border border-border bg-bg p-3">
        <p className="text-xs tracking-[0.16em] text-muted uppercase">Coin</p>
        <div className="mt-2 grid grid-cols-4 gap-1">
          {COINS.map((id) => {
            const q = quotes.find((c) => c.coin === id);
            return (
              <button
                key={id}
                type="button"
                onClick={() => setCoin(id)}
                className={cn(
                  "h-10 rounded-sm font-mono text-xs",
                  coin === id ? "bg-fg text-bg" : "border border-border text-muted",
                )}
              >
                {q?.ticker ?? id.toUpperCase()}
              </button>
            );
          })}
        </div>
        {picked ? (
          <div className="mt-3">
            <p className="font-mono text-lg tabular-nums text-fg">
              {picked.amount} {picked.ticker}
            </p>
            <p className="text-xs text-muted">
              <span className="line-through">${money(total)}</span>{" "}
              <span className="text-fg">${money(due)} USD</span>
              {" · "}
              {CRYPTO_OFF}% off for crypto
            </p>
            {picked.address ? (
              <button
                type="button"
                className="mt-2 w-full truncate rounded-md border border-border px-2 py-2 text-left font-mono text-[11px] text-fg"
                onClick={() => {
                  void navigator.clipboard.writeText(picked.address ?? "");
                  toast("Address copied.");
                }}
              >
                {picked.address}
              </button>
            ) : null}
          </div>
        ) : (
          <p className="mt-3 text-xs text-muted">Loading rates…</p>
        )}
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={busy || !picked}>
        {busy
          ? "Opening…"
          : coinbase
            ? `Pay with ${picked?.ticker ?? "crypto"} — $${money(due)}`
            : `Pay with ${picked?.ticker ?? "crypto"} — $${money(due)}`}
      </Button>
      <PayNote>
        {coinbase
          ? "Opens Coinbase Commerce. BTC, ETH, SOL, USDC, and more."
          : picked?.address
            ? `Send exactly ${picked.amount} ${picked.ticker}, then confirm. Add COINBASE_COMMERCE_API_KEY for hosted checkout.`
            : "BTC, ETH, SOL, or USDC. Preview checkout — add Coinbase Commerce or a wallet address to take live chain payments."}
      </PayNote>
    </form>
  );
}

function StripeFields({
  total,
  onPaid,
}: {
  total: number;
  onPaid: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [busy, setBusy] = useState(false);

  async function pay(e: FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setBusy(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/cart?paid=1`,
      },
      redirect: "if_required",
    });
    setBusy(false);
    if (error) {
      toast(error.message ?? "Payment failed.");
      return;
    }
    if (paymentIntent?.status === "succeeded") onPaid();
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={(e) => void pay(e)}>
      <PaymentElement />
      <Button type="submit" size="lg" disabled={!stripe || busy}>
        {busy ? "Charging…" : `Pay — $${total}`}
      </Button>
      <PayNote>Card details stay on Stripe. We never see the number.</PayNote>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block min-w-0 text-xs text-muted">
      {label}
      <input
        required
        name={name}
        type={type}
        autoComplete={autoComplete}
        className="mt-1 h-11 w-full min-w-0 rounded-md border border-border bg-bg px-3 text-sm text-fg outline-none focus:ring-2 focus:ring-ring/70"
      />
    </label>
  );
}

function PayNote({ children }: { children: ReactNode }) {
  return <p className="text-xs leading-relaxed text-muted">{children}</p>;
}
