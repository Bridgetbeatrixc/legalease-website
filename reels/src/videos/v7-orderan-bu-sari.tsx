import React from "react";
import { Easing, interpolate, random, useCurrentFrame } from "remotion";
import { pop, ramp, wave } from "../components/anim";
import { Lea } from "../components/Lea";
import { Person, PersonProps } from "../components/Person";
import { At, Badge, Coin, Doc, Envelope, Marks, Phone, Spark, Steam, T } from "../components/Props";
import { Svg } from "../components/Stage";
import { C, FONT, HAIR, SKIN } from "../theme";
import type { VideoDef } from "../types";
import MOUTH from "../data/orderan-bu-sari-mouth.json";

// Times inside each scene are in seconds of its dub (ElevenLabs take, 10 Nov 2026).
const s = (sec: number) => Math.round(sec * 30);

const SARI: Partial<PersonProps> = {
  hair: "hijab",
  hijabColor: "#B23A48",
  skin: SKIN.tan,
  shirt: "#F08A4B",
  pants: C.navy,
  outfit: "dress",
  sleeves: "long",
  apron: "#FFFFFF",
};
const TEMAN: Partial<PersonProps> = { hair: "short", hairColor: HAIR.black, skin: SKIN.light, shirt: "#6C5CE7", pants: C.navy, seed: 4 };

// ---------------------------------------------------------------------------
// Props for this episode

/** Nasi box with a lid that closes as t goes 0 → 1. */
const NasiBox: React.FC<{ t?: number }> = ({ t = 1 }) => (
  <g>
    <rect x={-70} y={-70} width={140} height={70} rx={8} fill="#fff" stroke="#E2D6C3" strokeWidth={4} />
    <circle cx={-30} cy={-50} r={18} fill="#FFF7E8" />
    <rect x={0} y={-62} width={44} height={22} rx={8} fill="#8B3A1E" />
    <circle cx={20} cy={-24} r={10} fill="#7CC36E" />
    <g transform={`translate(-70 -70) rotate(${-110 * (1 - t)})`}>
      <rect x={0} y={-16} width={140} height={20} rx={6} fill="#F7F1E6" stroke="#E2D6C3" strokeWidth={4} />
      <rect x={50} y={-12} width={40} height={10} rx={4} fill={C.gold} />
    </g>
  </g>
);

/** Wok on a stove top, with steam. */
const Wok: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <g>
      <rect x={-200} y={0} width={400} height={40} rx={10} fill="#5B6B82" />
      <rect x={-220} y={40} width={440} height={260} rx={14} fill={C.steel} />
      <circle cx={-150} cy={90} r={14} fill={C.navy} />
      <circle cx={-100} cy={90} r={14} fill={C.navy} />
      {/* flame */}
      {[-40, 0, 40].map((dx, i) => (
        <path key={i} d={`M${dx - 14} 0 Q${dx} ${-34 - wave(f, 8, 8, i * 3)} ${dx + 14} 0 Z`} fill={i === 1 ? C.gold : "#F08A4B"} />
      ))}
      <path d="M-170 -60 Q0 40 170 -60 Z" fill="#2B2F3A" />
      <path d="M-150 -58 Q0 10 150 -58 Z" fill="#8B3A1E" />
      {[-80, -20, 50, 100].map((dx, i) => (
        <circle key={i} cx={dx} cy={-44 + wave(f, 12, 6, i * 4)} r={14} fill="#A0482A" />
      ))}
      <line x1={170} y1={-62} x2={250} y2={-80} stroke="#2B2F3A" strokeWidth={14} strokeLinecap="round" />
      <At x={0} y={-90}>
        <Steam />
      </At>
    </g>
  );
};

/** Counter top with a wooden front. */
const Counter: React.FC<{ x: number; w: number; y?: number }> = ({ x, w, y = 1060 }) => (
  <g>
    <rect x={x} y={y} width={w} height={30} rx={8} fill={C.woodDark} />
    <rect x={x + 10} y={y + 30} width={w - 20} height={210} fill={C.wood} />
    <rect x={x + 10} y={y + 30} width={w - 20} height={14} fill="rgba(0,0,0,0.1)" />
  </g>
);

/** Shop sign on the wall. `flip` 0..1 turns it around to the back text. */
const Sign: React.FC<{ front: string; back?: string; flip?: number; w?: number }> = ({ front, back, flip = 0, w = 520 }) => {
  const sx = Math.cos(flip * Math.PI);
  const showBack = sx < 0;
  return (
    <g>
      <line x1={-w / 3} y1={-120} x2={-w / 3} y2={-60} stroke={C.navy} strokeWidth={6} />
      <line x1={w / 3} y1={-120} x2={w / 3} y2={-60} stroke={C.navy} strokeWidth={6} />
      <g transform={`scale(${Math.abs(sx) < 0.02 ? 0.02 : Math.abs(sx)} 1)`}>
        <rect x={-w / 2} y={-60} width={w} height={120} rx={26} fill={showBack ? C.cobalt : "#B23A48"} />
        <rect x={-w / 2 + 12} y={-48} width={w - 24} height={96} rx={18} fill="none" stroke="#fff" strokeWidth={4} opacity={0.6} />
        <T x={0} y={18} size={showBack ? 40 : 50} weight={900} fill="#fff">
          {showBack ? back : front}
        </T>
      </g>
    </g>
  );
};

