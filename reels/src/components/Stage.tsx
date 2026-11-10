import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, random, spring, staticFile, useCurrentFrame } from "remotion";
import { C, FONT, H, W } from "../theme";
import { pop, ramp, wave } from "./anim";
import { Defs } from "./Props";

/** A full-frame SVG canvas in scene coordinates (1080×1920). */
export const Svg: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ position: "absolute", inset: 0 }}>
    <Defs />
    {children}
  </svg>
);

export type Setting = "room" | "kitchen" | "store" | "laundry" | "cafe" | "office" | "plain" | "navy";

/** Flat 2D background: wall, floor and a few details per setting. */
export const Backdrop: React.FC<{ setting: Setting; wall?: string }> = ({ setting, wall }) => {
  const f = useCurrentFrame();
  if (setting === "navy") {
    return (
      <Svg>
        <rect width={W} height={H} fill={C.navy} />
        <circle cx={900} cy={420} r={320} fill={C.cobalt} opacity={0.35} />
        <circle cx={120} cy={1500} r={260} fill={C.cobalt} opacity={0.25} />
      </Svg>
    );
  }
  const wallColor = wall ?? { room: C.wall, kitchen: "#FCEFE3", store: "#EAF3EC", laundry: "#E4F1FB", cafe: "#F6E9DC", office: "#E9EDF5", plain: C.cream }[setting];
  const floorY = 1300;
  return (
    <Svg>
      <rect width={W} height={H} fill={wallColor} />
      {/* soft brand shapes */}
      <circle cx={940 + wave(f, 200, 10)} cy={420} r={230} fill="#fff" opacity={0.45} />
      <circle cx={110} cy={760 + wave(f, 180, 10)} r={150} fill="#fff" opacity={0.35} />
      {setting === "kitchen" ? (
        <g>
          {Array.from({ length: 6 }).map((_, i) =>
            Array.from({ length: 4 }).map((__, j) => (
              <rect key={`${i}-${j}`} x={60 + i * 160} y={820 + j * 100} width={150} height={90} rx={8} fill="#fff" opacity={0.55} />
            )),
          )}
        </g>
      ) : null}
      {setting === "store" ? (
        <g>
          <rect x={0} y={0} width={W} height={56} fill={C.green} opacity={0.85} />
          {Array.from({ length: 9 }).map((_, i) => (
            <rect key={i} x={i * 120} y={0} width={60} height={56} fill="#fff" opacity={0.35} />
          ))}
        </g>
      ) : null}
      {setting === "laundry" ? (
        <g>
          <rect x={80} y={430} width={420} height={80} rx={40} fill={C.cobalt} />
          <text x={290} y={485} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={40} fill="#fff">
            LAUNDRY KILOAN
          </text>
          {[0, 1, 2, 3, 4].map((i) => (
            <circle key={i} cx={640 + i * 90} cy={500 + wave(f, 50, 12, i * 9)} r={18 + (i % 2) * 8} fill="#fff" opacity={0.7} />
          ))}
        </g>
      ) : null}
      {setting === "cafe" ? (
        <g>
          <rect x={60} y={420} width={420} height={260} rx={18} fill={C.navy} />
          <text x={270} y={490} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={36} fill={C.gold}>
            MENU
          </text>
          {[0, 1, 2].map((i) => (
            <rect key={i} x={110} y={520 + i * 46} width={320 - i * 50} height={16} rx={8} fill="#fff" opacity={0.6} />
          ))}
          {[680, 830, 980].map((x, i) => (
            <g key={i}>
              <line x1={x} y1={410} x2={x} y2={420} stroke={C.navy} strokeWidth={4} />
              <path d={`M${x - 50} 470 L${x + 50} 470 L${x + 24} 420 L${x - 24} 420 Z`} fill={C.gold} />
              <ellipse cx={x} cy={480} rx={30} ry={10} fill="#FFF4C8" opacity={0.9} />
            </g>
          ))}
        </g>
      ) : null}
      {setting === "office" ? (
        <g>
          {/* bookshelf, bottom left */}
          <rect x={30} y={860} width={230} height={440} rx={12} fill={C.woodDark} />
          {[0, 1, 2].map((r) => (
            <g key={r}>
              <rect x={46} y={884 + r * 138} width={198} height={112} fill="#B97E4E" />
              {[0, 1, 2, 3, 4].map((b) => (
                <rect key={b} x={56 + b * 36} y={904 + r * 138 + (b % 2) * 10} width={28} height={92 - (b % 2) * 10} rx={4} fill={[C.cobalt, C.gold, C.red, C.navy, C.green][(b + r) % 5]} />
              ))}
            </g>
          ))}
        </g>
      ) : null}
      {setting === "room" ? (
        <g>
          {/* potted plant, bottom right */}
          <rect x={968} y={1180} width={90} height={120} rx={14} fill={C.wood} />
          <ellipse cx={990} cy={1150} rx={34} ry={70} fill={C.green} transform="rotate(-20 990 1150)" />
          <ellipse cx={1036} cy={1140} rx={30} ry={64} fill="#3FB87A" transform="rotate(18 1036 1140)" />
        </g>
      ) : null}
      {setting !== "plain" ? (
        <>
          <rect x={0} y={floorY} width={W} height={H - floorY} fill={C.floor} />
          <rect x={0} y={floorY} width={W} height={14} fill="rgba(16,31,62,0.08)" />
        </>
      ) : null}
    </Svg>
  );
};

