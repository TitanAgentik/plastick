import { memo, useEffect, useId, useRef, useState } from "react";
import {
  accentColor,
  contrastInk,
  getBezel,
  getBody,
  getDesign,
  getFace,
  getStrap,
  ledColor,
  readableOn,
  shadeHex,
  type Build,
  type PartKind,
} from "@/lib/catalog";
import { useHands, useLcdDate, useLcdTime } from "@/lib/clock";
import { cn } from "@/lib/utils";

function n(v: number) {
  return Math.round(v * 10) / 10;
}

function fillFor(color: string, finish: string, id: string) {
  if (finish === "chrome") return `url(#${id}-metal)`;
  if (finish === "jelly") return color;
  if (finish === "frost") return color;
  return color;
}

function poly(cx: number, cy: number, r: number, sides: number, rot = -Math.PI / 2) {
  const pts: string[] = [];
  for (let i = 0; i < sides; i++) {
    const a = rot + (i / sides) * Math.PI * 2;
    pts.push(`${n(cx + Math.cos(a) * r)},${n(cy + Math.sin(a) * r)}`);
  }
  return `M${pts.join(" L")} Z`;
}

function brokenRing(cx: number, cy: number, r: number) {
  const a0 = -0.55;
  const a1 = Math.PI * 2 - 0.9;
  const x0 = cx + Math.cos(a0) * r;
  const y0 = cy + Math.sin(a0) * r;
  const x1 = cx + Math.cos(a1) * r;
  const y1 = cy + Math.sin(a1) * r;
  return `M${n(x0)} ${n(y0)} A${n(r)} ${n(r)} 0 1 1 ${n(x1)} ${n(y1)}`;
}

function star4(cx: number, cy: number, outer: number, inner: number) {
  const pts: string[] = [];
  for (let i = 0; i < 8; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = -Math.PI / 2 + (i / 8) * Math.PI * 2;
    pts.push(`${n(cx + Math.cos(a) * r)},${n(cy + Math.sin(a) * r)}`);
  }
  return `M${pts.join(" L")} Z`;
}

function lcdBox(shape: string) {
  if (shape === "module") return { x: 92, y: 132, w: 56, h: 36 };
  if (shape === "brick") return { x: 68, y: 136, w: 14, h: 30 };
  if (shape === "star") return { x: 111, y: 156, w: 18, h: 11 };
  if (shape === "hex" || shape === "facet") return { x: 108, y: 160, w: 24, h: 12 };
  if (shape === "orb" || shape === "blob") return { x: 108, y: 164, w: 24, h: 12 };
  return { x: 108, y: 162, w: 24, h: 12 };
}

type PusherJob = "light" | "mode" | "date";

function layout(shape: string) {
  if (shape === "brick") {
    return {
      edge: 120,
      crown: { x: 104, y: 192, w: 32, h: 16, down: true },
      light: { x: 68, y: 96, w: 26, h: 14 },
      date: { x: 146, y: 96, w: 26, h: 14 },
    };
  }
  if (shape === "star") {
    return {
      edge: 194,
      crown: { x: 186, y: 147, w: 11, h: 10, down: false },
      light: { x: 150, y: 116, w: 9, h: 8 },
      date: { x: 150, y: 176, w: 9, h: 8 },
    };
  }
  const edge = shape === "hex" ? 186 : shape === "orb" ? 196 : shape === "blob" ? 188 : 194;
  const inset = edge - 8;
  return {
    edge,
    crown: { x: edge - 4, y: 144, w: 16, h: 16, down: false },
    light: { x: inset, y: 118, w: 12, h: 14 },
    date: { x: inset, y: 172, w: 12, h: 14 },
  };
}

function pushers(shape: string) {
  const box = layout(shape);
  return [
    { job: "light" as PusherJob, x: box.light.x - 4, y: box.light.y - 4, w: box.light.w + 10, h: box.light.h + 8, name: "Light" },
    { job: "mode" as PusherJob, x: box.crown.x - 4, y: box.crown.y - 4, w: box.crown.w + 10, h: box.crown.h + 8, name: "Mode" },
    { job: "date" as PusherJob, x: box.date.x - 4, y: box.date.y - 4, w: box.date.w + 10, h: box.date.h + 8, name: "Date" },
  ];
}

