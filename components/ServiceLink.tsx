"use client";

import { useSiteState } from "./SiteState";

type Props = {
  href: string;
  className?: string;
  lead: string;
  children: React.ReactNode;
};

// A link that also preselects `lead` in the contact form.
export function ServiceLink({ href, className, lead, children }: Props) {
  const { setLeadService } = useSiteState();
  return (
    <a href={href} className={className} data-service={lead} onClick={() => setLeadService(lead)}>
      {children}
    </a>
  );
}
