"use client";

import { useState } from "react";
import { faqGroups } from "@/lib/content";
import { TabList } from "./Tabs";

export function Faq() {
  const [group, setGroup] = useState(faqGroups[0].key);
  return (
    <>
      <TabList
        tabs={faqGroups.map((g) => ({ key: g.key, label: g.label }))}
        selected={group}
        onSelect={setGroup}
        idPrefix="ftab-"
        panelPrefix="fpanel-"
        className="faq-tabs"
        tabClassName="faq-tab"
        label="Topik pertanyaan"
      />
      {faqGroups.map((g) => (
        <div
          key={g.key}
          className="faq-panel"
          role="tabpanel"
          id={`fpanel-${g.key}`}
          aria-labelledby={`ftab-${g.key}`}
          hidden={g.key !== group}
        >
          {g.items.map((it) => (
            <details key={it.q}>
              <summary>{it.q}</summary>
              <p>{it.a}</p>
            </details>
          ))}
        </div>
      ))}
    </>
  );
}
