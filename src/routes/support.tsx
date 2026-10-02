import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/support")({ component: SupportPage });

const FAQS = [
  {
    q: "How long does it take?",
    a: "Hero prebuilds (the 12 vibes) ship in 2 days from the US. Custom combos are assembled to order, 5–8 days. We tell you which one you have before you lock it.",
  },
  {
    q: "Can I swap parts after I buy?",
    a: "Yes. Every part is durable snappable plastic and fully interchangeable — face, bezel, body, strap, hands, markings, crown. Tool-free. Click off one watch, click onto another.",
  },
  {
    q: "What's the return policy?",
    a: "Unused modules, 30 days. A built watch, 14 days if unworn with tags. We don't take back a wrist that's been in the pool.",
  },
  {
    q: "Is this a smartwatch?",
    a: "No. Quartz. Analog hands plus an LCD. No app, no Bluetooth, no subscription. It will still work in 2032.",
  },
  {
    q: "Where do you ship?",
    a: "United States, Canada, UK, and EU for launch. Shipping is free on every order. Duties calculated at checkout where required.",
  },
  {
    q: "Will you restock a sold-out drop?",
    a: "Maybe a color language, never the exact limited part. That's the point.",
  },
];

function SupportPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs tracking-[0.2em] text-muted uppercase">Support</p>
      <h1 className="mt-2 font-display text-5xl tracking-tight sm:text-6xl">
        Straight answers.
      </h1>
      <div className="mt-10 divide-y divide-border border-y border-border">
        {FAQS.map((f) => (
          <details key={f.q} className="group py-4">
            <summary className="cursor-pointer list-none font-display text-xl tracking-tight [&::-webkit-details-marker]:hidden">
              {f.q}
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
      <p className="mt-8 text-sm text-muted">
        Help: support@plastick.watch · we answer in a day, not a bot.
      </p>
    </div>
  );
}
