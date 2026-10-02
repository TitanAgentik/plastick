import { useNavigate } from "@tanstack/react-router";
import { Check, Copy, Shuffle, Share2, Palette } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { WatchPreview, crownHint } from "@/components/watch";
import { useCart } from "@/lib/cart";
import {
  ACCENTS,
  LEDS,
  BEZELS,
  BODIES,
  DESIGNS,
  clashWarnings,
  COMBO_TOTAL,
  encodeSku,
  EXTRA_PRICES,
  FACES,
  getBezel,
  getBody,
  getDesign,
  getFace,
  getStrap,
  isHexToken,
  matchHex,
  normalizeHex,
  formatHex,
  priceOf,
  randomBuild,
  shipCopy,
  STRAPS,
  type Accent,
  type Build,
} from "@/lib/catalog";
import { cn } from "@/lib/utils";
import { MEMBER_OFF } from "@/lib/quote";

const STEPS = ["Design", "Face", "Bezel", "Body", "Strap", "Details"] as const;
type Step = (typeof STEPS)[number];

export function Configurator({ initial }: { initial: Build }) {
  const [build, setBuild] = useState<Build>(initial);
  const [step, setStep] = useState<Step>("Design");
  const [copied, setCopied] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const navigate = useNavigate();
  const addWatch = useCart((s) => s.addWatch);
  const addPart = useCart((s) => s.addPart);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    const incoming = encodeSku(initial);
    setBuild((prev) => (encodeSku(prev) === incoming ? prev : initial));
  }, [initial]);

  const sku = encodeSku(build);
  const price = priceOf(build);
  const warnings = useMemo(() => clashWarnings(build), [build]);
  const design = getDesign(build.design);
  const face = getFace(build.face);
  const bezel = getBezel(build.bezel);
  const body = getBody(build.body);
  const strap = getStrap(build.strap);

  function apply(next: Build) {
    setBuild(next);
    void navigate({
      to: "/build",
      search: { sku: encodeSku(next) },
      replace: true,
    });
  }

  async function share() {
    const url = `${window.location.origin}/build?sku=${sku}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Steal this Plas/Tick",
          text: `Plas/Tick · ${sku}`,
          url,
        });
        return;
      }
    } catch {
      /* fall through */
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    toast("Link copied. Remix this wrist.");
    setTimeout(() => setCopied(false), 1600);
  }

  function lockIn() {
    addWatch(build);
    toast("Locked. It's in your bag.");
    void navigate({ to: "/cart" });
  }

  return (
    <div className="mx-auto grid w-full min-w-0 max-w-6xl overflow-x-hidden lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-10 lg:overflow-visible lg:px-6 lg:pb-16">
      <div className="flex items-center justify-between gap-3 px-4 pt-3 lg:hidden">
        <div className="min-w-0">
          <p className="text-[10px] tracking-[0.18em] text-muted uppercase">
            Build yours
          </p>
          <h1 className="truncate font-display text-xl tracking-tight">
            {DESIGNS.length} shells. Mix the rest.
          </h1>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="size-11"
            aria-label="Shuffle build"
            onClick={() => apply(randomBuild())}
          >
            <Shuffle className="size-4" />
          </Button>
          {hydrated ? (
            <FitPicker
              compact
              color={fitColor(build)}
              onPick={(hex) => apply(matchHex(hex, build))}
            />
          ) : null}
          <Button
            variant="outline"
            size="icon"
            className="size-11"
            aria-label="Share this build"
            onClick={() => void share()}
          >
            {copied ? (
              <Check className="size-4" />
            ) : (
              <Share2 className="size-4" />
            )}
          </Button>
        </div>
      </div>

      <div className="min-w-0 lg:row-span-2">
        <div className="relative bg-elevated lg:rounded-xl">
          <div className="mx-auto flex w-full max-w-sm items-center justify-center px-4 py-2 lg:hidden">
            <div className="aspect-[3/5] h-[min(20rem,42svh)]">
              <WatchPreview build={build} />
            </div>
          </div>
          <div className="mx-auto hidden aspect-[3/5] h-[min(36rem,70svh)] w-full max-w-sm py-4 lg:block">
            <WatchPreview build={build} />
          </div>
        </div>
        <p className="px-4 pt-2 text-center text-[11px] leading-relaxed text-muted lg:px-1 lg:text-left">
          {crownHint(getDesign(build.design).shape)}
        </p>
        <p className="hidden px-1 pt-3 text-sm text-muted lg:block">
          {shipCopy(build)}
        </p>
        {warnings.length > 0 ? (
          <div className="mx-4 mt-2 truncate rounded-md border border-danger/40 bg-danger/10 px-3 py-1.5 text-xs text-fg lg:mx-0 lg:mt-3 lg:whitespace-normal lg:py-2 lg:text-sm">
            {warnings[0]}
          </div>
        ) : null}
      </div>

      <div className="flex min-w-0 flex-col gap-5 px-4 pb-32 pt-3 lg:px-0 lg:pb-0 lg:pt-0">
        <div className="hidden lg:block">
          <p className="text-xs tracking-[0.18em] text-muted uppercase">
            Build yours
          </p>
          <h1 className="mt-1 font-display text-4xl tracking-tight">
            {DESIGNS.length} shells. Mix the rest.
          </h1>
          <div className="mt-4 flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => apply(randomBuild())}
            >
              <Shuffle className="size-3.5" />
              Shuffle
            </Button>
            {hydrated ? (
              <FitPicker
                color={fitColor(build)}
                onPick={(hex) => apply(matchHex(hex, build))}
              />
            ) : null}
            <Button variant="outline" size="sm" onClick={() => void share()}>
              {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              Share
            </Button>
          </div>
        </div>

        <div className="-mx-4 flex gap-1 overflow-x-auto border-b border-border px-4 lg:mx-0 lg:px-0">
          {STEPS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStep(s)}
              className={cn(
                "relative h-11 shrink-0 px-3 text-sm",
                step === s ? "text-fg" : "text-muted hover:text-fg",
              )}
            >
              {s}
              {step === s ? (
                <span className="absolute inset-x-0 -bottom-px h-px bg-fg" />
              ) : null}
            </button>
          ))}
        </div>

        {step === "Design" && (
          <div>
            <p className="text-sm">
              <span className="text-fg">{design.name}</span>
              <span className="text-muted"> — {design.blurb}</span>
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
              {DESIGNS.map((d) => {
                const on = getDesign(build.design).id === d.id;
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => apply({ ...build, design: d.id })}
                    className={cn(
                      "overflow-hidden rounded-lg border transition-colors duration-150",
                      on ? "border-fg bg-elevated" : "border-border hover:border-muted",
                    )}
                  >
                    <div className="aspect-[3/4] bg-bg">
                      <WatchPreview
                        build={{ ...build, design: d.id }}
                        size="thumb"
                      />
                    </div>
                    <p className="border-t border-border px-1 py-2 text-center text-[11px] text-muted">
                      {d.name}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}
        {step === "Face" && (
          <PartGrid
            label={face.name}
            blurb={face.blurb}
            tint={build.faceTint}
            stockColor={face.dial}
            onTint={(hex) => apply({ ...build, faceTint: hex })}
            items={FACES.map((p) => ({
              id: p.id,
              name: p.name,
              color: p.dial,
              limited: p.limited,
              selected: build.face === p.id && !build.faceTint,
              onSelect: () =>
                apply({ ...build, face: p.id, faceTint: undefined }),
            }))}
          />
        )}
        {step === "Bezel" && (
          <PartGrid
            label={bezel.name}
            blurb={bezel.blurb}
            tint={build.bezelTint}
            stockColor={bezel.color}
            onTint={(hex) => apply({ ...build, bezelTint: hex })}
            items={BEZELS.map((p) => ({
              id: p.id,
              name: p.name,
              color: p.color,
              limited: p.limited,
              selected: build.bezel === p.id && !build.bezelTint,
              onSelect: () =>
                apply({ ...build, bezel: p.id, bezelTint: undefined }),
            }))}
          />
        )}
        {step === "Body" && (
          <PartGrid
            label={body.name}
            blurb={body.blurb}
            tint={build.bodyTint}
            stockColor={body.color}
            onTint={(hex) => apply({ ...build, bodyTint: hex })}
            items={BODIES.map((p) => ({
              id: p.id,
              name: p.name,
              color: p.color,
              limited: p.limited,
              selected: build.body === p.id && !build.bodyTint,
              onSelect: () =>
                apply({ ...build, body: p.id, bodyTint: undefined }),
            }))}
          />
        )}
        {step === "Strap" && (
          <>
          <PartGrid
            label={strap.name}
            blurb={strap.blurb}
            tint={build.strapTint}
            stockColor={strap.top}
            tintLabel={strap.top !== strap.bottom ? "Short" : "Custom"}
            onTint={(hex) => apply({ ...build, strapTint: hex })}
            tint2={strap.top !== strap.bottom ? build.strapLow : undefined}
            stockColor2={strap.top !== strap.bottom ? strap.bottom : undefined}
            onTint2={
              strap.top !== strap.bottom
                ? (hex) => apply({ ...build, strapLow: hex })
                : undefined
            }
            items={STRAPS.map((p) => ({
              id: p.id,
              name: p.name,
              color: p.top,
              color2: p.bottom,
              limited: p.limited,
              selected:
                build.strap === p.id && !build.strapTint && !build.strapLow,
              onSelect: () =>
                apply({
                  ...build,
                  strap: p.id,
                  strapTint: undefined,
                  strapLow: undefined,
                }),
            }))}
          />
          <div className="mt-5">
            <AccentRow
              label="Buckle"
              blurb="Keeper, frame, and prong. Match the strap, or paint the whole mechanism."
              value={build.buckle ?? "auto"}
              fallback={strap.hardware}
              custom
              onPick={(id) => apply({ ...build, buckle: id })}
            />
          </div>
          </>
        )}
        {step === "Details" && (
          <div className="flex flex-col gap-5">
            <AccentRow
              label="Hands"
              blurb="Hour and minute hands."
              value={build.hands ?? "auto"}
              fallback={face.hands}
              custom
              onPick={(id) => apply({ ...build, hands: id })}
            />
            <AccentRow
              label="Markings"
              blurb="Hash marks and indices on the dial."
              value={build.marks ?? "auto"}
              fallback={face.indices}
              custom
              onPick={(id) => apply({ ...build, marks: id })}
            />
            <AccentRow
              label="Crown"
              blurb="Crown and pushers on the case."
              value={build.knob ?? "auto"}
              fallback={body.bumper}
              custom
              onPick={(id) => apply({ ...build, knob: id })}
            />
            <AccentRow
              label="Logo"
              blurb="PLAS/TICK print on the dial."
              value={build.logo ?? "auto"}
              fallback={face.indices}
              custom
              onPick={(id) => apply({ ...build, logo: id })}
            />
            <AccentRow
              label="Buckle"
              blurb="Keeper, frame, and prong on the strap."
              value={build.buckle ?? "auto"}
              fallback={strap.hardware}
              custom
              onPick={(id) => apply({ ...build, buckle: id })}
            />
            <AccentRow
              label="LED"
              blurb="Digital time lighting. Volt, amber, or any color."
              value={build.led ?? "auto"}
              fallback={face.lcdFg}
              swatches={LEDS}
              custom
              onPick={(id) => apply({ ...build, led: id })}
            />
          </div>
        )}

        <div className="hidden items-center justify-between gap-4 border-t border-border pt-4 lg:flex">
          <div>
            <p className="font-display text-3xl tabular-nums">${price}</p>
            <p className="text-xs text-muted">
              {COMBO_TOTAL.toLocaleString()} combos. Extra parts after purchase.
            </p>
          </div>
          <Button size="lg" onClick={lockIn}>
            Lock this wrist
          </Button>
        </div>

        <div className="hidden rounded-lg border border-border p-4 lg:block">
          <p className="text-xs tracking-[0.16em] text-muted uppercase">
            After purchase
          </p>
          <p className="mt-1 text-sm text-muted">
            Keep the body. Swap the rest. Every part is durable snappable
            plastic — fully interchangeable across shells. Spare straps $
            {EXTRA_PRICES.strap}, bezels ${EXTRA_PRICES.bezel}, faces $
            {EXTRA_PRICES.face}, hands ${EXTRA_PRICES.hands}, crown $
            {EXTRA_PRICES.knob}, LED ${EXTRA_PRICES.led}, logo $
            {EXTRA_PRICES.logo}, buckle ${EXTRA_PRICES.buckle}.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={() => {
              const spare =
                build.strapTint || build.strapLow
                  ? `${build.strapTint ?? ""}/${build.strapLow ?? ""}`
                  : undefined;
              addPart("strap", build.strap, spare);
              toast("Spare strap added.");
            }}
          >
            Add a spare {strap.name} · ${EXTRA_PRICES.strap}
          </Button>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-bg/95 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <div>
            <p className="font-display text-2xl leading-none tabular-nums">
              ${price}
            </p>
            <p className="mt-1 text-[11px] text-muted">{shipCopy(build)}</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="size-11"
              aria-label="Copy build link"
              onClick={() => void share()}
            >
              {copied ? <Check className="size-4" /> : <Share2 className="size-4" />}
            </Button>
            <Button size="lg" onClick={lockIn}>
              Lock this wrist
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function asColor(color: string) {
  const hex = color.replace("#", "");
  return `#${hex.length === 6 ? hex : "c8ccd4"}`;
}

