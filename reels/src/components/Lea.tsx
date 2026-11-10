import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { wave } from "./anim";

export type LeaPose = "idle" | "wave" | "present" | "point" | "cheer";
type Keys<T> = [number, T][];

// Arm angles in degrees from hanging down (positive = raised outward).
const ARMS: Record<LeaPose, [number, number]> = {
  idle: [20, 20],
  wave: [20, 150],
  present: [20, 80],
  point: [30, 100],
  cheer: [150, 150],
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
  return { prev, cur, t: Easing.bezier(0.34, 1.4, 0.64, 1)(Math.max(0, t)) };
};

/**
 * Lea, the LegalEase guide: a yellow document folder with eyes, little arms
 * and legs. Feet at (x, y). `mouth` gives per-frame loudness (0..1) for lip
 * sync; `open` (0..1) swings the front cover open.
 */
export const Lea: React.FC<{
  x: number;
  y: number;
  scale?: number;
  facing?: 1 | -1;
  poses?: Keys<LeaPose>;
  /** Jump in from x = from at frame start. */
  enter?: { from: number; start?: number; dur?: number };
  jumps?: number[];
  mouth?: number[];
  open?: number;
  happy?: boolean;
  holding?: React.ReactNode;
}> = ({ x, y, scale = 1, facing = 1, poses = [[0, "idle"]], enter, jumps = [], mouth, open = 0, happy = true, holding }) => {
  const f = useCurrentFrame();

  // entrance: bouncy hops along an arc
  const eStart = enter?.start ?? 0;
  const eDur = enter?.dur ?? 20;
  const et = enter ? interpolate(f, [eStart, eStart + eDur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 1;
  const px = enter ? interpolate(Easing.out(Easing.quad)(et), [0, 1], [enter.from, x]) : x;
  const arc = enter && et < 1 ? Math.abs(Math.sin(et * Math.PI * 2)) * 160 : 0;

  let up = arc;
  let sq = 1;
  for (const j of jumps) {
    const d = f - j;
    if (d >= -4 && d < 0) sq *= 1 - 0.1 * ((d + 4) / 4);
    else if (d >= 0 && d < 14) {
      const t = d / 14;
      up = Math.max(up, Math.sin(t * Math.PI) * 90);
      sq *= 1 + 0.08 * Math.sin(t * Math.PI);
    } else if (d >= 14 && d < 22) sq *= 1 - 0.12 * Math.sin(((d - 14) / 8) * Math.PI);
  }
  const breathe = wave(f, 50, 0.025);

  const pk = keyed(poses, f);
  const A = ARMS[pk.prev];
  const B = ARMS[pk.cur];
  let aL = A[0] + (B[0] - A[0]) * pk.t;
  let aR = A[1] + (B[1] - A[1]) * pk.t;
  if (pk.cur === "wave") aR += wave(f, 14, 22);
  if (pk.cur === "cheer") {
    aL += wave(f, 12, 14);
    aR += wave(f, 12, 14, 6);
  }
  if (pk.cur === "idle" || pk.cur === "present") {
    aL += wave(f, 70, 5);
    aR += wave(f, 70, 5, 20);
  }

  const cyc = (f + 31) % 84;
  const blink = cyc < 4 ? Math.abs(cyc - 2) / 2 : 1;
  const level = mouth ? mouth[Math.min(mouth.length - 1, Math.max(0, f))] ?? 0 : 0;
  const tilt = wave(f, 90, 4) + (enter && et < 1 ? (1 - et) * -20 : 0);
  const look = wave(f, 120, 4);

  const arm = (side: -1 | 1, a: number, child?: React.ReactNode) => {
    const sx = side * 134;
    return (
      <g transform={`translate(${sx} -250) rotate(${side * a})`}>
        <line x1={0} y1={0} x2={0} y2={110} stroke={C.navy} strokeWidth={14} strokeLinecap="round" />
        <circle cx={0} cy={116} r={18} fill={C.navy} />
        {child ? <g transform={`translate(0 130) rotate(${-side * a})`}>{child}</g> : null}
      </g>
    );
  };

  return (
    <g transform={`translate(${px} ${y}) scale(${scale * facing} ${scale})`}>
      <ellipse cx={0} cy={0} rx={130 - up * 0.4} ry={18} fill={C.shadow} />
      <g transform={`translate(0 ${-up}) scale(${2 - sq} ${sq}) rotate(${tilt} 0 -150)`}>
        {/* legs */}
        {[-50, 50].map((lx) => (
          <g key={lx}>
            <line x1={lx} y1={-90} x2={lx} y2={-14} stroke={C.navy} strokeWidth={14} strokeLinecap="round" />
            <ellipse cx={lx + 10 * Math.sign(lx)} cy={-10} rx={30} ry={14} fill={C.navy} />
          </g>
        ))}
        <g transform={`scale(${1 + breathe} ${1 - breathe}) translate(0 -96)`}>
          {/* back cover with tab */}
          <path d="M-130 -300 L-40 -300 L-20 -330 L60 -330 L80 -300 L130 -300 L130 0 L-130 0 Z" fill="#E09A1E" />
          {/* papers peeking out */}
          <rect x={-104} y={-318 - open * 60} width={200} height={260} rx={10} fill="#fff" />
          <rect x={-84} y={-300 - open * 60} width={140} height={12} rx={6} fill="#DCE4F0" />
          <rect x={-84} y={-276 - open * 60} width={110} height={12} rx={6} fill="#DCE4F0" />
          {/* front cover: swings down when open */}
          <g transform={`translate(0 0) scale(1 ${1 - open * 0.85})`}>
            <rect x={-136} y={-286} width={272} height={286} rx={22} fill={C.gold} />
            <rect x={-136} y={-286} width={272} height={40} rx={20} fill="#F2C766" />
            {open < 0.4 ? (
              <g transform={`translate(${look} 0)`}>
                {/* eyes */}
                {[-46, 46].map((ex) => (
                  <g key={ex}>
                    <ellipse cx={ex} cy={-176} rx={28} ry={34 * blink + 1} fill="#fff" />
                    <ellipse cx={ex + 4} cy={-170} rx={15} ry={19 * blink + 1} fill={C.navy} />
                    {blink > 0.6 ? <circle cx={ex + 10} cy={-178} r={5} fill="#fff" /> : null}
                  </g>
                ))}
                <circle cx={-92} cy={-122} r={16} fill="#F28C8C" opacity={0.45} />
                <circle cx={92} cy={-122} r={16} fill="#F28C8C" opacity={0.45} />
                {/* mouth */}
                {level > 0.08 ? (
                  <g>
                    <ellipse cx={0} cy={-112} rx={26 + level * 6} ry={6 + level * 24} fill={C.navy} />
                    <ellipse cx={0} cy={-104 + level * 10} rx={12 + level * 4} ry={3 + level * 8} fill="#E5484D" />
                  </g>
                ) : happy ? (
                  <path d="M-26 -120 Q0 -92 26 -120" stroke={C.navy} strokeWidth={9} fill="none" strokeLinecap="round" />
                ) : (
                  <path d="M-20 -110 L20 -110" stroke={C.navy} strokeWidth={9} strokeLinecap="round" />
                )}
              </g>
            ) : null}
          </g>
          {open >= 0.4 ? (
            // face moves onto the back cover while the folder is open
            <g transform={`translate(${look} -60)`}>
              {[-46, 46].map((ex) => (
                <g key={ex}>
                  <ellipse cx={ex} cy={-176} rx={24} ry={28 * blink + 1} fill="#fff" />
                  <ellipse cx={ex + 4} cy={-170} rx={13} ry={16 * blink + 1} fill={C.navy} />
                </g>
              ))}
              <path d="M-22 -126 Q0 -102 22 -126" stroke={C.navy} strokeWidth={8} fill="none" strokeLinecap="round" />
            </g>
          ) : null}
        </g>
        {arm(-1, aL)}
        {arm(1, aR, holding)}
      </g>
    </g>
  );
};
