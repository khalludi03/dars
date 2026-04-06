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

const CAT_MESSAGES: Record<Category, () => string> = {
  All: m.cat_all,
  Vocab: m.cat_vocab,
  Gender: m.cat_gender,
  Grammar: m.cat_grammar,
  "Pronun.": m.cat_pronun,
  Rules: m.cat_rules,
};

export function getCategoryLabel(cat: Category): string {
  return CAT_MESSAGES[cat]();
}

const OPT_MESSAGES = [m.option_a, m.option_b, m.option_c, m.option_d] as const;

export function getOptionLabel(index: number): string {
  return OPT_MESSAGES[index]();
}

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
