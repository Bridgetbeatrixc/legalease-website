import React from "react";
import { useCurrentFrame } from "remotion";
import { C, HAIR, SKIN } from "../theme";
import { wave } from "./anim";

export type Mood = "happy" | "neutral" | "sad" | "shock" | "think" | "worried";
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
  | "hold";
export type Hair = "short" | "long" | "hijab" | "bun" | "curly";

export type PersonProps = {
  /** Feet position in the 1080×1920 scene. */
  x: number;
  y: number;
  scale?: number;
  facing?: 1 | -1;
  mood?: Mood;
  pose?: Pose;
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
};

// Arm angles: a1 swings the upper arm outward from hanging, a2 bends the
// forearm inward (negative = outward). Degrees.
const POSES: Record<Pose, { L: [number, number]; R: [number, number] }> = {
  idle: { L: [8, 6], R: [8, 6] },
  wave: { L: [8, 6], R: [150, 25] },
  armsUp: { L: [150, 10], R: [150, 10] },
  stir: { L: [10, 8], R: [28, 75] },
  phone: { L: [8, 6], R: [18, 128] },
  point: { L: [8, 6], R: [88, 0] },
  shrug: { L: [42, -95], R: [42, -95] },
  handsHead: { L: [150, -80], R: [150, -80] },
  present: { L: [8, 6], R: [32, -62] },
  hold: { L: [22, 95], R: [22, 95] },
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

const Face: React.FC<{ mood: Mood; blink: number; talk: boolean; frame: number }> = ({ mood, blink, talk, frame }) => {
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
  }[mood];
  const mouthOpen = talk ? Math.abs(Math.sin(frame / 2.6)) : 0;
  let mouth: React.ReactNode;
  if (mood === "shock") {
    mouth = <ellipse cx={200} cy={234} rx={12} ry={16} fill={C.ink} />;
  } else if (talk && mood !== "sad") {
    mouth = <ellipse cx={200} cy={230} rx={14} ry={3 + mouthOpen * 9} fill={C.ink} />;
  } else if (mood === "happy") {
    mouth = <path d="M180 222 Q200 248 220 222 Z" fill={C.ink} />;
  } else if (mood === "sad" || mood === "worried") {
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
      <g transform={`translate(0 ${brow[2]})`}>
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

export const Person: React.FC<PersonProps> = ({
  x,
  y,
  scale = 1,
  facing = 1,
  mood = "neutral",
  pose = "idle",
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
}) => {
  const frame = useCurrentFrame();
  const f = frame + seed * 37;
  const breathe = wave(f, 70, 4);
  const sway = wave(f, 95, 1.6);
  const cyc = (f + 20) % 110;
  const blink = cyc < 4 ? Math.abs(cyc - 2) / 2 : 1;
  const p = POSES[pose];
  // Small idle motion on top of the pose.
  const wob = pose === "wave" ? wave(f, 16, 18) : pose === "stir" ? wave(f, 22, 18) : wave(f, 80, 3);
  const bob = pose === "armsUp" ? Math.abs(wave(f, 24, 14)) : 0;
  const forearm = sleeves === "long" ? shirt : skin;
  const neckShow = hair !== "hijab";

  return (
    <g transform={`translate(${x} ${y}) scale(${scale * facing} ${scale}) translate(-200 -800)`}>
      <ellipse cx={200} cy={798} rx={130} ry={18} fill={C.shadow} />
      <g transform={`translate(0 ${-bob})`}>
        {/* legs */}
        {outfit === "pants" ? (
          <>
            <rect x={142} y={540} width={52} height={236} rx={24} fill={pants} />
            <rect x={206} y={540} width={52} height={236} rx={24} fill={pants} />
          </>
        ) : (
          <>
            <rect x={160} y={600} width={30} height={176} rx={14} fill={skin} />
            <rect x={210} y={600} width={30} height={176} rx={14} fill={skin} />
          </>
        )}
        <ellipse cx={164} cy={780} rx={40} ry={18} fill={C.ink} />
        <ellipse cx={236} cy={780} rx={40} ry={18} fill={C.ink} />
        <g transform={`translate(0 ${breathe * 0.5}) rotate(${sway} 200 560)`}>
          {/* back arm first */}
          <Arm side="L" a1={p.L[0] + (pose === "idle" ? wob : 0)} a2={p.L[1]} sleeve={shirt} forearm={forearm} skin={skin} />
          {/* torso */}
          {outfit === "pants" ? (
            <path d="M142 298 Q116 300 116 334 L126 566 L274 566 L284 334 Q284 300 258 298 Z" fill={shirt} />
          ) : (
            <path d="M142 298 Q116 300 116 334 L96 640 L304 640 L284 334 Q284 300 258 298 Z" fill={shirt} />
          )}
          <path d="M170 298 L200 340 L230 298 Z" fill="rgba(255,255,255,0.35)" />
          {/* head */}
          <g transform={`translate(0 ${breathe * 0.3}) rotate(${wave(f, 120, 2.5)} 200 270)`}>
            <HairBack hair={hair} color={hairColor} hijab={hijabColor} />
            {neckShow ? <rect x={182} y={246} width={36} height={60} rx={12} fill={skin} /> : null}
            {hair !== "hijab" ? (
              <>
                <ellipse cx={126} cy={200} rx={12} ry={18} fill={skin} />
                <ellipse cx={274} cy={200} rx={12} ry={18} fill={skin} />
              </>
            ) : null}
            <circle cx={200} cy={192} r={hair === "hijab" ? 66 : 72} fill={skin} />
            <HairFront hair={hair} color={hairColor} hijab={hijabColor} />
            <Face mood={mood} blink={blink} talk={talk} frame={f} />
          </g>
          <Arm
            side="R"
            a1={p.R[0] + (pose === "wave" || pose === "stir" ? wob : pose === "idle" ? -wob : 0)}
            a2={p.R[1] + (pose === "stir" ? wave(f, 22, 10, 6) : 0)}
            sleeve={shirt}
            forearm={forearm}
            skin={skin}
            holding={holding}
          />
        </g>
      </g>
    </g>
  );
};
