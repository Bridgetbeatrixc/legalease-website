import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { wave } from "./anim";

/**
 * Chibi-style 2D character: big head, glossy eyes, outlined shapes.
 * Origin = between the feet. Height about 640 units at scale 1.
 */

export const OL = "#2A1E3B";
const OW = 7;

export type Mood = "happy" | "joy" | "neutral" | "sad" | "shock" | "think" | "worried" | "determined";
export type ChibiPose =
  | "idle"
  | "wave"
  | "cheer"
  | "stir"
  | "phone"
  | "point"
  | "shrug"
  | "handsHead"
  | "present"
  | "hold"
  | "chin"
  | "slump"
  | "no"
  | "highfive"
  | "walk";
type Keys<T> = [number, T][];

// [shoulder, elbow] degrees. Shoulder: 0 = hanging, + = raised outward.
// Elbow: + = forearm bends inward/up.
const POSES: Record<ChibiPose, { L: [number, number]; R: [number, number] }> = {
  idle: { L: [12, 10], R: [12, 10] },
  walk: { L: [10, 10], R: [10, 10] },
  wave: { L: [12, 10], R: [140, 30] },
  cheer: { L: [150, 15], R: [150, 15] },
  stir: { L: [14, 40], R: [40, 80] },
  phone: { L: [12, 30], R: [30, -155] },
  point: { L: [12, 10], R: [95, 5] },
  shrug: { L: [50, -100], R: [50, -100] },
  handsHead: { L: [160, -28], R: [160, -28] },
  present: { L: [12, 10], R: [40, -50] },
  hold: { L: [30, 100], R: [30, 100] },
  chin: { L: [18, 90], R: [22, -185] },
  slump: { L: [4, 0], R: [4, 0] },
  no: { L: [12, 10], R: [40, -158] },
  highfive: { L: [12, 10], R: [165, 10] },
};

const keyed = <T,>(keys: Keys<T>, f: number, blend = 8) => {
  let prev = keys[0][1];
  let cur = keys[0][1];
  let t = 1;
  for (let i = 0; i < keys.length; i++) {
    if (f >= keys[i][0]) {
      prev = i > 0 ? keys[i - 1][1] : keys[i][1];
      cur = keys[i][1];
      t = i > 0 ? Math.min(1, (f - keys[i][0]) / blend) : 1;
    }
  }
  return { prev, cur, t: Easing.bezier(0.34, 1.45, 0.64, 1)(Math.max(0, t)) };
};

