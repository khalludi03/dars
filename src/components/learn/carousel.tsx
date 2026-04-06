import { useRef, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";

interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  accent: string;
}

export function Carousel<T>({ items, renderItem, accent }: CarouselProps<T>) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const [mounted, setMounted] = useState(false);
  const n = items.length;

  // Enable scrolling only after hydration to prevent CLS
  useEffect(() => setMounted(true), []);

  // Reset index and scroll position when items change
  useEffect(() => {
    setIdx(0);
    const el = scrollRef.current;
    if (el) el.scrollTo({ left: 0, behavior: "instant" });
  }, [items]);

  // Track visible card via scroll events
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const children = Array.from(el.children) as HTMLElement[];
    if (!children.length) return;

    const containerCenter = el.scrollLeft + el.clientWidth / 2;
    let closestIdx = 0;
    let closestDist = Infinity;

    children.forEach((child, i) => {
      const dist = Math.abs(
        child.offsetLeft + child.offsetWidth / 2 - containerCenter,
      );
      if (dist < closestDist) {
        closestDist = dist;
        closestIdx = i;
      }
    });

    setIdx(closestIdx);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollTo = useCallback(
    (direction: number) => {
      const el = scrollRef.current;
      if (!el) return;
      const target = Math.max(0, Math.min(n - 1, idx + direction));
      const child = el.children[target] as HTMLElement | undefined;
      if (!child) return;
      el.scrollTo({
        left: child.offsetLeft - (el.clientWidth - child.offsetWidth) / 2,
        behavior: "smooth",
      });
    },
    [idx, n],
  );

  return (
    <div className="relative carousel-wrap">
      <div
        ref={scrollRef}
        className="flex gap-3 hide-sb pb-1 px-5"
        style={{
          overflowX: mounted ? "auto" : "hidden",
          WebkitOverflowScrolling: "touch",
          scrollSnapType: mounted ? "x mandatory" : undefined,
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="shrink-0"
            style={{
              width: "calc(100% - 40px)",
              maxWidth: 360,
              height: 280,
              scrollSnapAlign: "center",
            }}
          >
            {renderItem(item, i)}
          </div>
        ))}
      </div>

      {n > 1 && mounted && (
        <>
          <button
            onClick={() => scrollTo(-1)}
            disabled={idx === 0}
            aria-label="Previous"
            className="carousel-arrow absolute top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center active:scale-90 transition-all"
            style={{
              left: 6,
              background: "var(--surface)",
              boxShadow: "var(--sh-menu)",
              color: idx === 0 ? "var(--td)" : "var(--t1)",
              opacity: idx === 0 ? 0.3 : 1,
              zIndex: 2,
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            >
              <path d="M9 2L4 7L9 12" />
            </svg>
          </button>
          <button
            onClick={() => scrollTo(1)}
            disabled={idx >= n - 1}
            aria-label="Next"
            className="carousel-arrow absolute top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center active:scale-90 transition-all"
            style={{
              right: 6,
              background: "var(--surface)",
              boxShadow: "var(--sh-menu)",
              color: idx >= n - 1 ? "var(--td)" : "var(--t1)",
              opacity: idx >= n - 1 ? 0.3 : 1,
              zIndex: 2,
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            >
              <path d="M5 2L10 7L5 12" />
            </svg>
          </button>
        </>
      )}

      {n > 1 && (
        <div className="flex justify-center items-center gap-1.5 mt-3">
          {items.map((_, i) => (
            <span
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === idx ? 16 : 6,
                height: 6,
                background: i === idx ? accent : "var(--fill2)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
