import React from "react";
import { random, useCurrentFrame } from "remotion";
import { pop, ramp, wave } from "../components/anim";
import { EndCard } from "../components/EndCard";
import { Person, PersonProps } from "../components/Person";
import { At, Marks, Phone, T, Washer } from "../components/Props";
import { Svg } from "../components/Stage";
import { C, HAIR, SKIN } from "../theme";
import type { VideoDef } from "../types";

const MAYA: Partial<PersonProps> = { hair: "long", hairColor: HAIR.brown, skin: SKIN.light, shirt: "#7FB6EC", pants: C.navy, seed: 1 };

const Digits: React.FC<{ y: number; reveal?: string; t?: number }> = ({ y, reveal, t = 0 }) => {
  const f = useCurrentFrame();
  return (
    <g>
      {[0, 1, 2, 3, 4].map((i) => {
        const ch = reveal && t > i / 5 ? reveal[i] : String(Math.floor(random(`d${i}-${Math.floor(f / 3)}`) * 10));
        return (
          <g key={i} transform={`translate(${220 + i * 160} ${y + wave(f, 30, 6, i * 6)})`}>
            <rect x={-66} y={-90} width={132} height={170} rx={24} fill="#fff" stroke={C.cobalt} strokeWidth={8} />
            <T x={0} y={34} size={100} weight={900} fill={reveal && t > i / 5 ? C.cobalt : C.steel}>
              {ch}
            </T>
          </g>
        );
      })}
    </g>
  );
};

const Hook: React.FC<{ dur: number }> = () => (
  <Svg>
    <Digits y={620} />
    <Person x={540} y={1300} scale={0.72} {...MAYA} mood="think" pose="shrug" />
    <At x={540} y={780}>
      <Marks kind="?" />
    </At>
  </Svg>
);

const Intro: React.FC<{ dur: number }> = () => {
  const f = useCurrentFrame();
  return (
    <Svg>
      {[620, 860].map((x, i) => (
        <At key={x} x={x} y={1300} s={pop(f, 4 + i * 6)}>
          <Washer seed={i} />
        </At>
      ))}
      <At x={740} y={980} s={pop(f, 18)}>
        <rect x={-150} y={-40} width={300} height={80} rx={40} fill={C.gold} />
        <T x={0} y={14} size={36} weight={900}>
          Dekat kampus
        </T>
      </At>
      <Person x={250} y={1300} scale={0.86} {...MAYA} mood="happy" pose="wave" />
    </Svg>
  );
};

const Conflict: React.FC<{ dur: number }> = () => {
  const f = useCurrentFrame();
  return (
    <Svg>
      {Array.from({ length: 22 }).map((_, i) => {
        const x = 80 + random(`x${i}`) * 920;
        const speed = 6 + random(`s${i}`) * 8;
        const y = ((f * speed + random(`y${i}`) * 1400) % 1100) + 380;
        const code = String(10000 + Math.floor(random(`c${i}`) * 89999));
        return (
          <g key={i} transform={`translate(${x} ${y}) rotate(${(random(`r${i}`) - 0.5) * 30})`} opacity={0.9}>
            <rect x={-70} y={-34} width={140} height={68} rx={14} fill="#fff" stroke={C.floor} strokeWidth={4} />
            <T x={0} y={14} size={36} weight={900} fill={C.cobalt}>
              {code}
            </T>
          </g>
        );
      })}
      <Person x={540} y={1300} scale={0.8} {...MAYA} mood="worried" pose="handsHead" />
      <At x={540} y={500} s={pop(f, 8)}>
        <rect x={-250} y={-70} width={500} height={140} rx={70} fill={C.navy} />
        <T x={0} y={24} size={64} weight={900} fill={C.gold}>
          1.560 kode
        </T>
      </At>
    </Svg>
  );
};

const Search: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const query = "cuci pakaian";
  const typed = query.slice(0, Math.floor(ramp(f, 10, dur * 0.35) * query.length));
  const res = pop(f, dur * 0.4);
  const tap = pop(f, dur * 0.62);
  return (
    <Svg>
      <At x={540} y={880} s={1.1 * pop(f, 0)}>
        <Phone>
          <rect x={0} y={0} width={384} height={120} fill={C.navy} />
          <T x={192} y={80} size={24} weight={800} fill="#fff">
            legalease.asia/kbli
          </T>
          <T x={30} y={180} size={30} weight={900} anchor="start">
            Cari kode KBLI
          </T>
          <rect x={24} y={210} width={336} height={70} rx={16} fill={C.wall} stroke={C.cobalt} strokeWidth={4} />
          <T x={44} y={256} size={28} weight={700} anchor="start">
            {typed}
            {Math.floor(f / 8) % 2 === 0 && typed.length < query.length ? "|" : ""}
          </T>
          <g opacity={res} transform={`translate(0 ${(1 - res) * 40})`}>
            <rect x={24} y={310} width={336} height={230} rx={18} fill="#fff" stroke={tap > 0.5 ? C.gold : C.floor} strokeWidth={tap > 0.5 ? 8 : 4} />
            <T x={44} y={370} size={54} weight={900} fill={C.cobalt} anchor="start">
              96100
            </T>
            {["Aktivitas pencucian dan", "pembersihan produk", "tekstil dan bulu"].map((l, i) => (
              <T key={i} x={44} y={420 + i * 36} size={25} weight={700} anchor="start">
                {l}
              </T>
            ))}
            {[0, 1].map((i) => (
              <rect key={i} x={24} y={566 + i * 100} width={336} height={80} rx={16} fill={C.wall} opacity={0.7} />
            ))}
          </g>
        </Phone>
      </At>
      <At x={900} y={560} s={tap}>
        <circle r={70} fill={C.green} />
        <path d="M-30 0 L-8 24 L32 -24" stroke="#fff" strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </At>
    </Svg>
  );
};

const Cta: React.FC<{ dur: number }> = () => <EndCard person={MAYA} line="Kodenya ketemu? Izinnya biar kami urus" cta="Cek KBLI gratis" sub="legalease.asia/kbli · WhatsApp di bio" />;

export const V2: VideoDef = {
  id: "cari-kbli-30-detik",
  title: "Cari KBLI Usahamu dalam 30 Detik",
  date: "Senin 16 Nov 2026",
  scenes: [
    {
      id: "01-hook",
      text: "Maya hampir salah mengurus izin usahanya, cuma gara-gara *satu kode lima angka.*",
      kicker: { pill: "CERITA MAYA", text: "Satu kode, lima angka" },
      setting: "plain",
      Visual: Hook,
    },
    {
      id: "02-tokoh",
      text: "Maya mau buka laundry kiloan di dekat kampus. Tempat sudah ada, mesin cuci sudah dibeli.",
      setting: "laundry",
      Visual: Intro,
    },
    {
      id: "03-konflik",
      text: "Tapi waktu daftar di OSS, dia harus memilih *kode KBLI.* Pilihannya ada ribuan. Yang mana yang benar?",
      setting: "office",
      Visual: Conflict,
    },
    {
      id: "04-pelajaran",
      text: "Caranya gampang. Buka *legalease.asia/kbli,* ketik cuci pakaian, dan kodenya langsung muncul: *96100.*",
      kicker: { pill: "CARANYA" },
      setting: "plain",
      Visual: Search,
    },
    {
      id: "05-jualan",
      text: "Sudah ketemu kodenya? Biar LegalEase yang urus NIB dan izinnya sampai terbit. Cek KBLI gratis, link di bio.",
      setting: "navy",
      Visual: Cta,
    },
  ],
};