function hexFromColorInput(value: string) {
  return value.replace("#", "").toLowerCase();
}

function fitColor(build: Build) {
  return asColor(
    build.bodyTint
      ? `#${build.bodyTint}`
      : getBody(build.body).color,
  );
}

function PartGrid({
  label,
  blurb,
  items,
  tint,
  stockColor,
  onTint,
  tintLabel = "Custom",
  tint2,
  stockColor2,
  onTint2,
}: {
  label: string;
  blurb: string;
  tint?: string;
  stockColor: string;
  onTint: (hex: string) => void;
  tintLabel?: string;
  tint2?: string;
  stockColor2?: string;
  onTint2?: (hex: string) => void;
  items: Array<{
    id: string;
    name: string;
    color: string;
    color2?: string;
    limited?: boolean;
    selected: boolean;
    onSelect: () => void;
  }>;
}) {
  return (
    <div>
      <p className="text-sm">
        <span className="text-fg">{label}</span>
        <span className="text-muted"> — {blurb}</span>
      </p>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {items.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={p.onSelect}
            className={cn(
              "flex w-20 shrink-0 flex-col items-center gap-2 rounded-lg border p-2 pt-3",
              p.selected ? "border-fg bg-elevated" : "border-border",
            )}
          >
            <span
              className="size-12 rounded-full border border-border lg:size-10"
              style={{
                background:
                  p.color2 && p.color2 !== p.color
                    ? `linear-gradient(180deg, ${p.color} 50%, ${p.color2} 50%)`
                    : p.color,
              }}
            />
            <span className="w-full truncate text-center text-[11px] text-muted">
              {p.name}
              {p.limited ? " · drop" : ""}
            </span>
          </button>
        ))}
        <ColorPick
          label={tintLabel}
          color={tint ? `#${tint}` : stockColor}
          active={Boolean(tint)}
          onPick={onTint}
        />
        {onTint2 && stockColor2 ? (
          <ColorPick
            label="Long"
            color={tint2 ? `#${tint2}` : stockColor2}
            active={Boolean(tint2)}
            onPick={onTint2}
          />
        ) : null}
      </div>
    </div>
  );
}

