import { kyselyDb } from '../kysely';

/**
 * Complex join: vocabulary → sections (inner) → quiz (left)
 *
 * Every vocabulary word must belong to a section (inner join).
 * Not every word has a quiz question yet, so quiz is a left join.
 */
export function getVocabWithSection() {
    return kyselyDb
        .selectFrom('vocabulary')
        .innerJoin('sections', 'sections.key', 'vocabulary.section')
        .leftJoin('quiz', 'quiz.vocab_key', 'vocabulary.key')
        .select([
            'vocabulary.key',
            'vocabulary.arabic',
            'vocabulary.gender',
            'vocabulary.reference_word',
            'vocabulary.reference_roman',
            'sections.key as section_key',
            'sections.emoji',
            'quiz.question',
            'quiz.answer',
        ])
        .execute();
}

/**
 * Aliased join: same query but sections is a subquery aliased as 's'.
 *
 * Demonstrates Kysely's aliased subquery join — useful when you need
 * to select a subset of columns from a table before joining, or when
 * joining the same table more than once under different aliases.
 */
export function getVocabWithSectionAliased() {
    return kyselyDb
        .selectFrom('vocabulary')
        .innerJoin(
            kyselyDb
                .selectFrom('sections')
                .select(['sections.key', 'sections.emoji'])
                .as('s'),
            's.key',
            'vocabulary.section',
        )
        .leftJoin('quiz', 'quiz.vocab_key', 'vocabulary.key')
        .select([
            'vocabulary.key',
            'vocabulary.arabic',
            'vocabulary.gender',
            'vocabulary.reference_word',
            'vocabulary.reference_roman',
            's.key as section_key',
            's.emoji',
            'quiz.question',
            'quiz.answer',
        ])
        .execute();
}
