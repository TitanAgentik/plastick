import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { WatchPreview } from "@/components/watch";
import { useCart } from "@/lib/cart";
import {
  DROPS,
  EXTRA_PRICES,
  encodeSku,
  partPreviewBuild,
} from "@/lib/catalog";

export const Route = createFileRoute("/drops")({ component: DropsPage });

function DropsPage() {
  const addPart = useCart((s) => s.addPart);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs tracking-[0.2em] text-muted uppercase">
        Limited parts
      </p>
      <h1 className="mt-2 font-display text-5xl tracking-tight sm:text-6xl">
        Today's drops.
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        Real counts. When a part hits zero, it's gone. No fake countdown on
        evergreen SKUs. Snap it onto a watch you already own, or start a new
        build around it.
      </p>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        {DROPS.map((d) => {
          const preview = partPreviewBuild(d.kind, d.partId);
          const price = EXTRA_PRICES[d.kind];
          const sold = Math.round((1 - d.remaining / d.total) * 100);
          return (
            <article
              key={d.id}
              className="grid overflow-hidden rounded-lg border border-border bg-surface sm:grid-cols-[0.8fr_1.2fr]"
            >
              <div className="bg-bg">
                <WatchPreview build={preview} size="card" />
              </div>
              <div className="flex flex-col p-5">
                <p className="text-xs tracking-[0.14em] text-muted uppercase">
                  {d.kind} · ends {d.ends}
                </p>
                <h2 className="mt-2 font-display text-3xl">{d.name}</h2>
                <p className="mt-2 text-sm text-muted">{d.blurb}</p>
                <div className="mt-4">
                  <div className="h-1 overflow-hidden rounded-full bg-elevated">
                    <div
                      className="h-full bg-fg"
                      style={{ width: `${Math.min(100, sold)}%` }}
                    />
                  </div>
                  <p className="mt-2 font-mono text-xs text-muted tabular-nums">
                    {d.remaining} / {d.total} left
                  </p>
                </div>
                <div className="mt-auto flex flex-wrap gap-2 pt-5">
                  <Button
                    onClick={() => {
                      addPart(d.kind, d.partId);
                      toast(`${d.name} claimed.`);
                    }}
                  >
                    Claim · ${price}
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/build" search={{ sku: encodeSku(preview) }}>
                      Build around it
                    </Link>
                  </Button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <p className="mt-10 text-sm text-muted">
        Extra faces ${EXTRA_PRICES.face} · bezels ${EXTRA_PRICES.bezel} · bodies $
        {EXTRA_PRICES.body} · straps ${EXTRA_PRICES.strap} · hands $
        {EXTRA_PRICES.hands} · markings ${EXTRA_PRICES.marks} · crown $
        {EXTRA_PRICES.knob} · LED ${EXTRA_PRICES.led} · logo ${EXTRA_PRICES.logo} · buckle ${EXTRA_PRICES.buckle}.{" "}
        <Link to="/parts" className="text-fg underline-offset-2 hover:underline">
          Shop every colorway
        </Link>
        . Void, Ice, Candy, Lime hands are this cycle's limiteds.
      </p>
    </div>
  );
}
