import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Shuffle } from "lucide-react";
import { useState } from "react";
import { ProofStrip } from "@/components/configurator";
import { Button } from "@/components/ui/button";
import { WatchPreview, crownHint } from "@/components/watch";
import {
  DROPS,
  EXTRA_PRICES,
  encodeSku,
  getDesign,
  NEUTRAL_BUILD,
  PRESETS,
  randomBuild,
  type Build,
} from "@/lib/catalog";
import { MEMBER_OFF } from "@/lib/quote";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [build, setBuild] = useState<Build>(
    PRESETS.find((p) => p.id === "limeguard")?.build ?? PRESETS[0].build,
  );
  const sku = encodeSku(build);

  return (
    <div>
      <section className="mx-auto grid max-w-6xl items-center gap-6 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:py-14">
        <div>
          <p className="font-display text-xl tracking-tight text-fg sm:text-2xl">
            Fully customizable.
          </p>
          <h1 className="mt-2 font-display text-[clamp(3rem,8vw,6.2rem)] leading-[0.9] tracking-tight">
            One body.
            <br />
            Infinite wrists.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
            Every part is durable, snappable plastic — face, bezel, body,
            strap, crown. Click off. Click on. Mix between any watch. Pick any
            color.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/build" search={{ sku }}>
                Build yours
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/login" search={{ next: "/cart" }}>
                Sign in · {MEMBER_OFF}% off
              </Link>
            </Button>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-xl bg-surface">
          <div className="absolute top-4 left-4 z-10 flex gap-2">
            <button
              type="button"
              onClick={() => setBuild(randomBuild())}
              className="inline-flex h-9 items-center gap-2 rounded-full bg-bg/80 px-3 text-xs text-fg"
            >
              <Shuffle className="size-3.5" />
              Shuffle
            </button>
          </div>
          <div className="mx-auto aspect-[3/4] max-h-[min(28rem,52svh)] max-w-md">
            <WatchPreview build={build} />
          </div>
          <p className="px-4 pb-14 text-center text-[11px] leading-relaxed text-muted">
            {crownHint(getDesign(build.design).shape)}
          </p>
          <div className="absolute right-4 bottom-4">
            <Link
              to="/build"
              search={{ sku }}
              className="inline-flex h-9 items-center gap-1 rounded-full bg-fg px-4 text-xs text-bg"
            >
              Build this
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <ProofStrip />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-xs tracking-[0.18em] text-muted uppercase">
          Mix every layer
        </p>
        <h2 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">
          The watch is a platform.
        </h2>
        <p className="mt-3 max-w-xl text-sm text-muted">
          All parts are interchangeable resin snaps. Same click on every shell.
          Build one tank, then raid it for parts.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Design", "Tank, Orb, Facet, Brick, Module, Arena, Spark."],
            ["Face", "Dial and LCD. The expression."],
            ["Bezel", "The frame. Jelly, frost, guard, chrome."],
            ["Body", "42mm chassis. Opaque, smoke, or clear."],
            ["Strap", "Resin, jelly, NATO. Split colors if you want."],
            ["Details", "Hands, markings, crown, logo, buckle, LED time color."],
          ].map(([t, d]) => (
            <div
              key={t}
              className="rounded-lg border border-border bg-surface p-5"
            >
              <p className="font-display text-2xl">{t}</p>
              <p className="mt-2 text-sm text-muted">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs tracking-[0.18em] text-muted uppercase">
                Hero prebuilds
              </p>
              <h2 className="mt-2 font-display text-4xl tracking-tight">
                For people who won't design from scratch.
              </h2>
            </div>
            <Button asChild variant="outline" className="hidden sm:inline-flex">
              <Link to="/build">Open the builder</Link>
            </Button>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {PRESETS.map((p) => (
              <Link
                key={p.id}
                to="/build"
                search={{ sku: encodeSku(p.build) }}
                className="group overflow-hidden rounded-lg border border-border bg-surface [content-visibility:auto] [contain-intrinsic-size:auto_320px]"
              >
                <div className="aspect-[3/4] bg-bg">
                  <WatchPreview build={p.build} size="card" />
                </div>
                <div className="border-t border-border p-3">
                  <p className="text-sm text-fg">{p.name}</p>
                  <p className="text-xs text-muted">{p.who}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs tracking-[0.18em] text-muted uppercase">
                Extra parts
              </p>
              <h2 className="mt-2 font-display text-4xl tracking-tight">
                Already own a tank. Buy the rest.
              </h2>
              <p className="mt-3 max-w-lg text-sm text-muted">
                Same durable snappable plastic as the watch. Face, bezel, body,
                strap, crown, buckle — click onto any shell. Stock colorways or a
                custom tint.
              </p>
            </div>
            <Button asChild variant="outline" className="hidden sm:inline-flex">
              <Link to="/parts">Shop parts</Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {(
              [
                ["face", "Face", "nite", EXTRA_PRICES.face],
                ["bezel", "Bezel", "slime", EXTRA_PRICES.bezel],
                ["body", "Body", "clear", EXTRA_PRICES.body],
                ["strap", "Strap", "split", EXTRA_PRICES.strap],
                ["hands", "Hands", "lime", EXTRA_PRICES.hands],
                ["marks", "Markings", "bone", EXTRA_PRICES.marks],
                ["knob", "Crown", "silver", EXTRA_PRICES.knob],
                ["led", "LED", "lime", EXTRA_PRICES.led],
                ["logo", "Logo", "lime", EXTRA_PRICES.logo],
                ["buckle", "Buckle", "silver", EXTRA_PRICES.buckle],
              ] as const
            ).map(([kind, label, partId, price]) => (
              <Link
                key={kind}
                to="/parts"
                search={{ kind }}
                className="overflow-hidden rounded-lg border border-border bg-surface [content-visibility:auto] [contain-intrinsic-size:auto_280px]"
              >
                <div className="aspect-[3/4] bg-bg">
                  <WatchPreview
                    build={{ ...NEUTRAL_BUILD, [kind]: partId }}
                    size="card"
                  />
                </div>
                <div className="border-t border-border p-3">
                  <p className="text-sm text-fg">{label}</p>
                  <p className="text-xs text-muted">From ${price} · tintable</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-xs tracking-[0.18em] text-muted uppercase">
            This week's parts
          </p>
          <h2 className="mt-2 font-display text-4xl tracking-tight">
            Drops, not fake timers.
          </h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {DROPS.map((d) => (
              <Link
                key={d.id}
                to="/drops"
                className="rounded-lg border border-border bg-surface p-5"
              >
                <p className="text-xs tracking-[0.14em] text-muted uppercase">
                  {d.kind} · {d.remaining} left
                </p>
                <p className="mt-2 font-display text-2xl">{d.name}</p>
                <p className="mt-2 text-sm text-muted">{d.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
