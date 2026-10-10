"use client";

import { createContext, useContext, useState } from "react";

// Shared between the service links and the contact form, so "Hubungi Kami" preselects the right service.
type SiteState = {
  leadService: string;
  setLeadService: (name: string) => void;
};

const Ctx = createContext<SiteState | null>(null);

export function SiteStateProvider({ initial, children }: { initial: string; children: React.ReactNode }) {
  const [leadService, setLeadService] = useState(initial);
  return <Ctx.Provider value={{ leadService, setLeadService }}>{children}</Ctx.Provider>;
}

export function useSiteState() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSiteState must be used inside SiteStateProvider");
  return ctx;
}
