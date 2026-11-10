import React from "react";
import { AbsoluteFill, Easing, interpolate, random, spring, useCurrentFrame } from "remotion";
import { wave } from "../components/anim";
import { OL } from "../components/Chibi";
import { FONT } from "../theme";

const SW = 6;

/** Busy, lived-in kitchen wall: window with moving clouds, bunting, clock,
 *  shelves with jars, hanging utensils, plant. Drawn behind the characters. */
export const KitchenBG: React.FC<{ hideWindow?: boolean }> = ({ hideWindow }) => {
  const f = useCurrentFrame();
  const flags = ["#E5484D", "#FFC93C", "#2FA36B", "#1A56D6", "#FF8FA3", "#7B61FF"];
  const sec = f / 30;
  return (
    <g>
      {/* tiles band behind the counter */}
      {Array.from({ length: 9 }).map((_, i) =>
        Array.from({ length: 2 }).map((__, j) => (
          <rect key={`${i}-${j}`} x={i * 124 - 20} y={850 + j * 104} width={116} height={96} rx={10} fill={(i + j) % 2 ? "#FFFFFF" : "#DFF1EC"} stroke="#E9C9A0" strokeWidth={3} />
        )),
      )}
      {/* bunting across the top */}
      <path d={`M-40 250 Q540 ${330 + wave(f, 90, 8)} 1120 250`} stroke={OL} strokeWidth={4} fill="none" />
      {Array.from({ length: 12 }).map((_, i) => {
        const x = -10 + i * 96;
        const t = (x + 40) / 1160;
        const y = 250 + Math.sin(t * Math.PI) * (80 + wave(f, 90, 8)) - 2;
        return <path key={i} d={`M${x - 26} ${y} L${x + 26} ${y} L${x} ${y + 52} Z`} fill={flags[i % flags.length]} stroke={OL} strokeWidth={4} strokeLinejoin="round" transform={`rotate(${wave(f, 40, 6, i * 5)} ${x} ${y})`} />;
      })}
      {/* window with sky */}
      {hideWindow ? null : (
        <g transform="translate(820 640)">
          <rect x={-150} y={-130} width={300} height={260} rx={22} fill="#7CC8FF" stroke={OL} strokeWidth={SW} />
          <circle cx={80} cy={-60} r={34} fill="#FFE38A" stroke={OL} strokeWidth={4} />
          {[0, 1].map((i) => {
            const x = ((f * (0.6 + i * 0.3) + i * 180) % 420) - 210;
            return (
              <g key={i} transform={`translate(${x} ${-30 + i * 60})`}>
                <ellipse rx={46} ry={18} fill="#fff" />
                <ellipse cx={-22} cy={-10} rx={24} ry={18} fill="#fff" />
                <ellipse cx={18} cy={-14} rx={26} ry={20} fill="#fff" />
              </g>
            );
          })}
          <path d="M-150 130 L-150 60 L-100 60 L-100 20 L-40 20 L-40 80 L20 80 L20 40 L80 40 L80 90 L150 90 L150 130 Z" fill="#A9B8D6" stroke={OL} strokeWidth={4} />
          <line x1={0} y1={-130} x2={0} y2={130} stroke={OL} strokeWidth={SW} />
          <line x1={-150} y1={0} x2={150} y2={0} stroke={OL} strokeWidth={SW} />
          <rect x={-170} y={126} width={340} height={22} rx={8} fill="#C9844C" stroke={OL} strokeWidth={5} />
          {/* little plant on the sill */}
          <rect x={90} y={86} width={50} height={42} rx={8} fill="#E5484D" stroke={OL} strokeWidth={4} />
          {[-1, 0, 1].map((k) => (
            <ellipse key={k} cx={115 + k * 16} cy={70} rx={10} ry={24} fill="#2FA36B" stroke={OL} strokeWidth={3} transform={`rotate(${k * 25 + wave(f, 50, 4)} ${115 + k * 16} 90)`} />
          ))}
        </g>
      )}
      {/* wall clock */}
      <g transform="translate(150 470)">
        <circle r={62} fill="#fff" stroke={OL} strokeWidth={SW} />
        <circle r={50} fill="none" stroke="#FFC93C" strokeWidth={6} />
        <line x1={0} y1={0} x2={0} y2={-34} stroke={OL} strokeWidth={7} strokeLinecap="round" transform={`rotate(${sec * 12})`} />
        <line x1={0} y1={0} x2={0} y2={-44} stroke="#E5484D" strokeWidth={4} strokeLinecap="round" transform={`rotate(${Math.floor(sec) * 36})`} />
        <circle r={7} fill={OL} />
      </g>
      {/* shelf with jars */}
      <g transform="translate(150 700)">
        <rect x={-130} y={0} width={260} height={18} rx={6} fill="#8C5A35" stroke={OL} strokeWidth={5} />
        {[
          ["#E5484D", "CABE"],
          ["#FFC93C", "KUNYIT"],
          ["#2FA36B", "DAUN"],
        ].map(([c, l], i) => (
          <g key={l} transform={`translate(${-80 + i * 80} 0)`}>
            <rect x={-30} y={-78} width={60} height={78} rx={14} fill={c} stroke={OL} strokeWidth={4} />
            <rect x={-26} y={-92} width={52} height={18} rx={6} fill="#8C5A35" stroke={OL} strokeWidth={4} />
            <rect x={-24} y={-52} width={48} height={22} rx={5} fill="#fff" />
            <text x={0} y={-36} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={11} fill={OL}>
              {l}
            </text>
          </g>
        ))}
      </g>
      {/* hanging utensils */}
      <line x1={340} y1={600} x2={500} y2={600} stroke={OL} strokeWidth={8} strokeLinecap="round" />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${370 + i * 55} 600) rotate(${wave(f, 46, 7, i * 9)})`}>
          <line x1={0} y1={0} x2={0} y2={70} stroke={OL} strokeWidth={6} />
          {i === 1 ? <circle cx={0} cy={96} r={28} fill="#3A3F4F" stroke={OL} strokeWidth={5} /> : <ellipse cx={0} cy={86} rx={14} ry={20} fill={i ? "#C9D3E3" : "#FFC93C"} stroke={OL} strokeWidth={4} />}
        </g>
      ))}
    </g>
  );
};

type Word = { at: number; text: string; x: number; y: number; r?: number; color?: string; size?: number; hold?: number };

/** Big kinetic words that bounce in with the narration (screen space). */
export const Stickers: React.FC<{ words: Word[] }> = ({ words }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <svg viewBox="0 0 1080 1920" width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        {words.map((w, i) => {
          const st = Math.round(w.at * 30);
          const end = st + Math.round((w.hold ?? 1.5) * 30);
          if (f < st || f > end + 8) return null;
          const k = spring({ frame: f - st, fps: 30, config: { damping: 8, mass: 0.6 } });
          const out = interpolate(f, [end, end + 8], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.back(2)) });
          const sc = k * out;
          const size = w.size ?? 84;
          return (
            <g key={i} transform={`translate(${w.x} ${w.y + wave(f, 24, 6, i * 7)}) rotate(${(w.r ?? -6) + wave(f, 30, 2, i * 5)}) scale(${sc})`}>
              <text
                x={0}
                y={size * 0.35}
                textAnchor="middle"
                fontFamily={FONT}
                fontWeight={900}
                fontSize={size}
                fill={w.color ?? "#FFC93C"}
                stroke={OL}
                strokeWidth={size * 0.2}
                strokeLinejoin="round"
                paintOrder="stroke"
              >
                {w.text}
              </text>
              {[0, 1, 2].map((j) => {
                const a = -2.4 + j * 0.5;
                const rr = size * (2.2 + j * 0.2) * Math.min(1, (f - st) / 8);
                return f - st < 14 ? <line key={j} x1={Math.cos(a) * rr * 0.8} y1={Math.sin(a) * size * 0.9} x2={Math.cos(a) * rr} y2={Math.sin(a) * size * 1.25} stroke={OL} strokeWidth={8} strokeLinecap="round" opacity={1 - (f - st) / 14} /> : null;
              })}
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

/** Little icons that float up and fade (hearts, coins, stars, sweat). */
export const Floaties: React.FC<{ kind: "heart" | "coin" | "star" | "rain"; from: number; to: number; x: number; y: number; spread?: number; every?: number }> = ({ kind, from, to, x, y, spread = 260, every = 7 }) => {
  const f = useCurrentFrame();
  const items: React.ReactNode[] = [];
  for (let st = from; st < to; st += every) {
    const d = f - st;
    if (d < 0 || d > 40) continue;
    const t = d / 40;
    const px = x + (random(`fl${kind}${st}`) - 0.5) * spread + Math.sin(d / 5) * 12;
    const py = y - t * 260;
    const s = 0.6 + random(`fs${kind}${st}`) * 0.6;
    let shape: React.ReactNode;
    if (kind === "heart") shape = <path d="M0 12 C-30 -10 -18 -34 0 -18 C18 -34 30 -10 0 12 Z" fill="#FF5C7A" stroke={OL} strokeWidth={4} />;
    else if (kind === "coin")
      shape = (
        <g>
          <circle r={20} fill="#FFC93C" stroke={OL} strokeWidth={4} />
          <text y={7} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={18} fill={OL}>
            Rp
          </text>
        </g>
      );
    else if (kind === "star") shape = <path d="M0 -24 L7 -7 L24 -6 L11 6 L15 24 L0 14 L-15 24 L-11 6 L-24 -6 L-7 -7 Z" fill="#FFC93C" stroke={OL} strokeWidth={4} strokeLinejoin="round" />;
    else shape = <path d="M0 -20 Q12 0 0 10 Q-12 0 0 -20 Z" fill="#9BD6FF" stroke={OL} strokeWidth={3} />;
    items.push(
      <g key={st} transform={`translate(${px} ${kind === "rain" ? y + t * 200 : py}) scale(${s})`} opacity={1 - t}>
        {shape}
      </g>,
    );
  }
  return <g>{items}</g>;
};
