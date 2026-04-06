import { z } from "zod/v4";

export const GenderSchema = z.enum(["M", "F"]);

export const SectionKeySchema = z.enum(["Head", "Upper", "Core", "Lower"]);

export const RefSchema = z.object({
  word: z.string(),
  roman: z.string(),
});

export const VocabSchema = z.object({
  /** Unique key for Paraglide message lookups */
  key: z.string(),
  ar: z.string(),
  g: GenderSchema,
  sec: SectionKeySchema,
  ref: RefSchema.optional(),
});

export const SectionSchema = z.object({
  key: SectionKeySchema,
  label: z.string(),
  emoji: z.string(),
});

export const RuleSchema = z.object({
  title: z.string(),
  body: z.string(),
});

export const CategorySchema = z.enum([
  "All",
  "Vocab",
  "Gender",
  "Grammar",
  "Pronun.",
  "Rules",
]);

export const QuestionSchema = z.object({
  id: z.string(),
  q: z.string(),
  a: z.string(),
  opts: z.array(z.string()),
  cat: CategorySchema,
});

export const ThemeModeSchema = z.enum(["system", "light", "dark"]);

export const ViewModeSchema = z.enum(["learn", "quiz"]);

export const QuizStateSchema = z.object({
  cat: CategorySchema,
  ans: z.record(z.string(), z.boolean()),
  sel: z.string().nullable(),
  lk: z.boolean(),
  i: z.number(),
  qs: z.array(QuestionSchema),
  done: z.boolean(),
  save: z.boolean(),
  menu: z.boolean(),
  theme: ThemeModeSchema,
  k: z.number(),
});

/** Search params schema for route-level tab state */
export const SearchSchema = z.object({
  tab: ViewModeSchema.catch("learn"),
});

export type Gender = z.infer<typeof GenderSchema>;
export type SectionKey = z.infer<typeof SectionKeySchema>;
export type Ref = z.infer<typeof RefSchema>;
export type Vocab = z.infer<typeof VocabSchema>;
export type Section = z.infer<typeof SectionSchema>;
export type Rule = z.infer<typeof RuleSchema>;
export type Category = z.infer<typeof CategorySchema>;
export type Question = z.infer<typeof QuestionSchema>;
export type ThemeMode = z.infer<typeof ThemeModeSchema>;
export type ViewMode = z.infer<typeof ViewModeSchema>;
export type QuizState = z.infer<typeof QuizStateSchema>;
export type Search = z.infer<typeof SearchSchema>;
