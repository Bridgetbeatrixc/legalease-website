import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { at, pop, ramp } from "../components/anim";
import { EndCard } from "../components/EndCard";
import { Person, PersonProps } from "../components/Person";
import { At, Badge, Box, Bubble, Doc, Jar, Marks, Shelf, Stove, T } from "../components/Props";
import { Svg } from "../components/Stage";
import { C, HAIR, SKIN } from "../theme";
import type { VideoDef } from "../types";

const DIMAS: Partial<PersonProps> = { hair: "short", hairColor: HAIR.black, skin: SKIN.tan, shirt: "#E4572E", pants: C.navy };
const MANAGER: Partial<PersonProps> = { hair: "hijab", hijabColor: C.green, skin: SKIN.light, shirt: "#BFE8CF", pants: C.navy, sleeves: "long", outfit: "dress", seed: 3 };

const Hook: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const hit = at(dur, 0.35);
  const shocked = f > hit;
  return (
    <Svg>
      <At x={500} y={900}>
        <Shelf w={520} />
      </At>
      <At x={500} y={640}>
        <Shelf w={520} />
      </At>
      {[0, 1, 2, 3, 4].map((i) => {
        const start = dur * 0.15 + i * 6;
        const t = ramp(f, start, start + 14);
        const x = interpolate(t, [0, 1], [560 + i * 100, 820]);
        const y = interpolate(t, [0, 0.4, 1], [900, 860, 1210]);
        return (
          <At key={i} x={x} y={y} r={t * 40} o={1 - ramp(f, start + 12, start + 16)}>
            <Jar />
          </At>
        );
      })}
      {[0, 1, 2, 3, 4].map((i) => (
        <At key={`t${i}`} x={560 + i * 100} y={640}>
          <Jar />
        </At>
      ))}
      <At x={820} y={1300} s={1.1}>
        <Box label="RETUR" />
      </At>
      <Person
        x={250}
        y={1300}
        scale={0.82}
        {...DIMAS}
        walk={{ from: -220, start: 0, dur: 20 }}
        moods={[
          [0, "happy"],
          [hit, "shock"],
        ]}
        poses={[
          [0, "present"],
          [hit, "handsHead"],
        ]}
        jumps={[hit]}
        flinch={[hit]}
      />
      {shocked ? (
        <At x={250} y={480} o={ramp(f, dur * 0.35, dur * 0.35 + 6)}>
          <Marks kind="!" color={C.red} />
        </At>
      ) : null}
    </Svg>
  );
};

const Intro: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  return (
    <Svg>
      <At x={700} y={1000}>
        <Stove />
      </At>
      <Person
        x={400}
        y={1300}
        scale={0.86}
        {...DIMAS}
        mood="happy"
        poses={[
          [0, "stir"],
          [at(dur, 0.55), "armsUp"],
          [at(dur, 0.8), "present"],
        ]}
        jumps={[at(dur, 0.55), at(dur, 0.67)]}
        holding={<line x1={0} y1={0} x2={150} y2={-40} stroke={C.woodDark} strokeWidth={14} strokeLinecap="round" />}
      />
      {["Pesanan: 12 botol", "Pesanan: 30 botol", "Pesanan: 50 botol"].map((txt, i) => {
        const p = pop(f, 10 + i * 16);
        return (
          <At key={i} x={760} y={470 + i * 110} s={p}>
            <Bubble text={txt} w={470} />
          </At>
        );
      })}
    </Svg>
  );
};

