import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { WatchPreview } from "@/components/watch";
import { useCart } from "@/lib/cart";
import {
  DESIGNS,
  EXTRA_PRICES,
  formatHex,
  normalizeHex,
  partCatalog,
  partName,
  type Build,
  type PartKind,
} from "@/lib/catalog";
import { cn } from "@/lib/utils";

const KINDS: { id: PartKind; label: string }[] = [
  { id: "face", label: "Face" },
  { id: "bezel", label: "Bezel" },
  { id: "body", label: "Body" },
  { id: "strap", label: "Strap" },
  { id: "hands", label: "Hands" },
  { id: "marks", label: "Marks" },
  { id: "knob", label: "Crown" },
  { id: "led", label: "LED" },
  { id: "logo", label: "Logo" },
  { id: "buckle", label: "Buckle" },
];

const DEFAULTS: Record<PartKind, string> = {
  face: "nite",
  bezel: "guard",
  body: "stealth",
  strap: "black",
  hands: "lime",
  marks: "auto",
  knob: "silver",
  led: "lime",
  logo: "auto",
  buckle: "silver",
};

type Layer = { partId: string; custom: string | null; custom2: string | null };

function emptyLayers(): Record<PartKind, Layer> {
  return {
    face: { partId: DEFAULTS.face, custom: null, custom2: null },
    bezel: { partId: DEFAULTS.bezel, custom: null, custom2: null },
    body: { partId: DEFAULTS.body, custom: null, custom2: null },
    strap: { partId: DEFAULTS.strap, custom: null, custom2: null },
    hands: { partId: DEFAULTS.hands, custom: null, custom2: null },
    marks: { partId: DEFAULTS.marks, custom: null, custom2: null },
    knob: { partId: DEFAULTS.knob, custom: null, custom2: null },
    led: { partId: DEFAULTS.led, custom: null, custom2: null },
    logo: { partId: DEFAULTS.logo, custom: null, custom2: null },
    buckle: { partId: DEFAULTS.buckle, custom: null, custom2: null },
  };
}

function tintToken(custom: string | null) {
  return custom ? custom.replace("#", "").toLowerCase() : undefined;
}

function accentValue(layer: Layer) {
  return tintToken(layer.custom) ?? layer.partId;
}

function previewFromLayers(layers: Record<PartKind, Layer>, design: string): Build {
  return {
    design,
    face: layers.face.partId,
    bezel: layers.bezel.partId,
    body: layers.body.partId,
    strap: layers.strap.partId,
    hands: accentValue(layers.hands),
    marks: accentValue(layers.marks),
    knob: accentValue(layers.knob),
    led: accentValue(layers.led),
    logo: accentValue(layers.logo),
    buckle: accentValue(layers.buckle),
    faceTint: tintToken(layers.face.custom),
    bezelTint: tintToken(layers.bezel.custom),
    bodyTint: tintToken(layers.body.custom),
    strapTint: tintToken(layers.strap.custom),
    strapLow: tintToken(layers.strap.custom2),
  };
}

type Search = { kind?: PartKind };

export const Route = createFileRoute("/parts")({
  validateSearch: (raw: Record<string, unknown>): Search => {
    const k = raw.kind;
    if (k === "face" || k === "bezel" || k === "body" || k === "strap" || k === "hands" || k === "marks" || k === "knob" || k === "led" || k === "logo" || k === "buckle") {
      return { kind: k };
    }
    return {};
  },
  component: PartsPage,
});

