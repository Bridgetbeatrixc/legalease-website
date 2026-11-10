import React from "react";
import { useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { wave } from "./anim";

/** Place children at x,y with scale and rotation (SVG). */
export const At: React.FC<{
  x: number;
  y: number;
  s?: number;
  r?: number;
  o?: number;
  children: React.ReactNode;
}> = ({ x, y, s = 1, r = 0, o = 1, children }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    {children}
  </g>
);

export const T: React.FC<{
  x: number;
  y: number;
  size: number;
  weight?: number;
  fill?: string;
  anchor?: "start" | "middle" | "end";
  children: React.ReactNode;
  ls?: number;
}> = ({ x, y, size, weight = 800, fill = C.navy, anchor = "middle", children, ls = 0 }) => (
  <text x={x} y={y} fontFamily={FONT} fontSize={size} fontWeight={weight} fill={fill} textAnchor={anchor} letterSpacing={ls}>
    {children}
  </text>
);

/** Sambal jar, centred on its base. */
export const Jar: React.FC<{ label?: string }> = ({ label = "SAMBAL" }) => (
  <g>
    <rect x={-46} y={-118} width={92} height={112} rx={20} fill="#C7322B" />
    <rect x={-46} y={-118} width={92} height={112} rx={20} fill="url(#glass)" opacity={0.25} />
    <rect x={-40} y={-140} width={80} height={26} rx={6} fill={C.gold} />
    <rect x={-46} y={-86} width={92} height={44} fill={C.cream} />
    <T x={0} y={-57} size={17} weight={900} fill="#C7322B">
      {label}
    </T>
    <path d="M-30 -96 q8 -10 16 0" stroke="#fff" strokeWidth={4} fill="none" opacity={0.5} />
  </g>
);

export const Shelf: React.FC<{ w: number }> = ({ w }) => (
  <g>
    <rect x={0} y={0} width={w} height={22} rx={6} fill={C.woodDark} />
    <rect x={0} y={22} width={w} height={10} fill="rgba(0,0,0,0.08)" />
  </g>
);

export const Steam: React.FC<{ seed?: number }> = ({ seed = 0 }) => {
  const f = useCurrentFrame() + seed * 13;
  return (
    <g stroke="#fff" strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.8}>
      {[-30, 0, 30].map((dx, i) => {
        const t = ((f + i * 15) % 45) / 45;
        return (
          <path
            key={i}
            d={`M${dx} 0 q16 -20 0 -40 q-16 -20 0 -40`}
            transform={`translate(0 ${-t * 50})`}
            opacity={1 - t}
          />
        );
      })}
    </g>
  );
};

export const Stove: React.FC = () => (
  <g>
    <rect x={-170} y={0} width={340} height={300} rx={16} fill={C.steel} />
    <rect x={-170} y={0} width={340} height={40} rx={12} fill="#9AA8BD" />
    <circle cx={-110} cy={70} r={14} fill={C.navy} />
    <circle cx={-60} cy={70} r={14} fill={C.navy} />
    <rect x={-120} y={110} width={240} height={150} rx={12} fill="#8796AD" />
    {/* pot */}
    <rect x={-110} y={-120} width={220} height={120} rx={22} fill="#5B6B82" />
    <rect x={-128} y={-130} width={256} height={24} rx={12} fill="#46546A" />
    <rect x={-100} y={-128} width={200} height={14} rx={7} fill="#C7322B" />
    <At x={0} y={-140}>
      <Steam />
    </At>
  </g>
);