/** Courier motorbike with a rider and a box on the back. Faces right. */
const Motor: React.FC<{ moving?: boolean }> = ({ moving = true }) => {
  const f = useCurrentFrame();
  const spin = moving ? f * 18 : 0;
  const bob = moving ? Math.abs(wave(f, 6, 4)) : 0;
  return (
    <g transform={`translate(0 ${-bob})`}>
      {[-110, 110].map((wx) => (
        <g key={wx} transform={`translate(${wx} -50) rotate(${spin})`}>
          <circle r={50} fill={C.ink} />
          <circle r={22} fill={C.steel} />
          <line x1={-22} y1={0} x2={22} y2={0} stroke={C.ink} strokeWidth={6} />
        </g>
      ))}
      <path d="M-150 -90 L-40 -90 L0 -140 L110 -140 L150 -80 L-150 -80 Z" fill="#2FA36B" />
      <rect x={-210} y={-200} width={110} height={100} rx={12} fill="#D6A56B" />
      <T x={-155} y={-140} size={22} weight={900} fill="#7A4E24">
        NASI
      </T>
      {/* rider */}
      <rect x={-50} y={-280} width={80} height={150} rx={30} fill="#2FA36B" />
      <circle cx={0} cy={-320} r={44} fill={SKIN.brown} />
      <path d="M-48 -318 Q-48 -380 0 -380 Q52 -380 52 -320 L52 -310 L-48 -310 Z" fill="#2FA36B" />
      <rect x={10} y={-330} width={44} height={20} rx={8} fill="#BFE0FF" />
      <line x1={20} y1={-230} x2={120} y2={-160} stroke="#2FA36B" strokeWidth={26} strokeLinecap="round" />
      {moving
        ? [0, 1, 2].map((i) => (
            <line key={i} x1={-260 - i * 30} y1={-60 - i * 40} x2={-330 - i * 40} y2={-60 - i * 40} stroke="#fff" strokeWidth={8} strokeLinecap="round" opacity={0.7} />
          ))
        : null}
    </g>
  );
};

/** KTP card. */
const Ktp: React.FC = () => (
  <g>
    <rect x={-110} y={-70} width={220} height={140} rx={14} fill="#BFE0FF" stroke={C.cobalt} strokeWidth={5} />
    <rect x={-92} y={-40} width={66} height={84} rx={8} fill="#fff" />
    <circle cx={-59} cy={-12} r={16} fill={SKIN.tan} />
    <rect x={-80} y={8} width={42} height={30} rx={10} fill="#B23A48" />
    <T x={40} y={-30} size={28} weight={900} fill={C.cobalt}>
      KTP
    </T>
    <rect x={0} y={0} width={80} height={10} rx={5} fill="#fff" />
    <rect x={0} y={22} width={60} height={10} rx={5} fill="#fff" />
  </g>
);

/** Bank book for a personal account. */
const BankBook: React.FC<{ label?: string; color?: string }> = ({ label = "PRIBADI", color = C.navy }) => (
  <g>
    <rect x={-90} y={-60} width={180} height={120} rx={12} fill={color} />
    <rect x={-90} y={-60} width={30} height={120} rx={8} fill="rgba(255,255,255,0.15)" />
    <T x={15} y={-8} size={22} weight={900} fill={C.gold}>
      REKENING
    </T>
    <T x={15} y={26} size={22} weight={800} fill="#fff">
      {label}
    </T>
  </g>
);

/** Thought bubble, centred, growing with t. */
const Thought: React.FC<{ t: number; w: number; h: number; tailX?: number; tailY?: number; children?: React.ReactNode }> = ({ t, w, h, tailX = -200, tailY = 380, children }) => {
  const f = useCurrentFrame();
  const puffs = 12;
  return (
    <g opacity={Math.min(1, t * 2)}>
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={tailX * (1 - i * 0.3)} cy={tailY * (1 - i * 0.28)} r={(18 + i * 10) * Math.min(1, t * 3 - i * 0.3)} fill="#fff" />
      ))}
      <g transform={`scale(${t})`}>
        {Array.from({ length: puffs }).map((_, i) => {
          const a = (i / puffs) * Math.PI * 2;
          return <circle key={i} cx={Math.cos(a) * w * 0.47} cy={Math.sin(a) * h * 0.45} r={90 + wave(f, 50, 6, i * 7)} fill="#fff" />;
        })}
        <ellipse cx={0} cy={0} rx={w * 0.5} ry={h * 0.48} fill="#fff" />
        {children}
      </g>
    </g>
  );
};