export function crownHint(shape: string) {
  if (shape === "brick") {
    return "Left pusher lights the face. Bottom crown switches between the time and the date. Right pusher switches the date between the day and the number.";
  }
  if (shape === "star") {
    return "The crown sits on the right point. Top pusher lights the face. Crown switches time and date. Lower pusher switches the date between the day and the number.";
  }
  if (shape === "module") {
    return "Top pusher lights the face. Crown switches between the time and the date. Bottom pusher switches the date between the day and the number.";
  }
  return "Time and date stay on the face. Top pusher lights it. Crown picks a line. Bottom pusher switches the date between the day and the number.";
}

export type PartTint = { kind: PartKind; color: string };

function paintFace(face: ReturnType<typeof getFace>, color: string) {
  const ink = contrastInk(color);
  return {
    ...face,
    dial: color,
    hands: ink,
    indices: ink,
    ring: shadeHex(color, -0.22),
    lcdBg: shadeHex(color, -0.55),
    lcdFg: ink,
  };
}

function paintBezel(bezel: ReturnType<typeof getBezel>, color: string) {
  return { ...bezel, color, highlight: shadeHex(color, 0.35) };
}

function paintBody(body: ReturnType<typeof getBody>, color: string) {
  return { ...body, color, bumper: shadeHex(color, -0.28) };
}

function paintStrap(
  strap: ReturnType<typeof getStrap>,
  top?: string,
  bottom?: string,
) {
  return {
    ...strap,
    top: top ?? strap.top,
    bottom: bottom ?? (top && strap.top !== strap.bottom ? shadeHex(top, -0.18) : strap.bottom),
    hardware: contrastInk(top ?? strap.top),
  };
}

export function resolveWatchParts(build: Build, tint?: PartTint) {
  const design = getDesign(build.design);
  let face = getFace(build.face);
  let bezel = getBezel(build.bezel);
  let body = getBody(build.body);
  let strap = getStrap(build.strap);

  if (build.faceTint) face = paintFace(face, `#${build.faceTint.replace("#", "")}`);
  if (build.bezelTint) bezel = paintBezel(bezel, `#${build.bezelTint.replace("#", "")}`);
  if (build.bodyTint) body = paintBody(body, `#${build.bodyTint.replace("#", "")}`);
  if (build.strapTint || build.strapLow) {
    strap = paintStrap(
      strap,
      build.strapTint ? `#${build.strapTint.replace("#", "")}` : undefined,
      build.strapLow ? `#${build.strapLow.replace("#", "")}` : undefined,
    );
  }
  if (tint?.kind === "face") face = paintFace(face, tint.color);
  if (tint?.kind === "bezel") bezel = paintBezel(bezel, tint.color);
  if (tint?.kind === "body") body = paintBody(body, tint.color);
  if (tint?.kind === "strap") strap = paintStrap(strap, tint.color);

  return { design, face, bezel, body, strap };
}

