import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { pop, ramp, wave } from "../components/anim";
import { EndCard } from "../components/EndCard";
import { Person, PersonProps } from "../components/Person";
import { At, Box, Bubble, Marks, Phone, T } from "../components/Props";
import { Svg } from "../components/Stage";
import { C, HAIR, SKIN } from "../theme";
import type { VideoDef } from "../types";

const LINA: Partial<PersonProps> = { hair: "bun", hairColor: HAIR.black, skin: SKIN.light, shirt: C.gold, pants: C.navy, seed: 5 };

const rupiah = (n: number) => "Rp" + Math.round(n).toLocaleString("id-ID");

const Hook: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const n = interpolate(f, [0, dur * 0.6], [0, 72000000], { extrapolateRight: "clamp" });
  return (
    <Svg>
      <At x={540} y={620} s={pop(f, 2)}>
        <rect x={-380} y={-90} width={760} height={180} rx={40} fill="#fff" stroke={C.red} strokeWidth={8} />
        <T x={0} y={30} size={84} weight={900} fill={C.red}>
          {rupiah(n)}?
        </T>
      </At>
      <Person x={540} y={1300} scale={0.8} {...LINA} mood="shock" pose="handsHead" />
    </Svg>
  );
};

const Intro: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  return (
    <Svg>
      {[0, 1, 2].map((i) => (
        <At key={i} x={780 + (i === 2 ? 60 : i * 120)} y={1300 - (i === 2 ? 160 : 0)} s={0.8 * pop(f, 4 + i * 5)}>
          <Box label="PAKET" />
        </At>
      ))}
      <Person x={300} y={1300} scale={0.86} {...LINA} mood="happy" pose="phone" holding={<At x={0} y={-20} s={0.18}><Phone /></At>} />
      <At x={720} y={560} s={pop(f, 10)}>
        <Bubble text="Omzet Rp60 juta/bulan" w={560} />
      </At>
      <At x={720} y={700} s={pop(f, dur * 0.5)}>
        <Bubble text="= Rp720 juta/tahun" w={560} color={C.navy} tc="#fff" />
      </At>
    </Svg>
  );
};

const Conflict: React.FC<{ dur: number }> = () => {
  const f = useCurrentFrame();
  const chips = ["0,5%?", "PPh final?", "Rumusnya?"];
  return (
    <Svg>
      {chips.map((c, i) => (
        <At key={c} x={[260, 820, 540][i]} y={[560, 640, 470][i] + wave(f, 40, 12, i * 9)} s={pop(f, 4 + i * 8)}>
          <rect x={-170} y={-55} width={340} height={110} rx={55} fill="#fff" stroke={C.cobalt} strokeWidth={6} />
          <T x={0} y={18} size={46} weight={900} fill={C.cobalt}>
            {c}
          </T>
        </At>
      ))}
      <Person x={540} y={1300} scale={0.8} {...LINA} mood="think" pose="shrug" />
      <At x={540} y={700}>
        <Marks kind="?" />
      </At>
    </Svg>
  );
};

const Calc: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const rows: [string, string, string?][] = [
    ["Omzet setahun", "Rp720 juta"],
    ["Bebas pajak", "−Rp500 juta", C.green],
    ["Kena pajak", "Rp220 juta"],
    ["Tarif PPh final", "× 0,5%"],
  ];
  const res = pop(f, dur * 0.62, 9);
  return (
    <Svg>
      <At x={540} y={480} s={pop(f, 2)}>
        <rect x={-430} y={-60} width={860} height={760} rx={40} fill="#fff" />
        {rows.map(([l, v, col], i) => (
          <g key={l} opacity={ramp(f, 8 + i * dur * 0.12, 14 + i * dur * 0.12)}>
            <T x={-380} y={40 + i * 130} size={40} weight={700} anchor="start">
              {l}
            </T>
            <T x={380} y={40 + i * 130} size={46} weight={900} anchor="end" fill={col ?? C.navy}>
              {v}
            </T>
            <rect x={-380} y={76 + i * 130} width={760} height={4} fill={C.wall} />
          </g>
        ))}
        <g transform={`translate(0 600) scale(${res})`}>
          <rect x={-400} y={-70} width={800} height={140} rx={30} fill={C.gold} />
          <T x={0} y={22} size={60} weight={900}>
            Rp1,1 juta / tahun
          </T>
        </g>
      </At>
    </Svg>
  );
};

const Cta: React.FC<{ dur: number }> = () => (
  <EndCard person={LINA} line="Hitung PPh-mu sendiri, gratis" cta="Hitung gratis" sub="legalease.asia/kalkulator-pph" />
);

export const V5: VideoDef = {
  id: "hitung-pph-tanpa-rumus",
  title: "Hitung PPh Usahamu Tanpa Rumus",
  date: "Senin 30 Nov 2026",
  scenes: [
    {
      id: "01-hook",
      text: "Lina takut membuka urusan pajaknya. Dia kira tagihannya *puluhan juta.*",
      kicker: { pill: "CERITA LINA", text: "Pajaknya berapa, ya?" },
      setting: "room",
      Visual: Hook,
    },
    {
      id: "02-tokoh",
      text: "Lina jualan baju online. Omzetnya sekitar 60 juta sebulan, atau *720 juta setahun.*",
      setting: "room",
      Visual: Intro,
    },
    {
      id: "03-konflik",
      text: "Dia pernah dengar UMKM kena pajak 0,5 persen, tapi tidak tahu cara menghitungnya. Jadi dia *terus menunda.*",
      setting: "office",
      Visual: Conflict,
    },
    {
      id: "04-pelajaran",
      text: "Untuk pengusaha orang pribadi, *500 juta pertama* omzet setahun tidak kena pajak. Sisanya 220 juta dikali 0,5 persen. Pajaknya cuma *1,1 juta rupiah* setahun.",
      setting: "plain",
      Visual: Calc,
    },
    {
      id: "05-jualan",
      text: "Hitung punyamu gratis di *legalease.asia/kalkulator-pph.* Mau laporannya diurus sekalian? Chat LegalEase di bio.",
      setting: "navy",
      Visual: Cta,
    },
  ],
};
