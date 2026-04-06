import type { ThemeMode } from "@/schemas/quiz";
import { TH_ICON, getThemeLabel } from "@/data/constants";
import * as m from "#/paraglide/messages";

interface MenuProps {
  open: boolean;
  save: boolean;
  theme: ThemeMode;
  onToggleSave: () => void;
  onNextTheme: () => void;
  onReset: () => void;
}

export function Menu({
  open,
  save,
  theme,
  onToggleSave,
  onNextTheme,
  onReset,
}: MenuProps) {
  if (!open) return null;

  return (
    <div
      className="au absolute right-0 top-full mt-1.5 z-30 overflow-hidden glass"
      style={{
        width: 250,
        borderRadius: 13,
        border: "0.5px solid var(--sep)",
        boxShadow: "var(--sh-menu)",
        padding: "4px 0",
      }}
    >
      {/* Save Progress */}
      <button
        className="w-full flex items-center justify-between active:bg-[var(--fill)] transition-colors"
        style={{ minHeight: 44, padding: "0 16px", color: "var(--t1)" }}
        onClick={onToggleSave}
      >
        <span style={{ fontSize: 17 }}>{m.save_progress()}</span>
        <div
          className="relative rounded-full"
          style={{
            width: 51,
            height: 31,
            background: save ? "var(--ok)" : "var(--fill2)",
            transition: "background .3s",
          }}
        >
          <span
            className="block rounded-full absolute bg-white"
            style={{
              width: 27,
              height: 27,
              top: 2,
              left: 2,
              transform: save ? "translateX(20px)" : "translateX(0)",
              transition: "transform .28s cubic-bezier(.33,1,.68,1)",
              boxShadow:
                "0 1px 3px rgba(0,0,0,.15), 0 0 0 0.5px rgba(0,0,0,.04)",
            }}
          />
        </div>
      </button>

      <div
        style={{ height: 0.33, background: "var(--sep)", margin: "0 16px" }}
      />

      {/* Appearance */}
      <button
        className="w-full flex items-center justify-between active:bg-[var(--fill)] transition-colors"
        style={{ minHeight: 44, padding: "0 16px", color: "var(--t1)" }}
        onClick={onNextTheme}
      >
        <span style={{ fontSize: 17 }}>{m.appearance()}</span>
        <span
          className="font-medium"
          style={{
            fontSize: 15,
            borderRadius: 8,
            padding: "4px 10px",
            background: "var(--fill)",
            color: "var(--t2)",
          }}
        >
          {TH_ICON[theme]} {getThemeLabel(theme)}
        </span>
      </button>

      <div
        style={{ height: 0.33, background: "var(--sep)", margin: "0 16px" }}
      />

      {/* Reset */}
      <button
        className="w-full flex items-center active:bg-[var(--fill)] transition-colors"
        style={{ minHeight: 44, padding: "0 16px", color: "var(--err)" }}
        onClick={onReset}
      >
        <span style={{ fontSize: 17 }}>{m.reset_all()}</span>
      </button>
    </div>
  );
}
