import React from "react";
import { Easing, interpolate, random, useCurrentFrame } from "remotion";
import { pop, ramp, wave } from "../components/anim";
import { Chibi, ChibiLook, OL } from "../components/Chibi";
import { Lea } from "../components/Lea";
import { At, Badge, Coin, Doc, Envelope, Spark, Steam, T } from "../components/Props";
import { Svg } from "../components/Stage";
import { C, FONT } from "../theme";
import type { VideoDef } from "../types";
import MOUTH from "../data/orderan-bu-sari-mouth.json";

// Times inside each scene are seconds of its dub (ElevenLabs take, 10 Nov 2026).
const s = (sec: number) => Math.round(sec * 30);

export const SARI: ChibiLook = { hair: "hijab", hijab: "#C2344D", hijabShade: "#9E2440", skin: "#E9B48A", shirt: "#F39A4E", shirtShade: "#D97A32", skirt: "#F39A4E", apron: "#FFFFFF" };
const TEMAN: ChibiLook = { hair: "short", hairColor: "#2B1B17", skin: "#F2C29B", shirt: "#7B61FF", shirtShade: "#5C44D6", pants: "#2D3A6B", lash: false };
const KURIR: ChibiLook = { hair: "short", hairColor: "#2B1B17", skin: "#C98A5E", shirt: "#2FA36B", shirtShade: "#1F7F52", pants: "#2D3A6B", lash: false };

const SW = 6; // outline width for props

// ---------------------------------------------------------------------------
// Props

const NasiBox: React.FC<{ t?: number }> = ({ t = 1 }) => (
  <g>
    <rect x={-70} y={-70} width={140} height={70} rx={10} fill="#fff" stroke={OL} strokeWidth={SW} />
    <circle cx={-30} cy={-46} r={18} fill="#FFF7E8" stroke={OL} strokeWidth={3} />
    <rect x={0} y={-60} width={44} height={22} rx={8} fill="#8B3A1E" stroke={OL} strokeWidth={3} />
    <circle cx={20} cy={-22} r={10} fill="#7CC36E" stroke={OL} strokeWidth={3} />
    <g transform={`translate(-70 -70) rotate(${-110 * (1 - t)})`}>
      <rect x={0} y={-18} width={140} height={22} rx={8} fill="#F7F1E6" stroke={OL} strokeWidth={SW} />
      <rect x={50} y={-12} width={40} height={10} rx={4} fill={C.gold} />
    </g>
  </g>
);

const Wok: React.FC<{ toss?: number[] }> = ({ toss = [] }) => {
  const f = useCurrentFrame();
  let lift = 0;
  for (const t0 of toss) {
    const d = f - t0;
    if (d >= 0 && d < 12) lift = Math.max(lift, Math.sin((d / 12) * Math.PI) * 30);
  }
  return (
    <g>
      {[-40, 0, 40].map((dx, i) => (
        <path key={i} d={`M${dx - 16} 0 Q${dx} ${-40 - wave(f, 8, 10, i * 3)} ${dx + 16} 0 Z`} fill={i === 1 ? "#FFC93C" : "#FF7A3D"} stroke={OL} strokeWidth={4} />
      ))}
      <g transform={`translate(0 ${-lift}) rotate(${-lift * 0.3})`}>
        <path d="M-170 -60 Q0 50 170 -60 Z" fill="#3A3F4F" stroke={OL} strokeWidth={SW} strokeLinejoin="round" />
        <path d="M-150 -58 Q0 14 150 -58 Z" fill="#9B3E1E" />
        <line x1={170} y1={-62} x2={260} y2={-84} stroke={OL} strokeWidth={22} strokeLinecap="round" />
        <line x1={170} y1={-62} x2={260} y2={-84} stroke="#5B4636" strokeWidth={10} strokeLinecap="round" />
      </g>
      {/* tossed food */}
      {toss.map((t0, k) =>
        [0, 1, 2, 3].map((i) => {
          const d = f - t0 - 3;
          if (d < 0 || d > 24) return null;
          const tt = d / 24;
          const x = -60 + i * 40 + (random(`tx${k}${i}`) - 0.5) * 40 * tt;
          const y = -60 - Math.sin(tt * Math.PI) * (160 + i * 30);
          return <circle key={`${k}${i}`} cx={x} cy={y} r={14} fill={i % 2 ? "#B84A24" : "#7CC36E"} stroke={OL} strokeWidth={3} />;
        }),
      )}
      <At x={0} y={-110}>
        <Steam />
      </At>
    </g>
  );
};

/** Counter top with a wooden front. Characters drawn before it stand behind it. */
const Counter: React.FC<{ x: number; w: number; y?: number }> = ({ x, w, y = 1060 }) => (
  <g>
    <rect x={x + 10} y={y + 26} width={w - 20} height={1300 - y - 26} fill="#D99A62" stroke={OL} strokeWidth={SW} />
    {[0, 1, 2].map((i) => (
      <rect key={i} x={x + 40 + (i * (w - 80)) / 3} y={y + 60} width={(w - 80) / 3 - 20} height={150} rx={12} fill="#C9844C" stroke={OL} strokeWidth={4} />
    ))}
    <rect x={x} y={y} width={w} height={32} rx={10} fill="#8C5A35" stroke={OL} strokeWidth={SW} />
  </g>
);

const Sign: React.FC<{ front: string; back?: string; flip?: number; w?: number }> = ({ front, back, flip = 0, w = 560 }) => {
  const sx = Math.cos(flip * Math.PI);
  const showBack = sx < 0;
  return (
    <g>
      <line x1={-w / 3} y1={-130} x2={-w / 3} y2={-60} stroke={OL} strokeWidth={6} />
      <line x1={w / 3} y1={-130} x2={w / 3} y2={-60} stroke={OL} strokeWidth={6} />
      <g transform={`scale(${Math.max(0.02, Math.abs(sx))} 1)`}>
        <rect x={-w / 2} y={-62} width={w} height={124} rx={30} fill={showBack ? "#1A56D6" : "#C2344D"} stroke={OL} strokeWidth={SW} />
        <rect x={-w / 2 + 14} y={-48} width={w - 28} height={96} rx={20} fill="none" stroke="#fff" strokeWidth={4} strokeDasharray="12 10" opacity={0.7} />
        <T x={0} y={18} size={showBack ? 42 : 52} weight={900} fill="#fff">
          {showBack ? back : front}
        </T>
      </g>
    </g>
  );
};

