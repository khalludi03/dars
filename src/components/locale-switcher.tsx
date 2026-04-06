import { useState, useRef, useEffect } from "react";
import { getLocale, setLocale, locales } from "#/paraglide/runtime";

const LOCALE_LABELS: Record<string, string> = {
  bn: "বাংলা",
  en: "English",
};

export function LocaleSwitcher() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = getLocale();

  useEffect(() => {
    if (!open) return;
    const h = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("pointerdown", h);
    return () => document.removeEventListener("pointerdown", h);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      {/* 44×44 touch target per HIG */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center active:scale-90 transition-transform"
        style={{
          width: 44,
          height: 44,
          borderRadius: 22,
          background: open ? "var(--fill)" : "transparent",
        }}
        aria-label="Change language"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--t2)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      </button>

      {open && (
        <div
          className="au absolute right-0 top-full mt-1.5 z-30 overflow-hidden glass"
          style={{
            width: 200,
            borderRadius: 13,
            border: "0.5px solid var(--sep)",
            boxShadow: "var(--sh-menu)",
            padding: "4px 0",
          }}
        >
          {locales.map((locale, i) => {
            const active = locale === current;
            return (
              <div key={locale}>
                {i > 0 && (
                  <div
                    style={{
                      height: 0.33,
                      background: "var(--sep)",
                      margin: "0 16px",
                    }}
                  />
                )}
                <button
                  onClick={() => {
                    setLocale(locale);
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-3 active:bg-[var(--fill)] transition-colors"
                  style={{
                    minHeight: 44,
                    padding: "0 16px",
                    color: "var(--t1)",
                  }}
                >
                  <span className="flex-1 text-left" style={{ fontSize: 17 }}>
                    {LOCALE_LABELS[locale] ?? locale}
                  </span>
                  {active && (
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                      stroke="var(--ok)"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3.5 9L7 12.5L13.5 4.5" />
                    </svg>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