/** White document with a title, filler lines and optional stamp. */
export const Doc: React.FC<{
  title: string;
  sub?: string;
  stamp?: "ok" | "no" | string;
  w?: number;
  h?: number;
  accent?: string;
}> = ({ title, sub, stamp, w = 300, h = 390, accent = C.cobalt }) => (
  <g>
    <rect x={-w / 2 + 10} y={-h / 2 + 12} width={w} height={h} rx={18} fill="rgba(16,31,62,0.16)" />
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={18} fill="#fff" />
    <rect x={-w / 2} y={-h / 2} width={w} height={70} rx={18} fill={accent} />
    <rect x={-w / 2} y={-h / 2 + 50} width={w} height={20} fill={accent} />
    <T x={0} y={-h / 2 + 48} size={34} weight={900} fill="#fff">
      {title}
    </T>
    {sub ? (
      <T x={0} y={-h / 2 + 112} size={20} weight={700} fill={C.navy}>
        {sub}
      </T>
    ) : null}
    {[0, 1, 2, 3, 4].map((i) => (
      <rect key={i} x={-w / 2 + 34} y={-h / 2 + 140 + i * 36} width={w - 68 - (i % 2) * 60} height={12} rx={6} fill="#DCE4F0" />
    ))}
    {stamp === "ok" ? <At x={w / 2 - 66} y={h / 2 - 66}><Badge ok /></At> : null}
    {stamp === "no" ? <At x={w / 2 - 66} y={h / 2 - 66}><Badge ok={false} /></At> : null}
  </g>
);