/** Small logo top-left on every scene. */
export const Watermark: React.FC<{ dark?: boolean }> = ({ dark }) => (
  <div
    style={{
      position: "absolute",
      top: 70,
      left: 60,
      padding: "12px 20px",
      borderRadius: 18,
      background: dark ? "#fff" : "rgba(255,255,255,0.85)",
    }}
  >
    <Img src={staticFile("legalease-logo.png")} style={{ height: 46, display: "block" }} />
  </div>
);

/** Headline at the top of a scene: small pill + big line. */
export const Kicker: React.FC<{ pill?: string; text?: string; dark?: boolean; pillColor?: string }> = ({ pill, text, dark, pillColor = C.gold }) => {
  const f = useCurrentFrame();
  const a = pop(f, 2);
  const b = pop(f, 7);
  return (
    <div style={{ position: "absolute", top: 180, left: 60, right: 60, textAlign: "center", fontFamily: FONT }}>
      {pill ? (
        <div
          style={{
            display: "inline-block",
            padding: "10px 28px",
            borderRadius: 999,
            background: pillColor,
            color: C.navy,
            fontWeight: 900,
            fontSize: 34,
            letterSpacing: 2,
            transform: `scale(${a})`,
          }}
        >
          {pill}
        </div>
      ) : null}
      {text ? (
        <div
          style={{
            marginTop: 18,
            fontWeight: 900,
            fontSize: 70,
            lineHeight: 1.08,
            color: dark ? "#fff" : C.navy,
            opacity: b,
            transform: `translateY(${(1 - b) * 30}px)`,
          }}
        >
          {text}
        </div>
      ) : null}
    </div>
  );
};

/** Splits narration into short subtitle chunks; *word* marks a highlight. */
export const chunkText = (text: string, max = 7) => {
  const words = text.split(/\s+/).filter(Boolean);
  const chunks: string[][] = [];
  let cur: string[] = [];
  for (const w of words) {
    cur.push(w);
    const endSentence = /[.!?,:]$/.test(w.replace(/\*/g, ""));
    if (cur.length >= max || (endSentence && cur.length >= 2)) {
      chunks.push(cur);
      cur = [];
    }
  }
  if (cur.length) chunks.push(cur);
  return chunks;
};

export const plain = (text: string) => text.replace(/\*/g, "");

/** Whether a highlight (*...*) is already open at the start of chunk idx. */
const startsOn = (chunks: string[][], idx: number) => {
  let on = false;
  for (let i = 0; i < idx; i++) for (const w of chunks[i]) on = toggle(w, on).after;
  return on;
};

const toggle = (w: string, on: boolean) => {
  let now = on;
  if (w.startsWith("*")) now = true;
  const hi = now;
  if (w.replace(/^\*/, "").endsWith("*") || (w.length > 1 && w.endsWith("*"))) now = false;
  return { hi, after: now };
};

