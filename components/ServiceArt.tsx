import type { ServiceKey } from "@/lib/content";

// Simple geometric drawings for the service cards, in the LegalEase blues.
const art: Record<ServiceKey, React.ReactNode> = {
  pendirian: (
    <>
      <rect width="280" height="170" fill="#CFE3F8" />
      <rect x="140" width="140" height="85" fill="#1766B2" />
      <circle cx="70" cy="85" r="58" fill="#0E4A85" />
      <rect x="40" y="62" width="60" height="46" rx="3" fill="#FFFFFF" />
      <rect x="48" y="72" width="44" height="4" fill="#1766B2" />
      <rect x="48" y="82" width="30" height="4" fill="#5AA7F2" />
      <rect x="48" y="92" width="38" height="4" fill="#5AA7F2" />
      <path d="M140 170V85h70a70 85 0 0 1-70 85Z" fill="#5AA7F2" />
      <rect x="220" y="100" width="14" height="50" fill="#0E4A85" />
      <rect x="242" y="115" width="14" height="35" fill="#1766B2" />
      <rect x="198" y="125" width="14" height="25" fill="#FFFFFF" />
      <circle cx="210" cy="42" r="22" fill="#FFFFFF" />
    </>
  ),
  perizinan: (
    <>
      <rect width="280" height="170" fill="#1766B2" />
      <g fill="none" stroke="#FFFFFF" strokeWidth="2">
        <path d="M30 40h80v50h60V40h80" />
        <path d="M110 90v50h110" />
        <path d="M60 40v90" />
      </g>
      <g fill="#FFFFFF">
        <circle cx="30" cy="40" r="6" />
        <circle cx="110" cy="40" r="6" />
        <circle cx="170" cy="90" r="6" />
        <circle cx="250" cy="40" r="6" />
        <circle cx="60" cy="130" r="6" />
        <circle cx="220" cy="140" r="6" />
      </g>
      <rect x="100" y="80" width="20" height="20" fill="#0E4A85" />
      <rect x="200" y="20" width="12" height="12" fill="#0E4A85" />
      <rect x="20" y="146" width="12" height="12" fill="#5AA7F2" />
    </>
  ),
  pajak: (
    <>
      <rect width="280" height="170" fill="#EAF2FB" />
      <ellipse cx="140" cy="150" rx="120" ry="16" fill="#1766B2" />
      <ellipse cx="140" cy="122" rx="96" ry="13" fill="#5AA7F2" />
      <ellipse cx="140" cy="98" rx="76" ry="11" fill="#1766B2" />
      <ellipse cx="140" cy="78" rx="58" ry="9" fill="#5AA7F2" />
      <g fill="#0E4A85">
        <ellipse cx="140" cy="61" rx="42" ry="7" />
        <ellipse cx="140" cy="47" rx="28" ry="5" />
        <ellipse cx="140" cy="36" rx="16" ry="3.5" />
      </g>
      <path d="M0 0l140 30L280 0v10L140 40 0 10Z" fill="#CFE3F8" />
    </>
  ),
  hukum: (
    <>
      <rect width="280" height="170" fill="#0E4A85" />
      <rect width="140" height="85" fill="#CFE3F8" />
      <path d="M0 85a85 85 0 0 1 85-85v85Z" fill="#5AA7F2" />
      <circle cx="210" cy="60" r="44" fill="#1766B2" />
      <path d="M210 30l26 10v20c0 18-12 28-26 34-14-6-26-16-26-34V40Z" fill="#FFFFFF" />
      <path d="M198 60l8 8 16-16" fill="none" stroke="#1766B2" strokeWidth="5" />
      <rect x="0" y="85" width="140" height="85" fill="#1766B2" />
      <path d="M140 170a70 70 0 0 0-70-70v70Z" fill="#5AA7F2" />
      <rect x="160" y="120" width="100" height="10" fill="#CFE3F8" />
      <rect x="160" y="140" width="70" height="10" fill="#5AA7F2" />
    </>
  ),
  website: (
    <>
      <rect width="280" height="170" fill="#EAF2FB" />
      <rect x="40" y="28" width="200" height="124" rx="8" fill="#FFFFFF" />
      <path d="M40 48V36a8 8 0 0 1 8-8h184a8 8 0 0 1 8 8v12Z" fill="#1766B2" />
      <g fill="#FFFFFF">
        <circle cx="52" cy="38" r="3" />
        <circle cx="62" cy="38" r="3" />
        <circle cx="72" cy="38" r="3" />
      </g>
      <rect x="56" y="62" width="80" height="8" fill="#0E4A85" />
      <rect x="56" y="78" width="88" height="5" fill="#5AA7F2" />
      <rect x="56" y="88" width="70" height="5" fill="#5AA7F2" />
      <rect x="56" y="104" width="50" height="14" rx="3" fill="#1766B2" />
      <rect x="160" y="62" width="64" height="72" rx="4" fill="#CFE3F8" />
      <circle cx="192" cy="90" r="14" fill="#5AA7F2" />
      <path d="M168 128l20-20 12 12 8-8 12 16Z" fill="#1766B2" />
    </>
  ),
  branding: (
    <>
      <rect width="280" height="170" fill="#1766B2" />
      <circle cx="90" cy="85" r="56" fill="#CFE3F8" />
      <path d="M90 42l24 43-24 43-24-43Z" fill="#0E4A85" />
      <circle cx="90" cy="85" r="7" fill="#CFE3F8" />
      <rect x="170" y="30" width="24" height="110" rx="4" fill="#FFFFFF" />
      <rect x="200" y="30" width="24" height="110" rx="4" fill="#5AA7F2" />
      <rect x="230" y="30" width="24" height="110" rx="4" fill="#0E4A85" />
    </>
  ),
};

export function ServiceArt({ service }: { service: ServiceKey }) {
  return (
    <svg className="art" viewBox="0 0 280 170" aria-hidden="true">
      {art[service]}
    </svg>
  );
}