export const Badge: React.FC<{ ok: boolean; r?: number }> = ({ ok, r = 46 }) => (
  <g>
    <circle r={r} fill={ok ? C.green : C.red} />
    <circle r={r} fill="none" stroke="#fff" strokeWidth={6} />
    {ok ? (
      <path d={`M${-r * 0.45} 0 L${-r * 0.1} ${r * 0.35} L${r * 0.5} ${-r * 0.35}`} stroke="#fff" strokeWidth={r * 0.2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    ) : (
      <g stroke="#fff" strokeWidth={r * 0.2} strokeLinecap="round">
        <line x1={-r * 0.38} y1={-r * 0.38} x2={r * 0.38} y2={r * 0.38} />
        <line x1={r * 0.38} y1={-r * 0.38} x2={-r * 0.38} y2={r * 0.38} />
      </g>
    )}
  </g>
);

/** Phone, centred. Children are drawn in screen coords (0..w, 0..h). */
export const Phone: React.FC<{ w?: number; h?: number; children?: React.ReactNode }> = ({ w = 420, h = 820, children }) => (
  <g>
    <rect x={-w / 2 + 14} y={-h / 2 + 18} width={w} height={h} rx={56} fill="rgba(16,31,62,0.18)" />
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={56} fill={C.ink} />
    <rect x={-w / 2 + 18} y={-h / 2 + 18} width={w - 36} height={h - 36} rx={42} fill="#fff" />
    <rect x={-46} y={-h / 2 + 30} width={92} height={22} rx={11} fill={C.ink} />
    <g transform={`translate(${-w / 2 + 18} ${-h / 2 + 18})`}>{children}</g>
  </g>
);

export const Washer: React.FC<{ seed?: number }> = ({ seed = 0 }) => {
  const f = useCurrentFrame() + seed * 11;
  return (
    <g>
      <rect x={-110} y={-260} width={220} height={260} rx={22} fill="#fff" stroke="#C9D3E3" strokeWidth={6} />
      <rect x={-110} y={-260} width={220} height={50} rx={22} fill="#E3EAF5" />
      <circle cx={60} cy={-235} r={10} fill={C.cobalt} />
      <circle cx={0} cy={-110} r={76} fill="#C9D3E3" />
      <circle cx={0} cy={-110} r={60} fill="#7FB6EC" />
      <g transform={`rotate(${f * 9} 0 -110)`}>
        <path d="M-40 -110 q20 -30 40 0 q20 30 40 0" stroke="#fff" strokeWidth={8} fill="none" strokeLinecap="round" />
        <circle cx={-20} cy={-140} r={10} fill={C.gold} />
        <circle cx={24} cy={-84} r={9} fill={C.red} />
      </g>
    </g>
  );
};

export const Cup: React.FC = () => (
  <g>
    <path d="M-40 -90 L40 -90 L32 0 L-32 0 Z" fill="#fff" />
    <rect x={-44} y={-98} width={88} height={14} rx={6} fill={C.woodDark} />
    <rect x={-36} y={-60} width={72} height={26} fill={C.wood} />
    <At x={0} y={-104} s={0.5}>
      <Steam seed={2} />
    </At>
  </g>
);

export const BeanBag: React.FC<{ label?: string }> = ({ label = "KOPI" }) => (
  <g>
    <path d="M-70 0 L-80 -190 L-56 -210 L56 -210 L80 -190 L70 0 Z" fill="#C9A273" />
    <path d="M-56 -210 L56 -210 L50 -232 L-50 -232 Z" fill="#B48A5C" />
    <rect x={-50} y={-150} width={100} height={70} rx={10} fill={C.cream} />
    <T x={0} y={-104} size={24} weight={900} fill={C.woodDark}>
      {label}
    </T>
    <ellipse cx={-14} cy={-40} rx={12} ry={8} fill={C.woodDark} transform="rotate(-30 -14 -40)" />
    <ellipse cx={16} cy={-36} rx={12} ry={8} fill={C.woodDark} transform="rotate(25 16 -36)" />
  </g>
);

export const Envelope: React.FC<{ label?: string }> = ({ label = "SURAT TEGURAN" }) => (
  <g>
    <rect x={-170} y={-110} width={340} height={220} rx={16} fill="#fff" stroke="#DCE4F0" strokeWidth={4} />
    <path d="M-170 -100 L0 20 L170 -100" stroke="#DCE4F0" strokeWidth={6} fill="none" />
    <rect x={-150} y={50} width={300} height={42} rx={8} fill={C.red} />
    <T x={0} y={80} size={24} weight={900} fill="#fff">
      {label}
    </T>
  </g>
);

export const Bubble: React.FC<{ text: string; w?: number; color?: string; tc?: string }> = ({ text, w = 330, color = "#fff", tc = C.navy }) => (
  <g>
    <rect x={-w / 2 + 6} y={-44} width={w} height={88} rx={44} fill="rgba(16,31,62,0.15)" />
    <rect x={-w / 2} y={-50} width={w} height={88} rx={44} fill={color} />
    <circle cx={-w / 2 + 44} cy={-6} r={22} fill={C.green} />
    <path d={`M${-w / 2 + 34} -6 l8 8 l14 -16`} stroke="#fff" strokeWidth={5} fill="none" strokeLinecap="round" />
    <T x={-w / 2 + 80} y={4} size={28} weight={800} fill={tc} anchor="start">
      {text}
    </T>
  </g>
);

export const Box: React.FC<{ label?: string }> = ({ label }) => (
  <g>
    <rect x={-120} y={-160} width={240} height={160} rx={10} fill="#D6A56B" />
    <rect x={-120} y={-160} width={240} height={34} fill="#C38F55" />
    <rect x={-20} y={-160} width={40} height={60} fill="#E9C99B" />
    {label ? (
      <T x={0} y={-50} size={28} weight={900} fill="#7A4E24">
        {label}
      </T>
    ) : null}
  </g>
);

export const Coin: React.FC<{ r?: number }> = ({ r = 34 }) => (
  <g>
    <circle r={r} fill={C.gold} />
    <circle r={r * 0.72} fill="none" stroke="#C9922E" strokeWidth={5} />
    <T x={0} y={r * 0.32} size={r * 0.9} weight={900} fill="#9A6B16">
      Rp
    </T>
  </g>
);

export const Chips: React.FC = () => (
  <g>
    <path d="M-80 0 L-90 -220 Q0 -240 90 -220 L80 0 Q0 16 -80 0 Z" fill={C.gold} />
    <rect x={-60} y={-170} width={120} height={60} rx={10} fill="#fff" />
    <T x={0} y={-131} size={22} weight={900} fill={C.woodDark}>
      KERIPIK
    </T>
    <circle cx={-20} cy={-60} r={24} fill="#F7D98B" />
    <circle cx={22} cy={-50} r={20} fill="#F2CF73" />
  </g>
);

export const WaterBottle: React.FC = () => (
  <g>
    <rect x={-18} y={-300} width={36} height={30} rx={6} fill={C.cobalt} />
    <path d="M-22 -270 Q-60 -240 -60 -200 L-60 -20 Q-60 0 -40 0 L40 0 Q60 0 60 -20 L60 -200 Q60 -240 22 -270 Z" fill="#BFE0FF" opacity={0.95} />
    <rect x={-60} y={-170} width={120} height={70} fill="#fff" />
    <T x={0} y={-126} size={22} weight={900} fill={C.cobalt}>
      AIR
    </T>
    <path d="M-40 -230 L-40 -40" stroke="#fff" strokeWidth={8} opacity={0.6} strokeLinecap="round" />
  </g>
);

export const Serum: React.FC = () => (
  <g>
    <rect x={-14} y={-290} width={28} height={70} rx={12} fill={C.ink} />
    <rect x={-30} y={-226} width={60} height={30} rx={8} fill={C.gold} />
    <rect x={-56} y={-200} width={112} height={200} rx={26} fill="#F3B8C8" />
    <rect x={-40} y={-140} width={80} height={70} rx={8} fill="#fff" />
    <T x={0} y={-96} size={20} weight={900} fill="#C25478">
      SERUM
    </T>
  </g>
);

export const Spark: React.FC<{ color?: string; size?: number }> = ({ color = C.gold, size = 30 }) => (
  <path d={`M0 ${-size} L${size * 0.25} ${-size * 0.25} L${size} 0 L${size * 0.25} ${size * 0.25} L0 ${size} L${-size * 0.25} ${size * 0.25} L${-size} 0 L${-size * 0.25} ${-size * 0.25} Z`} fill={color} />
);

/** Floating “?” or “!” marks above someone. */
export const Marks: React.FC<{ kind: "?" | "!"; color?: string }> = ({ kind, color = C.cobalt }) => {
  const f = useCurrentFrame();
  return (
    <g>
      {[-60, 0, 60].map((dx, i) => (
        <g key={i} transform={`translate(${dx} ${wave(f, 40, 10, i * 12) - Math.abs(dx) * -0.3})`}>
          <T x={0} y={0} size={i === 1 ? 96 : 64} weight={900} fill={color}>
            {kind}
          </T>
        </g>
      ))}
    </g>
  );
};

/** Torn paper effect: two halves sliding apart (t: 0..1). */
export const Torn: React.FC<{ t: number; title: string }> = ({ t, title }) => (
  <g>
    <g transform={`translate(${-t * 90} ${t * 60}) rotate(${-t * 14})`}>
      <path d="M-150 -195 L10 -195 L-10 -120 L20 -40 L-14 40 L16 120 L-6 195 L-150 195 Z" fill="#fff" />
      <rect x={-130} y={-150} width={120} height={12} rx={6} fill="#DCE4F0" />
      <rect x={-130} y={-110} width={100} height={12} rx={6} fill="#DCE4F0" />
      <T x={-70} y={-170} size={22} weight={900} fill={C.cobalt}>
        {title.slice(0, Math.ceil(title.length / 2))}
      </T>
    </g>
    <g transform={`translate(${t * 90} ${t * 80}) rotate(${t * 16})`}>
      <path d="M150 -195 L10 -195 L-10 -120 L20 -40 L-14 40 L16 120 L-6 195 L150 195 Z" fill="#fff" />
      <rect x={30} y={-150} width={100} height={12} rx={6} fill="#DCE4F0" />
      <rect x={30} y={-110} width={90} height={12} rx={6} fill="#DCE4F0" />
      <T x={80} y={-170} size={22} weight={900} fill={C.cobalt}>
        {title.slice(Math.ceil(title.length / 2))}
      </T>
    </g>
  </g>
);

export const Defs: React.FC = () => (
  <defs>
    <linearGradient id="glass" x1="0" x2="1">
      <stop offset="0" stopColor="#fff" />
      <stop offset="1" stopColor="#fff" stopOpacity={0} />
    </linearGradient>
  </defs>
);