function PartsPage() {
  const { kind: kindFromUrl } = Route.useSearch();
  const navigate = useNavigate();
  const [kind, setKind] = useState<PartKind>(kindFromUrl ?? "strap");
  const [design, setDesign] = useState(DESIGNS[0]?.id ?? "tank");
  const [layers, setLayers] = useState(emptyLayers);
  const addPart = useCart((s) => s.addPart);

  useEffect(() => {
    if (!kindFromUrl) return;
    setKind(kindFromUrl);
  }, [kindFromUrl]);

  const partId = layers[kind].partId;
  const custom = layers[kind].custom;
  const custom2 = layers[kind].custom2;
  const items = partCatalog(kind);
  const selected = items.find((p) => p.id === partId) ?? items[0];
  const split = Boolean(selected.color2);
  const tinted = Boolean(custom || custom2);
  const price = EXTRA_PRICES[kind] + (tinted ? 6 : 0);
  const preview = useMemo(() => previewFromLayers(layers, design), [layers, design]);

  function switchKind(next: PartKind) {
    setKind(next);
    void navigate({ to: "/parts", search: { kind: next }, replace: true });
  }

  function pickStock(id: string) {
    setLayers((prev) => ({
      ...prev,
      [kind]: { partId: id, custom: null, custom2: null },
    }));
  }

  function pickCustom(hex: string) {
    setLayers((prev) => ({
      ...prev,
      [kind]: { ...prev[kind], custom: hex },
    }));
  }

  function pickCustom2(hex: string) {
    setLayers((prev) => ({
      ...prev,
      [kind]: { ...prev[kind], custom2: hex },
    }));
  }

  function clearCustom() {
    setLayers((prev) => ({
      ...prev,
      [kind]: { ...prev[kind], custom: null, custom2: null },
    }));
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs tracking-[0.2em] text-muted uppercase">
        Extra parts
      </p>
      <h1 className="mt-2 font-display text-5xl tracking-tight sm:text-6xl">
        Same parts. Any color.
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        Every part is durable snappable plastic. Face, bezel, body, strap,
        hands, markings, crown, LED — the same part clicks onto every shell.
        Stock colorway or tint the mold.
      </p>

      <div className="mt-8 flex overflow-x-auto border-b border-border [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {KINDS.map((k) => (
          <button
            key={k.id}
            type="button"
            onClick={() => switchKind(k.id)}
            className={cn(
              "relative h-11 shrink-0 px-3 text-sm transition-colors duration-150 sm:flex-1 sm:px-0",
              kind === k.id ? "text-fg" : "text-muted hover:text-fg",
            )}
          >
            {k.label}
            {kind === k.id ? (
              <span className="absolute inset-x-0 -bottom-px h-px bg-fg" />
            ) : null}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="overflow-hidden rounded-xl bg-surface">
          <div className="flex gap-1 overflow-x-auto px-3 pt-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {DESIGNS.map((shell) => (
              <button
                key={shell.id}
                type="button"
                onClick={() => setDesign(shell.id)}
                className={cn(
                  "h-9 shrink-0 rounded-full px-3 text-xs",
                  design === shell.id ? "bg-fg text-bg" : "text-muted hover:text-fg",
                )}
              >
                {shell.name}
              </button>
            ))}
          </div>
          <div className="mx-auto aspect-[3/4] max-h-[min(28rem,52svh)] w-full max-w-md">
            <WatchPreview build={preview} />
          </div>
          <div className="flex gap-2 overflow-x-auto px-3 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {DESIGNS.map((shell) => (
              <button
                key={shell.id}
                type="button"
                onClick={() => setDesign(shell.id)}
                className={cn(
                  "w-16 shrink-0 rounded-md border p-1",
                  design === shell.id ? "border-fg" : "border-transparent",
                )}
              >
                <div className="aspect-[3/4]">
                  <WatchPreview
                    build={{ ...preview, design: shell.id }}
                    size="thumb"
                  />
                </div>
                <span className="mt-1 block truncate text-center text-[10px] text-muted">
                  {shell.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <p className="text-xs tracking-[0.16em] text-muted uppercase">
              Colorway
            </p>
            <p className="mt-1 text-sm text-fg">{selected.name}</p>
            <p className="text-sm text-muted">{selected.blurb}</p>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => pickStock(item.id)}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-md border p-2 pt-3 transition-colors duration-150",
                  partId === item.id && !custom && !custom2
                    ? "border-fg bg-elevated"
                    : "border-border hover:border-muted",
                )}
              >
                <span
                  className="size-10 overflow-hidden rounded-full border border-border"
                  style={{
                    background: item.color2
                      ? `linear-gradient(180deg, ${item.color} 50%, ${item.color2} 50%)`
                      : item.color,
                  }}
                />
                <span className="w-full truncate text-center text-[11px] text-muted">
                  {item.name}
                </span>
              </button>
            ))}
          </div>

          <div className="rounded-lg border border-border p-4">
            <p className="text-xs tracking-[0.16em] text-muted uppercase">
              Custom tint
            </p>
            <p className="mt-1 text-sm text-muted">
              {split
                ? "Paint the short half and the long half. +$6."
                : "Keep this mold. Paint it any color. +$6."}
            </p>
            <div className={cn("mt-3 grid gap-3", split && "sm:grid-cols-2")}>
              <TintBox
                label={split ? "Short" : "Color"}
                value={custom ?? selected.color}
                onPick={pickCustom}
              />
              {split ? (
                <TintBox
                  label="Long"
                  value={custom2 ?? selected.color2 ?? selected.color}
                  onPick={pickCustom2}
                />
              ) : null}
            </div>
            {tinted ? (
              <button
                type="button"
                className="mt-3 text-xs text-muted hover:text-fg"
                onClick={clearCustom}
              >
                Back to stock {selected.name}
              </button>
            ) : null}
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-border pt-4">
            <div>
              <p className="font-display text-3xl tabular-nums">${price}</p>
              <p className="text-xs text-muted">
                {tinted
                  ? `${partName(kind, partId)} · ${[custom, custom2].filter(Boolean).map((c) => formatHex(c!)).join(" / ")}`
                  : partName(kind, partId)}
              </p>
            </div>
            <Button
              size="lg"
              onClick={() => {
                const tint = split
                  ? [tintToken(custom), tintToken(custom2)].filter(Boolean).join("/")
                  : (custom ?? undefined);
                addPart(kind, partId, tint || undefined);
                toast("Part added to bag.");
              }}
            >
              Add part
            </Button>
          </div>

          <p className="text-xs text-muted">
            Tool-free. Durable resin snaps. Every part is interchangeable
            across shells.{" "}
            <Link to="/build" className="text-fg underline-offset-2 hover:underline">
              Or start from a full watch
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

