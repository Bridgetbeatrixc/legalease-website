import React from "react";
import { Easing, interpolate, random, useCurrentFrame } from "remotion";
import { pop, ramp, wave } from "../components/anim";
import { Chibi, ChibiLook, OL } from "../components/Chibi";
import { Lea } from "../components/Lea";
import { At, T } from "../components/Props";
import { Svg } from "../components/Stage";
import { FONT } from "../theme";
import type { VideoDef } from "../types";
import { Floaties, KitchenBG, Stickers } from "./ep1-extras";
import { Burst, Confetti, Counter, Hp, Impact, Poof, Sign, Stamp, Thought, Wash } from "./v7-orderan-bu-sari";

/*
 * Storytime episode 2: "Roti Beku Rina & Dodi" (PIRT vs BPOM).
 * Every beat is a fraction of its scene, so the animation follows the dub
 * length; fine-tune the fractions once the ElevenLabs take is split.
 */

const RINA: ChibiLook = { hair: "bob", hairColor: "#4A2E22", skin: "#F2C29B", shirt: "#FF7A9C", shirtShade: "#E0567C", skirt: "#FF7A9C", apron: "#FFFFFF" };
const DODI: ChibiLook = { hair: "short", hairColor: "#2B1B17", skin: "#D9A27A", shirt: "#3FA7D6", shirtShade: "#2B86B3", pants: "#2D3A6B", apron: "#FFFFFF", hat: "chef", lash: false };
const SHOPPER: ChibiLook = { hair: "hijab", hijab: "#2FA36B", hijabShade: "#1F7F52", skin: "#E9B48A", shirt: "#7B61FF", shirtShade: "#5C44D6", skirt: "#7B61FF" };

const SW = 6;
const STORE = "Toko Roti Rina & Dodi";
const JARS: [string, string][] = [
  ["#FFFFFF", "TEPUNG"],
  ["#FFC93C", "MENTEGA"],
  ["#FF8FA3", "GULA"],
];
const WALL = "#FFE0EA";
const FLOOR = "#7FB2F0";

/** Beat helper: fraction of the scene -> frame. */
const beats = (dur: number) => (fr: number) => Math.round(fr * dur);

/** Stand-in lip sync until the real take is analysed. */
const chatter = (dur: number, ranges: [number, number][]) =>
  Array.from({ length: dur }, (_, f) => {
    const on = ranges.some(([a, b]) => f >= a * dur && f < b * dur);
    if (!on) return 0;
    const syl = Math.abs(Math.sin(f * 0.62)) * (0.55 + 0.45 * Math.sin(f * 0.17 + 1));
    return f % 23 < 3 ? 0 : 0.18 + syl * 0.55;
  });

// ---------------------------------------------------------------------------
// Props

const Snow: React.FC<{ size?: number; color?: string }> = ({ size = 30, color = "#fff" }) => (
  <g strokeLinecap="round">
    {[0, 60, 120].map((a) => (
      <line key={`o${a}`} x1={0} y1={-size} x2={0} y2={size} stroke={OL} strokeWidth={size * 0.34} transform={`rotate(${a})`} />
    ))}
    {[0, 60, 120].map((a) => (
      <line key={a} x1={0} y1={-size} x2={0} y2={size} stroke={color} strokeWidth={size * 0.18} transform={`rotate(${a})`} />
    ))}
  </g>
);

const Sun: React.FC<{ r?: number }> = ({ r = 34 }) => {
  const f = useCurrentFrame();
  return (
    <g transform={`rotate(${f * 1.5})`}>
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={i} x1={0} y1={-r - 10} x2={0} y2={-r - 26} stroke={OL} strokeWidth={8} strokeLinecap="round" transform={`rotate(${i * 45})`} />
      ))}
      <circle r={r} fill="#FFC93C" stroke={OL} strokeWidth={6} />
    </g>
  );
};

const Label: React.FC<{ kind: "pirt" | "bpom" }> = ({ kind }) => (
  <g>
    <rect x={-110} y={-44} width={220} height={88} rx={22} fill={kind === "pirt" ? "#2FA36B" : "#1A56D6"} stroke={OL} strokeWidth={6} />
    <rect x={-96} y={-30} width={192} height={60} rx={14} fill="none" stroke="#fff" strokeWidth={3} strokeDasharray="8 6" opacity={0.7} />
    <T x={0} y={16} size={44} weight={900} fill="#fff">
      {kind === "pirt" ? "PIRT" : "BPOM"}
    </T>
  </g>
);

const FrozenBox: React.FC<{ label?: "pirt" | "bpom"; labelS?: number }> = ({ label, labelS = 1 }) => (
  <g>
    <rect x={-120} y={-170} width={240} height={170} rx={18} fill="#CFEFFF" stroke={OL} strokeWidth={SW} />
    <rect x={-120} y={-170} width={240} height={50} rx={18} fill="#1A56D6" stroke={OL} strokeWidth={SW} />
    <T x={0} y={-133} size={28} weight={900} fill="#fff">
      ROTI BEKU
    </T>
    <path d="M-74 -26 Q-78 -98 0 -100 Q78 -98 74 -26 Z" fill="#E8A35A" stroke={OL} strokeWidth={5} />
    <path d="M-40 -78 l18 -10 M-8 -82 l18 -10 M24 -78 l18 -10" stroke="#FFE2B0" strokeWidth={7} strokeLinecap="round" />
    <At x={92} y={-64}>
      <Snow size={18} />
    </At>
    {label ? (
      <At x={-70} y={-24} s={0.42 * labelS} r={-8}>
        <Label kind={label} />
      </At>
    ) : null}
  </g>
);

const NastarJar: React.FC<{ label?: number }> = ({ label = 0 }) => (
  <g>
    <rect x={-70} y={-150} width={140} height={150} rx={30} fill="#E6F4FF" stroke={OL} strokeWidth={SW} />
    {[0, 1, 2].map((r) =>
      [0, 1, 2].map((c) => (
        <g key={`${r}${c}`} transform={`translate(${-36 + c * 36 + (r % 2) * 8} ${-30 - r * 36})`}>
          <circle r={16} fill="#F6C453" stroke={OL} strokeWidth={3} />
          <circle cx={2} cy={-8} r={5} fill="#9C5A25" />
        </g>
      )),
    )}
    <rect x={-58} y={-178} width={116} height={34} rx={10} fill="#E5484D" stroke={OL} strokeWidth={5} />
    {label > 0.01 ? (
      <At x={0} y={-60} s={0.46 * label} r={-6}>
        <Label kind="pirt" />
      </At>
    ) : null}
  </g>
);

const Keripik: React.FC = () => (
  <g>
    <path d="M-70 0 L-80 -190 Q0 -206 80 -190 L70 0 Q0 14 -70 0 Z" fill="#FFC93C" stroke={OL} strokeWidth={SW} strokeLinejoin="round" />
    <rect x={-54} y={-150} width={108} height={50} rx={10} fill="#fff" stroke={OL} strokeWidth={4} />
    <T x={0} y={-116} size={20} weight={900} fill="#9C5A25">
      KERIPIK
    </T>
    <ellipse cx={-14} cy={-54} rx={24} ry={16} fill="#F7D98B" stroke={OL} strokeWidth={3} />
    <ellipse cx={22} cy={-40} rx={20} ry={14} fill="#F2CF73" stroke={OL} strokeWidth={3} />
  </g>
);

