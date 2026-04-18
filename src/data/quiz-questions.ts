import type { Question, Vocab } from "@/schemas/quiz";
import { getMeaning, getPronunciation } from "./vocabulary";
import * as m from "#/paraglide/messages";

/** Fisher-Yates shuffle */
export function shuffle<T>(a: T[]): T[] {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

/** Pick n random items from array, excluding x */
function pick<T>(a: T[], x: T, n = 3): T[] {
  return shuffle(a.filter((v) => v !== x)).slice(0, n);
}

export function makeQuestions(vocab: Vocab[]): Question[] {
  const q: Question[] = [];

  vocab.forEach((v) => {
    const meaning = getMeaning(v);
    const mascLabel = m.masculine_ar();
    const femLabel = m.feminine_ar();

    q.push({
      id: `a2e-${v.ar}`,
      q: m.q_what_does_mean({ word: v.ar }),
      a: meaning,
      opts: shuffle([meaning, ...pick(vocab, v).map(getMeaning)]),
      cat: "Vocab",
    });
    q.push({
      id: `e2a-${v.key}`,
      q: m.q_what_in_arabic({ word: meaning }),
      a: v.ar,
      opts: shuffle([v.ar, ...pick(vocab, v).map((w) => w.ar)]),
      cat: "Vocab",
    });
    q.push({
      id: `g-${v.ar}`,
      q: m.q_gender({ ar: v.ar, meaning }),
      a: v.g === "M" ? mascLabel : femLabel,
      opts: [mascLabel, femLabel],
      cat: "Gender",
    });
    q.push({
      id: `d-${v.ar}`,
      q: m.q_demonstrative({ ar: v.ar, meaning: meaning.toLowerCase() }),
      a: v.g === "M" ? "هٰذَا" : "هٰذِهِ",
      opts: ["هٰذَا", "هٰذِهِ"],
      cat: "Grammar",
    });
    const pr = getPronunciation(v);
    q.push({
      id: `p-${v.ar}`,
      q: m.q_pronunciation({ word: v.ar }),
      a: pr,
      opts: shuffle([pr, ...pick(vocab, v).map(getPronunciation)]),
      cat: "Pronun.",
    });
  });

  q.push({
    id: "r1",
    q: m.rq1_q(),
    a: m.rq1_a(),
    opts: [m.rq1_a(), m.rq1_o1(), m.rq1_o2(), m.rq1_o3()],
    cat: "Rules",
  });
  q.push({
    id: "r2",
    q: m.rq2_q(),
    a: m.rq2_a(),
    opts: [m.rq2_a(), m.rq2_o1(), m.rq2_o2(), m.rq2_o3()],
    cat: "Rules",
  });
  q.push({
    id: "r3",
    q: m.rq3_q(),
    a: m.rq3_a(),
    opts: [m.rq3_a(), m.rq3_o1(), m.rq3_o2(), m.rq3_o3()],
    cat: "Rules",
  });
  q.push({
    id: "r4",
    q: m.rq4_q(),
    a: m.rq4_a(),
    opts: [m.rq4_a(), m.rq4_o1(), m.rq4_o2(), m.rq4_o3()],
    cat: "Rules",
  });
  q.push({
    id: "r5",
    q: m.rq5_q(),
    a: m.rq5_a(),
    opts: [m.rq5_a(), m.rq5_o1(), m.rq5_o2(), m.rq5_o3()],
    cat: "Rules",
  });
  q.push({
    id: "r6",
    q: m.rq6_q(),
    a: m.rq6_a(),
    opts: [m.rq6_a(), m.rq6_o1(), m.rq6_o2(), m.rq6_o3()],
    cat: "Rules",
  });
  q.push({
    id: "r7",
    q: m.rq7_q(),
    a: m.rq7_a(),
    opts: [m.rq7_a(), m.rq7_o1(), m.rq7_o2(), m.rq7_o3()],
    cat: "Rules",
  });

  return q;
}
