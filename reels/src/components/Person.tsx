import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { C, HAIR, SKIN } from "../theme";
import { wave } from "./anim";

export type Mood = "happy" | "neutral" | "sad" | "shock" | "think" | "worried" | "angry";
export type Pose =
  | "idle"
  | "wave"
  | "armsUp"
  | "stir"
  | "phone"
  | "point"
  | "shrug"
  | "handsHead"
  | "present"
  | "hold"
  | "chin"
  | "cross"
  | "slump"
  | "fist"
  | "walk";
export type Hair = "short" | "long" | "hijab" | "bun" | "curly";

/** [frame, value]: from that frame on, the person blends into the value. */
export type Keys<T> = [number, T][];

export type PersonProps = {
  /** Feet position in the 1080×1920 scene (where the person ends up). */
  x: number;
  y: number;
  scale?: number;
  facing?: 1 | -1;
  mood?: Mood;
  pose?: Pose;
  /** Pose / mood changes over time. Overrides pose / mood. */
  poses?: Keys<Pose>;
  moods?: Keys<Mood>;
  /** Walk in from x = from, starting at frame start, for dur frames. */
  walk?: { from: number; start?: number; dur?: number };
  /** Frames at which the person does a little reaction hop. */
  jumps?: number[];
  /** Frames at which the person flinches backwards (shock). */
  flinch?: number[];
  /** Body lean in degrees (positive = toward facing direction). */
  lean?: number;
  hair?: Hair;
  hairColor?: string;
  hijabColor?: string;
  skin?: string;
  shirt?: string;
  pants?: string;
  outfit?: "pants" | "dress";
  sleeves?: "short" | "long";
  /** Something drawn in the right hand (local coords, hand at 0,0). */
  holding?: React.ReactNode;
  /** Offsets the idle loops so two people don't move in sync. */
  seed?: number;
  talk?: boolean;
  /** Apron colour drawn over the outfit. */
  apron?: string;
};

// Arm angles: a1 swings the upper arm outward from hanging, a2 bends the
// forearm inward (negative = outward). Degrees.
const POSES: Record<Pose, { L: [number, number]; R: [number, number] }> = {
  idle: { L: [8, 6], R: [8, 6] },
  walk: { L: [8, 10], R: [8, 10] },
  wave: { L: [8, 6], R: [150, 25] },
  armsUp: { L: [150, 10], R: [150, 10] },
  stir: { L: [10, 8], R: [28, 75] },
  phone: { L: [8, 6], R: [18, 128] },
  point: { L: [8, 6], R: [88, 0] },
  shrug: { L: [42, -95], R: [42, -95] },
  handsHead: { L: [150, -80], R: [150, -80] },
  present: { L: [8, 6], R: [32, -62] },
  hold: { L: [22, 95], R: [22, 95] },
  chin: { L: [12, 110], R: [16, 142] },
  cross: { L: [14, 118], R: [14, 118] },
  slump: { L: [3, 0], R: [3, 0] },
  fist: { L: [8, 6], R: [40, 150] },
};

const BLEND = 9;
const ease = Easing.bezier(0.34, 1.4, 0.64, 1);

/** Value at frame f for keyed changes, with the blend factor into it. */
const keyed = <T,>(keys: Keys<T>, f: number) => {
  let prev = keys[0][1];
  let cur = keys[0][1];
  let t = 1;
  for (let i = 0; i < keys.length; i++) {
    if (f >= keys[i][0]) {
      prev = i > 0 ? keys[i - 1][1] : keys[i][1];
      cur = keys[i][1];
      t = i > 0 ? Math.min(1, (f - keys[i][0]) / BLEND) : 1;
    }
  }
  return { prev, cur, t: ease(Math.max(0, t)) };
};

const UPPER = 118;
const FORE = 104;

const Arm: React.FC<{
  side: "L" | "R";
  a1: number;
  a2: number;
  sleeve: string;
  forearm: string;
  skin: string;
  holding?: React.ReactNode;
}> = ({ side, a1, a2, sleeve, forearm, skin, holding }) => {
  const s = side === "L" ? 1 : -1;
  const x = side === "L" ? 134 : 266;
  const y = 324;
  const total = (a1 - a2) * s;
  return (
    <g transform={`rotate(${a1 * s} ${x} ${y})`}>
      <line x1={x} y1={y} x2={x} y2={y + UPPER} stroke={sleeve} strokeWidth={38} strokeLinecap="round" />
      <g transform={`rotate(${-a2 * s} ${x} ${y + UPPER})`}>
        <line x1={x} y1={y + UPPER} x2={x} y2={y + UPPER + FORE} stroke={forearm} strokeWidth={30} strokeLinecap="round" />
        <circle cx={x} cy={y + UPPER + FORE + 10} r={19} fill={skin} />
        {holding ? (
          <g transform={`translate(${x} ${y + UPPER + FORE + 10}) rotate(${-total})`}>{holding}</g>
        ) : null}
      </g>
    </g>
  );
};