const Milk: React.FC = () => (
  <g>
    <path d="M-52 0 L-52 -170 L-30 -214 L30 -214 L52 -170 L52 0 Z" fill="#fff" stroke={OL} strokeWidth={SW} strokeLinejoin="round" />
    <path d="M-52 -170 L52 -170" stroke={OL} strokeWidth={5} />
    <rect x={-52} y={-130} width={104} height={62} fill="#7CC8FF" stroke={OL} strokeWidth={4} />
    <T x={0} y={-88} size={26} weight={900} fill="#fff">
      SUSU
    </T>
  </g>
);

const Bottle: React.FC = () => (
  <g>
    <rect x={-20} y={-280} width={40} height={30} rx={6} fill="#1A56D6" stroke={OL} strokeWidth={4} />
    <path d="M-22 -252 Q-58 -226 -58 -190 L-58 -16 Q-58 0 -42 0 L42 0 Q58 0 58 -16 L58 -190 Q58 -226 22 -252 Z" fill="#BFE6FF" stroke={OL} strokeWidth={SW} strokeLinejoin="round" />
    <rect x={-58} y={-160} width={116} height={62} fill="#fff" stroke={OL} strokeWidth={4} />
    <T x={0} y={-118} size={24} weight={900} fill="#1A56D6">
      AIR
    </T>
    <path d="M-36 -210 L-36 -40" stroke="#fff" strokeWidth={8} opacity={0.7} strokeLinecap="round" />
  </g>
);

const Tray: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g>
      <rect x={-110} y={-14} width={220} height={20} rx={8} fill="#9AA8C2" stroke={OL} strokeWidth={5} />
      {[-62, 0, 62].map((bx, i) => (
        <g key={bx}>
          <ellipse cx={bx} cy={-34} rx={30} ry={24} fill="#E8A35A" stroke={OL} strokeWidth={4} />
          <path d={`M${bx - 12} -46 l10 -6 M${bx + 4} -46 l10 -6`} stroke="#FFE2B0" strokeWidth={4} strokeLinecap="round" />
          <path d={`M${bx} -64 q-8 -14 0 -28 q8 -14 0 -28`} stroke="#fff" strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.5 + 0.4 * Math.sin(f / 6 + i)} />
        </g>
      ))}
    </g>
  );
};

const Oven: React.FC<{ glow?: number }> = ({ glow = 1 }) => {
  const f = useCurrentFrame();
  return (
    <g>
      <rect x={-150} y={-260} width={300} height={260} rx={22} fill="#C9D3E3" stroke={OL} strokeWidth={SW} />
      <rect x={-120} y={-196} width={240} height={150} rx={16} fill="#3A3F4F" stroke={OL} strokeWidth={5} />
      <rect x={-104} y={-180} width={208} height={118} rx={12} fill="#FF9A3D" opacity={(0.55 + 0.25 * Math.sin(f / 5)) * glow} />
      {[-90, -40, 10].map((kx) => (
        <circle key={kx} cx={kx} cy={-228} r={13} fill="#fff" stroke={OL} strokeWidth={4} />
      ))}
      <rect x={60} y={-240} width={60} height={24} rx={6} fill="#2FA36B" stroke={OL} strokeWidth={3} />
      <rect x={-110} y={-34} width={220} height={14} rx={7} fill={OL} />
    </g>
  );
};

const Freezer: React.FC<{ open: number }> = ({ open }) => (
  <g>
    <rect x={-150} y={-560} width={300} height={560} rx={26} fill="#EAF4FF" stroke={OL} strokeWidth={SW} />
    <rect x={-124} y={-530} width={248} height={500} rx={16} fill="#BFE6FF" stroke={OL} strokeWidth={4} />
    {[-400, -270, -140].map((sy) => (
      <rect key={sy} x={-124} y={sy} width={248} height={10} fill="#8FC9F0" />
    ))}
    <At x={0} y={-460}>
      <Snow size={26} color="#7CC8FF" />
    </At>
    <g transform={`translate(-150 0) scale(${Math.max(0.12, 1 - open * 0.88)} 1)`}>
      <rect x={0} y={-560} width={300} height={560} rx={26} fill="#F6FBFF" stroke={OL} strokeWidth={SW} />
      <rect x={244} y={-420} width={22} height={150} rx={10} fill="#9AA8C2" stroke={OL} strokeWidth={4} />
      <At x={150} y={-460}>
        <Snow size={36} color="#7CC8FF" />
      </At>
      <T x={150} y={-370} size={30} weight={900} fill="#1A56D6">
        FREEZER
      </T>
    </g>
  </g>
);

/** Cold mist puffs drifting out (from frame `start`). */
const Mist: React.FC<{ start: number; end: number }> = ({ start, end }) => {
  const f = useCurrentFrame();
  const items: React.ReactNode[] = [];
  for (let st = start; st < end; st += 5) {
    const d = f - st;
    if (d < 0 || d > 36) continue;
    const t = d / 36;
    items.push(<circle key={st} cx={(random(`m${st}`) - 0.5) * 120 - t * 120} cy={-t * 140 + (random(`n${st}`) - 0.5) * 200} r={30 + t * 40} fill="#fff" opacity={0.75 * (1 - t)} />);
  }
  return <g>{items}</g>;
};

const Calendar: React.FC<{ text: string }> = ({ text }) => (
  <g>
    <rect x={-90} y={-100} width={180} height={190} rx={18} fill="#fff" stroke={OL} strokeWidth={SW} />
    <rect x={-90} y={-100} width={180} height={56} rx={18} fill="#E5484D" stroke={OL} strokeWidth={SW} />
    <circle cx={-46} cy={-100} r={10} fill={OL} />
    <circle cx={46} cy={-100} r={10} fill={OL} />
    <T x={0} y={50} size={64} weight={900}>
      {text}
    </T>
  </g>
);

const Cart: React.FC = () => (
  <g>
    <path d="M-90 -110 L-60 -110 L-36 -20 L70 -20 L90 -86 L-48 -86" stroke={OL} strokeWidth={10} fill="#FFC93C" strokeLinejoin="round" strokeLinecap="round" />
    <circle cx={-26} cy={6} r={14} fill={OL} />
    <circle cx={58} cy={6} r={14} fill={OL} />
  </g>
);

/** Supermarket shelving wall for the ending. */
const StoreShelves: React.FC = () => {
  const f = useCurrentFrame();
  const colors = ["#E5484D", "#FFC93C", "#2FA36B", "#1A56D6", "#FF8FA3", "#7B61FF", "#F39A4E"];
  return (
    <g>
      <rect x={-200} y={180} width={1480} height={110} fill="#2FA36B" />
      {Array.from({ length: 12 }).map((_, i) => (
        <rect key={i} x={-200 + i * 130} y={180} width={64} height={110} fill="#fff" opacity={0.3} />
      ))}
      <rect x={260} y={200} width={560} height={70} rx={35} fill="#fff" stroke={OL} strokeWidth={5} />
      <T x={540} y={250} size={40} weight={900} fill="#2FA36B">
        SUPERMARKET
      </T>
      {[0, 1, 2].map((row) => (
        <g key={row}>
          <rect x={-40} y={520 + row * 170} width={1160} height={22} rx={6} fill="#C9D3E3" stroke={OL} strokeWidth={5} />
          {Array.from({ length: 13 }).map((_, i) => {
            const h = 70 + random(`h${row}${i}`) * 50;
            const c = colors[(i + row * 3) % colors.length];
            return <rect key={i} x={-20 + i * 88} y={520 + row * 170 - h} width={70} height={h} rx={10} fill={c} stroke={OL} strokeWidth={4} transform={`rotate(${wave(f, 90, 1, i * 7 + row)} ${15 + i * 88} ${520 + row * 170})`} />;
          })}
        </g>
      ))}
    </g>
  );
};