/** Groups words into runs of highlighted / plain text. */
const segments = (words: string[], on: boolean) => {
  const out: { hi: boolean; text: string }[] = [];
  let state = on;
  for (const w of words) {
    const t = toggle(w, state);
    state = t.after;
    const text = w.replace(/\*/g, "");
    const last = out[out.length - 1];
    if (last && last.hi === t.hi) last.text += " " + text;
    else out.push({ hi: t.hi, text });
  }
  return out;
};

/** Subtitles timed by word count across the scene. */
export const Caption: React.FC<{ text: string; dur: number; dark?: boolean }> = ({ text, dur, dark }) => {
  const f = useCurrentFrame();
  const chunks = chunkText(text);
  const total = chunks.reduce((n, c) => n + c.length, 0);
  const usable = Math.max(dur - 10, 10);
  let start = 4;
  let idx = chunks.length - 1;
  let localStart = start;
  for (let i = 0; i < chunks.length; i++) {
    const len = (chunks[i].length / total) * usable;
    if (f < start + len) {
      idx = i;
      localStart = start;
      break;
    }
    start += len;
  }
  const t = ramp(f, localStart, localStart + 5);
  return (
    <div style={{ position: "absolute", top: 1400, left: 70, right: 70, display: "flex", justifyContent: "center" }}>
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 54,
          lineHeight: 1.25,
          textAlign: "center",
          color: dark ? C.navy : C.navy,
          background: "#fff",
          borderRadius: 28,
          padding: "22px 34px",
          boxShadow: "0 10px 0 rgba(16,31,62,0.12)",
          opacity: f < 4 ? 0 : 0.4 + 0.6 * t,
          transform: `translateY(${(1 - t) * 10}px)`,
        }}
      >
        {segments(chunks[idx], startsOn(chunks, idx)).map((seg, i) => (
          <span key={i}>
            <span
              style={
                seg.hi ? { background: C.gold, borderRadius: 10, padding: "0 10px", boxDecorationBreak: "clone", WebkitBoxDecorationBreak: "clone" } : undefined
              }
            >
              {seg.text}
            </span>{" "}
          </span>
        ))}
      </div>
    </div>
  );
};

/** Fades a scene in over its first frames. */
export const SceneIn: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const f = useCurrentFrame();
  const o = ramp(f, 0, 6);
  return <AbsoluteFill style={{ opacity: o }}>{children}</AbsoluteFill>;
};

// ---------------------------------------------------------------------------
// Cinematic layer: camera, depth, light and cuts.

export type Grade = "warm" | "cool" | "tense" | "bright" | "night";

export type Cam = {
  /** Zoom from → to across the scene. */
  zoom?: [number, number];
  /** Horizontal pan in px from → to. */
  pan?: [number, number];
  /** Vertical pan in px from → to. */
  tilt?: [number, number];
  /** Point the camera zooms toward, in scene px. */
  focus?: [number, number];
  /** Quick punch-in zooms at these moments. */
  punch?: number[];
  /** Camera shakes at these moments. */
  shake?: number[];
  grade?: Grade;
};

const GRADES: Record<Grade, { top: string; tint: string; vignette: number }> = {
  warm: { top: "rgba(255,196,120,0.30)", tint: "rgba(255,170,90,0.07)", vignette: 0.36 },
  cool: { top: "rgba(140,200,255,0.30)", tint: "rgba(60,120,220,0.06)", vignette: 0.36 },
  bright: { top: "rgba(255,255,255,0.35)", tint: "rgba(255,255,255,0)", vignette: 0.24 },
  tense: { top: "rgba(255,90,90,0.18)", tint: "rgba(120,20,40,0.12)", vignette: 0.58 },
  night: { top: "rgba(80,120,255,0.10)", tint: "rgba(10,20,60,0.06)", vignette: 0.45 },
};

