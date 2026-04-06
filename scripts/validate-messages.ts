/**
 * Validates that all message files (en.json, bn.json) have identical keys
 * and conform to the expected schema. Run via: bun run validate
 */
import { z } from "zod/v4";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const MESSAGES_DIR = join(import.meta.dirname, "..", "messages");

// Schema: every key must be a non-empty string value (except $schema)
const MessageFileSchema = z
  .record(z.string(), z.string())
  .refine(
    (obj) =>
      Object.entries(obj).every(
        ([k, v]) => k === "$schema" || v.trim().length > 0,
      ),
    { message: "All message values must be non-empty strings" },
  );

function loadMessages(locale: string): Record<string, string> {
  const path = join(MESSAGES_DIR, `${locale}.json`);
  const raw = readFileSync(path, "utf-8");
  return JSON.parse(raw);
}

function run() {
  const files = readdirSync(MESSAGES_DIR).filter((f) => f.endsWith(".json"));
  const locales = files.map((f) => f.replace(".json", ""));

  if (locales.length < 2) {
    console.error("❌ Expected at least 2 locale files, found:", locales);
    process.exit(1);
  }

  console.log(
    `Validating ${locales.length} locale files: ${locales.join(", ")}`,
  );

  const allMessages: Record<string, Record<string, string>> = {};
  let hasErrors = false;

  // Validate each file against the schema
  for (const locale of locales) {
    const data = loadMessages(locale);
    const result = MessageFileSchema.safeParse(data);
    if (!result.success) {
      console.error(`❌ ${locale}.json failed schema validation:`);
      console.error(z.prettifyError(result.error));
      hasErrors = true;
    } else {
      console.log(`  ✓ ${locale}.json — valid`);
      allMessages[locale] = data;
    }
  }

  if (hasErrors) process.exit(1);

  // Check key parity across all locales
  const [baseLocale, ...otherLocales] = locales;
  const baseKeys = new Set(
    Object.keys(allMessages[baseLocale]).filter((k) => k !== "$schema"),
  );

  for (const locale of otherLocales) {
    const localeKeys = new Set(
      Object.keys(allMessages[locale]).filter((k) => k !== "$schema"),
    );

    const missingInLocale = [...baseKeys].filter((k) => !localeKeys.has(k));
    const extraInLocale = [...localeKeys].filter((k) => !baseKeys.has(k));

    if (missingInLocale.length > 0) {
      console.error(
        `❌ ${locale}.json is missing keys present in ${baseLocale}.json:`,
      );
      missingInLocale.forEach((k) => console.error(`    - ${k}`));
      hasErrors = true;
    }

    if (extraInLocale.length > 0) {
      console.error(
        `❌ ${locale}.json has extra keys not in ${baseLocale}.json:`,
      );
      extraInLocale.forEach((k) => console.error(`    + ${k}`));
      hasErrors = true;
    }
  }

  if (hasErrors) {
    console.error("\n❌ Message validation failed.");
    process.exit(1);
  }

  console.log(
    `\n✓ All ${locales.length} locale files are valid and have matching keys (${baseKeys.size} messages each).`,
  );
}

run();