/** Glass freezer case at the front (top edge at y). */
const FreezerCase: React.FC<{ y?: number }> = ({ y = 1060 }) => (
  <g>
    <rect x={30} y={y + 20} width={1020} height={1300 - y - 20} fill="#DDEBFA" stroke={OL} strokeWidth={SW} />
    <rect x={60} y={y + 56} width={960} height={120} rx={16} fill="#1A56D6" stroke={OL} strokeWidth={5} />
    <T x={540} y={y + 132} size={52} weight={900} fill="#fff">
      FROZEN FOOD
    </T>
    {[200, 880].map((sx) => (
      <At key={sx} x={sx} y={y + 116}>
        <Snow size={26} />
      </At>
    ))}
    <rect x={20} y={y} width={1040} height={30} rx={10} fill="#9AA8C2" stroke={OL} strokeWidth={SW} />
  </g>
);

const Crack: React.FC<{ t: number }> = ({ t }) =>
  t > 0 ? (
    <path d="M-40 -60 L-10 -20 L-36 6 L4 30 L-14 64" stroke={OL} strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={220} strokeDashoffset={220 * (1 - t)} />
  ) : null;

// ---------------------------------------------------------------------------
// Scenes

const Hook: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const b = beats(dur);
  const grab = b(0.1);
  const turn = b(0.56);
  const batal = b(0.84);
  const buzz = f < grab ? Math.sin(f * 2.8) * 9 : 0;
  const up = interpolate(f, [grab, grab + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.5)) });
  const px = interpolate(up, [0, 1], [400, 790]) + buzz;
  const py = interpolate(up, [0, 1], [1010, 620]);
  const ps = interpolate(up, [0, 1], [0.25, 0.62]);
  const msg = [pop(f, b(0.16)), pop(f, b(0.27)), pop(f, b(0.38))];
  const dim = ramp(f, turn, turn + 18) * 0.36;
  const fall = ramp(f, batal, batal + 14);
  return (
    <Svg>
      <KitchenBG jars={JARS} />
      <Floaties kind="heart" from={b(0.28)} to={b(0.5)} x={400} y={760} spread={520} every={5} />
      <Floaties kind="rain" from={batal} to={dur} x={300} y={620} spread={420} every={7} />
      <At x={540} y={460} s={pop(f, 3)}>
        <Sign front={STORE} w={680} />
      </At>
      <Chibi
        {...RINA}
        x={500}
        y={1300}
        scale={0.86}
        moods={[
          [0, "happy"],
          [b(0.27), "joy"],
          [turn, "worried"],
          [batal, "shock"],
          [batal + 20, "sad"],
        ]}
        poses={[
          [0, "stir"],
          [b(0.27), "cheer"],
          [turn, "chin"],
          [batal, "handsHead"],
        ]}
        looks={[
          [0, [0, 0.5]],
          [grab, [1, -0.3]],
          [turn, [0.6, -0.2]],
          [batal + 20, [0, 0.8]],
        ]}
        jumps={[b(0.3), b(0.4)]}
        flinch={[batal]}
        seed={1}
      />
      <Chibi
        {...DODI}
        x={220}
        y={1300}
        scale={0.9}
        moods={[
          [0, "happy"],
          [grab, "shock"],
          [b(0.22), "joy"],
          [turn, "worried"],
          [batal, "shock"],
          [batal + 20, "sad"],
        ]}
        poses={[
          [0, "idle"],
          [grab, "handsHead"],
          [b(0.22), "cheer"],
          [turn, "idle"],
          [batal, "handsHead"],
          [batal + 22, "slump"],
        ]}
        looks={[
          [0, [1, 0.6]],
          [grab, [1, -0.4]],
          [batal + 22, [0, 0.8]],
        ]}
        jumps={[grab, b(0.33), b(0.43)]}
        flinch={[batal]}
        seed={2}
      />
      <Counter x={40} w={1000} />
      {/* frozen boxes stacked on the counter, topple when it's cancelled */}
      {[0, 1, 2].map((i) => {
        const k = pop(f, b(0.42) + i * 4, 10);
        const fx = fall * (i - 1) * 140;
        const fy = fall * fall * (260 + i * 40);
        return (
          <At key={i} x={640 + (i === 2 ? 60 : i * 120) + fx} y={1060 - (i === 2 ? 170 : 0) + fy} s={0.62 * k} r={fall * (i - 1) * 60}>
            <FrozenBox />
          </At>
        );
      })}
      {f < grab ? (
        <g stroke={OL} strokeWidth={7} strokeLinecap="round" fill="none">
          {[-1, 1].map((d) => (
            <g key={d}>
              <path d={`M${400 + d * 80} 950 q${d * 16} 22 0 44`} />
              <path d={`M${400 + d * 106} 938 q${d * 20} 34 0 68`} />
            </g>
          ))}
        </g>
      ) : null}
      <At x={px} y={py} s={ps} r={wave(f, 50, 2) + (1 - up) * -10}>
        <Hp>
          <rect width={460} height={116} fill="#2FA36B" />
          <circle cx={62} cy={60} r={32} fill="#fff" />
          <At x={62} y={74} s={0.34}>
            <Cart />
          </At>
          <T x={110} y={54} size={28} weight={900} fill="#fff" anchor="start">
            Supermarket Segar
          </T>
          <T x={110} y={88} size={20} weight={600} fill="#DCF8E6" anchor="start">
            online
          </T>
          <At x={24} y={150} s={msg[0]}>
            <rect width={410} height={112} rx={22} fill="#fff" stroke={OL} strokeWidth={3} />
            <T x={22} y={48} size={27} weight={700} anchor="start">
              Kami mau pesan
            </T>
            <T x={22} y={86} size={27} weight={700} anchor="start">
              roti beku kalian!
            </T>
          </At>
          <At x={24} y={292} s={msg[1]}>
            <rect width={410} height={160} rx={22} fill="#fff" stroke={OL} strokeWidth={3} />
            <T x={22} y={78} size={64} weight={900} fill="#1A56D6" anchor="start">
              500 pack
            </T>
            <T x={22} y={128} size={32} weight={800} anchor="start">
              per minggu
            </T>
          </At>
          <At x={24} y={482} s={msg[2]}>
            <rect width={410} height={116} rx={22} fill="#DCF8C6" stroke={OL} strokeWidth={3} />
            <T x={22} y={74} size={44} weight={900} fill="#1F7F52" anchor="start">
              Kirim minggu depan
            </T>
          </At>
          {f > batal ? (
            <At x={230} y={400}>
              <Stamp t={pop(f, batal, 8)} text="BATAL" />
            </At>
          ) : null}
        </Hp>
      </At>
      <At x={180} y={250} s={pop(f, turn + 4)} r={wave(f, 30, 6)}>
        {f > turn ? <Calendar text="H-7" /> : null}
      </At>
      <At x={790} y={620}>
        <Impact start={batal} r={240} color="#E5484D" />
      </At>
      <Wash o={dim} />
    </Svg>
  );
};

