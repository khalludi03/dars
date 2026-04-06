import { useRef, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface AccordionPanelProps {
  isOpen: boolean;
  children: ReactNode;
}

export function AccordionPanel({ isOpen, children }: AccordionPanelProps) {
  const inner = useRef<HTMLDivElement>(null);
  const [h, setH] = useState(0);

  useEffect(() => {
    if (!inner.current) return;
    if (isOpen) {
      setH(inner.current.scrollHeight);
      const ro = new ResizeObserver(() =>
        setH(inner.current?.scrollHeight ?? 0),
      );
      ro.observe(inner.current);
      return () => ro.disconnect();
    } else {
      setH(0);
    }
  }, [isOpen]);

  return (
    <div
      style={{
        height: isOpen ? h : 0,
        opacity: isOpen ? 1 : 0,
        overflow: isOpen ? "visible" : "hidden",
        transition: "height .4s cubic-bezier(.33,1,.68,1), opacity .3s ease",
      }}
    >
      <div ref={inner}>{children}</div>
    </div>
  );
}
