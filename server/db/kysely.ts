import { Kysely } from 'kysely';
import { BunSqliteDialect } from 'kysely-bun-sqlite';
import { Database as SqliteDatabase } from 'bun:sqlite';
import type { Generated } from 'kysely';

interface VocabularyTable {
    id: Generated<number>;
    key: string;
    arabic: string;
    gender: string;
    section: string;
    reference_word: string;
    reference_roman: string;
}

interface SectionsTable {
    key: string;
    emoji: string;
}

interface QuizTable {
    id: string;
    question: string;
    answer: string;
    options: string;
    category: string;
    vocab_key: string | null;
}

export interface Database {
    vocabulary: VocabularyTable;
    sections: SectionsTable;
    quiz: QuizTable;
}

const dialect = new BunSqliteDialect({
    database: new SqliteDatabase('dars.db'),
});

export const kyselyDb = new Kysely<Database>({ dialect });