export const camAt = (cam: Cam | undefined, frame: number, dur: number) => {
  const t = Math.min(1, Math.max(0, frame / Math.max(dur, 1)));
  const e = Easing.inOut(Easing.cubic)(t);
  const z0 = cam?.zoom ?? [1, 1.07];
  let zoom = z0[0] + (z0[1] - z0[0]) * e;
  const pan = cam?.pan ? cam.pan[0] + (cam.pan[1] - cam.pan[0]) * e : 0;
  const tilt = cam?.tilt ? cam.tilt[0] + (cam.tilt[1] - cam.tilt[0]) * e : 0;
  for (const p of cam?.punch ?? []) {
    const d = frame - p * dur;
    if (d >= 0) zoom += spring({ frame: d, fps: 30, config: { damping: 9, mass: 0.5 } }) * 0.1 * Math.exp(-d / 40) + (d > 0 ? 0.04 : 0);
  }
  let sx = 0;
  let sy = 0;
  for (const s of cam?.shake ?? []) {
    const d = frame - s * dur;
    if (d >= 0 && d < 18) {
      const k = (1 - d / 18) * 22;
      sx += (random(`sx${s}-${frame}`) - 0.5) * 2 * k;
      sy += (random(`sy${s}-${frame}`) - 0.5) * 2 * k;
    }
  }
  return { zoom, pan, tilt, sx, sy, focus: cam?.focus ?? [540, 1150] };
};

/** Out-of-focus shapes in front of the scene, for depth. */
export const Foreground: React.FC<{ seed?: string; dark?: boolean }> = ({ seed = "a", dark }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {[0, 1, 2, 3].map((i) => {
        const left = i % 2 === 0;
        const x = (left ? -120 : 900) + random(`fx${seed}${i}`) * 160 + Math.sin((f + i * 40) / 70) * 20;
        const y = 300 + random(`fy${seed}${i}`) * 1100 + Math.cos((f + i * 30) / 80) * 25;
        const r = 90 + random(`fr${seed}${i}`) * 110;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: r * 2,
              height: r * 2,
              borderRadius: "50%",
              background: dark ? (i % 2 ? "rgba(231,179,72,0.20)" : "rgba(59,143,224,0.22)") : i % 2 ? "rgba(255,255,255,0.45)" : "rgba(231,179,72,0.18)",
              filter: "blur(28px)",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

/** Light, colour grade, vignette and film grain over the picture. */
export const Look: React.FC<{ grade?: Grade }> = ({ grade = "bright" }) => {
  const f = useCurrentFrame();
  const g = GRADES[grade];
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <AbsoluteFill style={{ background: `linear-gradient(180deg, ${g.top} 0%, rgba(255,255,255,0) 45%)` }} />
      <AbsoluteFill style={{ background: g.tint, mixBlendMode: "multiply" }} />
      <AbsoluteFill
        style={{ background: `radial-gradient(ellipse 75% 60% at 50% 45%, rgba(0,0,0,0) 55%, rgba(8,16,36,${g.vignette}) 100%)` }}
      />
      <svg width={W} height={H} style={{ position: "absolute", inset: 0, opacity: 0.07, mixBlendMode: "overlay" }}>
        <filter id={`grain${f % 6}`}>
          <feTurbulence type="fractalNoise" baseFrequency={0.85} numOctaves={2} seed={f % 6} />
        </filter>
        <rect width={W} height={H} filter={`url(#grain${f % 6})`} />
      </svg>
    </AbsoluteFill>
  );
};

/** Brand-coloured whip wipe that hides each cut. */
export const Wipe: React.FC<{ dur: number; first: boolean; last: boolean }> = ({ dur, first, last }) => {
  const f = useCurrentFrame();
  const IN = 9;
  const OUT = 7;
  let x: number | null = null;
  if (!first && f < IN) x = interpolate(f, [0, IN], [0, -1.3], { easing: Easing.in(Easing.cubic) });
  if (!last && f >= dur - OUT) x = interpolate(f, [dur - OUT, dur], [1.3, 0], { easing: Easing.out(Easing.cubic) });
  if (x === null) return null;
  return (
    <AbsoluteFill style={{ transform: `translateX(${x * W}px) skewX(-12deg) scaleX(1.3)` }}>
      <AbsoluteFill style={{ background: C.cobalt }} />
      <div style={{ position: "absolute", top: 0, bottom: 0, left: -40, width: 60, background: C.gold }} />
      <div style={{ position: "absolute", top: 0, bottom: 0, right: -40, width: 60, background: C.navy }} />
    </AbsoluteFill>
  );
};

/** Letterbox bars that open at the very start of a video. */
export const Letterbox: React.FC = () => {
  const f = useCurrentFrame();
  const t = interpolate(f, [6, 26], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  if (t <= 0) return null;
  const h = 360 * t;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: h, background: "#05080f" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: h, background: "#05080f" }} />
    </AbsoluteFill>
  );
};
