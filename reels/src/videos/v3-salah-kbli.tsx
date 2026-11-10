import React from "react";
import { useCurrentFrame } from "remotion";
import { at, pop, ramp } from "../components/anim";
import { EndCard } from "../components/EndCard";
import { Person, PersonProps } from "../components/Person";
import { At, Badge, BeanBag, Box, Cup, T } from "../components/Props";
import { Svg } from "../components/Stage";
import { C, HAIR, SKIN } from "../theme";
import type { VideoDef } from "../types";

const BUDI: Partial<PersonProps> = { hair: "curly", hairColor: HAIR.black, skin: SKIN.brown, shirt: C.navy, pants: "#5B6B82", seed: 2 };

const Counter: React.FC = () => (
  <g>
    <rect x={-300} y={-260} width={600} height={260} rx={16} fill={C.wood} />
    <rect x={-320} y={-280} width={640} height={40} rx={12} fill={C.woodDark} />
    <rect x={-260} y={-210} width={520} height={160} rx={12} fill="#D9A274" />
  </g>
);

const CodeChip: React.FC<{ code: string; label: string; ok?: boolean; color?: string }> = ({ code, label, ok, color = C.cobalt }) => (
  <g>
    <rect x={-410} y={-62} width={820} height={124} rx={30} fill="#fff" />
    <rect x={-410} y={-62} width={200} height={124} rx={30} fill={color} />
    <rect x={-240} y={-62} width={30} height={124} fill={color} />
    <T x={-310} y={18} size={48} weight={900} fill="#fff">
      {code}
    </T>
    <T x={-180} y={14} size={36} weight={800} anchor="start">
      {label}
    </T>
    {ok !== undefined ? (
      <At x={350} y={0}>
        <Badge ok={ok} r={36} />
      </At>
    ) : null}
  </g>
);

const Hook: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const x = pop(f, dur * 0.4);
  return (
    <Svg>
      <At x={700} y={1300}>
        <Counter />
      </At>
      {[560, 700, 840].map((cx, i) => (
        <At key={cx} x={cx} y={1020} s={pop(f, 4 + i * 4)}>
          <Cup />
        </At>
      ))}
      <At x={300} y={1300} s={0.9}>
        <Box label="BIJI KOPI" />
      </At>
      <At x={300} y={1040} s={x}>
        <Badge ok={false} r={56} />
      </At>
      <Person
        x={720}
        y={1300}
        scale={0.66}
        {...BUDI}
        moods={[
          [0, "happy"],
          [at(dur, 0.4), "shock"],
          [at(dur, 0.6), "worried"],
        ]}
        poses={[
          [0, "wave"],
          [at(dur, 0.4), "handsHead"],
        ]}
        flinch={[at(dur, 0.4)]}
      />
    </Svg>
  );
};

const Intro: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  return (
    <Svg>
      <At x={540} y={590} s={pop(f, 8)}>
        <CodeChip code="56303" label="Rumah minum / kafe" ok />
      </At>
      <Person
        x={300}
        y={1300}
        scale={0.78}
        {...BUDI}
        mood="happy"
        walk={{ from: -220, start: 0, dur: 20 }}
        poses={[
          [0, "present"],
          [at(dur, 0.55), "fist"],
        ]}
        jumps={[at(dur, 0.55)]}
        holding={<At x={20} y={10} s={0.6}><Cup /></At>}
      />
      <At x={760} y={1300}>
        <Counter />
      </At>
      <At x={760} y={1020}>
        <Cup />
      </At>
    </Svg>
  );
};