/** Big glossy anime-style eye. lx/ly = where the iris looks (-1..1). */
export const Eye: React.FC<{ x: number; y: number; open: number; lx?: number; ly?: number; iris?: string; size?: number; sparkle?: boolean; lash?: boolean; flip?: boolean }> = ({
  x,
  y,
  open,
  lx = 0,
  ly = 0,
  iris = "#6B3A1F",
  size = 1,
  sparkle = false,
  lash = true,
  flip = false,
}) => {
  const rx = 27 * size;
  const ry = 33 * size;
  const o = Math.max(0.06, open);
  return (
    <g transform={`translate(${x} ${y})`}>
      <g transform={`scale(1 ${o})`}>
        <ellipse rx={rx} ry={ry} fill="#fff" stroke={OL} strokeWidth={5} />
        <ellipse cx={lx * 7 * size} cy={ly * 6 * size + 3} rx={rx * 0.74} ry={ry * 0.8} fill={iris} />
        <ellipse cx={lx * 7 * size} cy={ly * 6 * size + 10 * size} rx={rx * 0.5} ry={ry * 0.42} fill="rgba(255,255,255,0.18)" />
        <ellipse cx={lx * 8 * size} cy={ly * 6 * size + 3} rx={rx * 0.36} ry={ry * 0.42} fill={OL} />
        {sparkle ? (
          <path
            d={`M${-7 * size} ${-14 * size} l${4 * size} ${8 * size} l${8 * size} ${3 * size} l${-8 * size} ${3 * size} l${-4 * size} ${8 * size} l${-4 * size} ${-8 * size} l${-8 * size} ${-3 * size} l${8 * size} ${-3 * size} Z`}
            fill="#fff"
          />
        ) : (
          <circle cx={-8 * size + lx * 6} cy={-11 * size} r={9 * size} fill="#fff" />
        )}
        <circle cx={9 * size + lx * 6} cy={12 * size} r={4.5 * size} fill="#fff" />
      </g>
      {lash ? (
        <path
          transform={flip ? "scale(-1 1)" : undefined}
          d={`M${-rx - 4} ${-ry * o * 0.55} Q0 ${-ry * o - 12} ${rx + 4} ${-ry * o * 0.55} l10 -10`}
          stroke={OL}
          strokeWidth={9}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : null}
    </g>
  );
};

const BROWS: Record<Mood, [number, number, number]> = {
  // [inner y offset, outer y offset, rotation]
  happy: [-4, -2, 0],
  joy: [-10, -6, 0],
  neutral: [0, 0, 0],
  sad: [-14, 6, 0],
  worried: [-16, 4, 0],
  shock: [-18, -14, 0],
  think: [4, -10, 0],
  determined: [10, -6, 0],
};

const Mouth: React.FC<{ mood: Mood; level: number }> = ({ mood, level }) => {
  if (level > 0.08 && mood !== "shock") {
    const h = 8 + level * 30;
    return (
      <g transform="translate(0 92)">
        <path d={`M-24 -4 Q0 ${-8} 24 -4 Q22 ${h} 0 ${h + 4} Q-22 ${h} -24 -4 Z`} fill="#7A1F2B" stroke={OL} strokeWidth={5} strokeLinejoin="round" />
        <ellipse cx={0} cy={h - 2} rx={12} ry={Math.min(7, h / 3)} fill="#F07A8A" />
      </g>
    );
  }
  switch (mood) {
    case "joy":
      return (
        <g transform="translate(0 88)">
          <path d="M-34 -6 Q0 -10 34 -6 Q30 40 0 42 Q-30 40 -34 -6 Z" fill="#7A1F2B" stroke={OL} strokeWidth={5} strokeLinejoin="round" />
          <path d="M-28 -4 Q0 -6 28 -4 L26 6 Q0 9 -26 6 Z" fill="#fff" />
          <ellipse cx={0} cy={30} rx={16} ry={8} fill="#F07A8A" />
        </g>
      );
    case "happy":
      return <path d="M-24 84 Q0 112 24 84" stroke={OL} strokeWidth={7} fill="none" strokeLinecap="round" />;
    case "shock":
      return <ellipse cx={0} cy={98} rx={16} ry={22} fill="#7A1F2B" stroke={OL} strokeWidth={5} />;
    case "sad":
      return <path d="M-20 102 Q0 84 20 102" stroke={OL} strokeWidth={7} fill="none" strokeLinecap="round" />;
    case "worried":
      return <path d="M-24 96 q8 -8 16 0 q8 8 16 0 q8 -8 16 0" stroke={OL} strokeWidth={6} fill="none" strokeLinecap="round" transform="translate(-4 0)" />;
    case "think":
      return <path d="M-14 96 Q4 90 20 94" stroke={OL} strokeWidth={7} fill="none" strokeLinecap="round" />;
    case "determined":
      return <path d="M-22 92 Q0 104 22 92" stroke={OL} strokeWidth={7} fill="none" strokeLinecap="round" />;
    default:
      return <path d="M-16 92 Q0 100 16 92" stroke={OL} strokeWidth={7} fill="none" strokeLinecap="round" />;
  }
};

/** The face, centred on the head centre. */
export const Face: React.FC<{ mood: Mood; blink: number; level: number; lx: number; ly: number; iris?: string; lash?: boolean }> = ({ mood, blink, level, lx, ly, iris, lash = true }) => {
  const b = BROWS[mood];
  const happyEyes = mood === "joy";
  const eyeOpen = blink * (mood === "shock" ? 1.12 : mood === "sad" ? 0.82 : mood === "determined" ? 0.75 : 1);
  return (
    <g>
      {/* blush */}
      <ellipse cx={-70} cy={58} rx={24} ry={13} fill="#FF8FA3" opacity={0.55} />
      <ellipse cx={70} cy={58} rx={24} ry={13} fill="#FF8FA3" opacity={0.55} />
      {happyEyes ? (
        <g stroke={OL} strokeWidth={9} fill="none" strokeLinecap="round">
          <path d="M-74 18 Q-48 -14 -22 18" />
          <path d="M22 18 Q48 -14 74 18" />
        </g>
      ) : (
        <>
          <Eye x={-48} y={14} open={eyeOpen} lx={lx} ly={ly} iris={iris} lash={lash} flip sparkle={mood === "happy"} />
          <Eye x={48} y={14} open={eyeOpen} lx={lx} ly={ly} iris={iris} lash={lash} sparkle={mood === "happy"} />
        </>
      )}
      {/* brows */}
      <g stroke={OL} strokeWidth={8} strokeLinecap="round">
        <line x1={-72} y1={-38 + b[1]} x2={-28} y2={-38 + b[0]} />
        <line x1={28} y1={-38 + b[0]} x2={72} y2={-38 + b[1]} />
      </g>
      <path d="M-4 52 Q2 60 -2 64" stroke="rgba(42,30,59,0.45)" strokeWidth={5} fill="none" strokeLinecap="round" />
      <Mouth mood={mood} level={level} />
      {mood === "worried" || mood === "shock" ? (
        <path d="M100 -40 Q114 -14 100 -2 Q86 -14 100 -40 Z" fill="#9BD6FF" stroke={OL} strokeWidth={4} />
      ) : null}
      {mood === "sad" ? (
        <g opacity={0.7}>
          <line x1={-70} y1={-60} x2={-70} y2={-10} stroke="#6B7BB8" strokeWidth={4} />
          <line x1={-50} y1={-64} x2={-50} y2={-20} stroke="#6B7BB8" strokeWidth={4} />
          <line x1={-30} y1={-60} x2={-30} y2={-14} stroke="#6B7BB8" strokeWidth={4} />
        </g>
      ) : null}
    </g>
  );
};

const Limb: React.FC<{ x1: number; y1: number; x2: number; y2: number; w: number; color: string }> = ({ x1, y1, x2, y2, w, color }) => (
  <>
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={OL} strokeWidth={w + OW * 2} strokeLinecap="round" />
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={w} strokeLinecap="round" />
  </>
);

const Hand: React.FC<{ skin: string; open?: boolean }> = ({ skin, open }) => (
  <g>
    <ellipse cx={0} cy={0} rx={24} ry={22} fill={skin} stroke={OL} strokeWidth={5} />
    {open ? <ellipse cx={-18} cy={-12} rx={9} ry={14} fill={skin} stroke={OL} strokeWidth={5} transform="rotate(-30 -18 -12)" /> : <path d="M-10 -6 q6 6 0 12" stroke={OL} strokeWidth={4} fill="none" strokeLinecap="round" />}
  </g>
);

export type ChibiLook = {
  skin?: string;
  hair?: "hijab" | "short" | "bob";
  hairColor?: string;
  hijab?: string;
  hijabShade?: string;
  shirt?: string;
  shirtShade?: string;
  skirt?: string;
  apron?: string;
  pants?: string;
  shoes?: string;
  iris?: string;
  lash?: boolean;
  hat?: "chef";
};

export const Chibi: React.FC<
  ChibiLook & {
    x: number;
    y: number;
    scale?: number;
    facing?: 1 | -1;
    moods?: Keys<Mood>;
    poses?: Keys<ChibiPose>;
    /** Where the eyes look over time ([-1..1, -1..1]). */
    looks?: Keys<[number, number]>;
    walk?: { from: number; start?: number; dur?: number };
    jumps?: number[];
    flinch?: number[];
    /** Head shake "no" between these frames. */
    shake?: [number, number];
    /** Per-frame mouth level (lip sync) or a constant chatter. */
    mouth?: number[];
    talk?: [number, number][];
    lean?: number;
    holding?: React.ReactNode;
    holdingL?: React.ReactNode;
    seed?: number;
  }
> = ({
  x,
  y,
  scale = 1,
  facing = 1,
  moods = [[0, "neutral"]],
  poses = [[0, "idle"]],
  looks,
  walk,
  jumps = [],
  flinch = [],
  shake,
  mouth,
  talk,
  lean = 0,
  holding,
  holdingL,
  seed = 0,
  skin = "#F2C29B",
  hair = "hijab",
  hairColor = "#2B1B17",
  hijab = "#C2344D",
  hijabShade = "#9E2440",
  shirt = "#F39A4E",
  shirtShade = "#D97A32",
  skirt,
  apron,
  pants = "#2D3A6B",
  shoes = "#3B2A4A",
  iris,
  lash = true,
  hat,
}) => {
  const frame = useCurrentFrame();
  const f = frame + seed * 41;

  const wStart = walk?.start ?? 0;
  const wDur = walk?.dur ?? 24;
  const wT = walk ? interpolate(frame, [wStart, wStart + wDur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 1;
  const walking = walk ? wT > 0 && wT < 1 : false;
  const px = walk ? interpolate(Easing.out(Easing.quad)(wT), [0, 1], [walk.from, x]) : x;
  const step = walking ? Math.sin(frame / 2.2) : 0;

  const pk = keyed(poses, frame);
  const mk = keyed(moods, frame);
  const mood = mk.cur;
  const curPose: ChibiPose = walking ? "walk" : pk.cur;
  const prevPose: ChibiPose = walking ? "walk" : pk.prev;
  const pt = walking ? 1 : pk.t;

  // hops and squash
  let up = walking ? Math.abs(step) * 18 : 0;
  let sq = 1;
  for (const j of jumps) {
    const d = frame - j;
    if (d >= -5 && d < 0) sq *= 1 - 0.12 * ((d + 5) / 5);
    else if (d >= 0 && d < 16) {
      const t = d / 16;
      up = Math.max(up, Math.sin(t * Math.PI) * 110);
      sq *= 1 + 0.1 * Math.sin(t * Math.PI);
    } else if (d >= 16 && d < 24) sq *= 1 - 0.14 * Math.sin(((d - 16) / 8) * Math.PI);
  }
  let back = 0;
  for (const fl of flinch) {
    const d = frame - fl;
    if (d >= 0 && d < 20) back += Math.sin((d / 20) * Math.PI) * -14 * (1 - d / 20);
  }
  const slump = curPose === "slump" ? pt : prevPose === "slump" ? 1 - pt : 0;

  const breathe = wave(f, 56, 1);
  const cyc = (f + 17) % 100;
  const blink = cyc < 5 ? Math.abs(cyc - 2.5) / 2.5 : 1;

  let level = 0;
  if (mouth) level = mouth[Math.max(0, Math.min(mouth.length - 1, frame))] ?? 0;
  for (const [a, b] of talk ?? []) if (frame >= a && frame < b) level = Math.max(level, Math.abs(Math.sin(frame / 2.3)) * 0.8);

  const lk = looks ? keyed(looks, frame, 6) : null;
  const lx = lk ? lk.prev[0] + (lk.cur[0] - lk.prev[0]) * Math.min(1, lk.t) : wave(f, 140, 0.25);
  const ly = lk ? lk.prev[1] + (lk.cur[1] - lk.prev[1]) * Math.min(1, lk.t) : 0;

  const A = POSES[prevPose];
  const B = POSES[curPose];
  const mix = (a: number, b: number) => a + (b - a) * pt;
  const L: [number, number] = [mix(A.L[0], B.L[0]), mix(A.L[1], B.L[1])];
  const R: [number, number] = [mix(A.R[0], B.R[0]), mix(A.R[1], B.R[1])];
  const live = (v: number, p: number, a: number, ph = 0) => v + wave(f, p, a, ph);
  if (curPose === "wave") R[1] = live(R[1], 14, 28);
  if (curPose === "stir") {
    R[0] = live(R[0], 20, 14);
    R[1] = live(R[1], 20, 12, 5);
  }
  if (curPose === "cheer") {
    L[0] = live(L[0], 12, 12);
    R[0] = live(R[0], 12, 12, 6);
  }
  if (curPose === "no") R[0] = live(R[0], 8, 16);
  if (curPose === "idle" || curPose === "present" || curPose === "point" || curPose === "slump") {
    L[0] = live(L[0], 70, 4);
    R[0] = live(R[0], 70, 4, 18);
  }
  if (walking) {
    L[0] = 10 + step * 30;
    R[0] = 10 - step * 30;
  }

  let headTilt = wave(f, 100, 3) + (mood === "think" ? 10 : 0) + slump * 10 + (mood === "joy" ? wave(f, 24, 5) : 0) + level * wave(f, 9, 3);
  if (shake && frame >= shake[0] && frame < shake[1]) headTilt += Math.sin((frame - shake[0]) * 0.9) * 14;
  const headBob = level * 4 + breathe * 3 + slump * 30;

  // geometry
  const hipY = -150;
  const shY = -330;
  const headY = -500;
  const arm = (side: -1 | 1, a: [number, number], held?: React.ReactNode) => {
    const sx = side * 92;
    const U = 100;
    const Fo = 88;
    const a1 = (a[0] * Math.PI) / 180;
    const ex = sx + side * Math.sin(a1) * U;
    const ey = shY + 14 + Math.cos(a1) * U;
    const a2 = ((a[0] - a[1]) * Math.PI) / 180;
    const fx = ex + side * Math.sin(a2) * Fo;
    const fy = ey + Math.cos(a2) * Fo;
    return (
      <g>
        <Limb x1={sx} y1={shY + 14} x2={ex} y2={ey} w={40} color={shirt} />
        <Limb x1={ex} y1={ey} x2={fx} y2={fy} w={36} color={shirt} />
        <g transform={`translate(${fx} ${fy})`}>
          <Hand skin={skin} open={curPose === "wave" || curPose === "cheer" || curPose === "highfive" || curPose === "present"} />
          {held}
        </g>
      </g>
    );
  };

  const front = ["cheer", "handsHead", "wave", "highfive", "chin", "phone", "no"].includes(curPose);
  const skirtSway = walking ? step * 8 : wave(f, 60, 3);
  const longDress = !!skirt;

  return (
    <g transform={`translate(${px} ${y}) scale(${scale * facing} ${scale})`}>
      <ellipse cx={0} cy={0} rx={140 - up * 0.5} ry={20} fill="rgba(42,30,59,0.16)" />
      <g transform={`translate(0 ${-up}) scale(${2 - sq} ${sq}) rotate(${lean + back} 0 ${hipY})`}>
        {/* legs + shoes */}
        {[-40, 40].map((lx2, i) => {
          const sw = walking ? step * 20 * (i ? -1 : 1) : 0;
          return (
            <g key={lx2} transform={`rotate(${sw} ${lx2} ${hipY})`}>
              {!longDress ? <Limb x1={lx2} y1={hipY} x2={lx2} y2={-34} w={46} color={pants} /> : null}
              <ellipse cx={lx2 + (i ? 12 : -12)} cy={-18} rx={44} ry={22} fill={shoes} stroke={OL} strokeWidth={OW} />
            </g>
          );
        })}
        <g transform={`translate(0 ${breathe * 2 + slump * 10})`}>
          {/* torso */}
          {longDress ? (
            <path
              d={`M-88 ${shY} Q-120 ${shY + 10} -122 ${shY + 80} L${-150 - skirtSway} -40 Q0 -16 ${150 - skirtSway} -40 L122 ${shY + 80} Q120 ${shY + 10} 88 ${shY} Z`}
              fill={skirt}
              stroke={OL}
              strokeWidth={OW}
              strokeLinejoin="round"
            />
          ) : (
            <path d={`M-88 ${shY} Q-122 ${shY + 10} -120 ${shY + 80} L-110 ${hipY + 10} Q0 ${hipY + 30} 110 ${hipY + 10} L120 ${shY + 80} Q122 ${shY + 10} 88 ${shY} Z`} fill={shirt} stroke={OL} strokeWidth={OW} strokeLinejoin="round" />
          )}
          {longDress ? <path d={`M60 ${shY + 30} L${110 - skirtSway} -44 L${150 - skirtSway} -40 L122 ${shY + 80} Z`} fill="rgba(0,0,0,0.08)" /> : null}
          {apron ? (
            <g>
              <path d={`M-66 ${shY + 40} L66 ${shY + 40} L${92 - skirtSway * 0.6} -70 Q0 -54 ${-92 - skirtSway * 0.6} -70 Z`} fill={apron} stroke={OL} strokeWidth={5} strokeLinejoin="round" />
              <rect x={-44} y={-200} width={88} height={56} rx={14} fill="#F4EFE6" stroke={OL} strokeWidth={4} />
              <path d={`M-66 ${shY + 40} Q-40 ${shY - 10} -20 ${shY - 20} M66 ${shY + 40} Q40 ${shY - 10} 20 ${shY - 20}`} stroke={OL} strokeWidth={5} fill="none" />
              <rect x={-110} y={-230} width={220} height={18} rx={9} fill={shirtShade} stroke={OL} strokeWidth={4} />
            </g>
          ) : null}
          {!front ? arm(-1, L, holdingL) : null}
          {!front ? arm(1, R, holding) : null}
          {/* head */}
          <g transform={`translate(0 ${headBob}) rotate(${headTilt} 0 ${shY})`}>
            {hair === "hijab" ? (
              // drape behind and over the shoulders
              <path d={`M-160 ${headY + 20} Q-170 ${headY - 175} 0 ${headY - 178} Q170 ${headY - 175} 160 ${headY + 20} Q176 ${shY + 30} 132 ${shY + 70} Q0 ${shY + 110} -132 ${shY + 70} Q-176 ${shY + 30} -160 ${headY + 20} Z`} fill={hijab} stroke={OL} strokeWidth={OW} strokeLinejoin="round" />
            ) : null}
            {hair === "bob" ? <path d={`M-150 ${headY + 70} Q-170 ${headY - 160} 0 ${headY - 166} Q170 ${headY - 160} 150 ${headY + 70} Z`} fill={hairColor} stroke={OL} strokeWidth={OW} /> : null}
            {hair !== "hijab" ? (
              <>
                <rect x={-26} y={shY - 46} width={52} height={60} rx={16} fill={skin} stroke={OL} strokeWidth={5} />
                <ellipse cx={-128} cy={headY + 16} rx={20} ry={26} fill={skin} stroke={OL} strokeWidth={5} />
                <ellipse cx={128} cy={headY + 16} rx={20} ry={26} fill={skin} stroke={OL} strokeWidth={5} />
              </>
            ) : null}
            {/* face */}
            <ellipse cx={0} cy={headY + 4} rx={hair === "hijab" ? 120 : 132} ry={hair === "hijab" ? 128 : 140} fill={skin} stroke={OL} strokeWidth={OW} />
            {hair === "hijab" ? (
              <g>
                {/* front band and pleats */}
                <path d={`M-128 ${headY - 6} Q-130 ${headY - 150} 0 ${headY - 152} Q130 ${headY - 150} 128 ${headY - 6} Q100 ${headY - 92} 0 ${headY - 96} Q-100 ${headY - 92} -128 ${headY - 6} Z`} fill={hijab} stroke={OL} strokeWidth={OW} strokeLinejoin="round" />
                <path d={`M-70 ${headY - 132} Q-40 ${headY - 112} -30 ${headY - 96} M60 ${headY - 136} Q50 ${headY - 116} 40 ${headY - 96}`} stroke={hijabShade} strokeWidth={6} fill="none" strokeLinecap="round" />
                <path d={`M-118 ${headY + 60} Q-110 ${headY + 140} 0 ${headY + 150} Q110 ${headY + 140} 118 ${headY + 60}`} stroke={OL} strokeWidth={OW} fill="none" />
                <path d={`M-120 ${headY + 64} Q-150 ${headY + 140} -90 ${shY + 40}`} stroke={hijabShade} strokeWidth={8} fill="none" strokeLinecap="round" />
                <circle cx={96} cy={headY + 112} r={11} fill="#F5C543" stroke={OL} strokeWidth={4} />
              </g>
            ) : null}
            {hair === "short" ? (
              <path
                d={`M-138 ${headY + 10} Q-150 ${headY - 150} 0 ${headY - 150} Q150 ${headY - 150} 138 ${headY + 10} Q120 ${headY - 50} 70 ${headY - 70} Q30 ${headY - 40} -20 ${headY - 72} Q-70 ${headY - 50} -110 ${headY - 60} Q-130 ${headY - 20} -138 ${headY + 10} Z`}
                fill={hairColor}
                stroke={OL}
                strokeWidth={OW}
                strokeLinejoin="round"
              />
            ) : null}
            {hair === "bob" ? <path d={`M-136 ${headY + 20} Q-140 ${headY - 140} 0 ${headY - 144} Q140 ${headY - 140} 136 ${headY + 20} Q100 ${headY - 70} 0 ${headY - 76} Q-100 ${headY - 70} -136 ${headY + 20} Z`} fill={hairColor} stroke={OL} strokeWidth={OW} /> : null}
            {hat === "chef" ? (
              <g>
                {[-78, 0, 78].map((hx, i) => (
                  <circle key={hx} cx={hx} cy={headY - 210 - (i === 1 ? 34 : 0)} r={i === 1 ? 72 : 60} fill="#fff" stroke={OL} strokeWidth={OW} />
                ))}
                <rect x={-120} y={headY - 196} width={240} height={70} rx={16} fill="#fff" stroke={OL} strokeWidth={OW} />
                <path d={`M-60 ${headY - 186} L-60 ${headY - 136} M0 ${headY - 186} L0 ${headY - 136} M60 ${headY - 186} L60 ${headY - 136}`} stroke="#DCE4F0" strokeWidth={8} strokeLinecap="round" />
              </g>
            ) : null}
            <g transform={`translate(0 ${headY})`}>
              <Face mood={mood} blink={blink} level={level} lx={lx} ly={ly} iris={iris} lash={lash} />
            </g>
          </g>
          {front ? arm(-1, L, holdingL) : null}
          {front ? arm(1, R, holding) : null}
        </g>
      </g>
    </g>
  );
};
