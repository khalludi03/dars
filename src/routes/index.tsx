import { createFileRoute } from "@tanstack/react-router";
import { SearchSchema } from "@/schemas/quiz";
import App from "@/arabic-quiz";

export const Route = createFileRoute("/")({
  component: App,
  validateSearch: SearchSchema.parse,
  head: () => ({
    meta: [{ title: "Dars — Arabic Lessons" }],
  }),
});
