import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { wave } from "./anim";
import { OL } from "./Chibi";

export type LeaPose = "idle" | "wave" | "present" | "point" | "cheer" | "highfive";
type Keys<T> = [number, T][];

// [left, right] shoulder angles in degrees from hanging (+ = raised outward).
const ARMS: Record<LeaPose, [number, number]> = {
  idle: [20, 20],
  wave: [20, 150],
  present: [20, 70],
  point: [30, 95],
  cheer: [150, 150],
  highfive: [20, 165],
};

const keyed = <T,>(keys: Keys<T>, f: number) => {
  let prev = keys[0][1];
  let cur = keys[0][1];
  let t = 1;
  for (let i = 0; i < keys.length; i++) {
    if (f >= keys[i][0]) {
      prev = i > 0 ? keys[i - 1][1] : keys[i][1];
      cur = keys[i][1];
      t = i > 0 ? Math.min(1, (f - keys[i][0]) / 8) : 1;
    }
  }
  return { prev, cur, t: Easing.bezier(0.34, 1.45, 0.64, 1)(Math.max(0, t)) };
};

const GOLD = "#FFC93C";
const GOLD_D = "#E8A317";
const BLUE = "#1A56D6";

/**
 * Lea, the LegalEase guide: a round, glossy yellow document folder with big
 * eyes, rosy cheeks, little arms and legs. Feet at (x, y).
 * `mouth` = per-frame loudness for lip sync; `open` (0..1) opens the folder.
 */