export const WatchPreview = memo(function WatchPreview({
  build,
  className,
  size = "hero",
  tint,
}: {
  build: Build;
  className?: string;
  size?: "hero" | "card" | "thumb" | "compact";
  tint?: PartTint;
}) {
  const id = `w${useId().replace(/:/g, "")}`;
  const { design, face, bezel, body, strap } = resolveWatchParts(build, tint);
  const shape = design.shape;
  const digital = shape === "module";
  const interactive = size === "hero";
  const [screen, setScreen] = useState<"time" | "date">("time");
  const [dayName, setDayName] = useState(false);
  const [lit, setLit] = useState(false);
  const lightTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (lightTimer.current) window.clearTimeout(lightTimer.current);
    };
  }, []);

  const lcdTime = useLcdTime(true);
  const lcdDate = useLcdDate(true);
  const hands = useHands(!digital);
  const shortDate = dayName
    ? (lcdDate.split(" ")[0] ?? lcdDate)
    : digital
      ? lcdDate
      : lcdDate.slice(-5);

  const cx = 120;
  const cy = 152;
  const dialR =
    shape === "brick"
      ? 20
      : shape === "star"
        ? 28
        : shape === "hex" || shape === "facet"
          ? 34
          : shape === "orb" || shape === "blob"
            ? 40
            : 38;

  const handsColor = readableOn(
    tint?.kind === "hands" ? tint.color : accentColor(build.hands, face.hands),
    face.dial,
  );
  const marksColor = readableOn(
    tint?.kind === "marks" ? tint.color : accentColor(build.marks, face.indices),
    face.dial,
  );
  const knobColor =
    tint?.kind === "knob" ? tint.color : accentColor(build.knob, body.bumper);
  const lcdLit = readableOn(
    tint?.kind === "led" ? tint.color : ledColor(build.led, face.lcdFg),
    face.lcdBg,
  );
  const logoColor = readableOn(
    tint?.kind === "logo" ? tint.color : accentColor(build.logo, marksColor),
    face.dial,
  );
  const buckleColor =
    tint?.kind === "buckle" ? tint.color : accentColor(build.buckle, strap.hardware);

  const lcd = lcdBox(shape);
  const timeSize = size === "thumb" ? 3.2 : digital ? 8 : shape === "brick" ? 4 : 4.2;
  const subSize = Math.max(2.8, timeSize - 1.6);
  const handTail = n(shape === "brick" || shape === "star" ? cy + 5 : Math.min(cy + 6, lcd.y - 3));
  const strapW = shape === "brick" ? 88 : shape === "star" ? 30 : shape === "hex" || shape === "facet" ? 52 : shape === "orb" || shape === "blob" ? 64 : 76;
  const strapX = n(120 - strapW / 2);
  const buckle = strapW / 76;
  const buckleFrameW = n(68 * buckle);
  const buckleKeeperW = n(60 * buckle);
  const buckleFrameH = n(Math.max(8, 18 * buckle));
  const buckleKeeperH = n(Math.max(6, 14 * buckle));
  const buckleFrameY = n(354 - buckleFrameH);
  const buckleKeeperY = n(buckleFrameY - buckleKeeperH + 6 * buckle);
  const strapRx = strap.finish === "nato" ? 6 : 16;
  const resinOp = body.finish === "jelly" || body.finish === "frost" ? 0.5 : 0.28;
  const bezelLit = bezel.finish === "jelly" || bezel.finish === "frost" ? 0.45 : 0.22;
  const strapOp = strap.finish === "jelly" ? 0.82 : strap.finish === "frost" ? 0.88 : 1;

  const viewBox =
    size === "compact" ? "8 58 224 196" : size === "thumb" ? "36 64 168 210" : "0 0 240 400";

  const markY = digital ? 124 : shape === "star" ? 146 : shape === "hex" || shape === "facet" ? 140 : 134;
  const markSize = size === "thumb" ? 4.2 : digital ? 6 : shape === "star" ? 4 : shape === "brick" ? 4.8 : 5.6;

  function flash() {
    setLit(true);
    if (lightTimer.current) window.clearTimeout(lightTimer.current);
    lightTimer.current = window.setTimeout(() => setLit(false), 1400);
  }

  const casePath =
    shape === "orb"
      ? undefined
      : shape === "blob"
        ? `M120 78 C170 74 196 108 192 152 C188 204 158 228 120 226 C78 228 50 202 48 152 C46 108 72 74 120 78 Z`
        : shape === "hex"
          ? poly(cx, cy, 78, 6)
          : shape === "facet"
            ? poly(cx, cy, 78, 8)
            : shape === "star"
              ? star4(cx, cy, 74, 40)
              : undefined;

  const colorPath =
    shape === "blob"
      ? `M120 88 C162 84 184 114 180 152 C176 196 152 214 120 212 C86 214 58 194 56 152 C54 114 80 84 120 88 Z`
      : shape === "hex"
        ? poly(cx, cy, 70, 6)
        : shape === "facet"
          ? poly(cx, cy, 70, 8)
          : shape === "star"
            ? star4(cx, cy, 66, 34)
            : undefined;

  const bezelPath =
    shape === "hex"
      ? poly(cx, cy, 58, 6)
      : shape === "facet"
        ? poly(cx, cy, 58, 8)
        : shape === "blob"
          ? `M120 96 C158 94 176 118 174 152 C172 188 152 206 120 204 C86 206 68 186 66 152 C64 118 84 94 120 96 Z`
          : shape === "star"
            ? star4(cx, cy, 52, 28)
            : undefined;

  const dialPath =
    shape === "hex"
      ? poly(cx, cy, dialR, 6)
      : shape === "facet"
        ? poly(cx, cy, dialR, 8)
        : shape === "star"
          ? star4(cx, cy, dialR, 18)
          : undefined;

  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
      className={cn("h-full w-full", className)}
      role="img"
      aria-label="Plas/Tick watch"
    >
      <defs>
        <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f2f3f5" />
          <stop offset="45%" stopColor="#c4c8ce" />
          <stop offset="100%" stopColor="#6a6e76" />
        </linearGradient>
        <linearGradient id={`${id}-lit`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.28" />
          <stop offset="40%" stopColor="#ffffff" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id={`${id}-strap`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="18%" stopColor="#ffffff" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.28" />
        </linearGradient>
        <linearGradient id={`${id}-side`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.28" />
          <stop offset="18%" stopColor="#000000" stopOpacity="0" />
          <stop offset="82%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.32" />
        </linearGradient>
        <radialGradient id={`${id}-well`} cx="50%" cy="46%" r="55%">
          <stop offset="62%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.28" />
        </radialGradient>
        <clipPath id={`${id}-dial`}>
          {shape === "orb" || shape === "blob" ? (
            <circle cx={cx} cy={cy} r={dialR} />
          ) : dialPath ? (
            <path d={dialPath} />
          ) : shape === "brick" ? (
            <rect x="60" y="128" width="120" height="48" rx="6" />
          ) : (
            <rect x="86" y="118" width="68" height="68" rx="14" />
          )}
        </clipPath>
      </defs>

      <g opacity={strapOp}>
        <rect x={strapX} y="18" width={strapW} height="124" rx={strapRx} fill={strap.top} />
        <rect x={strapX} y="164" width={strapW} height="186" rx={strapRx} fill={strap.bottom} />
        <rect x={strapX} y="18" width={strapW} height="124" rx={strapRx} fill={`url(#${id}-strap)`} />
        <rect x={strapX} y="164" width={strapW} height="186" rx={strapRx} fill={`url(#${id}-strap)`} />
        <rect x={strapX} y="18" width={strapW} height="124" rx={strapRx} fill={`url(#${id}-side)`} />
        <rect x={strapX} y="164" width={strapW} height="186" rx={strapRx} fill={`url(#${id}-side)`} />
        <rect x={n(cx - 5)} y="22" width="10" height="110" rx="4" fill="#000" opacity="0.12" />
        <rect x={n(cx - 5)} y="176" width="10" height="160" rx="4" fill="#000" opacity="0.12" />
        {strap.finish === "nato"
          ? [32, 50, 68, 214, 234, 254, 274, 294].map((y) => (
              <rect key={`weave-${y}`} x={strapX} y={y} width={strapW} height="4" fill="#000" opacity="0.18" />
            ))
          : null}
        {[26, 44, 62].concat([238, 258, 278, 298, 318]).map((y) => {
          const rx = n(Math.max(2.4, Math.min(6, strapW * 0.075)));
          const ry = n(rx * 0.62);
          return (
            <g key={`hole-${y}`}>
              <ellipse cx={cx} cy={y} rx={rx} ry={ry} fill="#0a0a0a" opacity="0.7" />
              <ellipse cx={cx} cy={y} rx={n(rx * 0.62)} ry={n(ry * 0.58)} fill="#141412" />
              <ellipse cx={n(cx - rx * 0.12)} cy={n(y - ry * 0.15)} rx={n(rx * 0.28)} ry={n(ry * 0.22)} fill="#fff" opacity="0.22" />
            </g>
          );
        })}
        <rect x={n(cx - buckleFrameW / 2)} y={buckleFrameY} width={buckleFrameW} height={buckleFrameH} rx={n(Math.max(2, 4 * buckle))} fill={shadeHex(buckleColor, -0.28)} />
        <rect x={n(cx - buckleFrameW / 2 + Math.max(3, buckle * 4))} y={n(buckleFrameY + Math.max(2, buckle * 3))} width={n(Math.max(8, buckleFrameW - Math.max(6, buckle * 8)))} height={n(Math.max(3, buckleFrameH - Math.max(4, buckle * 6)))} rx="1.5" fill="#0c0c0b" />
        <rect x={n(cx - buckleKeeperW / 2)} y={buckleKeeperY} width={buckleKeeperW} height={buckleKeeperH} rx={n(Math.max(2, 3 * buckle))} fill={buckleColor} />
        <rect x={n(cx - Math.max(1.6, buckleFrameW * 0.07))} y={n(buckleKeeperY)} width={n(Math.max(3, buckleFrameW * 0.14))} height={n(buckleKeeperH + buckleFrameH * 0.55)} rx="1" fill={shadeHex(buckleColor, -0.4)} />
      </g>

      {shape === "brick" ? (
        <>
          <rect x="30" y="104" width="180" height="96" rx="16" fill={body.bumper} />
          <rect x="38" y="112" width="164" height="80" rx="12" fill={fillFor(body.color, body.finish, id)} />
          <rect x="38" y="112" width="164" height="80" rx="12" fill={`url(#${id}-lit)`} opacity={resinOp} />
          <rect x="30" y="104" width="180" height="96" rx="16" fill="none" stroke="#000" strokeOpacity="0.25" strokeWidth="1.2" />
        </>
      ) : shape === "orb" ? (
        <>
          <circle cx={cx} cy={cy} r="78" fill={body.bumper} />
          <circle cx={cx} cy={cy} r="70" fill={fillFor(body.color, body.finish, id)} />
          <circle cx={cx} cy={cy} r="70" fill={`url(#${id}-lit)`} opacity={resinOp} />
          <circle cx={cx} cy={cy} r="78" fill="none" stroke="#000" strokeOpacity="0.25" strokeWidth="1.2" />
        </>
      ) : colorPath ? (
        <>
          <path d={casePath} fill={body.bumper} />
          <path d={colorPath} fill={fillFor(body.color, body.finish, id)} opacity={body.finish === "jelly" ? 0.86 : 1} />
          <path d={colorPath} fill={`url(#${id}-lit)`} opacity={resinOp} />
          <path d={casePath} fill="none" stroke="#000" strokeOpacity="0.28" strokeWidth="1.2" />
        </>
      ) : (
        <>
          <rect x="44" y="76" width="152" height="152" rx="36" fill={body.bumper} />
          <rect x="52" y="84" width="136" height="136" rx="32" fill={fillFor(body.color, body.finish, id)} />
          <rect x="52" y="84" width="136" height="136" rx="32" fill={`url(#${id}-lit)`} opacity={resinOp} />
          <rect x="44" y="76" width="152" height="152" rx="36" fill="none" stroke="#000" strokeOpacity="0.25" strokeWidth="1.2" />
        </>
      )}

      {shape === "brick" ? (
        <>
          <rect x="48" y="118" width="144" height="68" rx="10" fill={fillFor(bezel.color, bezel.finish, id)} />
          <rect x="48" y="118" width="144" height="68" rx="10" fill={`url(#${id}-lit)`} opacity={bezelLit} />
        </>
      ) : shape === "orb" ? (
        <>
          <circle cx={cx} cy={cy} r="58" fill={fillFor(bezel.color, bezel.finish, id)} />
          <circle cx={cx} cy={cy} r="58" fill={`url(#${id}-lit)`} opacity={bezelLit} />
        </>
      ) : bezelPath ? (
        <>
          <path d={bezelPath} fill={fillFor(bezel.color, bezel.finish, id)} />
          <path d={bezelPath} fill={`url(#${id}-lit)`} opacity={bezelLit} />
        </>
      ) : (
        <>
          <rect x="62" y="94" width="116" height="116" rx="26" fill={fillFor(bezel.color, bezel.finish, id)} />
          <rect x="62" y="94" width="116" height="116" rx="26" fill={`url(#${id}-lit)`} opacity={bezelLit} />
          {(bezel.texture === "ribbed" || bezel.texture === "guard") &&
            [0, 90, 180, 270].map((deg) => {
              const r = ((deg - 90) * Math.PI) / 180;
              const x = n(cx + Math.cos(r) * 54);
              const y = n(cy + Math.sin(r) * 54);
              return (
                <rect
                  key={deg}
                  x={x - 7}
                  y={y - 4}
                  width="14"
                  height="8"
                  rx="1"
                  fill={bezel.highlight}
                  opacity="0.55"
                  transform={`rotate(${deg} ${x} ${y})`}
                />
              );
            })}
        </>
      )}

      {(() => {
        const box = layout(shape);
        const c = box.crown;
        return (
          <g>
            {c.down ? (
              <>
                <rect x={c.x + 10} y={c.y - 8} width={c.w - 20} height="10" rx="2" fill={shadeHex(knobColor, -0.4)} />
                <rect x={c.x} y={c.y} width={c.w} height={c.h} rx="4" fill={shadeHex(knobColor, -0.22)} />
                <rect x={c.x + 1.5} y={c.y + 1.5} width={c.w - 3} height={c.h - 3} rx="3" fill={knobColor} />
                {[0, 1, 2].map((i) => (
                  <line key={i} x1={c.x + 4} y1={c.y + 4 + i * 3.2} x2={c.x + c.w - 4} y2={c.y + 4 + i * 3.2} stroke="#000" strokeOpacity="0.3" strokeWidth="0.7" />
                ))}
              </>
            ) : (
              <>
                <rect
                  x={c.x - Math.max(4, c.w * 0.45)}
                  y={c.y + c.h * 0.3}
                  width={Math.max(5, c.w * 0.55)}
                  height={Math.max(3, c.h * 0.4)}
                  rx="1.5"
                  fill={shadeHex(knobColor, -0.4)}
                />
                <rect x={c.x} y={c.y} width={c.w} height={c.h} rx={Math.min(3, c.h * 0.28)} fill={shadeHex(knobColor, -0.22)} />
                <rect x={c.x + 1} y={c.y + 1} width={Math.max(1, c.w - 2)} height={Math.max(1, c.h - 2)} rx="1.5" fill={knobColor} />
                {[0.32, 0.52, 0.72].map((t) => (
                  <line
                    key={t}
                    x1={c.x + 1.5}
                    y1={c.y + c.h * t}
                    x2={c.x + c.w - 1.5}
                    y2={c.y + c.h * t}
                    stroke="#000"
                    strokeOpacity="0.3"
                    strokeWidth="0.45"
                  />
                ))}
              </>
            )}
            {[box.light, box.date].map((p) => (
              <g key={`${p.x}-${p.y}`}>
                <rect x={p.x} y={p.y} width={p.w} height={p.h} rx="3" fill={shadeHex(knobColor, -0.3)} />
                <rect x={p.x + 1} y={p.y + 1} width={p.w - 2} height={p.h - 2} rx="2" fill={knobColor} />
              </g>
            ))}
          </g>
        );
      })()}

      {shape === "orb" || shape === "blob" ? (
        <>
          <circle cx={cx} cy={cy} r={dialR + 4} fill={face.ring} />
          <circle cx={cx} cy={cy} r={dialR} fill={face.dial} />
        </>
      ) : dialPath ? (
        <>
          <path d={shape === "star" ? star4(cx, cy, dialR + 4, 20) : poly(cx, cy, dialR + 5, shape === "hex" ? 6 : 8)} fill={face.ring} />
          <path d={dialPath} fill={face.dial} />
        </>
      ) : shape === "brick" ? (
        <>
          <rect x="56" y="124" width="128" height="56" rx="8" fill={face.ring} />
          <rect x="60" y="128" width="120" height="48" rx="6" fill={face.dial} />
        </>
      ) : (
        <>
          <rect x="82" y="114" width="76" height="76" rx="16" fill={face.ring} />
          <rect x="86" y="118" width="68" height="68" rx="14" fill={face.dial} />
        </>
      )}

      <g clipPath={`url(#${id}-dial)`} pointerEvents="none">
        <rect x="40" y="90" width="160" height="130" fill={`url(#${id}-well)`} />
      </g>

      {(shape === "tank" || shape === "module") &&
        [
          [76, 108],
          [164, 108],
          [76, 196],
          [164, 196],
        ].map(([x, y]) => (
          <g key={`screw-${x}-${y}`}>
            <circle cx={x} cy={y} r="5.4" fill={shadeHex("#c8ccd4", -0.35)} />
            <circle cx={x} cy={y} r="4.6" fill={`url(#${id}-metal)`} />
            <circle cx={x} cy={y} r="1.5" fill="#1a1a18" />
            <path
              d={`M${x - 2.2} ${y} H${x + 2.2}`}
              stroke="#1a1a18"
              strokeWidth="0.7"
              strokeLinecap="round"
            />
          </g>
        ))}

      {face.graphic === "grid" && !digital &&
        [122, 140, 158].map((x) => (
          <line
            key={x}
            x1={x}
            y1={cy - dialR + 8}
            x2={x}
            y2={cy + dialR - 8}
            stroke={marksColor}
            strokeOpacity="0.18"
            strokeWidth="0.8"
            clipPath={`url(#${id}-dial)`}
          />
        ))}
      {face.graphic === "sun" && !digital && (
        <circle cx={cx} cy={cy} r={dialR * 0.62} fill="none" stroke={marksColor} strokeOpacity="0.2" strokeWidth="7" />
      )}
      {face.graphic === "void" && !digital && (
        <path
          d={brokenRing(cx, cy, dialR * 0.48)}
          fill="none"
          stroke={marksColor}
          strokeWidth={n(Math.max(1.6, dialR * 0.07))}
          strokeLinecap="round"
          opacity="0.72"
          clipPath={`url(#${id}-dial)`}
        />
      )}

      {lit ? (
        <g clipPath={`url(#${id}-dial)`} pointerEvents="none">
          <rect x="0" y="0" width="240" height="400" fill={lcdLit} opacity="0.4" />
        </g>
      ) : null}

      {shape === "brick" ? (
        <text
          x="170"
          y="152"
          textAnchor="middle"
          dominantBaseline="middle"
          transform="rotate(-90 170 152)"
          fill={logoColor}
          opacity="1"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontWeight="800"
          fontSize={markSize}
          letterSpacing="0.6"
          style={{ textRendering: "geometricPrecision" }}
        >
          PLAS/TICK
        </text>
      ) : (
        <text
          x={cx}
          y={markY}
          textAnchor="middle"
          fill={logoColor}
          opacity="1"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontWeight="800"
          fontSize={markSize}
          letterSpacing="0.6"
          style={{ textRendering: "geometricPrecision" }}
        >
          PLAS/TICK
        </text>
      )}

      {!digital ? (
        <g clipPath={`url(#${id}-dial)`}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((h) => {
            const a = (h / 12) * Math.PI * 2;
            const hour = h % 3 === 0;
            const inner = dialR - (hour ? Math.max(8, dialR * 0.32) : Math.max(5, dialR * 0.18));
            const outer = dialR - 0.4;
            return (
              <line
                key={h}
                x1={n(cx + Math.sin(a) * inner)}
                y1={n(cy - Math.cos(a) * inner)}
                x2={n(cx + Math.sin(a) * outer)}
                y2={n(cy - Math.cos(a) * outer)}
                stroke={marksColor}
                strokeWidth={h % 3 === 0 ? 2.6 : 1.45}
                strokeLinecap="butt"
                opacity={h % 3 === 0 ? 1 : 0.75}
              />
            );
          })}
        </g>
      ) : null}

      <g>
        <rect x={lcd.x} y={lcd.y} width={lcd.w} height={lcd.h} rx="2" fill={face.lcdBg} />
        {shape === "brick" ? (
          <>
            <text
              x={n(lcd.x + lcd.w / 2)}
              y={n(lcd.y + lcd.h * 0.28)}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={lcdLit}
              opacity={screen === "time" ? 1 : 0.8}
              fontSize={timeSize}
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              fontWeight="700"
              transform={`rotate(-90 ${n(lcd.x + lcd.w / 2)} ${n(lcd.y + lcd.h * 0.28)})`}
            >
              {lcdTime}
            </text>
            <text
              x={n(lcd.x + lcd.w / 2)}
              y={n(lcd.y + lcd.h * 0.72)}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={lcdLit}
              opacity={screen === "date" ? 1 : 0.8}
              fontSize={subSize}
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              fontWeight="700"
              transform={`rotate(-90 ${n(lcd.x + lcd.w / 2)} ${n(lcd.y + lcd.h * 0.72)})`}
            >
              {shortDate}
            </text>
          </>
        ) : (
          <>
            <text
              x="120"
              y={n(lcd.y + lcd.h * (digital ? 0.42 : 0.42))}
              textAnchor="middle"
              fill={lcdLit}
              opacity={screen === "time" ? 1 : 0.8}
              fontSize={timeSize}
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              fontWeight="700"
            >
              {lcdTime}
            </text>
            <text
              x="120"
              y={n(lcd.y + lcd.h * (digital ? 0.78 : 0.84))}
              textAnchor="middle"
              fill={lcdLit}
              opacity={screen === "date" ? 1 : 0.8}
              fontSize={digital ? 5 : subSize}
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              fontWeight="700"
            >
              {shortDate}
            </text>
          </>
        )}
      </g>

      {!digital ? (
        <g clipPath={`url(#${id}-dial)`}>
          <g transform={`rotate(${n(hands.h)} ${cx} ${cy})`}>
            <line x1={cx} y1={handTail} x2={cx} y2={n(cy - dialR * 0.52)} stroke={shadeHex(handsColor, -0.35)} strokeWidth="4.6" strokeLinecap="round" />
            <line x1={cx} y1={handTail} x2={cx} y2={n(cy - dialR * 0.55)} stroke={handsColor} strokeWidth="3" strokeLinecap="round" />
            <circle cx={cx} cy={n(cy - dialR * 0.36)} r="1.5" fill="#fff" opacity="0.45" />
          </g>
          <g transform={`rotate(${n(hands.m)} ${cx} ${cy})`}>
            <line x1={cx} y1={handTail} x2={cx} y2={n(cy - dialR * 0.78)} stroke={shadeHex(handsColor, -0.35)} strokeWidth="3" strokeLinecap="round" />
            <line x1={cx} y1={handTail} x2={cx} y2={n(cy - dialR * 0.82)} stroke={handsColor} strokeWidth="1.8" strokeLinecap="round" />
            <circle cx={cx} cy={n(cy - dialR * 0.55)} r="1.2" fill="#fff" opacity="0.4" />
          </g>
          <g transform={`rotate(${n(hands.s)} ${cx} ${cy})`}>
            <line x1={cx} y1={handTail} x2={cx} y2={n(cy - dialR * 0.9)} stroke={handsColor} strokeWidth="1" strokeLinecap="round" />
          </g>
          <circle cx={cx} cy={cy} r="4.6" fill={shadeHex(handsColor, -0.35)} />
          <circle cx={cx} cy={cy} r="3" fill={handsColor} />
          <circle cx={cx} cy={cy} r="1.3" fill={face.dial} />
        </g>
      ) : null}

      {interactive
        ? pushers(shape).map((btn) => (
            <rect
              key={btn.job + btn.y}
              x={btn.x}
              y={btn.y}
              width={btn.w}
              height={btn.h}
              fill="transparent"
              className="cursor-pointer"
              pointerEvents="all"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                if (btn.job === "light") flash();
                else if (btn.job === "mode") setScreen((s) => (s === "time" ? "date" : "time"));
                else {
                  setScreen("date");
                  setDayName((on) => !on);
                }
              }}
            >
              <title>{btn.name}</title>
            </rect>
          ))
        : null}
    </svg>
  );
});
