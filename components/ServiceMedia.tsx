"use client";

import { useEffect, useRef, useState } from "react";
import type { ServiceKey } from "@/lib/content";
import { ServiceArt } from "./ServiceArt";

// Shows public/images/svc-<key>.jpg on the card, and the drawing until that photo exists.
export function ServiceMedia({ service, alt }: { service: ServiceKey; alt: string }) {
  const img = useRef<HTMLImageElement>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    const el = img.current;
    if (el && el.complete && el.naturalWidth === 0) setMissing(true);
  }, []);

  return (
    <div className={missing ? "svc-media missing" : "svc-media"}>
      <ServiceArt service={service} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={img} src={`/images/svc-${service}.jpg`} alt={alt} onError={() => setMissing(true)} />
    </div>
  );
}
