import type { VideoDef } from "../types";
import { V1 } from "./v1-mitos-izin";
import { V2 } from "./v2-cek-kbli";
import { V3 } from "./v3-salah-kbli";
import { V4 } from "./v4-kuis-pirt-bpom";
import { V5 } from "./v5-kalkulator-pph";
import { V6 } from "./v6-mitos-spt";
import { V7 } from "./v7-orderan-bu-sari";
import { V8 } from "./v8-roti-beku";

// In posting order (see the content calendar).
export const VIDEOS: VideoDef[] = [V1, V2, V3, V4, V5, V6, V7, V8];
