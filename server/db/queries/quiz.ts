import db from '../client';

interface Quiz {
    id: string;
    question: string;
    answer: string;
    options: string;
    category: string;
    vocab_key: string | null;
}

export function getAll() {
    return db.query<Quiz, []>('SELECT * FROM quiz').all();
}

export function getById(id: string) {
    return db.query<Quiz, [string]>('SELECT * FROM quiz WHERE id = ?').get(id);
}

export function create(quiz: Quiz) {
    const { id, question, answer, options, category, vocab_key } = quiz;
    db.query<Quiz, [string, string, string, string, string, string | null]>(`
        INSERT INTO quiz (id, question, answer, options, category, vocab_key)
        VALUES (?, ?, ?, ?, ?, ?)
    `).run(id, question, answer, options, category, vocab_key);

    return getById(id);
}

export function update(id: string, quiz: Partial<Quiz>) {
    const existing = getById(id);
    if (!existing) {
        throw new Error(`Quiz with id ${id} not found`);
    }

    const updated = { ...existing, ...quiz };
    const { question, answer, options, category, vocab_key } = updated;

    db.query<Quiz, [string, string, string, string, string | null, string]>(`
        UPDATE quiz
        SET question = ?, answer = ?, options = ?, category = ?, vocab_key = ?
        WHERE id = ?
    `).run(question, answer, options, category, vocab_key, id);

    return getById(id);
}

export function remove(id: string) {
    db.query<Quiz, [string]>('DELETE FROM quiz WHERE id = ?').run(id);
}