const Conflict: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  return (
    <Svg>
      <At x={600} y={520} s={0.85 * pop(f, 4)}>
        <CodeChip code="56303" label="Kafe" ok />
      </At>
      <At x={600} y={660} s={0.85 * pop(f, dur * 0.3)}>
        <CodeChip code="?????" label="Sangrai kopi" ok={false} color={C.red} />
      </At>
      <At x={600} y={800} s={0.85 * pop(f, dur * 0.5)}>
        <CodeChip code="?????" label="Jual biji kopi" ok={false} color={C.red} />
      </At>
      {[0, 1, 2].map((i) => (
        <At key={i} x={720 + i * 110} y={1300} s={0.8 * pop(f, dur * 0.3 + i * 5)}>
          <BeanBag />
        </At>
      ))}
      <Person
        x={190}
        y={1300}
        scale={0.66}
        {...BUDI}
        moods={[
          [0, "happy"],
          [at(dur, 0.3), "shock"],
          [at(dur, 0.55), "worried"],
        ]}
        poses={[
          [0, "armsUp"],
          [at(dur, 0.3), "handsHead"],
          [at(dur, 0.55), "shrug"],
        ]}
        jumps={[6]}
        flinch={[at(dur, 0.3)]}
      />
    </Svg>
  );
};

const Lesson: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const rows = [
    { code: "56303", label: "Kafe" },
    { code: "10761", label: "Pengolahan kopi" },
    { code: "47243", label: "Eceran kopi" },
  ];
  return (
    <Svg>
      {rows.map((r, i) => (
        <At key={r.code} x={540} y={620 + i * 160} s={pop(f, 6 + i * (dur * 0.18))}>
          <CodeChip code={r.code} label={r.label} ok />
        </At>
      ))}
      <At x={540} y={1120} o={ramp(f, dur * 0.6, dur * 0.7)}>
        <T x={0} y={0} size={44} weight={900} fill={C.cobalt}>
          1 usaha, boleh banyak KBLI
        </T>
      </At>
    </Svg>
  );
};

const Cta: React.FC<{ dur: number }> = () => <EndCard person={{ ...BUDI, shirt: C.gold }} line="Cocokkan semua KBLI-mu dari awal" />;

export const V3: VideoDef = {
  id: "salah-pilih-kbli",
  title: "Salah Pilih KBLI, Izinnya Ikut Salah",
  date: "Jumat 20 Nov 2026",
  scenes: [
    {
      id: "01-hook",
      text: "Kedai kopinya laris. Tapi waktu mau jual biji kopi, *izinnya ternyata tidak cukup.*",
      kicker: { pill: "KESALAHAN UMUM", text: "Salah KBLI, izin ikut salah" },
      setting: "cafe",
      camera: { zoom: [1.0, 1.12], focus: [500, 1000], punch: [0.4], shake: [0.4], grade: "warm" },
      Visual: Hook,
    },
    {
      id: "02-tokoh",
      text: "Budi membuka kedai kopi dan mendaftarkan satu KBLI: *56303,* rumah minum atau kafe.",
      setting: "cafe",
      camera: { zoom: [1.12, 1.0], pan: [-30, 0], focus: [450, 900], grade: "warm" },
      Visual: Intro,
    },
    {
      id: "03-konflik",
      text: "Usahanya berkembang. Dia mulai menyangrai kopi sendiri dan menjual biji kopi kemasan. Dua kegiatan ini *tidak tercakup* di KBLI-nya.",
      setting: "cafe",
      camera: { zoom: [1.0, 1.1], focus: [600, 700], punch: [0.3, 0.5], grade: "tense" },
      Visual: Conflict,
    },
    {
      id: "04-pelajaran",
      text: "Satu usaha boleh punya beberapa KBLI. Tiap kegiatan perlu kodenya sendiri: kafe, *pengolahan kopi,* dan *perdagangan eceran kopi.*",
      kicker: { pill: "PELAJARANNYA" },
      setting: "plain",
      camera: { zoom: [1.08, 1.0], tilt: [40, 0], grade: "bright" },
      Visual: Lesson,
    },
    {
      id: "05-jualan",
      text: "Rencana usahamu mau ke mana? LegalEase bantu cocokkan semua KBLI-nya dari awal. Chat WhatsApp di bio.",
      setting: "navy",
      Visual: Cta,
    },
  ],
};
