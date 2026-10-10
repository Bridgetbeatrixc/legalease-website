"use client";

import { useRef } from "react";

type Tab = { key: string; label: string };

// ARIA tablist with arrow-key navigation, shared by the service detail and the FAQ.
export function TabList({
  tabs,
  selected,
  onSelect,
  idPrefix,
  panelPrefix,
  className,
  tabClassName,
  label,
}: {
  tabs: Tab[];
  selected: string;
  onSelect: (key: string) => void;
  idPrefix: string;
  panelPrefix: string;
  className: string;
  tabClassName: string;
  label: string;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: React.KeyboardEvent, i: number) {
    const d =
      e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (i + d + tabs.length) % tabs.length;
    onSelect(tabs[next].key);
    refs.current[next]?.focus();
  }

  return (
    <div className={className} role="tablist" aria-label={label}>
      {tabs.map((t, i) => (
        <button
          key={t.key}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className={tabClassName}
          role="tab"
          id={idPrefix + t.key}
          aria-controls={panelPrefix + t.key}
          aria-selected={t.key === selected}
          tabIndex={t.key === selected ? 0 : -1}
          onClick={() => onSelect(t.key)}
          onKeyDown={(e) => onKeyDown(e, i)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
