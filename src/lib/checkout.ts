import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  PART_KINDS,
  memberPrice,
  cryptoPrice,
  quoteLines,
  quoteTotal,
  type CheckoutLine,
} from "./quote";
import { optionalSession } from "./session-fn";

const LineSchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("watch"),
    sku: z.string().min(3),
    qty: z.number().int().positive(),
  }),
  z.object({
    kind: z.literal("part"),
    partKind: z.enum(PART_KINDS),
    partId: z.string().min(1),
    customColor: z.string().optional(),
    qty: z.number().int().positive(),
  }),
]);

const CheckoutInput = z.object({
  items: z.array(LineSchema).min(1),
  email: z.string().email(),
  name: z.string().min(1).max(80),
  address: z.string().min(3).max(240),
});

const ShipInput = CheckoutInput.extend({
  city: z.string().max(80).optional(),
  state: z.string().max(40).optional(),
  zip: z.string().max(16).optional(),
});

const WalletMethod = z.enum(["paypal", "paylater", "affirm"]);

export const COINS = ["btc", "eth", "sol", "usdc"] as const;
export type Coin = (typeof COINS)[number];

const COIN_META: Record<
  Coin,
  { id: string; ticker: string; name: string }
> = {
  btc: { id: "bitcoin", ticker: "BTC", name: "Bitcoin" },
  eth: { id: "ethereum", ticker: "ETH", name: "Ethereum" },
  sol: { id: "solana", ticker: "SOL", name: "Solana" },
  usdc: { id: "usd-coin", ticker: "USDC", name: "USD Coin" },
};

function stripeKeys() {
  const sk = process.env.STRIPE_SECRET_KEY?.trim();
  const pk =
    process.env.VITE_STRIPE_PUBLISHABLE_KEY?.trim() ||
    process.env.STRIPE_PUBLISHABLE_KEY?.trim();
  return { sk, pk };
}

function commerceKey() {
  return (
    process.env.COINBASE_COMMERCE_API_KEY?.trim() ||
    process.env.COINBASE_API_KEY?.trim() ||
    ""
  );
}

function paypalKeys() {
  const clientId =
    process.env.PAYPAL_CLIENT_ID?.trim() ||
    process.env.VITE_PAYPAL_CLIENT_ID?.trim() ||
    "";
  const secret = process.env.PAYPAL_CLIENT_SECRET?.trim() || "";
  const live = process.env.PAYPAL_ENV === "live";
  return { clientId, secret, live, ready: Boolean(clientId && secret) };
}

function affirmKeys() {
  const publicKey =
    process.env.AFFIRM_PUBLIC_KEY?.trim() ||
    process.env.VITE_AFFIRM_PUBLIC_KEY?.trim() ||
    "";
  const privateKey = process.env.AFFIRM_PRIVATE_KEY?.trim() || "";
  const live = process.env.AFFIRM_ENV === "live";
  return {
    publicKey,
    privateKey,
    live,
    ready: Boolean(publicKey && privateKey),
    script: live
      ? "https://cdn1.affirm.com/js/v2/affirm.js"
      : "https://cdn1-sandbox.affirm.com/js/v2/affirm.js",
    api: live ? "https://api.affirm.com" : "https://sandbox.affirm.com",
  };
}

function paypalBase(live: boolean) {
  return live ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";
}

function wallets() {
  return {
    btc: process.env.CRYPTO_BTC_ADDRESS?.trim() || null,
    eth: process.env.CRYPTO_ETH_ADDRESS?.trim() || null,
    sol: process.env.CRYPTO_SOL_ADDRESS?.trim() || null,
    usdc: process.env.CRYPTO_USDC_ADDRESS?.trim() || null,
  };
}

function newOrder(prefix: string) {
  return (
    prefix +
    Math.random().toString(36).slice(2, 6).toUpperCase() +
    Math.random().toString(36).slice(2, 4).toUpperCase()
  );
}

let rateCache: { at: number; usd: Record<Coin, number> } | null = null;