function AccentRow({
  label,
  blurb,
  value,
  fallback,
  onPick,
  custom,
  swatches = ACCENTS,
}: {
  label: string;
  blurb: string;
  value: string;
  fallback: string;
  onPick: (id: string) => void;
  custom?: boolean;
  swatches?: Accent[];
}) {
  const hex = isHexToken(value) ? value : undefined;
  return (
    <div>
      <p className="text-sm">
        <span className="text-fg">{label}</span>
        <span className="text-muted"> — {blurb}</span>
      </p>
      <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
        {swatches.map((p) => {
          const on = !hex && value === p.id;
          const swatch = p.id === "auto" ? fallback : p.color;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onPick(p.id)}
              className={cn(
                "flex w-16 shrink-0 flex-col items-center gap-2 rounded-lg border p-2 pt-3",
                on ? "border-fg bg-elevated" : "border-border",
              )}
            >
              <span
                className="size-8 rounded-full border border-border"
                style={{ background: swatch }}
              />
              <span className="w-full truncate text-center text-[11px] text-muted">
                {p.name}
              </span>
            </button>
          );
        })}
        {custom ? (
          <ColorPick
            label="Custom"
            color={hex ? `#${hex}` : fallback}
            active={Boolean(hex)}
            onPick={onPick}
          />
        ) : null}
      </div>
    </div>
  );
}

