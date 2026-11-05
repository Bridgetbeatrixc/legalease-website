import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { at, pop, ramp, wave } from "../components/anim";
import { EndCard } from "../components/EndCard";
import { Person, PersonProps } from "../components/Person";
import { At, Doc, Envelope, Phone, T } from "../components/Props";
import { Svg } from "../components/Stage";
import { C, HAIR, SKIN } from "../theme";
import type { VideoDef } from "../types";

const ANDI: Partial<PersonProps> = { hair: "short", hairColor: HAIR.brown, skin: SKIN.light, shirt: "#fff", pants: C.navy, sleeves: "long", seed: 6 };

const Hook: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const t = ramp(f, dur * 0.2, dur * 0.45);
  return (
    <Svg>
      <At x={interpolate(t, [0, 1], [1300, 680])} y={interpolate(t, [0, 1], [400, 760])} r={interpolate(t, [0, 1], [40, -6])} s={1.2}>
        <Envelope label="DENDA PAJAK" />
      </At>
      <Person
        x={290}
        y={1300}
        scale={0.82}
        {...ANDI}
        walk={{ from: -220, start: 0, dur: 18 }}
        moods={[
          [0, "happy"],
          [at(dur, 0.42), "shock"],
        ]}
        poses={[
          [0, "phone"],
          [at(dur, 0.42), "handsHead"],
        ]}
        holding={<At x={0} y={-20} s={0.18}><Phone /></At>}
        jumps={[at(dur, 0.42)]}
        flinch={[at(dur, 0.42)]}
      />
    </Svg>
  );
};

const Chart: React.FC<{ t: number }> = ({ t }) => {
  const bars = [0.8, 0.6, 0.45, 0.3];
  return (
    <g>
      <rect x={-260} y={-300} width={520} height={360} rx={24} fill="#fff" />
      {bars.map((h, i) => (
        <rect key={i} x={-200 + i * 110} y={20 - h * 260 * t} width={70} height={h * 260 * t} rx={10} fill={i === 3 ? C.red : C.sky} />
      ))}
      <path d={`M-200 -230 L${-200 + 360 * t} ${-230 + 200 * t}`} stroke={C.red} strokeWidth={12} strokeLinecap="round" />
      <T x={0} y={-250} size={34} weight={900} fill={C.red}>
        Tahun pertama: rugi
      </T>
    </g>
  );
};

const Intro: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  return (
    <Svg>
      <At x={720} y={900} s={pop(f, 4)}>
        <Chart t={ramp(f, 8, dur * 0.6)} />
      </At>
      <Person
        x={260}
        y={1300}
        scale={0.86}
        {...ANDI}
        moods={[
          [0, "happy"],
          [at(dur, 0.4), "neutral"],
        ]}
        poses={[
          [0, "point"],
          [at(dur, 0.4), "chin"],
          [at(dur, 0.7), "shrug"],
        ]}
      />
    </Svg>
  );
};

const Conflict: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  return (
    <Svg>
      <At x={540} y={560} s={1.25 * pop(f, 4, 9)} r={wave(f, 20, 2)}>
        <Envelope />
      </At>
      <Person
        x={540}
        y={1300}
        scale={0.7}
        {...ANDI}
        moods={[
          [0, "shock"],
          [at(dur, 0.5), "sad"],
        ]}
        poses={[
          [0, "handsHead"],
          [at(dur, 0.5), "slump"],
        ]}
        flinch={[2]}
      />
    </Svg>
  );
};

const Fact: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  return (
    <Svg>
      <At x={300} y={850} s={pop(f, 4)} r={-4}>
        <Doc title="SPT" sub="Tetap lapor walau rugi" stamp="ok" />
      </At>
      <At x={760} y={700} s={pop(f, dur * 0.4)}>
        <rect x={-180} y={-150} width={360} height={300} rx={30} fill="#fff" />
        <rect x={-180} y={-150} width={360} height={80} rx={30} fill={C.cobalt} />
        <rect x={-180} y={-100} width={360} height={30} fill={C.cobalt} />
        <T x={0} y={-96} size={34} weight={900} fill="#fff">
          Batas lapor PT
        </T>
        <T x={0} y={60} size={64} weight={900}>
          Akhir April
        </T>
      </At>
      <At x={760} y={1020} s={pop(f, dur * 0.62)}>
        <rect x={-200} y={-70} width={400} height={140} rx={30} fill={C.red} />
        <T x={0} y={-8} size={30} weight={800} fill="#fff">
          Telat lapor
        </T>
        <T x={0} y={42} size={44} weight={900} fill="#fff">
          Denda Rp1 juta
        </T>
      </At>
    </Svg>
  );
};

const Cta: React.FC<{ dur: number }> = () => <EndCard person={ANDI} line="Laporan pajak? Biar kami yang urus" />;

export const V6: VideoDef = {
  id: "mitos-belum-untung-spt",
  title: "Mitos: Belum Untung, Tidak Perlu Lapor SPT",
  date: "Rabu 2 Des 2026",
  scenes: [
    {
      id: "01-hook",
      text: "Usahanya belum untung sepeser pun. Tapi *tetap kena denda pajak.*",
      kicker: { pill: "MITOS ATAU FAKTA?", text: "Belum untung, nggak perlu lapor SPT" },
      setting: "office",
      camera: { zoom: [1.0, 1.12], focus: [500, 900], punch: [0.42], shake: [0.42], grade: "cool" },
      Visual: Hook,
    },
    {
      id: "02-tokoh",
      text: "Andi mendirikan PT tahun lalu. Tahun pertama masih rugi, jadi dia pikir tidak ada yang perlu dilaporkan.",
      setting: "office",
      camera: { zoom: [1.1, 1.0], pan: [30, 0], focus: [600, 1000], grade: "cool" },
      Visual: Intro,
    },
    {
      id: "03-konflik",
      text: "Lalu datang *surat teguran.* SPT Tahunan PT-nya tidak pernah dilaporkan.",
      setting: "office",
      camera: { zoom: [1.06, 1.16], focus: [540, 700], shake: [0.02], grade: "tense" },
      Visual: Conflict,
    },
    {
      id: "04-pelajaran",
      text: "Faktanya, SPT tetap wajib dilaporkan walau usaha rugi. SPT Tahunan PT paling lambat *akhir April,* dan dendanya *1 juta rupiah* kalau terlambat.",
      kicker: { pill: "FAKTA", pillColor: "#7CD3A2", text: "Rugi tetap wajib lapor" },
      setting: "plain",
      camera: { zoom: [1.06, 1.0], tilt: [30, 0], punch: [0.4, 0.62], grade: "bright" },
      Visual: Fact,
    },
    {
      id: "05-jualan",
      text: "Fokus saja ke usahamu. Laporan pajaknya biar LegalEase yang urus. Chat WhatsApp di bio.",
      setting: "navy",
      Visual: Cta,
    },
  ],
};