const Intro: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const b = beats(dur);
  const trayOut = ramp(f, b(0.08), b(0.2));
  const jarsAt = b(0.5);
  const pirt = b(0.83);
  return (
    <Svg>
      <KitchenBG jars={JARS} hideWindow />
      <Floaties kind="heart" from={b(0.55)} to={b(0.8)} x={460} y={900} spread={500} every={5} />
      <Floaties kind="star" from={pirt} to={dur} x={460} y={850} spread={420} />
      <At x={540} y={460} s={pop(f, 2)} r={wave(f, 60, 2)}>
        <Sign front={STORE} w={680} />
      </At>
      {/* name tags */}
      <At x={250} y={620} s={pop(f, b(0.06))} r={-6 + wave(f, 40, 3)}>
        <rect x={-100} y={-44} width={200} height={88} rx={44} fill="#FF7A9C" stroke={OL} strokeWidth={SW} />
        <T x={0} y={16} size={44} weight={900} fill="#fff">
          Rina
        </T>
      </At>
      <At x={620} y={600} s={pop(f, b(0.12))} r={6 + wave(f, 40, 3, 10)}>
        <rect x={-100} y={-44} width={200} height={88} rx={44} fill="#3FA7D6" stroke={OL} strokeWidth={SW} />
        <T x={0} y={16} size={44} weight={900} fill="#fff">
          Dodi
        </T>
      </At>
      <At x={880} y={760} s={pop(f, b(0.24))} r={6}>
        <rect x={-130} y={-70} width={260} height={140} rx={26} fill="#FFC93C" stroke={OL} strokeWidth={SW} />
        <T x={0} y={-12} size={44} weight={900}>
          3 tahun
        </T>
        <T x={0} y={36} size={28} weight={800}>
          toko roti
        </T>
      </At>
      <Chibi
        {...RINA}
        x={250}
        y={1300}
        scale={0.88}
        moods={[
          [0, "happy"],
          [b(0.06), "joy"],
          [b(0.3), "happy"],
          [jarsAt, "joy"],
        ]}
        poses={[
          [0, "wave"],
          [b(0.2), "stir"],
          [jarsAt, "present"],
          [pirt, "cheer"],
        ]}
        looks={[
          [0, [0.4, 0]],
          [b(0.2), [0.2, 0.8]],
          [jarsAt, [1, 0.5]],
          [pirt, [1, -0.2]],
        ]}
        jumps={[b(0.06), pirt + 4]}
        seed={3}
      />
      <Chibi
        {...DODI}
        x={620}
        y={1300}
        scale={0.9}
        facing={-1}
        moods={[
          [0, "happy"],
          [b(0.12), "joy"],
          [b(0.3), "happy"],
          [pirt, "joy"],
        ]}
        poses={[
          [0, "hold"],
          [b(0.12), "wave"],
          [b(0.24), "hold"],
          [pirt, "cheer"],
        ]}
        looks={[
          [0, [-1, 0.4]],
          [b(0.12), [0, 0]],
          [b(0.24), [-1, 0.6]],
        ]}
        holding={trayOut > 0 && f < b(0.12) || (f >= b(0.24) && f < pirt) ? <At x={0} y={-20} s={0.8}><Tray /></At> : undefined}
        jumps={[b(0.12), pirt + 8]}
        seed={4}
      />
      <Counter x={40} w={1000} />
      <At x={880} y={1060}>
        <Oven />
      </At>
      {[0, 1, 2].map((i) => (
        <At key={i} x={240 + i * 150} y={1062} s={0.85 * pop(f, jarsAt + i * 5, 10)} r={wave(f, 40, 2, i * 6)}>
          <NastarJar label={i === 1 ? pop(f, pirt, 9) : 0} />
        </At>
      ))}
      <At x={390} y={990}>
        <Impact start={pirt} r={110} color="#2FA36B" />
        <Burst start={pirt} n={14} r={260} />
      </At>
    </Svg>
  );
};

const Conflict: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const b = beats(dur);
  const open = ramp(f, b(0.02), b(0.08)) * (1 - ramp(f, b(0.2), b(0.25)));
  const boxOut = b(0.2);
  const interest = b(0.31);
  const check = b(0.45);
  const noPirt = b(0.6);
  const bpom = b(0.78);
  const doughT = ramp(f, b(0.06), b(0.15));
  return (
    <Svg>
      <KitchenBG jars={JARS} />
      <Floaties kind="heart" from={interest} to={check} x={260} y={600} spread={260} every={6} />
      <Floaties kind="rain" from={noPirt} to={dur} x={420} y={640} spread={520} every={7} />
      <Chibi
        {...RINA}
        x={230}
        y={1300}
        scale={0.86}
        moods={[
          [0, "happy"],
          [interest, "joy"],
          [check, "think"],
          [noPirt, "worried"],
          [bpom, "shock"],
        ]}
        poses={[
          [0, "idle"],
          [interest, "phone"],
          [check, "chin"],
          [bpom, "handsHead"],
        ]}
        looks={[
          [0, [1, 0.3]],
          [interest, [0.4, -0.4]],
          [check, [1, -0.6]],
          [bpom, [1, -0.8]],
        ]}
        jumps={[interest + 6]}
        flinch={[noPirt, bpom]}
        seed={5}
      />
      <Chibi
        {...DODI}
        x={600}
        y={1300}
        scale={0.9}
        moods={[
          [0, "determined"],
          [boxOut, "joy"],
          [check, "neutral"],
          [noPirt, "worried"],
          [bpom, "shock"],
        ]}
        poses={[
          [0, "present"],
          [boxOut, "cheer"],
          [check, "idle"],
          [noPirt, "handsHead"],
          [bpom + 20, "slump"],
        ]}
        looks={[
          [0, [1, 0]],
          [boxOut, [-1, 0.4]],
          [check, [-0.4, -0.6]],
          [bpom, [-0.6, -0.8]],
        ]}
        jumps={[boxOut + 4]}
        flinch={[noPirt, bpom]}
        seed={6}
      />
      <Counter x={40} w={760} />
      <At x={890} y={1300}>
        <Freezer open={open} />
        <At x={-60} y={-300}>
          <Mist start={b(0.03)} end={b(0.24)} />
        </At>
      </At>
      {/* dough goes in */}
      {doughT > 0 && doughT < 1 ? (
        <At x={interpolate(doughT, [0, 1], [700, 880])} y={interpolate(doughT, [0, 0.5, 1], [880, 760, 860])} r={doughT * 200}>
          <ellipse rx={56} ry={36} fill="#FFE2B0" stroke={OL} strokeWidth={5} />
        </At>
      ) : null}
      {/* the new product */}
      <At x={430} y={1062 - ramp(f, boxOut, boxOut + 10) * 0} s={pop(f, boxOut, 10) * (1 + (f > bpom ? 0 : 0))} r={wave(f, 50, 2)}>
        <FrozenBox label={f > noPirt - 10 ? "pirt" : undefined} labelS={pop(f, noPirt - 10, 9)} />
        {f > noPirt ? (
          <At x={-70} y={-24}>
            <Stamp t={pop(f, noPirt, 8)} />
            <Impact start={noPirt} r={60} color="#E5484D" />
          </At>
        ) : null}
      </At>
      <At x={430} y={960}>
        <Poof start={boxOut - 2} />
      </At>
      {/* supermarket likes it */}
      <At x={300} y={560} s={pop(f, interest) * (1 - ramp(f, check - 6, check))} r={wave(f, 30, 6)}>
        <circle r={86} fill="#fff" stroke={OL} strokeWidth={SW} />
        <At x={0} y={30} s={0.8}>
          <Cart />
        </At>
        <path d="M0 -12 C-26 -32 -16 -54 0 -40 C16 -54 26 -32 0 -12 Z" fill="#FF5C7A" stroke={OL} strokeWidth={4} transform="translate(40 -30) scale(1.2)" />
      </At>
      {/* the check: magnifier over the box */}
      {f > check && f < bpom ? (
        <At x={430 + wave(f, 26, 40)} y={880 + wave(f, 34, 20, 6)} s={pop(f, check)}>
          <circle r={70} fill="rgba(191,230,255,0.45)" stroke={OL} strokeWidth={14} />
          <line x1={50} y1={50} x2={120} y2={120} stroke={OL} strokeWidth={22} strokeLinecap="round" />
        </At>
      ) : null}
      {/* BPOM required */}
      <At x={560} y={560} s={pop(f, bpom, 9) * 1.5} r={-4 + wave(f, 40, 3)}>
        {f > bpom ? (
          <g>
            <rect x={-170} y={-130} width={340} height={70} rx={20} fill="#E5484D" stroke={OL} strokeWidth={6} />
            <T x={0} y={-82} size={40} weight={900} fill="#fff">
              WAJIB
            </T>
            <Label kind="bpom" />
            <T x={0} y={92} size={28} weight={900} fill="#1A56D6">
              izin edar
            </T>
          </g>
        ) : null}
      </At>
      {f > bpom
        ? [0, 1, 2, 3, 4, 5].map((i) => {
            const a = (i / 6) * Math.PI * 2 + f / 20;
            return (
              <At key={i} x={560 + Math.cos(a) * 300} y={560 + Math.sin(a) * 180} s={pop(f, bpom + i * 2)}>
                <Snow size={22} />
              </At>
            );
          })
        : null}
    </Svg>
  );
};

