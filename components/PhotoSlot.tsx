"use client";

import { useEffect, useRef, useState } from "react";

// Shows the photo when the file exists in public/images, and a labelled panel until it does.
export function PhotoSlot({ src, alt, label }: { src: string; alt: string; label: string }) {
  const img = useRef<HTMLImageElement>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    const el = img.current;
    if (el && el.complete && el.naturalWidth === 0) setMissing(true);
  }, []);

  return (
    <div className={missing ? "photo empty" : "photo"}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={img} src={src} alt={alt} onError={() => setMissing(true)} />
      <span className="need">
        {label}
        <br />
        {`public${src}`}
      </span>
    </div>
  );
}
