import type { Rule } from "@/schemas/quiz";
import * as m from "#/paraglide/messages";

export function getRules(): Rule[] {
  return [
    { title: m.rule_taa_marbuta_title(), body: m.rule_taa_marbuta_body() },
    { title: m.rule_paired_title(), body: m.rule_paired_body() },
    {
      title: m.rule_exceptions_masc_title(),
      body: m.rule_exceptions_masc_body(),
    },
    {
      title: m.rule_exceptions_fem_title(),
      body: m.rule_exceptions_fem_body(),
    },
    { title: m.rule_demonstrative_title(), body: m.rule_demonstrative_body() },
  ];
}
