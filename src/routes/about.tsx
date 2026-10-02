import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({ component: AboutPage });

function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs tracking-[0.2em] text-muted uppercase">
        Plas/Tick
      </p>
      <h1 className="mt-2 font-display text-5xl tracking-tight sm:text-6xl">
        Identity first.
        <br />
        Toughness implied.
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Plas/Tick is a modular resin tank. Every part is durable snappable
        plastic and fully interchangeable — shell, face, bezel, body, strap,
        hands, markings, crown. Click off. Click on. The watch is the
        platform. Extra parts are the point.
      </p>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        Other brands already own shock ads and official 8-part customization
        behind a Japan-only service wall. Aftermarket kits already own iced
        bezels. We own the youth-native version: shareable builds, weekly part
        drops, and a spare strap cheap enough to impulse.
      </p>

      <ol className="mt-12 space-y-6 border-t border-border pt-8">
        <li>
          <p className="font-display text-2xl">1. Build is content</p>
          <p className="mt-1 text-sm text-muted">
            Every combo gets a URL. Steal it. Remix it. The screenshot is the
            ad.
          </p>
        </li>
        <li>
          <p className="font-display text-2xl">2. One watch, many wrists</p>
          <p className="mt-1 text-sm text-muted">
            Keep the chassis. Swap the rest. Same flywheel as charms on a clog
            — except it tells time.
          </p>
        </li>
        <li>
          <p className="font-display text-2xl">3. Drops, not seasons</p>
          <p className="mt-1 text-sm text-muted">
            A jelly strap this week. A collab face next. When the count hits
            zero, it is gone.
          </p>
        </li>
      </ol>

      <div className="mt-12 flex flex-wrap gap-3">
        <Button asChild>
          <Link to="/build">Build yours</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/support">Support</Link>
        </Button>
      </div>
    </div>
  );
}
