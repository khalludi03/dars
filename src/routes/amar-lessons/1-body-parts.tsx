import { createFileRoute } from "@tanstack/react-router";
import { SearchSchema } from "@/schemas/quiz";
import App from "@/arabic-quiz";

export const Route = createFileRoute("/amar-lessons/1-body-parts")({
  component: App,
  validateSearch: SearchSchema.parse,
  head: () => ({
    meta: [{ title: "Body Parts — Dars" }],
  }),
});