/** Burst of particles from the origin, for pops and celebrations. */
const Burst: React.FC<{ start: number; n?: number; r?: number; colors?: string[]; seed?: string }> = ({ start, n = 14, r = 320, colors = [C.gold, C.cobalt, C.red, C.green], seed = "b" }) => {
  const f = useCurrentFrame();
  const d = f - start;
  if (d < 0 || d > 40) return null;
  const t = Easing.out(Easing.cubic)(d / 40);
  return (
    <g opacity={1 - d / 40}>
      {Array.from({ length: n }).map((_, i) => {
        const a = (i / n) * Math.PI * 2 + random(`${seed}${i}`) * 0.5;
        const rr = r * (0.6 + random(`${seed}r${i}`) * 0.5) * t;
        return <rect key={i} x={Math.cos(a) * rr - 9} y={Math.sin(a) * rr - 9 + d * d * 0.08} width={18} height={18} rx={4} fill={colors[i % colors.length]} transform={`rotate(${d * 12 + i * 30} ${Math.cos(a) * rr} ${Math.sin(a) * rr})`} />;
      })}
    </g>
  );
};

/** Falling confetti over the whole frame. */
const Confetti: React.FC<{ start: number }> = ({ start }) => {
  const f = useCurrentFrame();
  const d = f - start;
  if (d < 0) return null;
  return (
    <g>
      {Array.from({ length: 46 }).map((_, i) => {
        const x = random(`cx${i}`) * 1080 + Math.sin((d + i * 9) / 10) * 30;
        const y = -60 + d * (9 + random(`cv${i}`) * 9) - random(`cy${i}`) * 500;
        return <rect key={i} x={x} y={y} width={16} height={26} rx={4} fill={[C.gold, C.cobalt, C.red, C.green, "#fff"][i % 5]} transform={`rotate(${d * 8 + i * 40} ${x + 8} ${y + 13})`} />;
      })}
    </g>
  );
};

/** Red cross stamp slamming down; t = spring 0..1. */
const Stamp: React.FC<{ t: number; ok?: boolean; text?: string }> = ({ t, ok = false, text }) => {
  if (t <= 0.01) return null;
  const sc = 2.4 - t * 1.4;
  return (
    <g transform={`scale(${sc}) rotate(-12)`} opacity={Math.min(1, t * 1.6)}>
      {text ? (
        <g>
          <rect x={-150} y={-50} width={300} height={100} rx={18} fill="none" stroke={ok ? C.green : C.red} strokeWidth={10} />
          <T x={0} y={22} size={56} weight={900} fill={ok ? C.green : C.red}>
            {text}
          </T>
        </g>
      ) : (
        <Badge ok={ok} r={42} />
      )}
    </g>
  );
};

// ---------------------------------------------------------------------------
// Scenes