const Temptation: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const b = beats(dur);
  const grow = interpolate(f, [b(0.33), b(0.4)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.5)) });
  const pulled = b(0.52);
  const crack = b(0.72);
  const risky = b(0.83);
  const popAt = b(0.93);
  const bubbleT = f >= popAt ? Math.max(0, grow * (1 - ramp(f, popAt, popAt + 5))) : grow;
  const reach = ramp(f, b(0.05), b(0.3));
  const drop = ramp(f, risky + 6, risky + 20);
  const pullT = ramp(f, pulled, pulled + 16);
  return (
    <Svg>
      <KitchenBG jars={JARS} />
      <Floaties kind="rain" from={pulled} to={dur} x={640} y={620} spread={220} every={8} />
      <At x={560} y={520}>
        {bubbleT > 0.01 ? (
          <Thought t={bubbleT} w={800} h={560} tailX={160} tailY={330}>
            {/* mini supermarket shelf */}
            <rect x={-330} y={-40} width={660} height={20} rx={6} fill="#C9D3E3" stroke={OL} strokeWidth={5} />
            {[-240, -80, 80, 240].map((bx, i) => {
              const isOurs = i === 1;
              const px = isOurs ? bx + pullT * 260 : bx;
              const py = isOurs ? -40 + pullT * 140 : -40;
              return (
                <At key={bx} x={px} y={py} s={0.55} r={isOurs ? pullT * 30 : 0}>
                  {isOurs ? <FrozenBox label="pirt" /> : <rect x={-80} y={-150} width={160} height={150} rx={14} fill={["#E5484D", "", "#2FA36B", "#FFC93C"][i]} stroke={OL} strokeWidth={6} />}
                </At>
              );
            })}
            <At x={-60} y={-150} s={pop(f, pulled, 8) * 0.8}>
              <Stamp t={pop(f, pulled, 8)} text="DITARIK" />
            </At>
            <At x={0} y={150} s={0.6} r={crack < f ? ramp(f, crack, crack + 12) * 8 : 0}>
              <Sign front={STORE} w={680} />
              <Crack t={ramp(f, crack, crack + 10)} />
              <At x={200} y={0}>
                <Crack t={ramp(f, crack + 4, crack + 14)} />
              </At>
            </At>
            <At x={0} y={10}>
              <Stamp t={pop(f, risky, 8)} text="BERISIKO" />
            </At>
          </Thought>
        ) : null}
        <Burst start={popAt + 3} n={18} r={440} colors={["#fff", "#DCE4F0", "#C9D3E3"]} />
      </At>
      <Chibi
        {...RINA}
        x={220}
        y={1300}
        scale={0.86}
        moods={[
          [0, "neutral"],
          [b(0.2), "worried"],
          [risky, "determined"],
          [popAt, "happy"],
        ]}
        poses={[
          [0, "idle"],
          [b(0.2), "chin"],
          [risky, "no"],
          [popAt, "idle"],
        ]}
        looks={[
          [0, [1, 0.3]],
          [b(0.35), [1, -0.8]],
          [risky, [1, 0.2]],
        ]}
        shake={[risky + 2, risky + 30]}
        seed={7}
      />
      <Chibi
        {...DODI}
        x={660}
        y={1300}
        scale={0.9}
        facing={-1}
        moods={[
          [0, "think"],
          [b(0.12), "happy"],
          [pulled, "worried"],
          [crack, "shock"],
          [risky + 10, "sad"],
        ]}
        poses={[
          [0, "chin"],
          [b(0.1), "present"],
          [pulled, "handsHead"],
          [risky + 10, "slump"],
        ]}
        looks={[
          [0, [-1, 0.4]],
          [b(0.33), [0, -0.9]],
          [risky + 10, [-0.4, 0.8]],
        ]}
        lean={-reach * 8}
        holding={f < risky + 6 ? <At x={0} y={-10} s={0.4} r={-20}><Label kind="pirt" /></At> : undefined}
        flinch={[pulled, crack]}
        seed={8}
      />
      <Counter x={40} w={1000} />
      <At x={430} y={1062} s={0.9}>
        <FrozenBox />
      </At>
      {drop > 0 && drop < 1 ? (
        <At x={560 - drop * 60} y={880 + drop * drop * 300} r={drop * 300} s={0.4}>
          <Label kind="pirt" />
        </At>
      ) : null}
      {/* little "sneaky" sparkle while he reaches */}
      {f > b(0.1) && f < b(0.33)
        ? [0, 1].map((i) => (
            <At key={i} x={590 + i * 90} y={640 + wave(f, 20, 14, i * 6)} s={0.8 + wave(f, 12, 0.2)}>
              <path d="M0 -24 L7 -7 L24 -6 L11 6 L15 24 L0 14 L-15 24 L-11 6 L-24 -6 L-7 -7 Z" fill="#7B61FF" stroke={OL} strokeWidth={4} />
            </At>
          ))
        : null}
    </Svg>
  );
};

