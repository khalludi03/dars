import { useState } from "react";
import type { Vocab } from "@/schemas/quiz";
import { VOCAB } from "@/data/vocabulary";
import { getSections } from "@/data/sections";
import { getRules } from "@/data/rules";
import { Carousel } from "./carousel";
import { CardContent } from "./card-content";
import { AccordionPanel } from "./accordion-panel";
import * as m from "#/paraglide/messages";

interface LearnViewProps {
  accent: string;
}

export function LearnView({ accent }: LearnViewProps) {
  const [openKey, setOpenKey] = useState<string | null>("Head");
  const sections = getSections();
  const rules = getRules();

  return (
    <div className="flex flex-col gap-4 pb-4">
      <div
        className="rounded-2xl p-5"
        style={{ background: "var(--surface)", boxShadow: "var(--sh-card)" }}
      >
        <p
          className="text-xs font-bold uppercase tracking-wider mb-2"
          style={{ color: accent, letterSpacing: ".06em" }}
        >
          {m.how_to_use_title()}
        </p>
        <p className="text-sm leading-relaxed" style={{ color: "var(--t2)" }}>
          {m.how_to_use_body()}
        </p>
      </div>

      {sections.map((sec) => {
        const words = VOCAB.filter((v) => v.sec === sec.key);
        const isOpen = openKey === sec.key;
        return (
          <div
            key={sec.key}
            className="rounded-2xl"
            style={{
              background: "var(--surface)",
              boxShadow: "var(--sh-card)",
              overflow: isOpen ? "visible" : "hidden",
            }}
          >
            <button
              className="w-full flex items-center gap-3 px-5 active:opacity-70 transition-opacity"
              style={{ minHeight: 56 }}
              onClick={() => setOpenKey(isOpen ? null : sec.key)}
            >
              <span className="text-xl">{sec.emoji}</span>
              <span
                className="text-base font-bold flex-1 text-left"
                style={{ color: "var(--t1)" }}
              >
                {sec.label}
              </span>
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ background: "var(--fill2)", color: "var(--t2)" }}
              >
                {words.length}
              </span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="var(--t3)"
                strokeWidth="2"
                strokeLinecap="round"
                style={{
                  transition: "transform .35s cubic-bezier(.33,1,.68,1)",
                  transform: isOpen ? "rotate(90deg)" : "rotate(0)",
                }}
              >
                <path d="M5 2.5L9.5 7L5 11.5" />
              </svg>
            </button>
            <AccordionPanel isOpen={isOpen}>
              <div className="pt-1 pb-4">
                <Carousel
                  items={words}
                  accent={accent}
                  renderItem={(v: Vocab) => (
                    <CardContent v={v} accent={accent} />
                  )}
                />
              </div>
            </AccordionPanel>
          </div>
        );
      })}

      <div>
        <h3
          className="text-[22px] font-bold mb-4 flex items-center gap-2.5"
          style={{ color: "var(--t1)", letterSpacing: "-.02em" }}
        >
          <span>📐</span> {m.key_rules()}
        </h3>
        <div className="flex flex-col gap-3">
          {rules.map((r, ri) => (
            <div
              key={ri}
              className="rounded-2xl p-4"
              style={{
                background: "var(--surface)",
                boxShadow: "var(--sh-card)",
              }}
            >
              <p
                className="text-sm font-bold mb-1.5"
                style={{ color: "var(--t1)" }}
              >
                {r.title}
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--t2)", whiteSpace: "pre-line" }}
              >
                {r.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
