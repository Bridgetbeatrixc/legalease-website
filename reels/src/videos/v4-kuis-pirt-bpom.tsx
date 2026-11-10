import React from "react";
import { useCurrentFrame } from "remotion";
import { at, pop, wave } from "../components/anim";
import { EndCard } from "../components/EndCard";
import { Person, PersonProps } from "../components/Person";
import { At, Chips, Serum, T, WaterBottle } from "../components/Props";
import { Svg } from "../components/Stage";
import { C, SKIN } from "../theme";
import type { VideoDef } from "../types";

const TIKA: Partial<PersonProps> = { hair: "hijab", hijabColor: "#C25478", skin: SKIN.tan, shirt: "#F3B8C8", pants: C.navy, sleeves: "long", outfit: "dress", seed: 4 };

const Table: React.FC = () => (
  <g>
    <rect x={-440} y={-30} width={880} height={36} rx={14} fill={C.woodDark} />
    <rect x={-400} y={6} width={30} height={260} fill={C.woodDark} />
    <rect x={370} y={6} width={30} height={260} fill={C.woodDark} />
  </g>
);

const Tag: React.FC<{ text: string; color: string; w?: number }> = ({ text, color, w = 300 }) => (
  <g>
    <rect x={-w / 2} y={-56} width={w} height={112} rx={56} fill={color} />
    <T x={0} y={20} size={60} weight={900} fill="#fff">
      {text}
    </T>
  </g>
);

const Hook: React.FC<{ dur: number }> = () => {
  const f = useCurrentFrame();
  const items = [<Chips key="c" />, <WaterBottle key="w" />, <Serum key="s" />];
  return (
    <Svg>
      <At x={540} y={1030}>
        <Table />
      </At>
      {items.map((it, i) => (
        <g key={i}>
          <At x={260 + i * 280} y={1000} s={pop(f, 4 + i * 5)}>
            {it}
          </At>
          <At x={260 + i * 280} y={640 + wave(f, 40, 10, i * 10)} s={pop(f, 14 + i * 5)}>
            <circle r={56} fill={C.navy} />
            <T x={0} y={24} size={70} weight={900} fill={C.gold}>
              ?
            </T>
          </At>
        </g>
      ))}
    </Svg>
  );
};

const Intro: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  return (
    <Svg>
      <Person
        x={300}
        y={1300}
        scale={0.86}
        {...TIKA}
        mood="happy"
        walk={{ from: -220, start: 0, dur: 20 }}
        poses={[
          [0, "wave"],
          [at(dur, 0.35), "present"],
          [at(dur, 0.75), "point"],
        ]}
        jumps={[at(dur, 0.35)]}
      />
      {[<Chips key="c" />, <WaterBottle key="w" />, <Serum key="s" />].map((it, i) => (
        <At key={i} x={620 + i * 170} y={1290} s={0.8 * pop(f, 8 + i * 8)}>
          {it}
        </At>
      ))}
    </Svg>
  );
};

const Question: (item: React.ReactNode, answer: string, color: string, w?: number) => React.FC<{ dur: number }> =
  (item, answer, color, w) =>
  ({ dur }) => {
    const f = useCurrentFrame();
    const a = pop(f, dur * 0.45, 9);
    return (
      <Svg>
        <At x={540} y={1060} s={1.8 * pop(f, 2)} r={wave(f, 50, 3)}>
          {item}
        </At>
        <At x={540} y={1180} s={a}>
          <Tag text={answer} color={color} w={w} />
        </At>
        <Person
          x={215}
          y={1300}
          scale={0.52}
          {...TIKA}
          moods={[
            [0, "think"],
            [at(dur, 0.45), "happy"],
          ]}
          poses={[
            [0, "chin"],
            [at(dur, 0.45), "armsUp"],
          ]}
          jumps={[at(dur, 0.45)]}
        />
      </Svg>
    );
  };

const Cta: React.FC<{ dur: number }> = () => <EndCard person={TIKA} line="Produkmu masuk PIRT atau BPOM?" cta="Tanya gratis" />;

export const V4: VideoDef = {
  id: "kuis-pirt-atau-bpom",
  title: "PIRT atau BPOM? Tebak Produk Ini",
  date: "Senin 23 Nov 2026",
  scenes: [
    {
      id: "01-hook",
      text: "Tiga produk, dua jenis izin. *Kamu bisa tebak yang mana?*",
      kicker: { pill: "KUIS", text: "PIRT atau BPOM?" },
      setting: "plain",
      camera: { zoom: [1.0, 1.1], focus: [540, 900], punch: [0.5], grade: "bright" },
      Visual: Hook,
    },
    {
      id: "02-tokoh",
      text: "Tika punya tiga produk: keripik singkong, air minum dalam kemasan, dan serum wajah.",
      kicker: { pill: "PRODUK TIKA" },
      setting: "room",
      camera: { zoom: [1.1, 1.0], pan: [30, 0], focus: [600, 1100], grade: "warm" },
      Visual: Intro,
    },
    {
      id: "03-keripik",
      text: "Keripik singkong buatan rumah? Cukup *PIRT* dari pemerintah daerah.",
      kicker: { pill: "1 / 3", text: "Keripik singkong" },
      setting: "plain",
      camera: { zoom: [1.0, 1.08], focus: [540, 1050], punch: [0.45], grade: "warm" },
      Visual: Question(<Chips />, "PIRT", C.green),
    },
    {
      id: "04-air",
      text: "Air minum dalam kemasan? Wajib *izin edar BPOM,* dan harus memenuhi SNI.",
      kicker: { pill: "2 / 3", text: "Air minum kemasan" },
      setting: "plain",
      camera: { zoom: [1.0, 1.08], focus: [540, 1050], punch: [0.45], grade: "cool" },
      Visual: Question(<WaterBottle />, "BPOM", C.cobalt),
    },
    {
      id: "05-serum",
      text: "Serum wajah? Kosmetik juga lewat *BPOM,* dengan notifikasi kosmetik.",
      kicker: { pill: "3 / 3", text: "Serum wajah" },
      setting: "plain",
      camera: { zoom: [1.0, 1.08], focus: [540, 1050], punch: [0.45], grade: "warm" },
      Visual: Question(<Serum />, "BPOM", C.cobalt),
    },
    {
      id: "06-jualan",
      text: "Salah pilih izin bisa bikin produkmu ditolak toko dan marketplace. Bingung produkmu masuk yang mana? Tanya LegalEase gratis lewat WhatsApp di bio.",
      setting: "navy",
      Visual: Cta,
    },
  ],
};
