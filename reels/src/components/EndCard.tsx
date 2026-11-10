import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { C, FONT } from "../theme";
import { pop, wave } from "./anim";
import { Person, PersonProps } from "./Person";
import { Svg } from "./Stage";

/** Closing call to action, shared by every video. */
export const EndCard: React.FC<{ person?: Partial<PersonProps>; line?: string; cta?: string; sub?: string }> = ({
  person,
  line = "Konsultasi gratis",
  cta = "Chat WhatsApp",
  sub = "+62 821-4214-4904 · legalease.asia",
}) => {
  const f = useCurrentFrame();
  const a = pop(f, 0);
  const b = pop(f, 10);
  const c = pop(f, 18);
  return (
    <>
      <Svg>
        <Person
          x={800}
          y={1300}
          scale={0.78}
          mood="happy"
          walk={{ from: 1300, start: 2, dur: 22 }}
          poses={[
            [0, "idle"],
            [28, "armsUp"],
            [52, "wave"],
          ]}
          jumps={[28, 44]}
          {...person}
          pants={C.cobalt}
        />
      </Svg>
      <div style={{ position: "absolute", top: 300, left: 70, width: 600, fontFamily: FONT }}>
        <div
          style={{
            background: "#fff",
            borderRadius: 36,
            padding: "28px 30px",
            width: 420,
            transform: `scale(${a})`,
            transformOrigin: "left center",
          }}
        >
          <Img src={staticFile("legalease-icon.png")} style={{ width: 360, display: "block" }} />
        </div>
        <div style={{ marginTop: 44, color: "#fff", fontSize: 76, fontWeight: 900, lineHeight: 1.05, opacity: b }}>
          {line}
        </div>
        <div
          style={{
            marginTop: 36,
            display: "inline-flex",
            alignItems: "center",
            gap: 20,
            background: "#25D366",
            color: "#fff",
            borderRadius: 999,
            padding: "22px 40px",
            fontSize: 46,
            fontWeight: 900,
            transform: `scale(${c * (1 + wave(f, 30, 0.03))})`,
            transformOrigin: "left center",
          }}
        >
          <svg width={52} height={52} viewBox="0 0 32 32">
            <path
              fill="#fff"
              d="M16 3C9 3 3.3 8.6 3.3 15.5c0 2.4.7 4.7 2 6.7L3 29l7-2.2c1.9 1 4 1.6 6 1.6 7 0 12.7-5.6 12.7-12.5S23 3 16 3zm0 22.8c-1.9 0-3.8-.5-5.4-1.5l-.4-.2-4.1 1.3 1.3-4-.3-.4c-1.1-1.7-1.7-3.6-1.7-5.6C5.4 9.8 10.2 5.2 16 5.2s10.6 4.6 10.6 10.3S21.8 25.8 16 25.8zm5.8-7.7c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.6-1.6-1-.8-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.7s1.2 3.1 1.4 3.4c.2.2 2.4 3.6 5.8 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"
            />
          </svg>
          {cta}
        </div>
        <div style={{ marginTop: 26, color: "#C9D7EA", fontSize: 34, fontWeight: 700, opacity: c }}>{sub}</div>
      </div>
    </>
  );
};
