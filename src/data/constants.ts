import type { Category } from "@/schemas/quiz";
import * as m from "#/paraglide/messages";

export const CATS: Category[] = [
  "All",
  "Vocab",
  "Gender",
  "Grammar",
  "Pronun.",
  "Rules",
];

export const OPTION_LABELS = ["A", "B", "C", "D"] as const;

/** Light mode category accent colors */
export const ACCENT_LIGHT: Record<Category, string> = {
  All: "#007AFF",
  Vocab: "#5856D6",
  Gender: "#FF9500",
  Grammar: "#AF52DE",
  "Pronun.": "#32ADE6",
  Rules: "#FF2D55",
};

/** Dark mode category accent colors */
export const ACCENT_DARK: Record<Category, string> = {
  All: "#0A84FF",
  Vocab: "#5E5CE6",
  Gender: "#FF9F0A",
  Grammar: "#BF5AF2",
  "Pronun.": "#64D2FF",
  Rules: "#FF375F",
};

export const TH_ICON = { system: "◐", light: "☀︎", dark: "☾" } as const;

export function getThemeLabel(mode: "system" | "light" | "dark"): string {
  const labels = {
    system: m.theme_auto,
    light: m.theme_light,
    dark: m.theme_dark,
  };
  return labels[mode]();
}