export const Lea: React.FC<{
  x: number;
  y: number;
  scale?: number;
  facing?: 1 | -1;
  poses?: Keys<LeaPose>;
  enter?: { from: number; start?: number; dur?: number };
  jumps?: number[];
  mouth?: number[];
  open?: number;
  happy?: boolean;
  look?: [number, number];
  holding?: React.ReactNode;
}> = ({ x, y, scale = 1, facing = 1, poses = [[0, "idle"]], enter, jumps = [], mouth, open = 0, happy = true, look = [0, 0], holding }) => {
  const f = useCurrentFrame();
  const eStart = enter?.start ?? 0;
  const eDur = enter?.dur ?? 20;
  const et = enter ? interpolate(f, [eStart, eStart + eDur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 1;
  const px = enter ? interpolate(Easing.out(Easing.quad)(et), [0, 1], [enter.from, x]) : x;
  const arc = enter && et < 1 ? Math.abs(Math.sin(et * Math.PI * 2)) * 180 : 0;
  const spin = enter && et < 1 ? (1 - et) * 360 : 0;

  let up = arc;
  let sq = 1;
  for (const j of jumps) {
    const d = f - j;
    if (d >= -4 && d < 0) sq *= 1 - 0.12 * ((d + 4) / 4);
    else if (d >= 0 && d < 14) {
      const t = d / 14;
      up = Math.max(up, Math.sin(t * Math.PI) * 100);
      sq *= 1 + 0.1 * Math.sin(t * Math.PI);
    } else if (d >= 14 && d < 22) sq *= 1 - 0.14 * Math.sin(((d - 14) / 8) * Math.PI);
  }
  const bob = Math.abs(wave(f, 36, 10));
  const breathe = wave(f, 44, 0.025);

  const pk = keyed(poses, f);
  const A = ARMS[pk.prev];
  const B = ARMS[pk.cur];
  let aL = A[0] + (B[0] - A[0]) * pk.t;
  let aR = A[1] + (B[1] - A[1]) * pk.t;
  if (pk.cur === "wave") aR += wave(f, 12, 24);
  if (pk.cur === "cheer") {
    aL += wave(f, 10, 16);
    aR += wave(f, 10, 16, 5);
  }
  if (pk.cur === "idle" || pk.cur === "present" || pk.cur === "point") {
    aL += wave(f, 60, 6);
    aR += wave(f, 60, 6, 15);
  }

  const cyc = (f + 31) % 90;
  const blink = cyc < 5 ? Math.abs(cyc - 2.5) / 2.5 : 1;
  const level = mouth ? mouth[Math.min(mouth.length - 1, Math.max(0, f))] ?? 0 : 0;
  const tilt = wave(f, 80, 5) + level * wave(f, 8, 4);
  const lx = look[0] + wave(f, 120, 0.2);

  const arm = (side: -1 | 1, a: number, child?: React.ReactNode) => {
    const sx = side * 128;
    const sy = -250;
    const rad = (a * Math.PI) / 180;
    const hx = sx + side * Math.sin(rad) * 120;
    const hy = sy + Math.cos(rad) * 120;
    return (
      <g>
        <line x1={sx} y1={sy} x2={hx} y2={hy} stroke={OL} strokeWidth={22} strokeLinecap="round" />
        <line x1={sx} y1={sy} x2={hx} y2={hy} stroke={BLUE} strokeWidth={10} strokeLinecap="round" />
        <g transform={`translate(${hx} ${hy})`}>
          <circle r={26} fill="#fff" stroke={OL} strokeWidth={6} />
          <path d="M-8 -14 q-4 8 0 16" stroke={OL} strokeWidth={4} fill="none" strokeLinecap="round" />
          {child}
        </g>
      </g>
    );
  };

  return (
    <g transform={`translate(${px} ${y}) scale(${scale * facing} ${scale})`}>
      <ellipse cx={0} cy={0} rx={120 - (up + bob) * 0.4} ry={18} fill="rgba(42,30,59,0.16)" />
      <g transform={`translate(0 ${-up - bob}) scale(${2 - sq} ${sq}) rotate(${tilt + spin} 0 -230)`}>
        {[-46, 46].map((lx2) => (
          <g key={lx2}>
            <line x1={lx2} y1={-96} x2={lx2} y2={-24} stroke={OL} strokeWidth={22} strokeLinecap="round" />
            <line x1={lx2} y1={-96} x2={lx2} y2={-24} stroke={BLUE} strokeWidth={10} strokeLinecap="round" />
            <ellipse cx={lx2 + 12 * Math.sign(lx2)} cy={-16} rx={34} ry={18} fill={BLUE} stroke={OL} strokeWidth={6} />
          </g>
        ))}
        <g transform={`translate(0 -90) scale(${1 + breathe} ${1 - breathe})`}>
          <path
            d="M-140 -310 Q-140 -330 -120 -330 L-40 -330 L-20 -356 L60 -356 Q72 -356 76 -344 L84 -330 L120 -330 Q140 -330 140 -310 L140 -20 Q140 0 120 0 L-120 0 Q-140 0 -140 -20 Z"
            fill={GOLD_D}
            stroke={OL}
            strokeWidth={7}
            strokeLinejoin="round"
          />
          <g transform={`translate(0 ${-open * 90})`}>
            <rect x={-110} y={-344} width={210} height={250} rx={12} fill="#fff" stroke={OL} strokeWidth={5} transform="rotate(-4 0 -220)" />
            <rect x={-96} y={-336} width={200} height={250} rx={12} fill="#F4F7FF" stroke={OL} strokeWidth={5} transform="rotate(5 0 -220)" />
            <rect x={-60} y={-312} width={110} height={12} rx={6} fill="#C9D7EA" />
            <rect x={-60} y={-288} width={80} height={12} rx={6} fill="#C9D7EA" />
          </g>
          <g transform={`scale(1 ${1 - open * 0.82})`}>
            <rect x={-146} y={-292} width={292} height={292} rx={36} fill={GOLD} stroke={OL} strokeWidth={7} />
            <path d="M-120 -270 Q-120 -282 -100 -282 L80 -282" stroke="#FFE38A" strokeWidth={14} strokeLinecap="round" fill="none" />
            <ellipse cx={-108} cy={-60} rx={14} ry={30} fill="#FFE38A" opacity={0.8} />
          </g>
          <g transform={`translate(0 ${-150 - open * 140}) scale(${1 - open * 0.25})`}>
            {[-50, 50].map((ex) => (
              <g key={ex} transform={`translate(${ex + lx * 6} ${-6 + look[1] * 5}) scale(1 ${Math.max(0.08, blink)})`}>
                <ellipse rx={19} ry={25} fill={OL} />
                <circle cx={-6} cy={-10} r={7.5} fill="#fff" />
                <circle cx={7} cy={8} r={3.5} fill="#fff" />
              </g>
            ))}
            <ellipse cx={-96} cy={44} rx={22} ry={12} fill="#FF8FA3" opacity={0.6} />
            <ellipse cx={96} cy={44} rx={22} ry={12} fill="#FF8FA3" opacity={0.6} />
            {level > 0.08 ? (
              <g transform="translate(0 56)">
                <path
                  d={`M-24 -6 Q0 -10 24 -6 Q22 ${8 + level * 30} 0 ${12 + level * 30} Q-22 ${8 + level * 30} -24 -6 Z`}
                  fill="#7A1F2B"
                  stroke={OL}
                  strokeWidth={5}
                  strokeLinejoin="round"
                />
                <ellipse cx={0} cy={4 + level * 24} rx={11} ry={5} fill="#F07A8A" />
              </g>
            ) : happy ? (
              <path d="M-28 46 Q0 78 28 46 Z" fill="#7A1F2B" stroke={OL} strokeWidth={5} strokeLinejoin="round" />
            ) : (
              <path d="M-18 60 Q0 52 18 60" stroke={OL} strokeWidth={7} fill="none" strokeLinecap="round" />
            )}
          </g>
          {open < 0.3 ? (
            <g transform="translate(92 -40)">
              <circle r={26} fill={BLUE} stroke={OL} strokeWidth={5} />
              <path d="M-11 0 L-3 9 L12 -8" stroke="#fff" strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          ) : null}
        </g>
        {arm(-1, aL)}
        {arm(1, aR, holding)}
      </g>
    </g>
  );
};