const Hook: React.FC<{ dur: number }> = () => {
  const f = useCurrentFrame();
  // phone buzzes on the counter, flies up big, then the mood turns at 4.7 s
  const fly = interpolate(f, [s(0.9), s(1.5)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.4)) });
  const back = interpolate(f, [s(4.6), s(5.1)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
  const buzz = f < s(0.9) ? Math.sin(f * 2.6) * 10 : 0;
  const px = interpolate(fly, [0, 1], [760, 690]) + buzz;
  const py = interpolate(fly, [0, 1], [1010, 760]);
  const ps = interpolate(fly, [0, 1], [0.28, 0.78]) * (1 - back * 0.55);
  const pr = interpolate(fly, [0, 1], [-8, 0]) + back * 14;
  const msg1 = pop(f, s(1.6));
  const msg2 = pop(f, s(2.5));
  const msg3 = pop(f, s(3.3));
  const turn = s(4.75);
  const spoonT = ramp(f, turn, turn + 14);
  return (
    <Svg>
      <Counter x={80} w={920} />
      <At x={240} y={1060}>
        <Wok />
      </At>
      <Person
        {...SARI}
        x={240}
        y={1300}
        scale={0.72}
        facing={1}
        moods={[
          [0, "happy"],
          [s(1.0), "shock"],
          [s(2.2), "happy"],
          [turn, "worried"],
        ]}
        poses={[
          [0, "stir"],
          [s(1.0), "handsHead"],
          [s(2.2), "armsUp"],
          [turn, "chin"],
        ]}
        jumps={[s(1.0), s(2.4), s(2.9)]}
        flinch={[turn]}
      />
      {/* spoon flying out of her hand when the mood turns */}
      {f > s(1.0) && f < turn + 20 ? (
        <At x={360 + spoonT * 120} y={860 + spoonT * spoonT * 360 - Math.sin(spoonT * Math.PI) * 120} r={spoonT * 380} o={1 - ramp(f, turn + 14, turn + 20)}>
          <line x1={0} y1={0} x2={120} y2={0} stroke={C.woodDark} strokeWidth={14} strokeLinecap="round" />
          <ellipse cx={130} cy={0} rx={24} ry={16} fill={C.woodDark} />
        </At>
      ) : null}
      {/* vibration lines */}
      {f < s(0.9) ? (
        <g stroke={C.cobalt} strokeWidth={6} strokeLinecap="round" opacity={0.8}>
          {[-1, 1].map((d) => (
            <g key={d}>
              <path d={`M${760 + d * 90} 930 q${d * 14} 20 0 40`} fill="none" />
              <path d={`M${760 + d * 115} 920 q${d * 18} 30 0 60`} fill="none" />
            </g>
          ))}
        </g>
      ) : null}
      <At x={px} y={py} s={ps} r={pr}>
        <Phone w={460} h={860}>
          <rect x={0} y={0} width={460} height={110} fill="#128C7E" />
          <circle cx={60} cy={56} r={30} fill="#fff" />
          <T x={60} y={66} size={26} weight={900} fill="#128C7E">
            PT
          </T>
          <T x={108} y={50} size={26} weight={900} fill="#fff" anchor="start">
            Kantor Maju Jaya
          </T>
          <T x={108} y={82} size={18} weight={600} fill="#D8F3EE" anchor="start">
            online
          </T>
          <rect x={0} y={110} width={460} height={750} fill="#ECE5DD" />
          <At x={24} y={150} s={msg1}>
            <rect x={0} y={0} width={400} height={110} rx={20} fill="#fff" />
            <T x={20} y={46} size={26} weight={700} anchor="start">
              Bu Sari, kami mau
            </T>
            <T x={20} y={84} size={26} weight={700} anchor="start">
              langganan makan siang
            </T>
          </At>
          <At x={24} y={290} s={msg2}>
            <rect x={0} y={0} width={400} height={150} rx={20} fill="#fff" />
            <T x={20} y={62} size={52} weight={900} fill={C.cobalt} anchor="start">
              150 kotak
            </T>
            <T x={20} y={112} size={30} weight={800} anchor="start">
              setiap hari
            </T>
          </At>
          <At x={24} y={470} s={msg3}>
            <rect x={0} y={0} width={400} height={110} rx={20} fill="#fff" />
            <T x={20} y={70} size={40} weight={900} fill={C.green} anchor="start">
              Kontrak 6 bulan
            </T>
          </At>
        </Phone>
      </At>
      {f > s(1.6) && f < turn ? (
        <At x={540} y={300}>
          {[0, 1, 2, 3].map((i) => (
            <At key={i} x={-380 + i * 250} y={wave(f, 30, 20, i * 8)} s={pop(f, s(2.5) + i * 3)}>
              <Spark size={34} />
            </At>
          ))}
        </At>
      ) : null}
      {f > turn ? (
        <At x={240} y={500} o={ramp(f, turn, turn + 6)}>
          <Marks kind="!" color={C.red} />
        </At>
      ) : null}
    </Svg>
  );
};

const Intro: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const sign = pop(f, s(0.2));
  const badge = pop(f, s(3.0));
  const motorIn = interpolate(f, [s(4.6), s(5.6)], [-400, 760], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const motorOut = interpolate(f, [s(6.6), s(7.6)], [0, 900], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
  const moving = (f > s(4.6) && f < s(5.6)) || f > s(6.6);
  const loaded = f > s(6.1);
  return (
    <Svg>
      <At x={540} y={560} s={sign} r={wave(f, 60, 2)}>
        <Sign front="Katering Bu Sari" />
      </At>
      <At x={860} y={740} s={badge} r={8}>
        <circle r={86} fill={C.gold} />
        <circle r={74} fill="none" stroke="#fff" strokeWidth={5} strokeDasharray="10 8" />
        <T x={0} y={-6} size={52} weight={900} fill={C.navy}>
          5
        </T>
        <T x={0} y={34} size={26} weight={900} fill={C.navy}>
          TAHUN
        </T>
      </At>
      <Counter x={40} w={1000} />
      <At x={250} y={1060}>
        <Wok />
      </At>
      {/* boxes slide along the counter and their lids close */}
      {[0, 1, 2, 3].map((i) => {
        const st = s(1.4) + i * 7;
        const x = interpolate(f, [st, st + 14], [1150, 560 + i * 130], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.2)) });
        const lid = ramp(f, st + 18, st + 26);
        const gone = loaded ? 1 : 0;
        return gone ? null : (
          <At key={i} x={x} y={1060} s={0.85}>
            <NasiBox t={lid} />
          </At>
        );
      })}
      <Person
        {...SARI}
        x={300}
        y={1300}
        scale={0.72}
        mood="happy"
        poses={[
          [0, "stir"],
          [s(4.2), "wave"],
          [s(6.8), "idle"],
        ]}
        jumps={[s(4.3)]}
        holding={f < s(4.2) ? <line x1={0} y1={0} x2={130} y2={-60} stroke={C.woodDark} strokeWidth={14} strokeLinecap="round" /> : undefined}
      />
      {/* humming notes */}
      {f < s(4.2)
        ? [0, 1, 2].map((i) => {
            const t = ((f + i * 22) % 66) / 66;
            return (
              <At key={i} x={420 + i * 40 + wave(f, 20, 14, i * 5)} y={720 - t * 220} o={1 - t}>
                <T x={0} y={0} size={60} weight={900} fill={C.cobalt}>
                  ♪
                </T>
              </At>
            );
          })
        : null}
      <At x={motorIn + motorOut} y={1290} s={0.62}>
        <Motor moving={moving} />
      </At>
      {dur ? null : null}
    </Svg>
  );
};

