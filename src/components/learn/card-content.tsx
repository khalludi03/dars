import type { Vocab } from "@/schemas/quiz";
import {
  getMeaning,
  getPronunciation,
  getRefBefore,
  getRefAfter,
  getRefSrc,
} from "@/data/vocabulary";
import * as m from "#/paraglide/messages";

interface CardContentProps {
  v: Vocab;
  accent: string;
}

const GENDER_ICON = { M: "♂", F: "♀" } as const;

export function CardContent({ v, accent }: CardContentProps) {
  const gc = v.g === "M" ? accent : "#FF9500";
  const r = v.ref;
  const meaning = getMeaning(v);
  const pr = getPronunciation(v);

  return (
    <div
      className="rounded-2xl h-full"
      style={{
        border: "1px solid var(--sep)",
        background: "var(--surface)",
        overflow: "hidden",
      }}
    >
      <div className="flex items-stretch h-full">
        <div className="w-1 shrink-0" style={{ background: gc }} />
        <div className="flex-1 p-4 flex flex-col">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p
                className="text-2xl font-bold"
                style={{ direction: "rtl", lineHeight: 1.4 }}
              >
                {v.ar}
              </p>
              <p
                className="text-xs font-medium mt-0.5"
                style={{ color: "var(--t3)" }}
              >
                {pr}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p
                className="text-base font-semibold"
                style={{ color: "var(--t1)" }}
              >
                {meaning}
              </p>
              <span
                className="mt-0.5 w-6 h-6 rounded-md inline-flex items-center justify-center text-sm font-bold"
                style={{ background: `${gc}1A`, color: gc }}
                aria-label={v.g === "M" ? m.masculine() : m.feminine()}
              >
                {GENDER_ICON[v.g]}
              </span>
            </div>
          </div>

          <div
            className="mt-3 pt-3"
            style={{ borderTop: ".5px solid var(--sep)" }}
          >
            <p
              className="text-sm"
              style={{ direction: "rtl", color: "var(--t2)" }}
            >
              {v.g === "M" ? "هٰذَا" : "هٰذِهِ"} {v.ar}
              <span style={{ color: "var(--t3)", direction: "ltr" }}>
                {" "}
                — {m.this_is_a({ word: meaning.toLowerCase() })}
              </span>
            </p>
          </div>

          {r && (
            <div
              className="mt-3 rounded-xl px-3.5 py-3 flex-1 flex flex-col"
              style={{ background: "var(--fill)" }}
            >
              <div className="flex-1 overflow-y-auto">
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--t2)" }}
                >
                  {getRefBefore(v)}{" "}
                  <span className="font-bold" style={{ color: accent }}>
                    {r.word}
                  </span>{" "}
                  <span
                    className="font-semibold"
                    style={{ color: accent, opacity: 0.7 }}
                  >
                    ({r.roman})
                  </span>{" "}
                  {getRefAfter(v)}
                </p>
              </div>
              <p
                className="text-xs font-semibold mt-2 pt-2 flex items-center gap-1.5 shrink-0"
                style={{
                  color: "var(--t3)",
                  borderTop: "0.5px solid var(--sep)",
                }}
              >
                <span style={{ fontSize: 11 }}>📖</span> {getRefSrc(v)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
