"use client";

import { createContext, useContext, useState } from "react";
import type { ServiceKey } from "@/lib/content";

// Shared between the service cards, the detail tabs and the contact form,
// so "Lihat detail" opens the right tab and "Hubungi Kami" preselects the form.
type SiteState = {
  tab: ServiceKey;
  setTab: (key: ServiceKey) => void;
  leadService: string;
  setLeadService: (name: string) => void;
};

const Ctx = createContext<SiteState | null>(null);

export function SiteStateProvider({ children }: { children: React.ReactNode }) {
  const [tab, setTab] = useState<ServiceKey>("pendirian");
  const [leadService, setLeadService] = useState("Pendirian Usaha");
  return <Ctx.Provider value={{ tab, setTab, leadService, setLeadService }}>{children}</Ctx.Provider>;
}

export function useSiteState() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSiteState must be used inside SiteStateProvider");
  return ctx;
}