function TintBox({
  label,
  value,
  onPick,
}: {
  label: string;
  value: string;
  onPick: (hex: string) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-fg">{label}</p>
        <label className="relative flex size-11 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-md border border-border">
          <span className="absolute inset-0" style={{ background: value }} />
          <input
            type="color"
            value={value}
            aria-label={`${label} color`}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            onChange={(e) => onPick(e.target.value)}
            onInput={(e) => onPick((e.target as HTMLInputElement).value)}
          />
        </label>
      </div>
      <HexField value={value} onPick={onPick} />
    </div>
  );
}

function HexField({
  value,
  onPick,
}: {
  value: string;
  onPick: (hex: string) => void;
}) {
  const shown = formatHex(value);
  const [code, setCode] = useState(shown);

  useEffect(() => {
    setCode(shown);
  }, [shown]);

  return (
    <label className="mt-3 block text-xs text-muted">
      Hex
      <input
        value={code}
        spellCheck={false}
        maxLength={7}
        inputMode="text"
        autoCapitalize="characters"
        autoCorrect="off"
        aria-label="Hex color code"
        onChange={(e) => {
          const next = e.target.value.toUpperCase();
          setCode(next.startsWith("#") ? next : `#${next}`);
          const hex = normalizeHex(next);
          if (hex) onPick(`#${hex}`);
        }}
        onBlur={() => setCode(shown)}
        className="mt-1 h-11 w-full rounded-md border border-border bg-bg px-3 font-mono text-sm tracking-wider text-fg uppercase outline-none focus:ring-2 focus:ring-ring/70"
      />
    </label>
  );
}
