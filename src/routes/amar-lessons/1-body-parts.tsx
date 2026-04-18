import { createFileRoute } from "@tanstack/react-router";
import { SearchSchema } from "@/schemas/quiz";
import App from "@/arabic-quiz";
import { fetchVocab } from "@/lib/api";
import { VOCAB } from "@/data/vocabulary";

export const Route = createFileRoute("/amar-lessons/1-body-parts")({
  loader: async () => {
    try {
      return await fetchVocab();
    } catch {
      return VOCAB;
    }
  },
  component: function RouteComponent() {
    const vocab = Route.useLoaderData();
    return <App vocab={vocab} />;
  },
  validateSearch: SearchSchema.parse,
  head: () => ({
    meta: [{ title: "Body Parts — Dars" }],
  }),
});
