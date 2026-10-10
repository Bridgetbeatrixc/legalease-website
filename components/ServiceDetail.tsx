"use client";

import { services, type ServiceKey } from "@/lib/content";
import { useSiteState } from "./SiteState";
import { TabList } from "./Tabs";

export function ServiceDetail() {
  const { tab, setTab } = useSiteState();
  return (
    <div className="detail">
      <TabList
        tabs={services.map((s) => ({ key: s.key, label: s.name }))}
        selected={tab}
        onSelect={(k) => setTab(k as ServiceKey)}
        idPrefix="tab-"
        panelPrefix="panel-"
        className="tabs"
        tabClassName="tab"
        label="Kategori layanan"
      />
      <div>
        {services.map((s) => (
          <div
            key={s.key}
            className="panel"
            role="tabpanel"
            id={`panel-${s.key}`}
            aria-labelledby={`tab-${s.key}`}
            hidden={s.key !== tab}
          >
            <h3>{s.detailTitle}</h3>
            <p>{s.detailIntro}</p>
            <ul className="svc-list">
              {s.items.map((it) => (
                <li key={it.name}>
                  <strong>{it.name}</strong>
                  <span>{it.text}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