const Conflict: React.FC<{ dur: number }> = () => {
  const f = useCurrentFrame();
  const flyT = interpolate(f, [s(0.4), s(1.3)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.3)) });
  const openT = ramp(f, s(3.2), s(4.0));
  const unroll = interpolate(f, [s(3.6), s(5.0)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const rows = [
    { label: "Invoice atas nama badan usaha", at: 4.6 },
    { label: "Akta pendirian", at: 6.6 },
    { label: "NIB", at: 8.0 },
    { label: "NPWP badan", at: 9.2 },
  ];
  const shrink = interpolate(f, [s(10.4), s(12)], [0.72, 0.6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ktp = pop(f, s(11.6));
  const book = pop(f, s(13.6));
  const paperH = 120 + unroll * 470;
  return (
    <Svg>
      {/* envelope flies in and opens, the list unrolls out of it */}
      <At x={interpolate(flyT, [0, 1], [1400, 560])} y={interpolate(flyT, [0, 1], [300, 560])} r={(1 - flyT) * 40 + wave(f, 50, 2)} s={0.9 * (1 - openT * 0.15)}>
        {openT < 1 ? (
          <g opacity={1 - openT}>
            <Envelope label="SYARAT VENDOR" />
          </g>
        ) : null}
        {openT > 0 ? (
          <g opacity={openT}>
            <rect x={-330} y={-150} width={660} height={paperH} rx={20} fill="#fff" />
            <path d={`M-330 ${-150 + paperH} l30 18 l30 -18 l30 18 l30 -18 l30 18 l30 -18 l30 18 l30 -18 l30 18 l30 -18 l30 18 l30 -18 l30 18 l30 -18 l30 18 l30 -18 l30 18 l30 -18 l30 18 l30 -18 l30 18 l0 -18`} fill="#fff" />
            <rect x={-330} y={-150} width={660} height={90} rx={20} fill={C.navy} />
            <T x={0} y={-92} size={38} weight={900} fill="#fff">
              Syarat vendor
            </T>
            {rows.map((r, i) => {
              const y = -10 + i * 110;
              const vis = unroll * 470 > y + 60;
              const st = pop(f, s(r.at), 8);
              return vis ? (
                <g key={r.label}>
                  <rect x={-290} y={y} width={580} height={90} rx={16} fill={C.wall} />
                  <T x={-266} y={y + 58} size={i === 0 ? 30 : 38} weight={900} anchor="start">
                    {r.label}
                  </T>
                  <At x={232} y={y + 45}>
                    <Stamp t={st} />
                  </At>
                </g>
              ) : null;
            })}
          </g>
        ) : null}
      </At>
      <Person
        {...SARI}
        x={230}
        y={1300}
        scale={shrink}
        moods={[
          [0, "neutral"],
          [s(4.6), "worried"],
          [s(10.4), "sad"],
        ]}
        poses={[
          [0, "idle"],
          [s(3.4), "chin"],
          [s(10.4), "slump"],
          [s(11.5), "present"],
        ]}
        flinch={[s(6.6), s(8.0), s(9.2)]}
      />
      {/* the sigh */}
      {f > s(10.4) && f < s(11.6) ? (
        <At x={330 + ramp(f, s(10.4), s(11.6)) * 60} y={830 - ramp(f, s(10.4), s(11.6)) * 40} o={1 - ramp(f, s(11), s(11.6))}>
          <path d="M0 0 q30 -20 60 0 q30 20 60 0" stroke={C.steel} strokeWidth={10} fill="none" strokeLinecap="round" />
        </At>
      ) : null}
      <At x={560} y={1010} s={ktp} r={-6 + wave(f, 40, 3)}>
        <Ktp />
      </At>
      <At x={830} y={1040} s={book} r={8}>
        <BankBook />
      </At>
    </Svg>
  );
};

const Temptation: React.FC<{ dur: number }> = () => {
  const f = useCurrentFrame();
  const grow = interpolate(f, [s(0.2), s(1.1)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.5)) });
  const popAt = s(8.6);
  const burst = f >= popAt;
  const shrinkPop = burst ? 1 + ramp(f, popAt, popAt + 5) * 0.25 : 1;
  const bubbleT = burst ? Math.max(0, grow * shrinkPop * (1 - ramp(f, popAt + 3, popAt + 6))) : grow;
  const stampHold = pop(f, s(1.8));
  const contract = pop(f, s(3.6));
  const shake = f > s(6.8) && f < s(8.4) ? Math.sin(f * 0.9) : 0;
  return (
    <Svg>
      <At x={590} y={620}>
        {bubbleT > 0.01 ? (
          <Thought t={bubbleT} w={820} h={600} tailX={-260} tailY={360}>
            <Person {...TEMAN} x={-180} y={200} scale={0.42} mood="happy" poses={[[0, "present"]]} holding={<At x={10} y={0} s={stampHold}><rect x={-34} y={-70} width={68} height={60} rx={10} fill="#6C5CE7" /><rect x={-48} y={-14} width={96} height={30} rx={8} fill={C.navy} /></At>} />
            <At x={-180} y={-190} s={stampHold}>
              <rect x={-110} y={-34} width={220} height={60} rx={14} fill="#6C5CE7" />
              <T x={0} y={8} size={26} weight={900} fill="#fff">
                PT punya teman
              </T>
            </At>
            <At x={170} y={-40} s={contract * 0.62} r={4}>
              <Doc title="KONTRAK" sub="a.n. PT punya teman" accent="#6C5CE7" />
            </At>
            {/* money flies to the friend's account, not Bu Sari's */}
            {[0, 1, 2].map((i) => {
              const st = s(4.4) + i * 8;
              const t = ramp(f, st, st + 22);
              return t > 0 && t < 1 ? (
                <At key={i} x={interpolate(t, [0, 1], [180, -200])} y={interpolate(t, [0, 0.5, 1], [150, 40, 130])} r={t * 360} s={0.8}>
                  <Coin />
                </At>
              ) : null;
            })}
          </Thought>
        ) : null}
        {burst ? <Burst start={popAt + 4} n={18} r={420} colors={["#fff", "#DCE4F0", C.steel]} /> : null}
      </At>
      <Person
        {...SARI}
        x={230}
        y={1300}
        scale={0.72}
        lean={shake * 6}
        moods={[
          [0, "think"],
          [s(3.4), "worried"],
          [popAt, "neutral"],
        ]}
        poses={[
          [0, "chin"],
          [s(6.6), "shrug"],
          [popAt, "cross"],
        ]}
      />
      <At x={800} y={1150} s={pop(f, s(6.8), 8)} r={-8}>
        <Stamp t={pop(f, s(6.8), 8)} text="BERISIKO" />
      </At>
    </Svg>
  );
};

const LESSON_DOCS = ["AKTA", "NIB", "NPWP BADAN", "REKENING USAHA"];

const Lesson: React.FC<{ dur: number }> = () => {
  const f = useCurrentFrame();
  const open = ramp(f, s(1.6), s(2.2));
  const chips = [
    { label: "PT Perorangan", at: 5.2, color: C.gold },
    { label: "CV", at: 8.4, color: "#BFE0FF" },
    { label: "PT", at: 9.0, color: "#BFE0FF" },
  ];
  const finale = s(11.4);
  return (
    <Svg>
      {/* documents fly out of Lea and line up, crosses turn into ticks */}
      {LESSON_DOCS.map((d, i) => {
        const st = s(2.0) + i * 5;
        const t = interpolate(f, [st, st + 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.3)) });
        const x = interpolate(t, [0, 1], [800, 180 + i * 240]);
        const y = interpolate(t, [0, 0.5, 1], [1000, 340, 470]);
        const ok = pop(f, s(3.0) + i * 6, 9);
        return t > 0 ? (
          <At key={d} x={x} y={y} s={0.42 + t * 0.2} r={(1 - t) * 180 + (f > finale ? wave(f, 20, 4, i * 5) : 0)}>
            <Doc title={d.length > 8 ? d.split(" ")[0] : d} sub={d.length > 8 ? d.split(" ").slice(1).join(" ") : ""} w={300} h={360} />
            <At x={100} y={130}>
              {ok > 0.02 ? <At x={0} y={0} s={ok}><Badge ok r={50} /></At> : <Badge ok={false} r={50} />}
            </At>
          </At>
        ) : null;
      })}
      {f > s(3.0) && f < s(5) ? (
        <At x={540} y={560}>
          <Burst start={s(3.0) + 18} n={12} r={420} colors={[C.green, C.gold]} />
        </At>
      ) : null}
      {/* the three entity options */}
      <At x={540} y={740} o={1 - ramp(f, finale - 4, finale + 2)}>
        {chips.map((c, i) => {
          const p = pop(f, s(c.at), 10);
          const x = [-250, 130, 330][i];
          return (
            <At key={c.label} x={x} y={wave(f, 40, 6, i * 9)} s={p}>
              <rect x={i === 0 ? -200 : -80} y={-48} width={i === 0 ? 400 : 160} height={96} rx={48} fill={c.color} stroke={C.navy} strokeWidth={5} />
              <T x={0} y={16} size={42} weight={900}>
                {c.label}
              </T>
            </At>
          );
        })}
      </At>
      <At x={540} y={740} s={pop(f, finale, 10)}>
        <rect x={-380} y={-50} width={760} height={100} rx={50} fill={C.green} />
        <T x={0} y={16} size={42} weight={900} fill="#fff">
          Atas nama usahamu sendiri
        </T>
      </At>
      <Person
        {...SARI}
        x={230}
        y={1300}
        scale={0.56}
        moods={[
          [0, "sad"],
          [s(0.3), "shock"],
          [s(1.4), "happy"],
        ]}
        poses={[
          [0, "slump"],
          [s(0.3), "handsHead"],
          [s(1.4), "idle"],
          [finale, "armsUp"],
        ]}
        flinch={[s(0.3)]}
        jumps={[finale, finale + 16]}
      />
      <Lea
        x={810}
        y={1300}
        scale={0.72}
        facing={-1}
        enter={{ from: 1350, start: 0, dur: 18 }}
        mouth={MOUTH["05-pelajaran"]}
        open={open * (1 - ramp(f, s(4.2), s(4.7)))}
        poses={[
          [0, "wave"],
          [s(1.6), "cheer"],
          [s(4.7), "present"],
          [s(8.4), "point"],
          [finale, "cheer"],
        ]}
        jumps={[s(2.0), finale]}
      />
    </Svg>
  );
};