/** Cartoon phone (outlined), centred. Children in screen coords 0..w, 0..h. */
const Hp: React.FC<{ w?: number; h?: number; children?: React.ReactNode }> = ({ w = 460, h = 860, children }) => (
  <g>
    <rect x={-w / 2 - 18} y={-h / 2 - 18} width={w + 36} height={h + 36} rx={64} fill="#2D3A6B" stroke={OL} strokeWidth={SW} />
    <g transform={`translate(${-w / 2} ${-h / 2})`}>
      <clipPath id="hpclip">
        <rect width={w} height={h} rx={46} />
      </clipPath>
      <g clipPath="url(#hpclip)">
        <rect width={w} height={h} fill="#ECE5DD" />
        {children}
      </g>
    </g>
    <rect x={-50} y={-h / 2 - 8} width={100} height={14} rx={7} fill={OL} />
  </g>
);

const Motor: React.FC<{ moving?: boolean; rider?: boolean; box?: boolean }> = ({ moving = true, rider = true, box = true }) => {
  const f = useCurrentFrame();
  const spin = moving ? f * 20 : 0;
  const bob = moving ? Math.abs(wave(f, 6, 5)) : 0;
  return (
    <g transform={`translate(0 ${-bob})`}>
      {[-120, 120].map((wx) => (
        <g key={wx} transform={`translate(${wx} -54) rotate(${spin})`}>
          <circle r={54} fill="#2A2A35" stroke={OL} strokeWidth={SW} />
          <circle r={24} fill="#C9D3E3" stroke={OL} strokeWidth={4} />
          <line x1={-24} y1={0} x2={24} y2={0} stroke={OL} strokeWidth={5} />
        </g>
      ))}
      <path d="M-160 -96 L-40 -96 L0 -150 L120 -150 L164 -84 L-160 -84 Z" fill="#2FA36B" stroke={OL} strokeWidth={SW} strokeLinejoin="round" />
      <circle cx={150} cy={-128} r={16} fill="#FFE38A" stroke={OL} strokeWidth={4} />
      {box ? (
        <g>
          <rect x={-230} y={-226} width={130} height={120} rx={14} fill="#F39A4E" stroke={OL} strokeWidth={SW} />
          <T x={-165} y={-156} size={24} weight={900} fill="#fff">
            NASI
          </T>
        </g>
      ) : null}
      {rider ? (
        <g transform="translate(10 -90)">
          <Chibi {...KURIR} x={0} y={0} scale={0.42} poses={[[0, "point"]]} moods={[[0, "happy"]]} seed={7} />
          {/* helmet */}
          <path d="M-58 -270 Q-58 -330 0 -330 Q58 -330 58 -270 L58 -250 L-58 -250 Z" fill="#2FA36B" stroke={OL} strokeWidth={5} opacity={0.95} />
        </g>
      ) : null}
      {moving
        ? [0, 1, 2].map((i) => (
            <line key={i} x1={-280 - i * 30} y1={-70 - i * 46} x2={-370 - i * 40} y2={-70 - i * 46} stroke="#fff" strokeWidth={9} strokeLinecap="round" opacity={0.75} />
          ))
        : null}
    </g>
  );
};

const Ktp: React.FC = () => (
  <g>
    <rect x={-120} y={-76} width={240} height={152} rx={16} fill="#BFE0FF" stroke={OL} strokeWidth={SW} />
    <rect x={-100} y={-44} width={70} height={92} rx={10} fill="#fff" stroke={OL} strokeWidth={4} />
    <circle cx={-65} cy={-12} r={18} fill="#E9B48A" stroke={OL} strokeWidth={3} />
    <path d="M-92 40 Q-65 10 -38 40 Z" fill="#C2344D" stroke={OL} strokeWidth={3} />
    <T x={44} y={-30} size={30} weight={900} fill="#1A56D6">
      KTP
    </T>
    <rect x={2} y={0} width={86} height={11} rx={5} fill="#fff" />
    <rect x={2} y={24} width={64} height={11} rx={5} fill="#fff" />
  </g>
);

const BankBook: React.FC = () => (
  <g>
    <rect x={-96} y={-64} width={192} height={128} rx={14} fill="#2D3A6B" stroke={OL} strokeWidth={SW} />
    <rect x={-96} y={-64} width={34} height={128} rx={10} fill="rgba(255,255,255,0.15)" />
    <T x={16} y={-8} size={22} weight={900} fill="#FFC93C">
      REKENING
    </T>
    <T x={16} y={26} size={22} weight={800} fill="#fff">
      PRIBADI
    </T>
  </g>
);

const Thought: React.FC<{ t: number; w: number; h: number; tailX?: number; tailY?: number; children?: React.ReactNode }> = ({ t, w, h, tailX = -240, tailY = 340, children }) => {
  const f = useCurrentFrame();
  const puffs = 12;
  return (
    <g opacity={Math.min(1, t * 2)}>
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={tailX * (1 - i * 0.3)} cy={tailY * (1 - i * 0.28)} r={Math.max(0, (16 + i * 10) * Math.min(1, t * 3 - i * 0.3))} fill="#fff" stroke={OL} strokeWidth={5} />
      ))}
      <g transform={`scale(${t})`}>
        {Array.from({ length: puffs }).map((_, i) => {
          const a = (i / puffs) * Math.PI * 2;
          return <circle key={i} cx={Math.cos(a) * w * 0.47} cy={Math.sin(a) * h * 0.45} r={90 + wave(f, 50, 6, i * 7)} fill="#fff" stroke={OL} strokeWidth={6} />;
        })}
        <ellipse cx={0} cy={0} rx={w * 0.52} ry={h * 0.5} fill="#fff" />
        {children}
      </g>
    </g>
  );
};