const PanelCard: React.FC<{ kind: "pirt" | "bpom"; t: number; ok: number; children: React.ReactNode; cond: React.ReactNode; condText: string }> = ({ kind, t, ok, children, cond, condText }) => (
  <g opacity={Math.min(1, t * 2)} transform={`translate(0 ${(1 - t) * 300}) scale(${0.6 + t * 0.4})`}>
    <rect x={-230} y={-250} width={460} height={500} rx={34} fill="#fff" stroke={OL} strokeWidth={7} />
    <At x={0} y={-250} s={0.9}>
      <Label kind={kind} />
    </At>
    <At x={-130} y={-140}>{cond}</At>
    <T x={40} y={-128} size={30} weight={900} fill={kind === "pirt" ? "#C27A00" : "#1A56D6"}>
      {condText}
    </T>
    {children}
    {ok > 0.01 ? (
      <At x={170} y={200} s={ok}>
        <circle r={46} fill="#2FA36B" stroke={OL} strokeWidth={6} />
        <path d="M-20 0 L-5 16 L22 -16" stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </At>
    ) : null}
  </g>
);

const Lesson: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const b = beats(dur);
  const pirtIn = b(0.17);
  const okPirt = b(0.44);
  const bpomIn = b(0.5);
  const okBpom = b(0.74);
  const finale = b(0.82);
  const mouth = React.useMemo(() => chatter(dur, [[0.01, 0.97]]), [dur]);
  const p1 = interpolate(f, [pirtIn, pirtIn + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.3)) });
  const p2 = interpolate(f, [bpomIn, bpomIn + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.3)) });
  return (
    <Svg>
      <KitchenBG jars={JARS} hideWindow />
      <Floaties kind="star" from={okPirt} to={okPirt + 30} x={290} y={700} spread={300} />
      <Floaties kind="star" from={okBpom} to={okBpom + 30} x={790} y={700} spread={300} />
      <Floaties kind="heart" from={finale} to={dur} x={540} y={980} spread={700} every={5} />
      <At x={290} y={490} s={0.9} r={wave(f, 60, 1.5)}>
        <PanelCard kind="pirt" t={p1} ok={pop(f, okPirt, 9)} cond={<Sun r={30} />} condText="suhu ruang">
          <At x={-110} y={170} s={pop(f, b(0.3), 10) * 0.85}>
            <NastarJar />
          </At>
          <At x={60} y={170} s={pop(f, b(0.36), 10) * 0.8}>
            <Keripik />
          </At>
        </PanelCard>
      </At>
      <At x={790} y={490} s={0.9} r={wave(f, 60, 1.5, 20)}>
        <PanelCard kind="bpom" t={p2} ok={pop(f, okBpom, 9)} cond={<Snow size={30} color="#7CC8FF" />} condText="dingin / beku">
          <At x={-130} y={180} s={pop(f, b(0.57), 10) * 0.5}>
            <FrozenBox />
          </At>
          <At x={10} y={190} s={pop(f, b(0.62), 10) * 0.75}>
            <Milk />
          </At>
          <At x={110} y={190} s={pop(f, b(0.67), 10) * 0.62}>
            <Bottle />
          </At>
        </PanelCard>
      </At>
      <Chibi
        {...RINA}
        x={170}
        y={1300}
        scale={0.72}
        moods={[
          [0, "sad"],
          [b(0.02), "shock"],
          [b(0.08), "happy"],
          [okPirt, "joy"],
          [b(0.5), "think"],
          [okBpom, "joy"],
        ]}
        poses={[
          [0, "slump"],
          [b(0.02), "handsHead"],
          [b(0.08), "idle"],
          [okPirt, "cheer"],
          [b(0.5), "chin"],
          [okBpom, "cheer"],
          [finale, "highfive"],
        ]}
        looks={[
          [0, [0, 0.8]],
          [b(0.02), [1, 0]],
          [pirtIn, [0.4, -1]],
          [bpomIn, [1, -1]],
          [finale, [1, -0.3]],
        ]}
        jumps={[okPirt, okBpom, finale + 6]}
        flinch={[b(0.02)]}
        seed={9}
      />
      <Chibi
        {...DODI}
        x={420}
        y={1300}
        scale={0.74}
        moods={[
          [0, "sad"],
          [b(0.02), "shock"],
          [b(0.08), "happy"],
          [okPirt, "joy"],
          [b(0.5), "think"],
          [okBpom, "joy"],
        ]}
        poses={[
          [0, "slump"],
          [b(0.02), "handsHead"],
          [b(0.08), "idle"],
          [okPirt, "wave"],
          [b(0.5), "chin"],
          [okBpom, "cheer"],
        ]}
        looks={[
          [0, [0, 0.8]],
          [b(0.02), [1, 0]],
          [pirtIn, [-0.4, -1]],
          [bpomIn, [1, -1]],
        ]}
        jumps={[okPirt + 4, okBpom + 4, finale + 10]}
        flinch={[b(0.02)]}
        seed={10}
      />
      <Counter x={40} w={1000} />
      <At x={540} y={1170} s={pop(f, finale, 10)} r={-2 + wave(f, 40, 2)}>
        <rect x={-400} y={-56} width={800} height={112} rx={56} fill="#2FA36B" stroke={OL} strokeWidth={7} />
        <T x={0} y={18} size={46} weight={900} fill="#fff">
          Cek dulu jenis produkmu!
        </T>
      </At>
      <At x={800} y={860}>
        <Poof start={0} />
      </At>
      <Lea
        x={800}
        y={1062}
        scale={0.66}
        facing={-1}
        mouth={mouth}
        open={ramp(f, b(0.08), b(0.12)) * (1 - ramp(f, b(0.16), b(0.2)))}
        look={[1, 0]}
        poses={[
          [0, "wave"],
          [b(0.1), "cheer"],
          [pirtIn, "point"],
          [bpomIn, "present"],
          [finale, "highfive"],
        ]}
        jumps={[b(0.1), finale + 4]}
      />
      <At x={600} y={720}>
        <Burst start={finale + 6} n={16} r={300} />
      </At>
    </Svg>
  );
};

