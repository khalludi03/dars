import type { Vocab } from "@/schemas/quiz";

const API_BASE =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
  "http://localhost:3001";

interface VocabRow {
  id: number;
  key: string;
  arabic: string;
  gender: "M" | "F";
  section: "Head" | "Upper" | "Core" | "Lower";
  reference_word: string;
  reference_roman: string;
}

export async function fetchVocab(): Promise<Vocab[]> {
  const res = await fetch(`${API_BASE}/api/vocabulary`);
  if (!res.ok) throw new Error(`Failed to fetch vocabulary: ${res.status}`);
  const rows: VocabRow[] = await res.json();
  return rows.map((r) => ({
    key: r.key,
    ar: r.arabic,
    g: r.gender,
    sec: r.section,
    ref: { word: r.reference_word, roman: r.reference_roman },
  }));
}