const Burst: React.FC<{ start: number; n?: number; r?: number; colors?: string[]; seed?: string }> = ({ start, n = 14, r = 320, colors = [C.gold, "#1A56D6", "#E5484D", "#2FA36B"], seed = "b" }) => {
  const f = useCurrentFrame();
  const d = f - start;
  if (d < 0 || d > 40) return null;
  const t = Easing.out(Easing.cubic)(d / 40);
  return (
    <g opacity={1 - d / 40}>
      {Array.from({ length: n }).map((_, i) => {
        const a = (i / n) * Math.PI * 2 + random(`${seed}${i}`) * 0.5;
        const rr = r * (0.6 + random(`${seed}r${i}`) * 0.5) * t;
        const x = Math.cos(a) * rr;
        const y = Math.sin(a) * rr + d * d * 0.08;
        return <rect key={i} x={x - 10} y={y - 10} width={20} height={20} rx={4} fill={colors[i % colors.length]} stroke={OL} strokeWidth={3} transform={`rotate(${d * 12 + i * 30} ${x} ${y})`} />;
      })}
    </g>
  );
};

/** Puff of smoke for magical entrances. */
const Poof: React.FC<{ start: number }> = ({ start }) => {
  const f = useCurrentFrame();
  const d = f - start;
  if (d < 0 || d > 26) return null;
  const t = Easing.out(Easing.cubic)(d / 26);
  return (
    <g opacity={1 - t}>
      {Array.from({ length: 9 }).map((_, i) => {
        const a = (i / 9) * Math.PI * 2;
        return <circle key={i} cx={Math.cos(a) * 150 * t} cy={Math.sin(a) * 110 * t} r={60 * (1 - t * 0.4)} fill="#fff" stroke={OL} strokeWidth={5} />;
      })}
      {[0, 1, 2, 3].map((i) => (
        <At key={`s${i}`} x={Math.cos(i * 1.6) * 220 * t} y={Math.sin(i * 1.6) * 180 * t} s={1 - t * 0.5}>
          <Spark size={34} />
        </At>
      ))}
    </g>
  );
};

const Confetti: React.FC<{ start: number }> = ({ start }) => {
  const f = useCurrentFrame();
  const d = f - start;
  if (d < 0) return null;
  return (
    <g>
      {Array.from({ length: 50 }).map((_, i) => {
        const x = random(`cx${i}`) * 1200 - 60 + Math.sin((d + i * 9) / 10) * 30;
        const y = -100 + d * (10 + random(`cv${i}`) * 9) - random(`cy${i}`) * 500;
        return <rect key={i} x={x} y={y} width={18} height={30} rx={4} fill={[C.gold, "#1A56D6", "#E5484D", "#2FA36B", "#fff"][i % 5]} transform={`rotate(${d * 8 + i * 40} ${x + 9} ${y + 15})`} />;
      })}
    </g>
  );
};

const Stamp: React.FC<{ t: number; ok?: boolean; text?: string }> = ({ t, ok = false, text }) => {
  if (t <= 0.01) return null;
  const sc = 2.4 - t * 1.4;
  return (
    <g transform={`scale(${sc}) rotate(-12)`} opacity={Math.min(1, t * 1.6)}>
      {text ? (
        <g>
          <rect x={-170} y={-56} width={340} height={112} rx={20} fill="rgba(255,255,255,0.85)" stroke={ok ? C.green : "#E5484D"} strokeWidth={12} />
          <T x={0} y={24} size={64} weight={900} fill={ok ? C.green : "#E5484D"}>
            {text}
          </T>
        </g>
      ) : (
        <Badge ok={ok} r={42} />
      )}
    </g>
  );
};

/** Comic "impact" lines around a point. */
const Impact: React.FC<{ start: number; r?: number; color?: string }> = ({ start, r = 200, color = OL }) => {
  const f = useCurrentFrame();
  const d = f - start;
  if (d < 0 || d > 14) return null;
  const t = d / 14;
  return (
    <g stroke={color} strokeWidth={9} strokeLinecap="round" opacity={1 - t}>
      {Array.from({ length: 10 }).map((_, i) => {
        const a = (i / 10) * Math.PI * 2;
        const r1 = r * (0.7 + t * 0.4);
        const r2 = r1 + 60;
        return <line key={i} x1={Math.cos(a) * r1} y1={Math.sin(a) * r1} x2={Math.cos(a) * r2} y2={Math.sin(a) * r2} />;
      })}
    </g>
  );
};

/** Dark mood wash over the world (for the turn in the hook). */
const Wash: React.FC<{ o: number; color?: string }> = ({ o, color = "#1B2350" }) => (o > 0 ? <rect x={-2000} y={-2000} width={5000} height={6000} fill={color} opacity={o} /> : null);

// ---------------------------------------------------------------------------
// Scenes

