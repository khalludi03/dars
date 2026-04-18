import db from '../client';

interface VocabSearchResult {
    id: number;
    key: string;
    arabic: string;
    gender: string;
    section: string;
    reference_word: string;
    reference_roman: string;
    rank: number;
}

/**
 * Full-text search over vocabulary using SQLite FTS5.
 *
 * Searches across: key, arabic, reference_word, reference_roman.
 * Results are ordered by BM25 rank (lower = more relevant).
 *
 * FTS5 MATCH supports:
 *   - simple terms:   "head"
 *   - prefix:         "hea*"
 *   - phrase:         '"al-yad"'
 *   - column filter:  "key: head"
 */
export function searchVocabulary(term: string): VocabSearchResult[] {
    return db
        .query<VocabSearchResult, [string]>(
            `SELECT v.*, rank
             FROM vocabulary_fts
             JOIN vocabulary v ON vocabulary_fts.rowid = v.id
             WHERE vocabulary_fts MATCH ?
             ORDER BY rank`,
        )
        .all(term);
}