function ColorPick({
  label,
  color,
  active,
  onPick,
}: {
  label: string;
  color: string;
  active: boolean;
  onPick: (hex: string) => void;
}) {
  const value = asColor(color);
  const [code, setCode] = useState(formatHex(value));

  useEffect(() => {
    setCode(formatHex(value));
  }, [value]);

  return (
    <div
      className={cn(
        "flex w-[5.75rem] shrink-0 flex-col items-center gap-1.5 rounded-lg border p-2 pt-3",
        active ? "border-fg bg-elevated" : "border-border",
      )}
    >
      <label className="relative size-12 cursor-pointer overflow-hidden rounded-full border border-border lg:size-10">
        <span className="absolute inset-0" style={{ background: value }} />
        <input
          type="color"
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          value={value}
          aria-label={label}
          onChange={(e) => onPick(hexFromColorInput(e.target.value))}
          onInput={(e) =>
            onPick(hexFromColorInput((e.target as HTMLInputElement).value))
          }
        />
      </label>
      <span className="w-full truncate text-center text-[10px] tracking-wide text-muted uppercase">
        {label}
      </span>
      <input
        value={code}
        spellCheck={false}
        maxLength={7}
        aria-label={`${label} hex code`}
        onChange={(e) => {
          const next = e.target.value.toUpperCase();
          setCode(next.startsWith("#") ? next : `#${next}`);
          const hex = normalizeHex(next);
          if (hex) onPick(hex);
        }}
        onBlur={() => setCode(formatHex(value))}
        className="w-full bg-transparent text-center font-mono text-[10px] tracking-tight text-muted uppercase outline-none"
      />
    </div>
  );
}