const Hook: React.FC<{ dur: number }> = () => {
  const f = useCurrentFrame();
  const grab = s(1.7);
  const turn = s(4.75);
  const buzz = f < grab ? Math.sin(f * 2.8) * 9 : 0;
  // phone: buzzing on the counter, then floats up big next to her
  const up = interpolate(f, [grab, grab + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.5)) });
  const px = interpolate(up, [0, 1], [830, 730]) + buzz;
  const py = interpolate(up, [0, 1], [1010, 640]);
  const ps = interpolate(up, [0, 1], [0.3, 0.72]);
  const pr = interpolate(up, [0, 1], [-10, 6]) + wave(f, 50, 2);
  const msg = [pop(f, s(1.9)), pop(f, s(2.5)), pop(f, s(3.3))];
  const dim = ramp(f, turn, turn + 18) * 0.38;
  return (
    <Svg>
      <At x={540} y={460} s={pop(f, 4)}>
        <Sign front="Katering Bu Sari" />
      </At>
      <Chibi
        {...SARI}
        x={330}
        y={1300}
        scale={0.95}
        moods={[
          [0, "happy"],
          [s(0.95), "shock"],
          [s(1.6), "joy"],
          [turn, "worried"],
        ]}
        poses={[
          [0, "stir"],
          [s(0.95), "handsHead"],
          [s(1.6), "cheer"],
          [turn, "chin"],
        ]}
        looks={[
          [0, [0, 0.4]],
          [s(0.6), [1, 0.3]],
          [s(1.6), [1, -0.4]],
          [turn, [-0.4, 0.6]],
        ]}
        jumps={[s(0.95), s(2.4), s(3.0), s(3.6)]}
        flinch={[turn]}
      />
      <Counter x={40} w={1000} />
      <At x={560} y={1060}>
        <Wok toss={[s(0.2)]} />
      </At>
      {f < grab ? (
        <g stroke={OL} strokeWidth={7} strokeLinecap="round" fill="none">
          {[-1, 1].map((d) => (
            <g key={d}>
              <path d={`M${830 + d * 92} 950 q${d * 16} 22 0 44`} />
              <path d={`M${830 + d * 120} 938 q${d * 20} 34 0 68`} />
            </g>
          ))}
        </g>
      ) : null}
      <At x={px} y={py} s={ps} r={pr}>
        <Hp>
          <rect width={460} height={116} fill="#128C7E" />
          <circle cx={62} cy={60} r={32} fill="#fff" />
          <T x={62} y={70} size={26} weight={900} fill="#128C7E">
            PT
          </T>
          <T x={110} y={54} size={28} weight={900} fill="#fff" anchor="start">
            Kantor Maju Jaya
          </T>
          <T x={110} y={88} size={20} weight={600} fill="#D8F3EE" anchor="start">
            online
          </T>
          {f < grab ? (
            <At x={20} y={330} s={1 + wave(f, 10, 0.04)}>
              <rect width={420} height={170} rx={26} fill="#fff" stroke={OL} strokeWidth={5} />
              <circle cx={60} cy={60} r={30} fill="#25D366" />
              <T x={104} y={56} size={28} weight={900} anchor="start">
                Pesan baru
              </T>
              <T x={104} y={92} size={22} weight={700} fill="#55607A" anchor="start">
                Kantor Maju Jaya
              </T>
              <T x={30} y={146} size={26} weight={800} fill="#1A56D6" anchor="start">
                Order besar nih, Bu!
              </T>
            </At>
          ) : null}
          <At x={24} y={150} s={msg[0]}>
            <rect width={410} height={112} rx={22} fill="#fff" stroke={OL} strokeWidth={3} />
            <T x={22} y={48} size={27} weight={700} anchor="start">
              Bu Sari, kantor kami mau
            </T>
            <T x={22} y={86} size={27} weight={700} anchor="start">
              langganan makan siang
            </T>
          </At>
          <At x={24} y={292} s={msg[1]}>
            <rect width={410} height={160} rx={22} fill="#fff" stroke={OL} strokeWidth={3} />
            <T x={22} y={78} size={64} weight={900} fill="#1A56D6" anchor="start">
              150 kotak
            </T>
            <T x={22} y={128} size={32} weight={800} anchor="start">
              setiap hari
            </T>
          </At>
          <At x={24} y={482} s={msg[2]}>
            <rect width={410} height={116} rx={22} fill="#DCF8C6" stroke={OL} strokeWidth={3} />
            <T x={22} y={74} size={44} weight={900} fill="#1F7F52" anchor="start">
              Kontrak 6 bulan
            </T>
          </At>
          {f > turn ? (
            <At x={230} y={720} s={pop(f, turn + 6)}>
              <circle r={70} fill="#E5484D" stroke={OL} strokeWidth={5} />
              <T x={0} y={30} size={90} weight={900} fill="#fff">
                ?
              </T>
            </At>
          ) : null}
        </Hp>
      </At>
      {f > s(1.9) && f < turn
        ? [0, 1, 2, 3, 4].map((i) => (
            <At key={i} x={160 + i * 190} y={300 + wave(f, 26, 22, i * 7)} s={pop(f, s(2.5) + i * 3)} r={wave(f, 30, 20, i * 5)}>
              <Spark size={36} />
            </At>
          ))
        : null}
      <At x={330} y={820}>
        <Impact start={s(0.95)} r={190} />
      </At>
      <Wash o={dim} />
    </Svg>
  );
};

const Intro: React.FC<{ dur: number }> = () => {
  const f = useCurrentFrame();
  const motorIn = interpolate(f, [s(4.8), s(5.6)], [-500, 760], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const motorOut = interpolate(f, [s(7.0), s(7.9)], [0, 1000], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
  const moving = (f > s(4.8) && f < s(5.6)) || f > s(7.0);
  const handOff = s(6.0);
  const flyT = ramp(f, handOff, handOff + 16);
  return (
    <Svg>
      <At x={540} y={460} s={pop(f, 2)} r={wave(f, 60, 2)}>
        <Sign front="Katering Bu Sari" />
      </At>
      {/* name tag */}
      <At x={820} y={700} s={pop(f, s(0.8))} r={6}>
        <rect x={-150} y={-74} width={300} height={148} rx={26} fill="#FFC93C" stroke={OL} strokeWidth={SW} />
        <T x={0} y={-14} size={44} weight={900}>
          5 tahun
        </T>
        <T x={0} y={36} size={28} weight={800}>
          katering rumahan
        </T>
      </At>
      <Chibi
        {...SARI}
        x={300}
        y={1300}
        scale={0.95}
        moods={[
          [0, "happy"],
          [s(1.3), "joy"],
          [s(4.2), "happy"],
        ]}
        poses={[
          [0, "stir"],
          [s(3.0), "hold"],
          [s(5.7), "present"],
          [s(6.6), "wave"],
        ]}
        looks={[
          [0, [0.2, 0.5]],
          [s(3.0), [1, 0.5]],
          [s(5.0), [1, 0.2]],
        ]}
        talk={[[s(1.2), s(3.2)]]}
        jumps={[s(6.6)]}
        seed={1}
      />
      <Counter x={40} w={1000} />
      <At x={540} y={1060}>
        <Wok toss={[s(0.4), s(1.6), s(2.6)]} />
      </At>
      {[0, 1, 2, 3].map((i) => {
        const st = s(3.0) + i * 6;
        const x = interpolate(f, [st, st + 14], [1180, 640 + i * 120], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.3)) });
        const lid = ramp(f, st + 16, st + 24);
        const gone = i === 3 && f > handOff;
        return gone ? null : (
          <At key={i} x={x} y={1060} s={0.9}>
            <NasiBox t={lid} />
          </At>
        );
      })}
      {/* one box flies onto the courier's bike */}
      {f > handOff && flyT < 1 ? (
        <At x={interpolate(flyT, [0, 1], [950, 700])} y={interpolate(flyT, [0, 0.5, 1], [1060, 860, 1080])} r={flyT * 360} s={0.9}>
          <NasiBox />
        </At>
      ) : null}
      {/* humming notes */}
      {f < s(3.0)
        ? [0, 1, 2].map((i) => {
            const t = ((f + i * 22) % 66) / 66;
            return (
              <At key={i} x={420 + i * 50 + wave(f, 20, 16, i * 5)} y={640 - t * 240} o={1 - t} r={wave(f, 20, 14)}>
                <T x={0} y={0} size={66} weight={900} fill="#1A56D6">
                  ♪
                </T>
              </At>
            );
          })
        : null}
      <At x={motorIn + motorOut} y={1310} s={0.85}>
        <Motor moving={moving} />
      </At>
    </Svg>
  );
};

