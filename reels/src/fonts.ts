import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

const weights = ["400", "600", "700", "800", "900"];

export const fontsReady = Promise.all(
  weights.map((w) =>
    loadFont({
      family: "Montserrat",
      url: staticFile(`fonts/montserrat-latin-${w}-normal.woff2`),
      weight: w,
    }),
  ),
);
