import db from '../client.ts';
interface Vocabulary {
    id: number;
    key: string;
    arabic: string;
    gender: string;
    section: string;
    reference_word: string;
    reference_roman: string;
}

export function getAll() {
    return db.query<Vocabulary, []>('SELECT * FROM vocabulary').all();
}

export function getById(id: number) {
    return db.query<Vocabulary, [number]>('SELECT * FROM vocabulary WHERE id = ?').get(id);
}

export function create(vocab: Omit<Vocabulary, 'id'>) {
    const { key, arabic, gender, section, reference_word, reference_roman } = vocab;
    const result = db.query<Vocabulary, [string, string, string, string, string, string]>(`
        INSERT INTO vocabulary (key, arabic, gender, section, reference_word, reference_roman)
        VALUES (?, ?, ?, ?, ?, ?)
    `).run(key, arabic, gender, section, reference_word, reference_roman);

    return getById(result.lastInsertRowid as number);
}

export function update(id: number, vocab: Partial<Vocabulary>) {
    const existing = getById(id);
    if (!existing) {
        throw new Error(`Vocabulary with id ${id} not found`);
    }

    const updated = {
        ...existing,
        ...vocab
    };

    const { key, arabic, gender, section, reference_word, reference_roman } = updated;
    db.query<Vocabulary, [string, string, string, string, string, string, number]>(`
        UPDATE vocabulary
        SET key = ?, arabic = ?, gender = ?, section = ?, reference_word = ?, reference_roman = ?
        WHERE id = ?
    `).run(key ?? '', arabic ?? '', gender ?? '', section ?? '', reference_word ?? '', reference_roman ?? '', id);

    return getById(id);
}

export function remove(id: number) {
    db.query<Vocabulary, [number]>('DELETE FROM vocabulary WHERE id = ?').run(id);
}