const Conflict: React.FC<{ dur: number }> = () => {
  const f = useCurrentFrame();
  const flyT = interpolate(f, [s(1.2), s(2.2)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.2)) });
  const openT = ramp(f, s(3.1), s(3.7));
  const unroll = interpolate(f, [s(3.5), s(4.6)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const rows = [
    { label: "Invoice a.n. badan usaha", at: 4.7 },
    { label: "Akta pendirian", at: 6.5 },
    { label: "NIB", at: 7.9 },
    { label: "NPWP badan", at: 9.1 },
  ];
  const paperH = 120 + unroll * 470;
  const ktp = pop(f, s(11.4));
  const book = pop(f, s(13.5));
  return (
    <Svg>
      <Chibi
        {...SARI}
        x={240}
        y={1300}
        scale={0.95}
        moods={[
          [0, "happy"],
          [s(3.4), "neutral"],
          [s(4.7), "worried"],
          [s(6.5), "shock"],
          [s(10.2), "sad"],
        ]}
        poses={[
          [0, "phone"],
          [s(3.2), "idle"],
          [s(6.5), "handsHead"],
          [s(10.2), "slump"],
          [s(11.3), "present"],
        ]}
        looks={[
          [0, [0.3, 0]],
          [s(1.2), [1, -0.6]],
          [s(10.2), [0, 0.8]],
          [s(11.3), [1, 0.4]],
        ]}
        talk={[[s(0.1), s(1.1)]]}
        flinch={[s(6.5), s(7.9), s(9.1)]}
        seed={2}
      />
      <Counter x={40} w={1000} />
      {/* envelope pops out of the phone, flies over and unrolls */}
      <At x={interpolate(flyT, [0, 1], [380, 680])} y={interpolate(flyT, [0, 1], [760, 560])} r={(1 - flyT) * -30 + wave(f, 50, 2)} s={0.35 + flyT * 0.4}>
        {flyT > 0 && openT < 1 ? (
          <g opacity={1 - openT}>
            <Envelope label="SYARAT VENDOR" />
          </g>
        ) : null}
        {openT > 0 ? (
          <g opacity={openT}>
            <rect x={-330} y={-150} width={660} height={paperH} rx={22} fill="#fff" stroke={OL} strokeWidth={7} />
            <rect x={-330} y={-150} width={660} height={92} rx={22} fill="#2D3A6B" stroke={OL} strokeWidth={7} />
            <T x={0} y={-90} size={40} weight={900} fill="#fff">
              Syarat vendor
            </T>
            {rows.map((r, i) => {
              const y = -30 + i * 110;
              const vis = unroll * 470 > y + 100;
              const st = pop(f, s(r.at), 8);
              return vis ? (
                <g key={r.label}>
                  <rect x={-290} y={y} width={580} height={92} rx={18} fill="#EEF3FB" stroke={OL} strokeWidth={4} />
                  <T x={-264} y={y + 60} size={i === 0 ? 32 : 40} weight={900} anchor="start">
                    {r.label}
                  </T>
                  <At x={230} y={y + 46}>
                    <Stamp t={st} />
                    <Impact start={s(r.at)} r={50} color="#E5484D" />
                  </At>
                </g>
              ) : null;
            })}
          </g>
        ) : null}
      </At>
      {f > s(10.3) && f < s(11.4) ? (
        <At x={330 + ramp(f, s(10.3), s(11.4)) * 80} y={800 - ramp(f, s(10.3), s(11.4)) * 60} o={1 - ramp(f, s(10.9), s(11.4))}>
          <path d="M0 0 q30 -24 60 0 q30 24 60 0" stroke="#9AA8C2" strokeWidth={12} fill="none" strokeLinecap="round" />
        </At>
      ) : null}
      <At x={470} y={1010} s={ktp} r={-8 + wave(f, 40, 3)}>
        <Ktp />
      </At>
      <At x={720} y={1030} s={book} r={8 + wave(f, 46, 3)}>
        <BankBook />
      </At>
    </Svg>
  );
};

const Temptation: React.FC<{ dur: number }> = () => {
  const f = useCurrentFrame();
  const grow = interpolate(f, [s(0.2), s(1.0)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.5)) });
  const stampAt = s(8.1);
  const popAt = s(9.0);
  const bubbleT = f >= popAt ? Math.max(0, grow * (1 + ramp(f, popAt, popAt + 4) * 0.2) * (1 - ramp(f, popAt + 3, popAt + 6))) : grow;
  const offer = pop(f, s(1.4));
  const contract = pop(f, s(3.5));
  return (
    <Svg>
      <At x={650} y={560}>
        {bubbleT > 0.01 ? (
          <Thought t={bubbleT} w={760} h={600} tailX={-300} tailY={300}>
            <Chibi
              {...TEMAN}
              x={-170}
              y={250}
              scale={0.55}
              moods={[
                [0, "happy"],
                [s(4.4), "joy"],
              ]}
              poses={[
                [0, "wave"],
                [s(1.4), "present"],
              ]}
              talk={[[s(0.3), s(2.8)]]}
              holding={
                <At x={0} y={-10} s={offer} r={-20}>
                  <rect x={-40} y={-80} width={80} height={70} rx={12} fill="#7B61FF" stroke={OL} strokeWidth={6} />
                  <rect x={-56} y={-16} width={112} height={34} rx={10} fill="#2D3A6B" stroke={OL} strokeWidth={6} />
                </At>
              }
            />
            <At x={-170} y={-210} s={offer}>
              <rect x={-130} y={-36} width={260} height={66} rx={18} fill="#7B61FF" stroke={OL} strokeWidth={5} />
              <T x={0} y={10} size={30} weight={900} fill="#fff">
                PT punya teman
              </T>
            </At>
            <At x={170} y={-30} s={contract * 0.6} r={5}>
              <Doc title="KONTRAK" sub="a.n. PT teman" accent="#7B61FF" />
            </At>
            {[0, 1, 2, 3].map((i) => {
              const st = s(4.3) + i * 7;
              const t = ramp(f, st, st + 20);
              return t > 0 && t < 1 ? (
                <At key={i} x={interpolate(t, [0, 1], [170, -150])} y={interpolate(t, [0, 0.5, 1], [130, -10, 80])} r={t * 360} s={0.9}>
                  <Coin />
                </At>
              ) : null;
            })}
            <At x={0} y={40}>
              <Stamp t={pop(f, stampAt, 8)} text="BERISIKO" />
            </At>
          </Thought>
        ) : null}
        <Burst start={popAt + 4} n={18} r={440} colors={["#fff", "#DCE4F0", "#C9D3E3"]} />
      </At>
      <Chibi
        {...SARI}
        x={260}
        y={1300}
        scale={0.95}
        moods={[
          [0, "think"],
          [s(3.4), "worried"],
          [s(6.6), "determined"],
          [popAt, "happy"],
        ]}
        poses={[
          [0, "chin"],
          [s(6.6), "no"],
          [popAt, "idle"],
        ]}
        looks={[
          [0, [1, -0.8]],
          [s(6.6), [0, 0]],
          [popAt, [1, -0.6]],
        ]}
        shake={[s(6.7), s(7.8)]}
        seed={3}
      />
      <Counter x={40} w={1000} />
    </Svg>
  );
};

