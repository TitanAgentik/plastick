import { createFileRoute, Link } from "@tanstack/react-router";
import { WatchPreview } from "@/components/watch";
import { encodeSku, GALLERY } from "@/lib/catalog";

export const Route = createFileRoute("/gallery")({ component: GalleryPage });

function GalleryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs tracking-[0.2em] text-muted uppercase">
        Real builds
      </p>
      <h1 className="mt-2 font-display text-5xl tracking-tight sm:text-6xl">
        Steal this wrist.
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        The catalog is other people's combos. Remix any of them. Unique URL
        included.
      </p>
      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {GALLERY.map((g) => (
          <Link
            key={g.handle + encodeSku(g.build)}
            to="/build"
            search={{ sku: encodeSku(g.build) }}
            className="overflow-hidden rounded-lg border border-border bg-surface [content-visibility:auto] [contain-intrinsic-size:auto_320px]"
          >
            <div className="aspect-[3/4] bg-bg">
              <WatchPreview build={g.build} size="card" />
            </div>
            <div className="border-t border-border p-3">
              <p className="text-sm">@{g.handle}</p>
              <p className="truncate text-xs text-muted">{g.caption}</p>
              <p className="mt-1 font-mono text-[11px] text-subtle">
                {g.remixes} remixes
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
