import db from './client';

interface QuizRow {
    id: string;
    question: string;
    answer: string;
    options: string;
    category: string;
    vocab_key: null;
}

const questions: Omit<QuizRow, 'options' | 'vocab_key'>[] = [
    {
        id: 'rq-01',
        question: "What is `useEffect` actually for? What is it NOT for?",
        answer: "Synchronizes a component with an external system. NOT for transforming data for rendering, and NOT for handling user events.",
    },
    {
        id: 'rq-02',
        question: "What does the cleanup function in `useEffect` do and when does it run?",
        answer: "Runs before the effect re-runs on dependency change and on unmount. Tears down the previous effect — removing listeners, cancelling subscriptions, aborting fetches.",
    },
    {
        id: 'rq-03',
        question: "What is the correct pattern to avoid race conditions when fetching data in `useEffect`?",
        answer: "Use `let ignore = false` in the effect; set `ignore = true` in cleanup; check `if (!ignore)` before calling setState. Or use AbortController.",
    },
    {
        id: 'rq-04',
        question: "Why does React docs say 'you might not need an effect' for derived state?",
        answer: "Computing B from A inside an effect causes two render cycles. Instead, compute directly during render: `const b = computeB(a)`, or use `useMemo` if expensive.",
    },
    {
        id: 'rq-05',
        question: "Name at least 3 problems with fetching data in `useEffect` without a library.",
        answer: "No caching, no request deduplication, no preloading (causes waterfalls), race conditions require manual handling, no SSR support.",
    },
    {
        id: 'rq-06',
        question: "Why does React Strict Mode run effects twice in development?",
        answer: "Runs setup → cleanup → setup to surface missing cleanup logic. If your effect breaks when run twice, the cleanup is incomplete.",
    },
    {
        id: 'rq-07',
        question: "When should you actually use `useCallback`?",
        answer: "When passing a callback to a child wrapped in `React.memo`. Without it, a new reference every render breaks memoization.",
    },
    {
        id: 'rq-08',
        question: "What is the relationship between `useCallback` and `useMemo`?",
        answer: "`useCallback(fn, deps)` is syntactic sugar for `useMemo(() => fn, deps)`. Both cache values; `useMemo` caches the result, `useCallback` caches the function.",
    },
    {
        id: 'rq-09',
        question: "Why is 'just wrap everything in `useMemo` and `useCallback`' wrong?",
        answer: "Every memoization costs: storing previous values, comparing dependencies. If deps change often, you pay comparison cost and recompute anyway.",
    },
    {
        id: 'rq-10',
        question: "When is `useMemo` genuinely worth it?",
        answer: "When computation is measurably slow (large array filter/sort), or when the result is passed to a memoized child or used as a hook dependency.",
    },
    {
        id: 'rq-11',
        question: "With React Compiler available, what's the guidance on `useMemo`/`useCallback` in 2025+?",
        answer: "For new code, rely on the Compiler. Only use manual hooks for precise control over reference identity (e.g., objects as `useEffect` dependencies).",
    },
    {
        id: 'rq-12',
        question: "What does `React.memo` do and when should you use it?",
        answer: "Wraps a component to skip re-rendering when props haven't changed (shallow comparison). Use when component renders often with same props and re-rendering is expensive.",
    },
    {
        id: 'rq-13',
        question: "`React.memo` uses shallow comparison. When does this break?",
        answer: "When props are objects, arrays, or functions recreated every render. Fix: memoize those props with `useMemo`/`useCallback` or pass a custom comparator.",
    },
    {
        id: 'rq-14',
        question: "A parent component re-renders. By default, do all children re-render?",
        answer: "Yes. React re-renders all children by default. Prevention: `React.memo`, lift content up via JSX children, React Compiler, or move state down.",
    },
    {
        id: 'rq-15',
        question: "What is automatic batching? When was it introduced?",
        answer: "Groups multiple state updates into a single re-render. Before React 18, only in event handlers. React 18+ batches everywhere — promises, setTimeout, native events.",
    },
    {
        id: 'rq-16',
        question: "You call `setCount(count + 1)` three times in a row. What's the result and why?",
        answer: "`count + 1`, not `count + 3`. All three reads use the same `count`. Use updater form `setCount(prev => prev + 1)` to stack increments.",
    },
    {
        id: 'rq-17',
        question: "`useState` vs `useReducer`: when do you pick one over the other?",
        answer: "`useState` for simple independent values. `useReducer` for related sub-values, complex transitions, centralized update logic, or when passing dispatch through layers.",
    },
    {
        id: 'rq-18',
        question: "Explain controlled vs uncontrolled components. When would you choose uncontrolled?",
        answer: "Controlled: React state is source of truth. Uncontrolled: DOM holds the value, read with a ref on submit. Choose uncontrolled for file inputs or simple forms.",
    },
    {
        id: 'rq-19',
        question: "Why does React require immutable state updates? What breaks if you mutate?",
        answer: "React uses reference equality to detect changes. Mutation in place means same reference → React skips re-render. Breaks concurrent features like `useTransition`.",
    },
    {
        id: 'rq-20',
        question: "Why does React need the `key` prop on list items?",
        answer: "Keys let React identify items across renders during reconciliation. Without stable keys, React falls back to index matching, causing incorrect state and DOM mutations.",
    },
    {
        id: 'rq-21',
        question: "When is using array index as `key` acceptable vs dangerous?",
        answer: "Acceptable only for static lists that never reorder/filter and have no local state. Dangerous for any dynamic list — causes state mismatches.",
    },
    {
        id: 'rq-22',
        question: "What is list virtualization and how does it work?",
        answer: "Renders only visible items plus a small buffer. Container simulates total height but only ~10–30 actual DOM nodes exist. Items mount/unmount as user scrolls.",
    },
    {
        id: 'rq-23',
        question: "You render 10,000 items and the page is slow. Walk through your optimization strategy.",
        answer: "Profile → virtualize (`@tanstack/react-virtual`) → memoize items with `React.memo` → debounce/defer with `useDeferredValue` → consider pagination.",
    },
    {
        id: 'rq-24',
        question: "When should you NOT virtualize a list?",
        answer: "When the list is short (~500 simple items). Virtualization adds complexity: browser find fails, accessibility tools miss off-screen items, print layouts break.",
    },
    {
        id: 'rq-25',
        question: "Compare `@tanstack/react-virtual`, `react-window`, and `react-virtuoso`.",
        answer: "`@tanstack/react-virtual`: headless, flexible. `react-window`: lightweight, requires fixed sizes. `react-virtuoso`: auto-measures variable heights via ResizeObserver.",
    },
    {
        id: 'rq-26',
        question: "`useRef` vs `useState`: when do you use each?",
        answer: "`useState` when value change should trigger re-render. `useRef` for mutable values that shouldn't — DOM refs, timer IDs, previous values, mounted checks.",
    },
    {
        id: 'rq-27',
        question: "What is a ref callback and when would you use one over `useRef`?",
        answer: "A function passed as `ref`: called with DOM node on mount, `null` on unmount. Use for logic on mount/unmount, measuring, or dynamic ref collections.",
    },
    {
        id: 'rq-28',
        question: "What makes a good custom hook?",
        answer: "Starts with `use`, encapsulates stateful logic, single responsibility, returns minimum API, follows hook rules. Callers shouldn't know the internal implementation.",
    },
    {
        id: 'rq-29',
        question: "When implementing `useLocalStorage`, what edge cases must you handle?",
        answer: "SSR safety (`typeof window`), corrupt JSON, quota exceeded, key changes, cross-tab sync via `storage` events, non-JSON values (Date, Map, Set).",
    },
    {
        id: 'rq-30',
        question: "When should you use React Context vs a state management library?",
        answer: "Context for DI (theme, locale, auth), infrequent changes, prop drilling avoidance. Use Zustand/Jotai for high-frequency updates or split into smaller contexts.",
    },
    {
        id: 'rq-31',
        question: "How do you prevent unnecessary re-renders from Context?",
        answer: "Split large contexts. Memoize value with `useMemo`. Extract consuming logic into `React.memo` child. Use `use-context-selector`. Or reconsider if Context is appropriate.",
    },
    {
        id: 'rq-32',
        question: "A component throws during render with no error boundaries. What happens?",
        answer: "The entire React tree unmounts — blank screen. Place error boundaries around route-level, feature sections, and third-party widgets.",
    },
    {
        id: 'rq-33',
        question: "Error boundaries don't catch event handler or async errors. How do you handle those?",
        answer: "`try/catch` in handlers calling `setState` for error display. React 19 catches errors in async Actions. Use `window.addEventListener('error')` for global safety.",
    },
    {
        id: 'rq-34',
        question: "What is `useTransition` and when would you use it?",
        answer: "Returns `[isPending, startTransition]`. Wrap low-priority updates to keep UI interactive. Classic case: filtering large list — wrap filter so input stays responsive.",
    },
    {
        id: 'rq-35',
        question: "What is `useDeferredValue` and how does it differ from `useTransition`?",
        answer: "Returns a deferred copy lagging on urgent updates. Use when you receive a value as a prop and can't wrap its setter. `useTransition` wraps the update; this wraps the value.",
    },
    {
        id: 'rq-36',
        question: "What is the `use` API and how does it differ from hooks?",
        answer: "Reads promises and context in render. Unlike hooks, it can be called conditionally (after early returns). Suspends until promise resolves.",
    },
    {
        id: 'rq-37',
        question: "Explain `useActionState`. When use it instead of `useReducer`?",
        answer: "Wraps an async action returning `[state, dispatch, isPending]`. Unlike `useReducer` (pure), the reducer can perform side effects. Use for form submissions.",
    },
    {
        id: 'rq-38',
        question: "What is `useOptimistic` and what happens when the async action fails?",
        answer: "Returns temporary optimistic state while Action is pending. If action fails, React automatically reverts to real state — no manual rollback needed.",
    },
    {
        id: 'rq-39',
        question: "How does `useFormStatus` work and what is its key constraint?",
        answer: "Returns `{ pending, data, method, action }` for a parent `<form>`. Must be called from a child of `<form>`, not the same component rendering it.",
    },
    {
        id: 'rq-40',
        question: "What are Actions in React 19 and how do they relate to transitions?",
        answer: "Async functions passed to `<form action={fn}>` or inside `startTransition`. React handles pending state, error propagation, optimistic updates, and form resets.",
    },
    {
        id: 'rq-41',
        question: "React 19 supports rendering `<title>`, `<meta>`, and `<link>` inside components. How?",
        answer: "React automatically hoists these tags to `<head>`. Works with client apps, streaming SSR, and Server Components. Replaces basic react-helmet usage.",
    },
    {
        id: 'rq-42',
        question: "What are `'use client'` and `'use server'` directives?",
        answer: "Bundler directives, not React APIs. `'use client'` marks a module boundary for client components. `'use server'` marks async functions as Server Actions.",
    },
    {
        id: 'rq-43',
        question: "What is `<Activity>` and how does it differ from conditional rendering?",
        answer: "`<Activity mode='hidden'>` keeps components mounted, preserves state, unmounts effects. Conditional rendering destroys state. Ideal for tabs preserving scroll/input.",
    },
    {
        id: 'rq-44',
        question: "What problem does `useEffectEvent` solve?",
        answer: "Solves stale closure in effects. Creates a stable function always reading latest props/state without being listed as a dependency — prevents unnecessary effect re-runs.",
    },
    {
        id: 'rq-45',
        question: "When should you NOT use `useEffectEvent`?",
        answer: "Don't use it to hide legitimate dependencies. If the effect should truly re-run when a value changes, keep it as a dependency. Only for event-like non-reactive values.",
    },
    {
        id: 'rq-46',
        question: "What is React Compiler and how does it differ from runtime optimizations?",
        answer: "AOT build tool (Babel plugin, stable v1.0 Oct 2025). Analyzes data flow and inserts memoization at build time — including conditional paths after early returns.",
    },
    {
        id: 'rq-47',
        question: "Does React Compiler make `useMemo`, `useCallback`, and `React.memo` obsolete?",
        answer: "Not entirely. For new code, rely on the Compiler. Still use manual hooks for precise reference control (e.g., expensive cross-component computations).",
    },
    {
        id: 'rq-48',
        question: "What are the 'Rules of React' and why do they matter more with the Compiler?",
        answer: "Components/hooks must be pure, state immutable, hooks top-level/unconditional. The Compiler depends on them for correctness — violations are silently skipped.",
    },
    {
        id: 'rq-49',
        question: "What can Server Components do that Client Components cannot?",
        answer: "Directly access databases/filesystems, keep secrets on server, reduce client bundle size, use async/await at component level. Cannot use state, effects, or browser APIs.",
    },
    {
        id: 'rq-50',
        question: "What is streaming SSR and how does Suspense enable it?",
        answer: "Sends HTML progressively. `<Suspense>` streams fallback immediately, then streams resolved content as a `<script>` tag. Client doesn't wait for full page.",
    },
    {
        id: 'rq-51',
        question: "What is hydration and what are hydration mismatches?",
        answer: "Attaches event listeners to server-rendered HTML on client. Mismatches when server and client produce different output (Date.now(), window.innerWidth during render).",
    },
    {
        id: 'rq-52',
        question: "What is `useSyncExternalStore` and why was it introduced?",
        answer: "Subscribes to external stores safely under concurrent rendering. Prevents 'tearing' — inconsistent state across the tree when stores update mid-render.",
    },
    {
        id: 'rq-53',
        question: "What is `React.lazy` and what are its limitations?",
        answer: "Enables code-splitting via dynamic imports with `<Suspense>`. Only works with default exports, client-side only, declare outside components to avoid recreating.",
    },
    {
        id: 'rq-54',
        question: "Compare `useActionState`, React Hook Form, and Server Actions for form-heavy apps.",
        answer: "`useActionState`: simple mutations, zero deps. React Hook Form: complex validation, large forms. Server Actions: full-stack, type-safe mutations with revalidation.",
    },
    {
        id: 'rq-55',
        question: "How would you design state management for a large React app?",
        answer: "Local state for UI. URL for shareable data. Server cache (TanStack Query) for remote. Global (Zustand/Jotai) only for cross-cutting concerns. Context for DI.",
    },
    {
        id: 'rq-56',
        question: "Explain tradeoffs between Server Components, SSR, SSG, and ISR.",
        answer: "SSG: fastest TTFB, stale until rebuild. ISR: SSG + background revalidation. SSR: per-request, personalized. Server Components: reduce client JS, composable.",
    },
    {
        id: 'rq-57',
        question: "How does React's reconciliation algorithm work and what are its assumptions?",
        answer: "Compares virtual DOM top-down, O(n). Heuristics: different types → different trees; `key` identifies children. Fails with dynamic types or unstable keys.",
    },
    {
        id: 'rq-58',
        question: "What is React Fiber's work loop and how does it enable interruptible rendering?",
        answer: "Each component is a 'unit of work' node. Work loop processes one fiber then yields via MessageChannel. Browser can interrupt; React resumes later without losing progress.",
    },
    {
        id: 'rq-59',
        question: "What's your React Compiler migration rollout strategy?",
        answer: "Fix Rules violations → enable in annotation mode → measure with DevTools → expand gradually → remove manual `useMemo`/`useCallback` after verifying no regressions.",
    },
    {
        id: 'rq-60',
        question: "The React Compiler skipped a component. What are common reasons?",
        answer: "Mutates objects directly, side effects during render, patterns static analysis can't follow (eval, dynamic property access), or unsupported syntax.",
    },
    {
        id: 'rq-61',
        question: "Explain `useTransition` vs `useDeferredValue` at a deep level.",
        answer: "`useTransition` wraps a setter and gives `isPending`. `useDeferredValue` wraps a received value. Both use the same concurrent mechanism — choose based on access.",
    },
    {
        id: 'rq-62',
        question: "What is tearing in concurrent React and how do external stores cause it?",
        answer: "Different UI parts read different state versions during a single paused render. `useSyncExternalStore` prevents by forcing synchronous reads and re-rendering if store changed.",
    },
    {
        id: 'rq-63',
        question: "How does `<Suspense>` boundary batching work in React 19.2's streaming SSR?",
        answer: "React batches reveals of nested Suspense boundaries — waits for siblings to be ready, reveals together in one paint. Fewer visual jumps, smoother loading.",
    },
    {
        id: 'rq-64',
        question: "Compare `<Activity mode='hidden'>` vs CSS `display:none` vs conditional rendering.",
        answer: "CSS hidden: mounted, effects running. Conditional: unmounts, destroys state. Activity hidden: unmounts effects, defers updates, but preserves component state.",
    },
    {
        id: 'rq-65',
        question: "Design a custom hook that fetches, caches, deduplicates, handles races, and supports Suspense.",
        answer: "Module-level Map cache keyed by request. Hit: return value; pending: throw promise; miss: create promise, store, throw. AbortController per request. This is what TanStack Query does.",
    },
    {
        id: 'rq-66',
        question: "How would you implement error boundaries with hooks (or why can't you)?",
        answer: "You can't — `componentDidCatch` and `getDerivedStateFromError` are class-only. Write a thin class component and compose with functional ones. Use `react-error-boundary`.",
    },
    {
        id: 'rq-67',
        question: "What is Partial Pre-rendering (PPR)?",
        answer: "Pre-renders static shell at build time, fills dynamic content at request time. Static shell from CDN instantly. `<Suspense>` marks holes for dynamic injection.",
    },
    {
        id: 'rq-68',
        question: "What is `cacheSignal` and when would you use it in Server Components?",
        answer: "Returns an AbortSignal tied to a `React.cache()` entry's lifetime. Use it to cancel long-running server operations (DB queries, API calls) when cache is evicted.",
    },
    {
        id: 'rq-69',
        question: "How do you test a component using `useActionState` and `useOptimistic`?",
        answer: "React Testing Library: submit form, assert optimistic state immediately, `waitFor` final state, make mock reject to verify rollback. Use `act()` to flush transitions.",
    },
    {
        id: 'rq-70',
        question: "How do you profile React rendering performance in 2025/26?",
        answer: "React DevTools Profiler v5: commit timings, render reasons, Memo badges. Chrome + React Performance Tracks (React 19.2+): Scheduler lanes, component durations.",
    },
    {
        id: 'rq-71',
        question: "What was CVE-2025-55182 (React2Shell) and what does it teach about security?",
        answer: "Critical RCE in `react-server-dom-*` (React 19.0–19.2.2) via crafted Server Component payloads. Lesson: Server Components are server attack surface — always validate inputs.",
    },
    {
        id: 'rq-72',
        question: "Compare Zustand, Jotai, and Redux Toolkit for global state in 2025.",
        answer: "Zustand: minimal API, single store. Jotai: atomic, fine-grained reactivity. Redux Toolkit: opinionated, feature-rich (RTK Query, devtools). All use `useSyncExternalStore`.",
    },
    {
        id: 'rq-73',
        question: "What is TanStack Query's role in a React 19 Server Component world?",
        answer: "Not redundant. Server Components handle initial fetch; TanStack Query manages client lifecycle: cache invalidation, background refetch, optimistic updates, pagination.",
    },
    {
        id: 'rq-74',
        question: "How do you handle authentication in a React Server Component architecture?",
        answer: "Server Components read session tokens from headers. Server Actions re-validate auth before any mutation. Client Components receive auth state as props/context.",
    },
    {
        id: 'rq-75',
        question: "Implement a `useDebounce` hook. When should you use `useDeferredValue` instead?",
        answer: "`useDebounce` sets a timer on delay. Use `useDeferredValue` for deferring expensive re-renders from input — built-in, adapts to device, no delay value needed.",
    },
    {
        id: 'rq-76',
        question: "A component reading `localStorage` on mount breaks during SSR. How do you fix it?",
        answer: "`useSyncExternalStore` with `getServerSnapshot` returning a default — handles hydration mismatches cleanly. Or `'use client'` boundary to skip SSR entirely.",
    },
    {
        id: 'rq-77',
        question: "Design a compound component API like `<Tabs>`, `<Tabs.List>`, `<Tabs.Panel>`.",
        answer: "`<Tabs>` renders Context provider. Sub-components consume it. Attach as static properties. Use `useId` for ARIA. Handle arrow key navigation. Children-based composition.",
    },
    {
        id: 'rq-78',
        question: "You have a `setInterval` needing the latest `count` without resetting. How to solve pre/post 19.2?",
        answer: "Pre-19.2: ref for latest count, read `countRef.current` in callback, effect depends on `[]`. Post-19.2: `useEffectEvent` wrapping tick handler reads latest without being a dep.",
    },
    {
        id: 'rq-79',
        question: "What is `<Activity>` used for in React 19?",
        answer: "Keeps components mounted but hidden, preserving state while unmounting effects. Ideal for tabs, stacks, modals where scroll position and input values should persist.",
    },
];

// Build 4 options per question: correct answer + 3 plausible distractors drawn from other answers
function buildOptions(index: number): string[] {
    const correct = questions[index].answer;
    const pool = questions
        .filter((_, i) => i !== index)
        .map(q => q.answer)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
    const all = [correct, ...pool].sort(() => Math.random() - 0.5);
    return all;
}

const insert = db.prepare(`
    INSERT OR IGNORE INTO quiz (id, question, answer, options, category, vocab_key)
    VALUES (?, ?, ?, ?, ?, NULL)
`);

for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const opts = buildOptions(i);
    insert.run(q.id, q.question, q.answer, JSON.stringify(opts), 'React');
}

console.log('Seeded React quiz questions:', db.query("SELECT COUNT(*) as n FROM quiz WHERE category = 'React'").get());