const LESSON_DOCS = [
  ["AKTA", ""],
  ["NIB", ""],
  ["NPWP", "BADAN"],
  ["REKENING", "USAHA"],
];

const Lesson: React.FC<{ dur: number }> = () => {
  const f = useCurrentFrame();
  const open = ramp(f, s(1.7), s(2.2)) * (1 - ramp(f, s(4.3), s(4.8)));
  const chips = [
    { label: "PT Perorangan", at: 5.2, color: "#FFC93C", w: 420, x: -250 },
    { label: "CV", at: 8.4, color: "#BFE0FF", w: 160, x: 130 },
    { label: "PT", at: 9.0, color: "#BFE0FF", w: 160, x: 330 },
  ];
  const finale = s(11.3);
  const five = finale + 6;
  return (
    <Svg>
      {LESSON_DOCS.map(([a, b], i) => {
        const st = s(2.0) + i * 5;
        const t = interpolate(f, [st, st + 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.3)) });
        const x = interpolate(t, [0, 1], [790, 180 + i * 240]);
        const y = interpolate(t, [0, 0.5, 1], [820, 170, 300]);
        const ok = pop(f, s(3.0) + i * 6, 9);
        return t > 0 ? (
          <At key={a} x={x} y={y + (f > finale ? wave(f, 16, 10, i * 4) : 0)} s={0.3 + t * 0.3} r={(1 - t) * 200}>
            <Doc title={a} sub={b} w={300} h={360} />
            <At x={100} y={130}>{ok > 0.02 ? <At x={0} y={0} s={ok}><Badge ok r={52} /></At> : <Badge ok={false} r={52} />}</At>
          </At>
        ) : null;
      })}
      <At x={540} y={530} o={1 - ramp(f, finale - 4, finale + 2)}>
        {chips.map((c, i) => (
          <At key={c.label} x={c.x} y={wave(f, 40, 8, i * 9)} s={pop(f, s(c.at), 10)}>
            <rect x={-c.w / 2} y={-52} width={c.w} height={104} rx={52} fill={c.color} stroke={OL} strokeWidth={7} />
            <T x={0} y={18} size={46} weight={900}>
              {c.label}
            </T>
          </At>
        ))}
      </At>
      <At x={540} y={530} s={pop(f, finale, 10)}>
        <rect x={-400} y={-56} width={800} height={112} rx={56} fill="#2FA36B" stroke={OL} strokeWidth={7} />
        <T x={0} y={18} size={46} weight={900} fill="#fff">
          Atas nama usahamu sendiri!
        </T>
      </At>
      <Chibi
        {...SARI}
        x={280}
        y={1300}
        scale={0.95}
        moods={[
          [0, "sad"],
          [s(0.25), "shock"],
          [s(1.5), "happy"],
          [s(5.2), "joy"],
          [s(6.8), "happy"],
          [finale, "joy"],
        ]}
        poses={[
          [0, "slump"],
          [s(0.25), "handsHead"],
          [s(1.5), "idle"],
          [s(5.2), "cheer"],
          [s(6.6), "idle"],
          [finale, "highfive"],
        ]}
        looks={[
          [0, [0, 0.8]],
          [s(0.25), [1, 0]],
          [s(2.0), [0.5, -1]],
          [s(5.0), [0.6, -0.4]],
          [finale, [1, -0.4]],
        ]}
        flinch={[s(0.25)]}
        jumps={[s(5.2), five + 4, five + 22]}
        seed={4}
      />
      <Counter x={40} w={1000} />
      <At x={760} y={860}>
        <Poof start={0} />
      </At>
      <Lea
        x={760}
        y={1062}
        scale={0.7}
        facing={-1}
        mouth={MOUTH["05-pelajaran"]}
        open={open}
        look={[1, 0]}
        poses={[
          [0, "wave"],
          [s(1.7), "cheer"],
          [s(4.8), "present"],
          [s(8.4), "point"],
          [finale, "highfive"],
        ]}
        jumps={[s(2.0), five + 4]}
      />
      <At x={520} y={700}>
        <Impact start={five} r={70} color="#FFC93C" />
        <Burst start={five} n={16} r={300} />
      </At>
    </Svg>
  );
};