const Conflict: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const card = pop(f, 4);
  const b1 = pop(f, dur * 0.25);
  const b2 = pop(f, dur * 0.4);
  const stamp = pop(f, dur * 0.62, 9);
  return (
    <Svg>
      <At x={540} y={630} s={card * 0.85}>
        <rect x={-300} y={-190} width={600} height={380} rx={30} fill="#fff" />
        <T x={0} y={-118} size={40} weight={900}>
          Syarat masuk toko
        </T>
        <rect x={-250} y={-80} width={500} height={110} rx={20} fill={C.wall} />
        <T x={-210} y={-12} size={46} weight={900} anchor="start">
          NIB
        </T>
        <At x={180} y={-25} s={b1}>
          <Badge ok={false} r={40} />
        </At>
        <rect x={-250} y={50} width={500} height={110} rx={20} fill={C.wall} />
        <T x={-210} y={118} size={46} weight={900} anchor="start">
          Nomor PIRT
        </T>
        <At x={180} y={105} s={b2}>
          <Badge ok={false} r={40} />
        </At>
        <g transform={`rotate(-14) scale(${stamp > 0.01 ? 2.2 - stamp * 1.2 : 0})`} opacity={stamp}>
          <rect x={-200} y={-70} width={400} height={140} rx={20} fill="none" stroke={C.red} strokeWidth={14} />
          <T x={0} y={34} size={96} weight={900} fill={C.red}>
            BATAL
          </T>
        </g>
      </At>
      <Person
        x={240}
        y={1300}
        scale={0.7}
        {...DIMAS}
        walk={{ from: -200, start: 0, dur: 18 }}
        moods={[
          [0, "happy"],
          [at(dur, 0.25), "worried"],
          [at(dur, 0.62), "sad"],
        ]}
        poses={[
          [0, "present"],
          [at(dur, 0.25), "chin"],
          [at(dur, 0.62), "slump"],
        ]}
        flinch={[at(dur, 0.62)]}
        holding={<At x={0} y={60} s={0.45}><Jar /></At>}
      />
      <Person
        x={850}
        y={1300}
        scale={0.7}
        facing={-1}
        {...MANAGER}
        mood="neutral"
        poses={[
          [0, "cross"],
          [at(dur, 0.3), "point"],
          [at(dur, 0.6), "shrug"],
        ]}
      />
    </Svg>
  );
};

const Fact: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const a = pop(f, 6);
  const b = pop(f, dur * 0.45);
  return (
    <Svg>
      <At x={320} y={820} s={a} r={-4}>
        <Doc title="NIB" sub="Terdaftar di OSS" stamp="ok" />
      </At>
      <At x={540} y={820} s={b}>
        <T x={0} y={30} size={110} weight={900} fill={C.cobalt}>
          +
        </T>
      </At>
      <At x={790} y={1040} s={1.9 * b}>
        <Jar label="P-IRT" />
      </At>
      <At x={900} y={720} s={b}>
        <Badge ok r={44} />
      </At>
      <At x={760} y={1190} s={b}>
        <T x={0} y={0} size={40} weight={800} fill={C.navy}>
          Pangan olahan rumahan
        </T>
      </At>
    </Svg>
  );
};

const Cta: React.FC<{ dur: number }> = () => <EndCard person={{ ...DIMAS, holding: <At x={0} y={60} s={0.5}><Jar /></At> }} line="Urus NIB & PIRT bareng LegalEase" />;

export const V1: VideoDef = {
  id: "mitos-usaha-rumahan",
  title: "Mitos: Usaha Rumahan Tidak Perlu Izin",
  date: "Jumat 13 Nov 2026",
  scenes: [
    {
      id: "01-hook",
      text: "Sambalnya sudah masuk supermarket. Seminggu kemudian, *semuanya dikembalikan.*",
      kicker: { pill: "MITOS ATAU FAKTA?", text: "Usaha rumahan nggak perlu izin" },
      setting: "store",
      camera: { zoom: [1.0, 1.12], focus: [400, 1000], punch: [0.35], shake: [0.35], grade: "warm" },
      Visual: Hook,
    },
    {
      id: "02-tokoh",
      text: "Ini Dimas. Dia bikin sambal botolan dari dapur rumahnya, dan pesanannya terus bertambah.",
      kicker: { pill: "INI DIMAS" },
      setting: "kitchen",
      camera: { zoom: [1.14, 1.0], pan: [-30, 0], focus: [500, 1000], grade: "warm" },
      Visual: Intro,
    },
    {
      id: "03-konflik",
      text: "Lalu supermarket minta dua hal: *NIB* dan *nomor PIRT.* Dimas tidak punya keduanya. Kerja samanya batal.",
      setting: "store",
      camera: { zoom: [1.0, 1.1], focus: [540, 700], punch: [0.62], shake: [0.62], grade: "tense" },
      Visual: Conflict,
    },
    {
      id: "04-pelajaran",
      text: "Faktanya, usaha sekecil apa pun perlu *NIB* dari OSS. Pangan olahan rumahan juga biasanya perlu *PIRT* sebelum dijual luas.",
      kicker: { pill: "FAKTA", pillColor: "#7CD3A2", text: "Usaha kecil tetap perlu izin" },
      setting: "plain",
      camera: { zoom: [1.08, 1.0], tilt: [30, 0], punch: [0.45], grade: "bright" },
      Visual: Fact,
    },
    {
      id: "05-jualan",
      text: "Jangan sampai peluang besar hilang karena izin. LegalEase urus NIB dan PIRT-mu dari awal. Konsultasi gratis, chat WhatsApp di bio.",
      setting: "navy",
      Visual: Cta,
    },
  ],
};