const Ending: React.FC<{ dur: number }> = () => {
  const f = useCurrentFrame();
  const sign = interpolate(f, [s(3.6), s(4.3)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const write = ramp(f, s(0.3), s(1.8));
  const signedAt = s(1.9);
  return (
    <Svg>
      <At x={540} y={520}>
        <Sign front="Katering Bu Sari" back="✓ Badan usaha resmi" flip={sign} w={600} />
      </At>
      <Counter x={160} w={760} y={1080} />
      <At x={600} y={980} s={0.9} r={-4}>
        <Doc title="KONTRAK VENDOR" sub="a.n. usaha Bu Sari" w={420} h={300} accent={C.green} stamp={f > signedAt ? "ok" : undefined} />
        {/* signature drawn as the pen moves */}
        <path d="M-120 100 q20 -40 40 0 t40 0 q20 -40 40 0 t40 10" stroke={C.cobalt} strokeWidth={6} fill="none" strokeLinecap="round" strokeDasharray={260} strokeDashoffset={260 * (1 - write)} />
        {f < signedAt + 4 ? (
          <At x={-120 + write * 160} y={70 + wave(f, 6, 10)} r={30}>
            <rect x={-8} y={-90} width={16} height={90} rx={6} fill={C.navy} />
            <path d="M-8 0 L0 18 L8 0 Z" fill={C.gold} />
          </At>
        ) : null}
      </At>
      <Person
        {...SARI}
        x={290}
        y={1300}
        scale={0.72}
        mood="happy"
        poses={[
          [0, "hold"],
          [signedAt, "armsUp"],
        ]}
        jumps={[signedAt, signedAt + 18]}
      />
      {[0, 1, 2].map((i) => {
        const st = s(2.4) + i * 10;
        const x = interpolate(f, [st, st + 50], [-300, 1400], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <At key={i} x={x} y={1290 + (i % 2) * 10} s={0.5}>
            <Motor />
          </At>
        );
      })}
      <At x={540} y={700}>
        <Burst start={signedAt} n={20} r={480} />
      </At>
      <Confetti start={signedAt} />
    </Svg>
  );
};

const Pitch: React.FC<{ dur: number }> = () => {
  const f = useCurrentFrame();
  const board = interpolate(f, [s(0.2), s(0.9)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.4)) });
  const flipX = Math.cos((1 - board) * Math.PI * 0.5);
  const prices = [
    { name: "PT Perorangan", price: "Rp1,5 jt", at: 4.0 },
    { name: "CV", price: "Rp2,5 jt", at: 6.3 },
    { name: "PT", price: "Rp3,5 jt", at: 6.9 },
  ];
  const bonus = pop(f, s(8.0), 10);
  const wa = pop(f, s(9.9), 10);
  return (
    <Svg>
      <At x={540} y={220} s={pop(f, 2)}>
        <T x={0} y={0} size={60} weight={900} fill="#fff">
          Siap naik kelas?
        </T>
      </At>
      <At x={540} y={560} s={board}>
        <g transform={`scale(${Math.max(0.02, flipX)} 1)`}>
          <rect x={-420} y={-250} width={840} height={500} rx={36} fill="#fff" />
          <rect x={-420} y={-250} width={840} height={96} rx={36} fill={C.cobalt} />
          <rect x={-420} y={-190} width={840} height={36} fill={C.cobalt} />
          <T x={0} y={-186} size={40} weight={900} fill="#fff">
            Urus badan usaha
          </T>
          {prices.map((p, i) => {
            const k = pop(f, s(p.at), 10);
            const y = -90 + i * 110;
            return (
              <g key={p.name} opacity={Math.min(1, k * 1.5)} transform={`translate(${(1 - k) * 80} 0)`}>
                <T x={-370} y={y + 30} size={44} weight={800} anchor="start">
                  {p.name}
                </T>
                <T x={370} y={y + 30} size={54} weight={900} fill={C.cobalt} anchor="end">
                  {p.price}
                </T>
                {i < 2 ? <rect x={-370} y={y + 64} width={740} height={4} rx={2} fill="#DCE4F0" /> : null}
              </g>
            );
          })}
        </g>
      </At>
      {/* bonus: website + logo, float in */}
      <At x={540} y={900} s={bonus}>
        <rect x={-420} y={-90} width={840} height={180} rx={30} fill={C.gold} />
        <T x={-130} y={-30} size={30} weight={900} anchor="start">
          BONUS paket CV & PT
        </T>
        <T x={-130} y={22} size={40} weight={900} anchor="start">
          Website + desain logo
        </T>
        <At x={-300} y={wave(f, 40, 8)} r={-8}>
          <rect x={-70} y={-55} width={140} height={110} rx={12} fill="#fff" stroke={C.navy} strokeWidth={5} />
          <rect x={-70} y={-55} width={140} height={24} rx={10} fill={C.navy} />
          <rect x={-50} y={-14} width={100} height={14} rx={6} fill={C.cobalt} />
          <rect x={-50} y={12} width={70} height={10} rx={5} fill="#DCE4F0" />
        </At>
        <At x={-190} y={30 + wave(f, 40, 8, 15)} s={0.8}>
          <circle r={44} fill={C.navy} />
          <Spark color={C.gold} size={28} />
        </At>
      </At>
      <Lea
        x={250}
        y={1330}
        scale={0.55}
        enter={{ from: -300, start: 0, dur: 16 }}
        mouth={MOUTH["07-jualan"]}
        poses={[
          [0, "wave"],
          [s(2.0), "present"],
          [s(8.0), "cheer"],
          [s(9.9), "point"],
        ]}
        jumps={[s(8.0)]}
      />
      <At x={700} y={1250} s={wa * (1 + wave(f, 30, 0.03))}>
        <rect x={-260} y={-60} width={520} height={120} rx={60} fill="#25D366" />
        <T x={0} y={-6} size={36} weight={900} fill="#fff">
          Chat WhatsApp
        </T>
        <T x={0} y={38} size={30} weight={800} fill="#fff">
          0821-4214-4904
        </T>
      </At>
      <At x={700} y={1350} o={wa}>
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
      kicker: { pill: "STORYTIME", text: "" },
      setting: "kitchen",
      camera: { zoom: [1.0, 1.06], focus: [540, 800], punch: [0.13, 0.6], shake: [0.6], grade: "warm" },
      Visual: Hook,
    },
    {
      id: "02-tokoh",
      text: "Ini Bu Sari. Katering rumahannya sudah jalan lima tahun. Pelanggannya tetangga, dan kantor-kantor kecil di sekitar rumah.",
      kicker: { pill: "INI BU SARI" },
      setting: "kitchen",
      camera: { zoom: [1.12, 1.0], pan: [40, -20], focus: [400, 1000], grade: "warm" },
      Visual: Intro,
    },
    {
      id: "03-konflik",
      text: "Lalu, kantor besar itu kirim syarat vendor. Invoice harus atas nama *badan usaha,* lengkap dengan akta, NIB, dan *NPWP badan.* Bu Sari cuma punya KTP... dan rekening pribadi.",
      setting: "office",
      camera: { zoom: [1.0, 1.08], focus: [560, 700], shake: [0.44, 0.53, 0.61], punch: [0.44], grade: "tense" },
      Visual: Conflict,
    },
    {
      id: "04-godaan",
      text: "Sempat terpikir, pinjam PT punya teman. Tapi nanti, kontrak dan uangnya atas nama orang lain. Kalau ada masalah, *Bu Sari tidak punya pegangan.*",
      setting: "kitchen",
      camera: { zoom: [1.05, 1.12], pan: [0, -20], focus: [540, 760], shake: [0.83], grade: "cool" },
      Visual: Temptation,
    },
    {
      id: "05-pelajaran",
      text: "Tenang, Bu Sari! Solusinya, punya *badan usaha sendiri.* Usaha kecil bisa mulai dari *PT Perorangan.* Atau CV dan PT, kalau mau berkembang bareng partner. Kontrak dan uangnya jadi atas nama *usahamu sendiri.*",
      setting: "plain",
      camera: { zoom: [1.08, 1.0], tilt: [30, 0], punch: [0.14, 0.77], grade: "bright" },
      Visual: Lesson,
    },
    {
      id: "06-akhir",
      text: "Sekarang, Bu Sari *resmi jadi vendor* kantor besar itu. Atas nama usahanya sendiri.",
      kicker: { pill: "RESMI JADI VENDOR", pillColor: "#7CD3A2" },
      setting: "kitchen",
      camera: { zoom: [1.0, 1.08], focus: [540, 900], punch: [0.33], grade: "warm" },
      Visual: Ending,
    },
    {
      id: "07-jualan",
      text: "Siap naik kelas seperti Bu Sari? LegalEase urus badan usahamu, mulai *satu setengah juta rupiah.* Paket CV dan PT dapat *bonus website dan desain logo.* Chat WhatsApp di bio, ya!",
      setting: "navy",
      camera: { zoom: [1.0, 1.0], grade: "night" },
      Visual: Pitch,
    },
  ],
};