const Ending: React.FC<{ dur: number }> = () => {
  const f = useCurrentFrame();
  const flip = interpolate(f, [s(3.6), s(4.3)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const write = ramp(f, s(0.2), s(1.7));
  const signed = s(1.9);
  return (
    <Svg>
      <At x={540} y={440}>
        <Sign front="Katering Bu Sari" back="✓ Badan usaha resmi" flip={flip} w={620} />
      </At>
      <Chibi
        {...SARI}
        x={280}
        y={1300}
        scale={0.95}
        moods={[
          [0, "determined"],
          [signed, "joy"],
        ]}
        poses={[
          [0, "hold"],
          [signed, "cheer"],
        ]}
        looks={[
          [0, [1, 0.8]],
          [signed, [0, -0.5]],
        ]}
        jumps={[signed, signed + 22, signed + 44]}
        seed={5}
      />
      <Counter x={40} w={1000} />
      <At x={640} y={980} s={0.95} r={-4}>
        <Doc title="KONTRAK VENDOR" sub="a.n. usaha Bu Sari" w={440} h={300} accent="#2FA36B" stamp={f > signed ? "ok" : undefined} />
        <path d="M-130 96 q20 -44 40 0 t40 0 q20 -44 40 0 t44 10" stroke="#1A56D6" strokeWidth={7} fill="none" strokeLinecap="round" strokeDasharray={280} strokeDashoffset={280 * (1 - write)} />
        {f < signed + 4 ? (
          <At x={-130 + write * 170} y={60 + wave(f, 5, 12)} r={28}>
            <rect x={-10} y={-100} width={20} height={100} rx={8} fill="#2D3A6B" stroke={OL} strokeWidth={4} />
            <path d="M-10 0 L0 22 L10 0 Z" fill="#FFC93C" stroke={OL} strokeWidth={3} />
          </At>
        ) : null}
      </At>
      <Lea x={900} y={1062} scale={0.5} facing={-1} poses={[[0, "idle"], [signed, "cheer"]]} jumps={[signed + 6, signed + 28]} />
      {[0, 1, 2].map((i) => {
        const st = s(2.3) + i * 9;
        const x = interpolate(f, [st, st + 46], [-400, 1500], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <At key={i} x={x} y={1330} s={0.62}>
            <Motor />
          </At>
        );
      })}
      <At x={540} y={760}>
        <Burst start={signed} n={22} r={520} />
      </At>
      <Confetti start={signed} />
    </Svg>
  );
};

const Pitch: React.FC<{ dur: number }> = () => {
  const f = useCurrentFrame();
  const board = interpolate(f, [s(1.9), s(2.5)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.4)) });
  const prices = [
    { name: "PT Perorangan", price: "Rp1,5 jt", at: 4.0 },
    { name: "CV", price: "Rp2,5 jt", at: 6.3 },
    { name: "PT", price: "Rp3,5 jt", at: 6.9 },
  ];
  const bonus = pop(f, s(8.0), 10);
  const wa = pop(f, s(9.9), 10);
  return (
    <Svg>
      <At x={540} y={250} s={pop(f, s(1.9))}>
        <T x={0} y={0} size={64} weight={900} fill="#fff">
          Siap naik kelas?
        </T>
      </At>
      <At x={540} y={590} s={board} r={(1 - board) * -10}>
        <rect x={-420} y={-250} width={840} height={500} rx={40} fill="#fff" stroke={OL} strokeWidth={8} />
        <rect x={-420} y={-250} width={840} height={100} rx={40} fill="#1A56D6" stroke={OL} strokeWidth={8} />
        <T x={0} y={-184} size={42} weight={900} fill="#fff">
          Urus badan usaha
        </T>
        {prices.map((p, i) => {
          const k = pop(f, s(p.at), 10);
          const y = -90 + i * 110;
          return (
            <g key={p.name} opacity={Math.min(1, k * 1.5)} transform={`translate(${(1 - k) * 80} 0)`}>
              <T x={-370} y={y + 34} size={46} weight={800} anchor="start">
                {p.name}
              </T>
              <T x={370} y={y + 34} size={58} weight={900} fill="#1A56D6" anchor="end">
                {p.price}
              </T>
              {i < 2 ? <rect x={-370} y={y + 68} width={740} height={4} rx={2} fill="#DCE4F0" /> : null}
            </g>
          );
        })}
      </At>
      <At x={540} y={930} s={bonus} r={wave(f, 50, 1.5)}>
        <rect x={-420} y={-90} width={840} height={180} rx={34} fill="#FFC93C" stroke={OL} strokeWidth={8} />
        <T x={-120} y={-28} size={30} weight={900} anchor="start">
          BONUS paket CV & PT
        </T>
        <T x={-120} y={26} size={42} weight={900} anchor="start">
          Website + desain logo
        </T>
        <At x={-300} y={wave(f, 40, 8)} r={-8}>
          <rect x={-74} y={-58} width={148} height={116} rx={14} fill="#fff" stroke={OL} strokeWidth={5} />
          <rect x={-74} y={-58} width={148} height={26} rx={12} fill="#2D3A6B" />
          <rect x={-52} y={-14} width={104} height={14} rx={6} fill="#1A56D6" />
          <rect x={-52} y={12} width={72} height={10} rx={5} fill="#DCE4F0" />
        </At>
        <At x={-190} y={30 + wave(f, 40, 8, 15)} s={0.8}>
          <circle r={46} fill="#2D3A6B" stroke={OL} strokeWidth={5} />
          <Spark color="#FFC93C" size={28} />
        </At>
      </At>
      <Lea
        x={250}
        y={1330}
        scale={0.6}
        enter={{ from: -300, start: 0, dur: 16 }}
        mouth={MOUTH["07-jualan"]}
        look={[1, -0.3]}
        poses={[
          [0, "wave"],
          [s(2.0), "present"],
          [s(8.0), "cheer"],
          [s(9.9), "point"],
        ]}
        jumps={[s(8.0)]}
      />
      <Chibi {...SARI} x={960} y={1340} scale={0.4} facing={-1} moods={[[0, "joy"]]} poses={[[0, "wave"]]} walk={{ from: 1300, start: s(8.0), dur: 18 }} seed={6} />
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

export const V7: VideoDef = {
  id: "orderan-bu-sari",
  title: "Storytime: Orderan Besar Bu Sari",
  date: "Episode 1",
  scenes: [
    {
      id: "01-hook",
      text: "Orderan seratus lima puluh kotak sehari, kontrak enam bulan! Tapi Bu Sari... *hampir kehilangannya.*",
      setting: "kitchen",
      vivid: true,
      wall: "#FFD8A8",
      floor: "#7FB2F0",
      camera: {
        grade: "warm",
        shots: [
          { at: 0, zoom: 2.3, x: 830, y: 980 },
          { at: 0.95, zoom: 2.1, x: 340, y: 800, ease: 0.12 },
          { at: 1.7, zoom: 1.0, x: 540, y: 900, ease: 0.3 },
          { at: 4.75, zoom: 1.0, x: 540, y: 900 },
          { at: 4.8, zoom: 1.9, x: 360, y: 800, ease: 2.6 },
        ],
      },
      Visual: Hook,
    },
    {
      id: "02-tokoh",
      text: "Ini Bu Sari. Katering rumahannya sudah jalan lima tahun. Pelanggannya tetangga, dan kantor-kantor kecil di sekitar rumah.",
      setting: "kitchen",
      vivid: true,
      wall: "#FFD8A8",
      floor: "#7FB2F0",
      camera: {
        grade: "warm",
        shots: [
          { at: 0, zoom: 1.6, x: 330, y: 780 },
          { at: 1.2, zoom: 1.0, x: 540, y: 900, ease: 0.9 },
          { at: 3.0, zoom: 1.6, x: 800, y: 1000, ease: 0.4 },
          { at: 4.8, zoom: 1.0, x: 540, y: 900, ease: 0.4 },
        ],
      },
      Visual: Intro,
    },
    {
      id: "03-konflik",
      text: "Lalu, kantor besar itu kirim syarat vendor. Invoice harus atas nama *badan usaha,* lengkap dengan akta, NIB, dan *NPWP badan.* Bu Sari cuma punya KTP... dan rekening pribadi.",
      setting: "kitchen",
      vivid: true,
      wall: "#FFD8A8",
      floor: "#7FB2F0",
      camera: {
        grade: "tense",
        shake: [0.3, 0.42, 0.51, 0.59],
        shots: [
          { at: 0, zoom: 1.5, x: 300, y: 860 },
          { at: 1.2, zoom: 1.0, x: 540, y: 900, ease: 0.5 },
          { at: 3.6, zoom: 1.55, x: 680, y: 640, ease: 0.4 },
          { at: 6.5, zoom: 2.2, x: 250, y: 790, ease: 0.1 },
          { at: 7.3, zoom: 1.55, x: 680, y: 640, ease: 0.15 },
          { at: 10.1, zoom: 1.0, x: 540, y: 900, ease: 0.4 },
          { at: 11.2, zoom: 1.15, x: 540, y: 880, ease: 1.5 },
        ],
      },
      Visual: Conflict,
    },
    {
      id: "04-godaan",
      text: "Sempat terpikir, pinjam PT punya teman. Tapi nanti, kontrak dan uangnya atas nama orang lain. Kalau ada masalah, *Bu Sari tidak punya pegangan.*",
      setting: "kitchen",
      vivid: true,
      wall: "#FFD8A8",
      floor: "#7FB2F0",
      camera: {
        grade: "cool",
        shots: [
          { at: 0, zoom: 1.6, x: 280, y: 820 },
          { at: 0.9, zoom: 1.45, x: 650, y: 560, ease: 0.6 },
          { at: 6.6, zoom: 2.1, x: 270, y: 800, ease: 0.12 },
          { at: 7.9, zoom: 1.0, x: 540, y: 900, ease: 0.25 },
        ],
      },
      Visual: Temptation,
    },
    {
      id: "05-pelajaran",
      text: "Tenang, Bu Sari! Solusinya, punya *badan usaha sendiri.* Usaha kecil bisa mulai dari *PT Perorangan.* Atau CV dan PT, kalau mau berkembang bareng partner. Kontrak dan uangnya jadi atas nama *usahamu sendiri.*",
      setting: "kitchen",
      vivid: true,
      wall: "#FFD8A8",
      floor: "#7FB2F0",
      camera: {
        grade: "bright",
        shots: [
          { at: 0, zoom: 1.9, x: 760, y: 860 },
          { at: 1.5, zoom: 1.0, x: 540, y: 900, ease: 0.3 },
          { at: 4.8, zoom: 1.2, x: 540, y: 620, ease: 0.6 },
          { at: 11.1, zoom: 1.0, x: 540, y: 900, ease: 0.3 },
        ],
      },
      Visual: Lesson,
    },
    {
      id: "06-akhir",
      text: "Sekarang, Bu Sari *resmi jadi vendor* kantor besar itu. Atas nama usahanya sendiri.",
      setting: "kitchen",
      vivid: true,
      wall: "#FFD8A8",
      floor: "#7FB2F0",
      camera: {
        grade: "warm",
        shots: [
          { at: 0, zoom: 2.0, x: 640, y: 980 },
          { at: 1.9, zoom: 1.0, x: 540, y: 900, ease: 0.25 },
        ],
      },
      Visual: Ending,
    },
    {
      id: "07-jualan",
      text: "Siap naik kelas seperti Bu Sari? LegalEase urus badan usahamu, mulai *satu setengah juta rupiah.* Paket CV dan PT dapat *bonus website dan desain logo.* Chat WhatsApp di bio, ya!",
      setting: "navy",
      vivid: true,
      camera: {
        grade: "night",
        shots: [
          { at: 0, zoom: 2.0, x: 260, y: 1150 },
          { at: 1.9, zoom: 1.0, x: 540, y: 900, ease: 0.35 },
        ],
      },
      Visual: Pitch,
    },
  ],
};