const Face: React.FC<{ mood: Mood; blink: number; talk: boolean; frame: number; brow?: number }> = ({ mood, blink, talk, frame, brow: blip = 0 }) => {
  const eyeRy = (mood === "shock" ? 13 : 10) * blink;
  const eyeRx = mood === "shock" ? 10 : 8;
  const lookY = mood === "think" ? -6 : 0;
  const lookX = mood === "think" ? 6 : 0;
  const brow = {
    happy: [-4, 4, 0],
    neutral: [0, 0, 0],
    sad: [16, -16, 2],
    worried: [14, -14, 0],
    shock: [-6, 6, -10],
    think: [0, -14, -4],
    angry: [-18, 18, 4],
  }[mood];
  const mouthOpen = talk ? Math.abs(Math.sin(frame / 2.6)) : 0;
  let mouth: React.ReactNode;
  if (mood === "shock") {
    mouth = <ellipse cx={200} cy={234} rx={12} ry={16} fill={C.ink} />;
  } else if (talk && mood !== "sad") {
    mouth = <ellipse cx={200} cy={230} rx={14} ry={3 + mouthOpen * 9} fill={C.ink} />;
  } else if (mood === "happy") {
    mouth = <path d="M180 222 Q200 248 220 222 Z" fill={C.ink} />;
  } else if (mood === "sad" || mood === "worried" || mood === "angry") {
    mouth = <path d="M184 238 Q200 224 216 238" stroke={C.ink} strokeWidth={6} fill="none" strokeLinecap="round" />;
  } else if (mood === "think") {
    mouth = <path d="M188 234 L214 228" stroke={C.ink} strokeWidth={6} fill="none" strokeLinecap="round" />;
  } else {
    mouth = <path d="M186 228 Q200 238 214 228" stroke={C.ink} strokeWidth={6} fill="none" strokeLinecap="round" />;
  }
  return (
    <g>
      <g transform={`translate(${lookX} ${lookY})`}>
        <ellipse cx={174} cy={196} rx={eyeRx} ry={Math.max(eyeRy, 1.5)} fill={C.ink} />
        <ellipse cx={226} cy={196} rx={eyeRx} ry={Math.max(eyeRy, 1.5)} fill={C.ink} />
        {blink > 0.6 ? (
          <>
            <circle cx={177} cy={192} r={2.6} fill="#fff" />
            <circle cx={229} cy={192} r={2.6} fill="#fff" />
          </>
        ) : null}
      </g>
      <g transform={`translate(0 ${brow[2] + blip})`}>
        <line x1={162} y1={172} x2={186} y2={172} stroke={C.ink} strokeWidth={6} strokeLinecap="round" transform={`rotate(${brow[0]} 174 172)`} />
        <line x1={214} y1={172} x2={238} y2={172} stroke={C.ink} strokeWidth={6} strokeLinecap="round" transform={`rotate(${brow[1]} 226 172)`} />
      </g>
      <path d="M198 204 Q192 214 200 216" stroke="rgba(0,0,0,0.25)" strokeWidth={4} fill="none" strokeLinecap="round" />
      <circle cx={158} cy={220} r={12} fill="#F28C8C" opacity={0.35} />
      <circle cx={242} cy={220} r={12} fill="#F28C8C" opacity={0.35} />
      {mouth}
      {mood === "worried" || mood === "shock" ? (
        <path d="M262 150 Q272 168 262 176 Q252 168 262 150 Z" fill="#8FD0FF" stroke="#4BA3E3" strokeWidth={2} />
      ) : null}
    </g>
  );
};

const HairBack: React.FC<{ hair: Hair; color: string; hijab: string }> = ({ hair, color, hijab }) => {
  if (hair === "long") return <path d="M124 190 Q124 112 200 110 Q276 112 276 190 L284 340 Q200 360 116 340 Z" fill={color} />;
  if (hair === "hijab")
    return <path d="M106 210 Q106 104 200 102 Q294 104 294 210 Q300 300 318 352 Q200 392 82 352 Q100 300 106 210 Z" fill={hijab} />;
  if (hair === "bun") return <circle cx={200} cy={104} r={34} fill={color} />;
  return null;
};