const Ending: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const b = beats(dur);
  const reg = b(0.36);
  const shelf = b(0.62);
  return (
    <Svg>
      <StoreShelves />
      <Floaties kind="heart" from={reg} to={dur} x={540} y={900} spread={700} every={5} />
      <Floaties kind="star" from={shelf} to={dur} x={540} y={700} spread={800} every={6} />
      <Chibi
        {...RINA}
        x={250}
        y={1300}
        scale={0.86}
        moods={[
          [0, "happy"],
          [reg, "joy"],
        ]}
        poses={[
          [0, "present"],
          [reg, "cheer"],
        ]}
        looks={[
          [0, [1, 0.6]],
          [reg, [0.4, -0.5]],
        ]}
        jumps={[reg, reg + 22, shelf + 10]}
        seed={11}
      />
      <Chibi
        {...DODI}
        x={500}
        y={1300}
        scale={0.88}
        moods={[
          [0, "happy"],
          [reg, "joy"],
        ]}
        poses={[
          [0, "idle"],
          [reg, "cheer"],
          [shelf, "highfive"],
        ]}
        looks={[
          [0, [1, 0.6]],
          [reg, [-0.4, -0.5]],
        ]}
        jumps={[reg + 6, reg + 28, shelf + 16]}
        seed={12}
      />
      <Chibi
        {...SHOPPER}
        x={860}
        y={1300}
        scale={0.82}
        facing={-1}
        walk={{ from: 1350, start: shelf - 6, dur: 22 }}
        moods={[[0, "joy"]]}
        poses={[
          [0, "walk"],
          [shelf + 16, "hold"],
        ]}
        holding={f > shelf + 20 ? <At x={0} y={-20} s={0.45}><FrozenBox label="bpom" /></At> : undefined}
        seed={13}
      />
      <FreezerCase />
      {[0, 1, 2, 3].map((i) => {
        const st = shelf + i * 4;
        const x = interpolate(f, [st, st + 14], [-200, 180 + i * 240], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.4)) });
        return (
          <At key={i} x={x} y={1066} s={0.62} r={wave(f, 40, 2, i * 5)}>
            <FrozenBox label="bpom" labelS={1} />
          </At>
        );
      })}
      <At x={540} y={440} s={pop(f, reg, 9) * 1.5} r={-6 + wave(f, 40, 3)}>
        <Label kind="bpom" />
        <At x={110} y={-40} s={0.5}>
          <circle r={46} fill="#2FA36B" stroke={OL} strokeWidth={6} />
          <path d="M-20 0 L-5 16 L22 -16" stroke="#fff" strokeWidth={10} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </At>
      </At>
      <At x={540} y={440}>
        <Burst start={reg} n={22} r={520} />
        <Impact start={reg} r={220} color="#1A56D6" />
      </At>
      <Confetti start={reg} />
    </Svg>
  );
};

const Pitch: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const b = beats(dur);
  const card = interpolate(f, [b(0.4), b(0.46)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.4)) });
  const wa = pop(f, b(0.72), 10);
  const mouth = React.useMemo(() => chatter(dur, [[0.02, 0.95]]), [dur]);
  const swing = Math.sin(f / 9);
  return (
    <Svg>
      <At x={540} y={250} s={pop(f, 4)}>
        <T x={0} y={0} size={70} weight={900} fill="#fff">
          PIRT atau BPOM?
        </T>
      </At>
      <At x={300} y={500} s={pop(f, 8) * (1 + Math.max(0, swing) * 0.15)} r={-8 + swing * 6}>
        <Label kind="pirt" />
      </At>
      <At x={780} y={500} s={pop(f, 12) * (1 + Math.max(0, -swing) * 0.15)} r={8 - swing * 6}>
        <Label kind="bpom" />
      </At>
      {[0, 1, 2].map((i) => (
        <At key={i} x={430 + i * 110} y={430 + wave(f, 22, 18, i * 7)} s={pop(f, 10 + i * 4)} r={wave(f, 26, 14, i * 5)}>
          <T x={0} y={0} size={80} weight={900} fill="#FFC93C">
            ?
          </T>
        </At>
      ))}
      <At x={540} y={830} s={card} r={(1 - card) * -10}>
        <rect x={-420} y={-160} width={840} height={320} rx={40} fill="#fff" stroke={OL} strokeWidth={8} />
        <rect x={-420} y={-160} width={840} height={100} rx={40} fill="#1A56D6" stroke={OL} strokeWidth={8} />
        <T x={0} y={-94} size={42} weight={900} fill="#fff">
          Konsultasi izin produk
        </T>
        <T x={0} y={50} size={110} weight={900} fill="#2FA36B">
          GRATIS
        </T>
        <T x={0} y={120} size={34} weight={800} fill="#55607A">
          bareng LegalEase
        </T>
      </At>
      <Lea
        x={250}
        y={1330}
        scale={0.6}
        enter={{ from: -300, start: 0, dur: 16 }}
        mouth={mouth}
        look={[1, -0.3]}
        poses={[
          [0, "wave"],
          [b(0.4), "present"],
          [b(0.72), "point"],
        ]}
        jumps={[b(0.46)]}
      />
      <Chibi {...RINA} x={860} y={1340} scale={0.4} facing={-1} moods={[[0, "joy"]]} poses={[[0, "wave"]]} walk={{ from: 1300, start: b(0.45), dur: 18 }} seed={14} />
      <Chibi {...DODI} x={990} y={1340} scale={0.4} facing={-1} moods={[[0, "joy"]]} poses={[[0, "cheer"]]} walk={{ from: 1400, start: b(0.48), dur: 18 }} seed={15} />
      <At x={600} y={1230} s={wa * (1 + wave(f, 30, 0.03))}>
        <rect x={-250} y={-62} width={500} height={124} rx={62} fill="#25D366" stroke={OL} strokeWidth={7} />
        <T x={0} y={-6} size={38} weight={900} fill="#fff">
          Chat WhatsApp
        </T>
        <T x={0} y={38} size={30} weight={800} fill="#fff">
          0821-4214-4904
        </T>
      </At>
      <At x={600} y={1340} o={wa}>
        <text x={0} y={0} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={30} fill="#C9D7EA">
          legalease.asia
        </text>
      </At>
    </Svg>
  );
};

type W = { at: number; text: string; x: number; y: number; r?: number; color?: string; size?: number; hold?: number };
/** Sticker words timed as fractions of the scene. */
const sticks = (words: W[]): React.FC<{ dur: number }> => {
  const Comp: React.FC<{ dur: number }> = ({ dur }) => <Stickers words={words.map((w) => ({ ...w, at: (w.at * dur) / 30 }))} />;
  return Comp;
};

const kitchen = { setting: "kitchen" as const, vivid: true, wall: WALL, floor: FLOOR };

