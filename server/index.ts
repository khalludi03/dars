import { z } from 'zod';
import { getAll, getById, create, update, remove } from './db/queries/vocabulary.ts';
import { getAll as getAllQuiz, getById as getQuizById, create as createQuiz, update as updateQuiz, remove as removeQuiz } from './db/queries/quiz.ts';
import { getVocabWithSection, getVocabWithSectionAliased } from './db/queries/joins.ts';
import { searchVocabulary } from './db/queries/search.ts';
import { register, login, logout, getUserFromToken } from './db/queries/auth.ts';

// ── Zod schemas ────────────────────────────────────────────────────────────

const CredentialsSchema = z.object({
    username: z.string().min(3).max(32).regex(/^\w+$/, 'Only letters, numbers, and underscores'),
    password: z.string().min(8).max(72),
});

const VocabCreateSchema = z.object({
    key: z.string().min(1),
    arabic: z.string().min(1),
    gender: z.enum(['M', 'F']),
    section: z.enum(['Head', 'Upper', 'Core', 'Lower']),
    reference_word: z.string().min(1),
    reference_roman: z.string().min(1),
});

const VocabUpdateSchema = VocabCreateSchema.partial();

// ── Helpers ────────────────────────────────────────────────────────────────

function json(data: unknown, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { 'Content-Type': 'application/json' },
    });
}

function bearerToken(req: Request): string | null {
    const auth = req.headers.get('Authorization');
    if (!auth?.startsWith('Bearer ')) return null;
    return auth.slice(7);
}

function requireAuth(req: Request) {
    const token = bearerToken(req);
    if (!token) return null;
    return getUserFromToken(token);
}

function requireAdmin(req: Request) {
    const user = requireAuth(req);
    if (!user || user.role !== 'admin') return null;
    return user;
}

// ── Server ─────────────────────────────────────────────────────────────────

Bun.serve({
    port: 3001,
    async fetch(req) {
        const url = new URL(req.url);

        // ── Admin dashboard ────────────────────────────────────────────────

        if (url.pathname === '/admin') {
            return new Response(Bun.file(import.meta.dir + '/admin.html'));
        }

        // ── Auth ───────────────────────────────────────────────────────────

        if (url.pathname === '/api/auth/register' && req.method === 'POST') {
            const body = await req.json();
            const parsed = CredentialsSchema.safeParse(body);
            if (!parsed.success) return json({ error: parsed.error.flatten() }, 400);
            try {
                const user = await register(parsed.data.username, parsed.data.password);
                return json(user, 201);
            } catch (e) {
                return json({ error: (e as Error).message }, 409);
            }
        }

        if (url.pathname === '/api/auth/login' && req.method === 'POST') {
            const body = await req.json();
            const parsed = CredentialsSchema.safeParse(body);
            if (!parsed.success) return json({ error: parsed.error.flatten() }, 400);
            try {
                const token = await login(parsed.data.username, parsed.data.password);
                return json({ token });
            } catch {
                return json({ error: 'Invalid credentials' }, 401);
            }
        }

        if (url.pathname === '/api/auth/logout' && req.method === 'POST') {
            const token = bearerToken(req);
            if (!token) return json({ error: 'No token provided' }, 400);
            logout(token);
            return json({ ok: true });
        }

        if (url.pathname === '/api/auth/me' && req.method === 'GET') {
            const user = requireAuth(req);
            if (!user) return json({ error: 'Unauthorized' }, 401);
            return json(user);
        }

        // ── Search ─────────────────────────────────────────────────────────

        if (url.pathname === '/api/search' && req.method === 'GET') {
            const q = url.searchParams.get('q');
            if (!q || q.trim() === '') return json({ error: 'Missing query param: q' }, 400);
            try {
                return json(searchVocabulary(q.trim()));
            } catch {
                return json({ error: 'Invalid FTS query' }, 400);
            }
        }

        // ── Joins (step 3 showcase) ────────────────────────────────────────

        if (url.pathname === '/api/vocab-with-section' && req.method === 'GET') {
            return json(await getVocabWithSection());
        }

        if (url.pathname === '/api/vocab-with-section-aliased' && req.method === 'GET') {
            return json(await getVocabWithSectionAliased());
        }

        // ── Vocabulary CRUD (write endpoints require auth) ─────────────────

        if (url.pathname === '/api/vocabulary' && req.method === 'GET') {
            return json(getAll());
        }

        if (url.pathname.startsWith('/api/vocabulary/') && req.method === 'GET') {
            const id = parseInt(url.pathname.split('/').pop() || '', 10);
            const vocab = getById(id);
            return vocab ? json(vocab) : json({ error: 'Not found' }, 404);
        }

        if (url.pathname === '/api/vocabulary' && req.method === 'POST') {
            if (!requireAdmin(req)) return json({ error: 'Forbidden: admin only' }, 403);
            const body = await req.json();
            const parsed = VocabCreateSchema.safeParse(body);
            if (!parsed.success) return json({ error: parsed.error.flatten() }, 400);
            return json(create(parsed.data), 201);
        }

        if (url.pathname.startsWith('/api/vocabulary/') && req.method === 'PUT') {
            if (!requireAdmin(req)) return json({ error: 'Forbidden: admin only' }, 403);
            const id = parseInt(url.pathname.split('/').pop() || '', 10);
            const body = await req.json();
            const parsed = VocabUpdateSchema.safeParse(body);
            if (!parsed.success) return json({ error: parsed.error.flatten() }, 400);
            try {
                return json(update(id, parsed.data));
            } catch (e) {
                return json({ error: (e as Error).message }, 404);
            }
        }

        if (url.pathname.startsWith('/api/vocabulary/') && req.method === 'DELETE') {
            if (!requireAdmin(req)) return json({ error: 'Forbidden: admin only' }, 403);
            const id = parseInt(url.pathname.split('/').pop() || '', 10);
            remove(id);
            return json(null, 204);
        }

        // ── Quiz CRUD (write endpoints require auth) ───────────────────────

        if (url.pathname === '/api/quiz' && req.method === 'GET') {
            return json(getAllQuiz());
        }

        if (url.pathname.startsWith('/api/quiz/') && req.method === 'GET') {
            const id = url.pathname.split('/').pop() || '';
            const quiz = getQuizById(id);
            return quiz ? json(quiz) : json({ error: 'Not found' }, 404);
        }

        if (url.pathname === '/api/quiz' && req.method === 'POST') {
            if (!requireAdmin(req)) return json({ error: 'Forbidden: admin only' }, 403);
            const data = await req.json();
            return json(createQuiz(data), 201);
        }

        if (url.pathname.startsWith('/api/quiz/') && req.method === 'PUT') {
            if (!requireAdmin(req)) return json({ error: 'Forbidden: admin only' }, 403);
            const id = url.pathname.split('/').pop() || '';
            const data = await req.json();
            try {
                return json(updateQuiz(id, data));
            } catch (e) {
                return json({ error: (e as Error).message }, 404);
            }
        }

        if (url.pathname.startsWith('/api/quiz/') && req.method === 'DELETE') {
            if (!requireAdmin(req)) return json({ error: 'Forbidden: admin only' }, 403);
            const id = url.pathname.split('/').pop() || '';
            removeQuiz(id);
            return json(null, 204);
        }

        return json({ error: 'Not found' }, 404);
    },
});