const HairFront: React.FC<{ hair: Hair; color: string; hijab: string }> = ({ hair, color, hijab }) => {
  switch (hair) {
    case "short":
      return <path d="M126 196 Q118 112 200 108 Q284 110 274 196 Q268 160 244 150 Q214 164 176 150 Q140 156 126 196 Z" fill={color} />;
    case "curly":
      return (
        <g fill={color}>
          {[130, 150, 172, 196, 220, 244, 268].map((cx, i) => (
            <circle key={i} cx={cx} cy={140 - Math.sin((i / 6) * Math.PI) * 26} r={26} />
          ))}
          <circle cx={128} cy={176} r={18} />
          <circle cx={272} cy={176} r={18} />
        </g>
      );
    case "long":
      return <path d="M128 200 Q124 116 200 114 Q276 116 272 200 Q262 150 220 142 Q196 166 150 160 Q134 170 128 200 Z" fill={color} />;
    case "bun":
      return <path d="M128 192 Q124 116 200 114 Q276 116 272 192 Q262 150 200 144 Q140 150 128 192 Z" fill={color} />;
    case "hijab":
      return <path d="M134 176 Q140 120 200 118 Q260 120 266 176 Q240 140 200 140 Q160 140 134 176 Z" fill={hijab} opacity={0.9} />;
  }
};

const hop = (f: number, at: number) => {
  // anticipation squash, jump, landing squash
  const d = f - at;
  if (d < -4 || d > 22) return { up: 0, sq: 1 };
  if (d < 0) return { up: 0, sq: 1 - 0.08 * ((d + 4) / 4) };
  if (d < 14) {
    const t = d / 14;
    return { up: Math.sin(t * Math.PI) * 70, sq: 1 + 0.08 * Math.sin(t * Math.PI) };
  }
  const t = (d - 14) / 8;
  return { up: 0, sq: 1 - 0.1 * Math.sin(t * Math.PI) };
};

