"use client";

import type { ServiceKey } from "@/lib/content";
import { useSiteState } from "./SiteState";

type Props = {
  href: string;
  className?: string;
  tab?: ServiceKey;
  lead?: string;
  children: React.ReactNode;
};

export function ServiceLink({ href, className, tab, lead, children }: Props) {
  const { setTab, setLeadService } = useSiteState();
  return (
    <a
      href={href}
      className={className}
      onClick={() => {
        if (tab) setTab(tab);
        if (lead) setLeadService(lead);
      }}
    >
      {children}
    </a>
  );
}
