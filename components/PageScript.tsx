"use client";

import { useEffect } from "react";

// Loads one of the page scripts in public/js after React has hydrated the page, so the script's
// changes to the markup don't clash with hydration. The plain-HTML copy loads the same file directly.
export function PageScript({ src }: { src: string }) {
  useEffect(() => {
    const s = document.createElement("script");
    s.src = src;
    document.body.appendChild(s);
    return () => s.remove();
  }, [src]);
  return null;
}