export const V8: VideoDef = {
  id: "roti-beku-rina-dodi",
  title: "Storytime: Roti Beku Rina & Dodi",
  date: "Episode 2",
  scenes: [
    {
      id: "01-hook",
      text: "Roti beku buatan Rina dan Dodi sudah dipesan supermarket! Tapi seminggu sebelum dikirim... *semuanya batal.*",
      ...kitchen,
      Overlay: sticks([
        { at: 0.02, text: "TING!", x: 300, y: 1700, r: -8, color: "#FF5C7A" },
        { at: 0.27, text: "500 PACK!", x: 540, y: 1700, size: 90 },
        { at: 0.57, text: "TAPI...", x: 540, y: 1700, size: 100, color: "#FF5C7A", hold: 1.2 },
        { at: 0.85, text: "BATAL!", x: 540, y: 1700, size: 110, color: "#E5484D", hold: 2 },
      ]),
      camera: {
        grade: "warm",
        shotsFrac: true,
        shots: [
          { at: 0, zoom: 2.2, x: 400, y: 980 },
          { at: 0.1, zoom: 1.0, x: 540, y: 900, ease: 0.3 },
          { at: 0.42, zoom: 1.35, x: 640, y: 940, ease: 0.4 },
          { at: 0.56, zoom: 1.0, x: 540, y: 900, ease: 0.3 },
          { at: 0.84, zoom: 1.6, x: 600, y: 760, ease: 0.15 },
        ],
      },
      Visual: Hook,
    },
    {
      id: "02-tokoh",
      text: "Ini Rina dan Dodi. Toko roti kecil mereka sudah jalan tiga tahun. Nastar dan kue keringnya laris, dan sudah punya *izin PIRT.*",
      ...kitchen,
      Overlay: sticks([
        { at: 0.03, text: "INI RINA & DODI!", x: 540, y: 1700, size: 76 },
        { at: 0.3, text: "3 TAHUN", x: 760, y: 1815, r: 7, color: "#7CE0A3" },
        { at: 0.55, text: "LARIS!", x: 300, y: 1700, r: -8, color: "#FF8FA3" },
        { at: 0.84, text: "PUNYA PIRT ✓", x: 540, y: 1700, color: "#7CE0A3", hold: 2 },
      ]),
      camera: {
        grade: "warm",
        shotsFrac: true,
        shots: [
          { at: 0, zoom: 1.0, x: 540, y: 900 },
          { at: 0.2, zoom: 1.5, x: 760, y: 900, ease: 0.5 },
          { at: 0.46, zoom: 1.5, x: 400, y: 960, ease: 0.6 },
          { at: 0.8, zoom: 1.9, x: 390, y: 960, ease: 0.3 },
          { at: 0.92, zoom: 1.0, x: 540, y: 900, ease: 0.5 },
        ],
      },
      Visual: Intro,
    },
    {
      id: "03-konflik",
      text: "Lalu mereka bikin produk baru, roti beku, tinggal panggang di rumah. Supermarket langsung tertarik. Tapi waktu dicek, roti beku *tidak bisa pakai PIRT.* Produk yang harus disimpan beku, wajib *izin edar BPOM.*",
      ...kitchen,
      Overlay: sticks([
        { at: 0.05, text: "PRODUK BARU!", x: 540, y: 1700, size: 84 },
        { at: 0.31, text: "SUPERMARKET SUKA!", x: 540, y: 1700, size: 70, color: "#7CE0A3" },
        { at: 0.6, text: "PIRT TIDAK CUKUP", x: 540, y: 1700, size: 66, color: "#FF8FA3" },
        { at: 0.8, text: "WAJIB BPOM!", x: 540, y: 1700, size: 100, color: "#9BD6FF", hold: 2.2 },
      ]),
      camera: {
        grade: "tense",
        shotsFrac: true,
        shake: [0.6, 0.78],
        shots: [
          { at: 0, zoom: 1.4, x: 760, y: 900 },
          { at: 0.2, zoom: 1.0, x: 540, y: 900, ease: 0.5 },
          { at: 0.3, zoom: 1.45, x: 330, y: 760, ease: 0.4 },
          { at: 0.45, zoom: 1.7, x: 430, y: 930, ease: 0.4 },
          { at: 0.76, zoom: 1.0, x: 540, y: 820, ease: 0.25 },
        ],
      },
      Visual: Conflict,
    },
    {
      id: "04-godaan",
      text: "Dodi sempat mau pakai nomor PIRT yang lama saja. Tapi kalau ketahuan, produknya bisa *ditarik dari rak,* dan nama toko mereka ikut rusak.",
      ...kitchen,
      Overlay: sticks([
        { at: 0.03, text: "Hmm...", x: 820, y: 1700, r: 8, color: "#C9B8FF" },
        { at: 0.52, text: "DITARIK!", x: 540, y: 1700, size: 100, color: "#FF5C7A" },
        { at: 0.83, text: "BERISIKO!", x: 540, y: 1700, size: 100, color: "#E5484D", hold: 2 },
      ]),
      camera: {
        grade: "cool",
        shotsFrac: true,
        shots: [
          { at: 0, zoom: 1.7, x: 600, y: 900 },
          { at: 0.33, zoom: 1.3, x: 560, y: 600, ease: 0.5 },
          { at: 0.84, zoom: 1.8, x: 240, y: 820, ease: 0.15 },
          { at: 0.93, zoom: 1.0, x: 540, y: 900, ease: 0.3 },
        ],
      },
      Visual: Temptation,
    },
    {
      id: "05-pelajaran",
      text: "Tenang, Rina, Dodi! Gampangnya begini. Pangan rumahan yang awet di suhu ruang, seperti kue kering dan keripik, cukup *PIRT.* Tapi yang harus disimpan dingin atau beku, susu, dan air minum kemasan, butuh *BPOM.* Jadi cek dulu jenis produkmu, sebelum mulai jualan.",
      ...kitchen,
      Overlay: sticks([
        { at: 0.02, text: "TENANG!", x: 540, y: 1700, size: 100, color: "#7CE0A3" },
        { at: 0.44, text: "CUKUP PIRT", x: 300, y: 1700, r: -6, color: "#7CE0A3" },
        { at: 0.74, text: "BUTUH BPOM", x: 760, y: 1700, r: 6, color: "#9BD6FF" },
        { at: 0.86, text: "CEK DULU!", x: 540, y: 1815, size: 96, color: "#FFC93C", hold: 2 },
      ]),
      camera: {
        grade: "bright",
        shotsFrac: true,
        shots: [
          { at: 0, zoom: 1.8, x: 780, y: 860 },
          { at: 0.13, zoom: 1.0, x: 540, y: 900, ease: 0.4 },
          { at: 0.2, zoom: 1.35, x: 300, y: 640, ease: 0.5 },
          { at: 0.5, zoom: 1.35, x: 780, y: 640, ease: 0.6 },
          { at: 0.8, zoom: 1.0, x: 540, y: 900, ease: 0.4 },
        ],
      },
      Visual: Lesson,
    },
    {
      id: "06-akhir",
      text: "Sekarang, roti beku Rina dan Dodi sudah *terdaftar BPOM,* dan resmi masuk rak supermarket.",
      setting: "store",
      vivid: true,
      wall: "#DDF6EA",
      floor: FLOOR,
      Overlay: sticks([
        { at: 0.36, text: "TERDAFTAR BPOM!", x: 540, y: 1700, size: 76, color: "#9BD6FF", hold: 1.4 },
        { at: 0.66, text: "MASUK RAK!", x: 540, y: 1700, size: 96, color: "#7CE0A3", hold: 2 },
      ]),
      camera: {
        grade: "warm",
        shotsFrac: true,
        shots: [
          { at: 0, zoom: 1.7, x: 380, y: 900 },
          { at: 0.3, zoom: 1.0, x: 540, y: 900, ease: 0.4 },
        ],
      },
      Visual: Ending,
    },
    {
      id: "07-jualan",
      text: "Bingung produkmu butuh PIRT atau BPOM? *Konsultasi gratis* bareng LegalEase. Chat WhatsApp di bio, ya!",
      setting: "navy",
      vivid: true,
      camera: {
        grade: "night",
        shotsFrac: true,
        shots: [
          { at: 0, zoom: 1.5, x: 540, y: 520 },
          { at: 0.36, zoom: 1.0, x: 540, y: 900, ease: 0.5 },
        ],
      },
      Visual: Pitch,
    },
  ],
};