function FitPicker({
  color,
  onPick,
  compact,
}: {
  color: string;
  onPick: (hex: string) => void;
  compact?: boolean;
}) {
  const value = asColor(color);
  return (
    <label
      className={cn(
        "relative cursor-pointer",
        compact
          ? "inline-flex size-11 items-center justify-center rounded-md border border-border"
          : "inline-flex h-9 items-center gap-2 rounded-md border border-border px-3 text-sm",
      )}
    >
      <Palette className="size-4" />
      {compact ? null : <span>Match my fit</span>}
      <span
        className="size-3.5 rounded-full border border-border"
        style={{ background: value }}
      />
      <input
        type="color"
        className="absolute inset-0 cursor-pointer opacity-0"
        value={value}
        aria-label="Match my fit"
        onChange={(e) => onPick(hexFromColorInput(e.target.value))}
        onInput={(e) =>
          onPick(hexFromColorInput((e.target as HTMLInputElement).value))
        }
      />
    </label>
  );
}

export function ProofStrip() {
  const bits = [
    `${COMBO_TOTAL.toLocaleString()} combos`,
    "Snappable plastic parts",
    "50m / rain, pool, gym",
    `Sign in · ${MEMBER_OFF}% off`,
  ];
  return (
    <div className="border-y border-border">
      <div className="mx-auto grid max-w-6xl grid-cols-2 sm:grid-cols-4">
        {bits.map((b) => (
          <p
            key={b}
            className="border-border px-4 py-3 text-xs tracking-wide text-muted sm:border-r sm:last:border-r-0 sm:px-6"
          >
            {b}
          </p>
        ))}
      </div>
    </div>
  );
}