async function usdRates(): Promise<Record<Coin, number>> {
  if (rateCache && Date.now() - rateCache.at < 60_000) return rateCache.usd;
  const fallback: Record<Coin, number> = {
    btc: 100000,
    eth: 3500,
    sol: 150,
    usdc: 1,
  };
  try {
    const ids = Object.values(COIN_META)
      .map((c) => c.id)
      .join(",");
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`,
      { headers: { accept: "application/json" } },
    );
    if (!res.ok) throw new Error("price http");
    const json = (await res.json()) as Record<string, { usd?: number }>;
    const usd = { ...fallback };
    for (const coin of COINS) {
      const n = json[COIN_META[coin].id]?.usd;
      if (typeof n === "number" && n > 0) usd[coin] = n;
    }
    rateCache = { at: Date.now(), usd };
    return usd;
  } catch {
    return fallback;
  }
}

function amountFor(usd: number, rate: number) {
  if (rate >= 100) return (usd / rate).toFixed(6);
  if (rate >= 1) return (usd / rate).toFixed(4);
  return (usd / rate).toFixed(2);
}

export const getPayConfig = createServerFn({ method: "POST" }).handler(
  async () => {
    const { sk, pk } = stripeKeys();
    const paypal = paypalKeys();
    const affirm = affirmKeys();
    return {
      stripe: Boolean(sk && pk),
      publishableKey: pk || null,
      coinbase: Boolean(commerceKey()),
      wallets: wallets(),
      paypal: paypal.ready,
      paypalClientId: paypal.ready ? paypal.clientId : null,
      paypalLive: paypal.live,
      affirm: affirm.ready,
      affirmPublicKey: affirm.ready ? affirm.publicKey : null,
      affirmScript: affirm.script,
      affirmLive: affirm.live,
    };
  },
);

export const createPaymentIntent = createServerFn({ method: "POST" })
  .middleware([optionalSession])
  .inputValidator(CheckoutInput)
  .handler(async ({ data, context }) => {
    const { sk } = stripeKeys();
    if (!sk) throw new Error("Stripe is not configured.");
    const lines = quoteLines(data.items as CheckoutLine[]);
    const subtotal = quoteTotal(lines);
    const total = memberPrice(subtotal, context.member);
    if (total < 1) throw new Error("Cart total is empty.");

    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(sk);
    const intent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100),
      currency: "usd",
      receipt_email: data.email,
      automatic_payment_methods: { enabled: true },
      metadata: {
        name: data.name,
        address: data.address.slice(0, 400),
        lines: String(lines.length),
        member: context.member ? "1" : "0",
      },
    });
    if (!intent.client_secret) {
      throw new Error("Stripe did not return a client secret.");
    }
    return { clientSecret: intent.client_secret, total };
  });

export const confirmPaymentIntent = createServerFn({ method: "POST" })
  .inputValidator(z.object({ paymentIntentId: z.string().min(1) }))
  .handler(async ({ data }) => {
    const { sk } = stripeKeys();
    if (!sk) throw new Error("Stripe is not configured.");
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(sk);
    const intent = await stripe.paymentIntents.retrieve(data.paymentIntentId);
    return {
      paid: intent.status === "succeeded",
      email: intent.receipt_email ?? "",
      total: intent.amount / 100,
    };
  });

export const completeDemoPay = createServerFn({ method: "POST" })
  .middleware([optionalSession])
  .inputValidator(CheckoutInput)
  .handler(async ({ data, context }) => {
    const { sk } = stripeKeys();
    if (sk) throw new Error("Use Stripe checkout.");
    const lines = quoteLines(data.items as CheckoutLine[]);
    const total = memberPrice(quoteTotal(lines), context.member);
    return {
      order: newOrder("PT-"),
      total,
      email: data.email,
      member: context.member,
    };
  });

export const quoteCrypto = createServerFn({ method: "POST" })
  .middleware([optionalSession])
  .inputValidator(CheckoutInput.pick({ items: true }))
  .handler(async ({ data, context }) => {
    const lines = quoteLines(data.items as CheckoutLine[]);
    const total = cryptoPrice(memberPrice(quoteTotal(lines), context.member));
    const usd = await usdRates();
    const held = wallets();
    return {
      total,
      coinbase: Boolean(commerceKey()),
      coins: COINS.map((coin) => ({
        coin,
        ticker: COIN_META[coin].ticker,
        name: COIN_META[coin].name,
        amount: amountFor(total, usd[coin]),
        usdRate: usd[coin],
        address: held[coin],
      })),
    };
  });

export const createCryptoCharge = createServerFn({ method: "POST" })
  .middleware([optionalSession])
  .inputValidator(
    CheckoutInput.extend({
      coin: z.enum(COINS),
    }),
  )
  .handler(async ({ data, context }) => {
    const lines = quoteLines(data.items as CheckoutLine[]);
    const total = cryptoPrice(memberPrice(quoteTotal(lines), context.member));
    const key = commerceKey();
    if (key) {
      const res = await fetch("https://api.commerce.coinbase.com/charges", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CC-Api-Key": key,
          "X-CC-Version": "2018-03-22",
        },
        body: JSON.stringify({
          name: "Plas/Tick",
          description: `${lines.length} item${lines.length === 1 ? "" : "s"}`,
          pricing_type: "fixed_price",
          local_price: { amount: total.toFixed(2), currency: "USD" },
          metadata: {
            name: data.name,
            email: data.email,
            coin: data.coin,
            member: context.member ? "1" : "0",
          },
        }),
      });
      const json = (await res.json()) as {
        data?: { hosted_url?: string; code?: string };
        error?: { message?: string };
      };
      if (!res.ok || !json.data?.hosted_url) {
        throw new Error(json.error?.message ?? "Coinbase charge failed.");
      }
      return {
        hostedUrl: json.data.hosted_url,
        order: json.data.code ?? newOrder("PT-C-"),
        total,
      };
    }

    const usd = await usdRates();
    const held = wallets();
    const coin = data.coin;
    return {
      hostedUrl: null as string | null,
      order: newOrder("PT-C-"),
      total,
      coin,
      ticker: COIN_META[coin].ticker,
      amount: amountFor(total, usd[coin]),
      address: held[coin],
    };
  });

export const completeCryptoPay = createServerFn({ method: "POST" })
  .middleware([optionalSession])
  .inputValidator(
    CheckoutInput.extend({
      coin: z.enum(COINS),
    }),
  )
  .handler(async ({ data, context }) => {
    if (commerceKey()) {
      throw new Error("Finish this charge on Coinbase.");
    }
    const lines = quoteLines(data.items as CheckoutLine[]);
    const total = cryptoPrice(memberPrice(quoteTotal(lines), context.member));
    return {
      order: newOrder("PT-C-"),
      total,
      email: data.email,
      member: context.member,
      coin: data.coin,
    };
  });

async function paypalAccess() {
  const keys = paypalKeys();
  if (!keys.ready) throw new Error("PayPal is not configured.");
  const res = await fetch(`${paypalBase(keys.live)}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${keys.clientId}:${keys.secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  const json = (await res.json()) as { access_token?: string };
  if (!res.ok || !json.access_token) throw new Error("PayPal auth failed.");
  return { token: json.access_token, live: keys.live };
}

export const createPayPalOrder = createServerFn({ method: "POST" })
  .middleware([optionalSession])
  .inputValidator(ShipInput)
  .handler(async ({ data, context }) => {
    const { token, live } = await paypalAccess();
    const lines = quoteLines(data.items as CheckoutLine[]);
    const total = memberPrice(quoteTotal(lines), context.member);
    if (total < 1) throw new Error("Cart total is empty.");
    const res = await fetch(`${paypalBase(live)}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            description: "Plas/Tick",
            amount: { currency_code: "USD", value: total.toFixed(2) },
            shipping: {
              name: { full_name: data.name },
              address: {
                address_line_1: data.address.slice(0, 300),
                admin_area_2: data.city || "City",
                admin_area_1: data.state || "FL",
                postal_code: data.zip || "33701",
                country_code: "US",
              },
            },
          },
        ],
        payment_source: {
          paypal: {
            experience_context: {
              brand_name: "Plas/Tick",
              shipping_preference: "SET_PROVIDED_ADDRESS",
              user_action: "PAY_NOW",
            },
          },
        },
      }),
    });
    const json = (await res.json()) as { id?: string; message?: string };
    if (!res.ok || !json.id) throw new Error(json.message ?? "PayPal order failed.");
    return { id: json.id, total };
  });

export const capturePayPalOrder = createServerFn({ method: "POST" })
  .inputValidator(z.object({ orderId: z.string().min(3) }))
  .handler(async ({ data }) => {
    const { token, live } = await paypalAccess();
    const res = await fetch(
      `${paypalBase(live)}/v2/checkout/orders/${encodeURIComponent(data.orderId)}/capture`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    const json = (await res.json()) as { status?: string; id?: string; message?: string };
    if (!res.ok || json.status !== "COMPLETED") {
      throw new Error(json.message ?? "PayPal did not capture that payment.");
    }
    return { order: `PT-PP-${(json.id ?? data.orderId).slice(-6).toUpperCase()}`, paid: true };
  });

export const authorizeAffirm = createServerFn({ method: "POST" })
  .inputValidator(z.object({ checkoutToken: z.string().min(3) }))
  .handler(async ({ data }) => {
    const keys = affirmKeys();
    if (!keys.ready) throw new Error("Affirm is not configured.");
    const res = await fetch(`${keys.api}/api/v1/transactions`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${keys.publicKey}:${keys.privateKey}`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ transaction_id: data.checkoutToken }),
    });
    const json = (await res.json()) as { id?: string; message?: string };
    if (!res.ok || !json.id) throw new Error(json.message ?? "Affirm did not authorize.");
    return { order: `PT-AF-${json.id.slice(-6).toUpperCase()}`, paid: true };
  });

export const completeWalletPay = createServerFn({ method: "POST" })
  .middleware([optionalSession])
  .inputValidator(ShipInput.extend({ method: WalletMethod }))
  .handler(async ({ data, context }) => {
    if (data.method !== "affirm" && paypalKeys().ready) {
      throw new Error("Use the PayPal button.");
    }
    if (data.method === "affirm" && affirmKeys().ready) {
      throw new Error("Use Affirm checkout.");
    }
    const lines = quoteLines(data.items as CheckoutLine[]);
    const total = memberPrice(quoteTotal(lines), context.member);
    const prefix = data.method === "affirm" ? "PT-AF-" : data.method === "paylater" ? "PT-PL-" : "PT-PP-";
    return {
      order: newOrder(prefix),
      total,
      email: data.email,
      member: context.member,
      method: data.method,
    };
  });
