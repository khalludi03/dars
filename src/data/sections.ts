import type { Section } from "@/schemas/quiz";
import * as m from "#/paraglide/messages";

export function getSections(): Section[] {
  return [
    { key: "Head", label: m.section_head(), emoji: "🧠" },
    { key: "Upper", label: m.section_upper(), emoji: "💪" },
    { key: "Core", label: m.section_core(), emoji: "❤️" },
    { key: "Lower", label: m.section_lower(), emoji: "🦵" },
  ];
}