export const Person: React.FC<PersonProps> = ({
  x,
  y,
  scale = 1,
  facing = 1,
  mood = "neutral",
  pose = "idle",
  poses,
  moods,
  walk,
  jumps = [],
  flinch = [],
  lean = 0,
  hair = "short",
  hairColor = HAIR.black,
  hijabColor = C.cobalt,
  skin = SKIN.tan,
  shirt = C.cobalt,
  pants = C.navy,
  outfit = "pants",
  sleeves = "short",
  holding,
  seed = 0,
  talk = false,
  apron,
}) => {
  const frame = useCurrentFrame();
  const f = frame + seed * 37;

  // walking
  const wStart = walk?.start ?? 0;
  const wDur = walk?.dur ?? 24;
  const wT = walk ? interpolate(frame, [wStart, wStart + wDur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 1;
  const walking = walk ? wT > 0 && wT < 1 : false;
  const px = walk ? interpolate(Easing.out(Easing.quad)(wT), [0, 1], [walk.from, x]) : x;
  const step = walking ? Math.sin(frame / 2.4) : 0;
  const stepBob = walking ? Math.abs(Math.sin(frame / 2.4)) * 16 : 0;

  // pose / mood keyframes
  const pk = keyed(poses ?? [[0, pose]], frame);
  const curPose: Pose = walking ? "walk" : pk.cur;
  const prevPose: Pose = walking ? "walk" : pk.prev;
  const pt = walking ? 1 : pk.t;
  const mk = keyed(moods ?? [[0, mood]], frame);
  const curMood = mk.cur;

  // reactions
  let up = 0;
  let sq = 1;
  for (const j of jumps) {
    const h = hop(frame, j);
    up = Math.max(up, h.up);
    sq *= h.sq;
  }
  let back = 0;
  for (const fl of flinch) {
    const d = frame - fl;
    if (d >= 0 && d < 18) back += Math.sin((d / 18) * Math.PI) * -9 * (1 - d / 18) * 2;
  }
  const slumped = curPose === "slump" ? pt : prevPose === "slump" ? 1 - pt : 0;

  const breathe = wave(f, 60, 5);
  const sway = wave(f, 85, 2.4) + (walking ? step * 3 : 0);
  const cyc = (f + 20) % 96;
  const blink = cyc < 4 ? Math.abs(cyc - 2) / 2 : 1;
  const browBlip = cyc > 40 && cyc < 52 ? Math.sin(((cyc - 40) / 12) * Math.PI) * -5 : 0;

  const A = POSES[prevPose];
  const B = POSES[curPose];
  const mix = (a: number, b: number) => a + (b - a) * pt;
  const L: [number, number] = [mix(A.L[0], B.L[0]), mix(A.L[1], B.L[1])];
  const R: [number, number] = [mix(A.R[0], B.R[0]), mix(A.R[1], B.R[1])];
  // secondary motion on top of the pose
  const live = (a: number, period: number, amp: number, ph = 0) => a + wave(f, period, amp, ph);
  if (curPose === "wave") R[0] = live(R[0], 16, 18);
  if (curPose === "stir") {
    R[0] = live(R[0], 22, 18);
    R[1] = live(R[1], 22, 10, 6);
  }
  if (curPose === "armsUp") {
    L[0] = live(L[0], 14, 12);
    R[0] = live(R[0], 14, 12, 7);
  }
  if (curPose === "handsHead") {
    L[0] = live(L[0], 10, 4);
    R[0] = live(R[0], 10, 4, 5);
  }
  if (curPose === "point" || curPose === "present" || curPose === "fist") R[0] = live(R[0], 40, 4);
  if (curPose === "idle" || curPose === "slump" || curPose === "cross") {
    L[0] = live(L[0], 80, 3);
    R[0] = live(R[0], 80, 3, 20);
  }
  if (walking) {
    L[0] = 8 + step * 26;
    R[0] = 8 - step * 26;
  }
  const bounce = curPose === "armsUp" ? Math.abs(wave(f, 14, 18)) : 0;
  const forearm = sleeves === "long" ? shirt : skin;
  const neckShow = hair !== "hijab";
  const headTilt = wave(f, 110, 4) + (curMood === "think" ? 8 : 0) + slumped * 12 + (curMood === "happy" ? wave(f, 30, 3) : 0);
  const headDrop = slumped * 26;
  const leg = (side: number) => (walking ? step * 22 * side : 0);

  return (
    <g transform={`translate(${px} ${y}) scale(${scale * facing} ${scale}) translate(-200 -800)`}>
      <ellipse cx={200} cy={798} rx={130 - up * 0.6} ry={18 - up * 0.08} fill={C.shadow} />
      <g transform={`translate(200 800) scale(${2 - sq} ${sq}) translate(-200 -800) translate(0 ${-bounce - up - stepBob})`}>
        {/* legs */}
        {[
          [168, 1],
          [232, -1],
        ].map(([hx, side]) => (
          <g key={hx} transform={`rotate(${leg(side)} ${hx} 560)`}>
            {outfit === "pants" ? (
              <rect x={hx - 26} y={540} width={52} height={236} rx={24} fill={pants} />
            ) : (
              <rect x={hx - 15} y={600} width={30} height={176} rx={14} fill={skin} />
            )}
            <ellipse cx={hx - 4 * side} cy={780} rx={40} ry={18} fill={C.ink} />
          </g>
        ))}
        <g transform={`translate(0 ${breathe * 0.6 + slumped * 14}) rotate(${sway + lean + back} 200 560)`}>
          <Arm side="L" a1={L[0]} a2={L[1]} sleeve={shirt} forearm={forearm} skin={skin} />
          {outfit === "pants" ? (
            <path d="M142 298 Q116 300 116 334 L126 566 L274 566 L284 334 Q284 300 258 298 Z" fill={shirt} />
          ) : (
            <path d="M142 298 Q116 300 116 334 L96 640 L304 640 L284 334 Q284 300 258 298 Z" fill={shirt} />
          )}
          <path d="M170 298 L200 340 L230 298 Z" fill="rgba(255,255,255,0.35)" />
          {apron ? (
            <g>
              <path d="M160 350 L240 350 L262 600 Q200 616 138 600 Z" fill={apron} />
              <rect x={150} y={420} width={100} height={14} rx={7} fill="rgba(16,31,62,0.12)" />
              <path d="M160 350 L176 304 M240 350 L224 304" stroke={apron} strokeWidth={8} strokeLinecap="round" />
            </g>
          ) : null}
          {/* soft shading on the torso */}
          <path d="M240 300 Q284 300 284 334 L274 566 L236 566 Z" fill="rgba(0,0,0,0.08)" />
          <g transform={`translate(0 ${breathe * 0.4 + headDrop}) rotate(${headTilt} 200 270)`}>
            <HairBack hair={hair} color={hairColor} hijab={hijabColor} />
            {neckShow ? <rect x={182} y={246} width={36} height={60} rx={12} fill={skin} /> : null}
            {hair !== "hijab" ? (
              <>
                <ellipse cx={126} cy={200} rx={12} ry={18} fill={skin} />
                <ellipse cx={274} cy={200} rx={12} ry={18} fill={skin} />
              </>
            ) : null}
            <circle cx={200} cy={192} r={hair === "hijab" ? 66 : 72} fill={skin} />
            <path d="M236 132 Q276 160 268 220 Q254 258 214 262 Q262 230 236 132 Z" fill="rgba(0,0,0,0.06)" />
            <HairFront hair={hair} color={hairColor} hijab={hijabColor} />
            <g transform={`translate(0 ${browBlip * 0.2})`}>
              <Face mood={curMood} blink={blink} talk={talk} frame={f} brow={browBlip} />
            </g>
          </g>
          <Arm side="R" a1={R[0]} a2={R[1]} sleeve={shirt} forearm={forearm} skin={skin} holding={holding} />
        </g>
      </g>
    </g>
  );
};
