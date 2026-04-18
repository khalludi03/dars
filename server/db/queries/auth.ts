import db from '../client';

export type Role = 'admin' | 'user';

interface User {
    id: number;
    username: string;
    password_hash: string;
    role: Role;
    created_at: number;
}

export interface PublicUser {
    id: number;
    username: string;
    role: Role;
    created_at: number;
}

interface Session {
    token: string;
    user_id: number;
    expires_at: number;
}

const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

export async function register(username: string, password: string): Promise<PublicUser> {
    const existing = db
        .query<{ id: number }, [string]>('SELECT id FROM users WHERE username = ?')
        .get(username);

    if (existing) throw new Error('Username already taken');

    // First user ever becomes admin
    const userCount = (db.query<{ n: number }, []>('SELECT COUNT(*) as n FROM users').get())!.n;
    const role: Role = userCount === 0 ? 'admin' : 'user';

    const password_hash = await Bun.password.hash(password, { algorithm: 'bcrypt', cost: 10 });

    const result = db
        .query<PublicUser, [string, string, Role]>(
            'INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?) RETURNING id, username, role, created_at',
        )
        .get(username, password_hash, role);

    return result!;
}

export async function login(username: string, password: string): Promise<string> {
    const user = db
        .query<User, [string]>('SELECT * FROM users WHERE username = ?')
        .get(username);

    if (!user) throw new Error('Invalid credentials');

    const valid = await Bun.password.verify(password, user.password_hash);
    if (!valid) throw new Error('Invalid credentials');

    const token = crypto.randomUUID();
    const expires_at = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;

    db.query<Session, [string, number, number]>(
        'INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)',
    ).run(token, user.id, expires_at);

    return token;
}

export function logout(token: string): void {
    db.query<Session, [string]>('DELETE FROM sessions WHERE token = ?').run(token);
}

export function getUserFromToken(token: string): PublicUser | null {
    const now = Math.floor(Date.now() / 1000);

    const row = db
        .query<PublicUser, [string, number]>(
            `SELECT u.id, u.username, u.role, u.created_at
             FROM sessions s
             JOIN users u ON u.id = s.user_id
             WHERE s.token = ? AND s.expires_at > ?`,
        )
        .get(token, now);

    return row ?? null;
}
