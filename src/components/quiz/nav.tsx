import * as m from "#/paraglide/messages";

interface NavProps {
  locked: boolean;
  selected: string | null;
  isLast: boolean;
  index: number;
  accent: string;
  onBack: () => void;
  onConfirm: () => void;
  onNext: () => void;
  onResults: () => void;
}

export function Nav({
  locked,
  selected,
  isLast,
  index,
  accent,
  onBack,
  onConfirm,
  onNext,
  onResults,
}: NavProps) {
  const b =
    "flex-1 rounded-2xl text-sm font-semibold active:scale-95 transition-transform";

  return (
    <div className="flex gap-3" style={{ minHeight: 50 }}>
      <button
        onClick={onBack}
        disabled={index === 0}
        className={b}
        style={{
          background: "var(--fill)",
          color: index === 0 ? "var(--td)" : "var(--t1)",
          minHeight: 50,
        }}
      >
        {m.back()}
      </button>

      {!locked ? (
        <button
          onClick={onConfirm}
          disabled={!selected}
          className={`${b} text-white`}
          style={{ background: selected ? accent : "var(--td)", minHeight: 50 }}
        >
          {m.confirm()}
        </button>
      ) : isLast ? (
        <button
          onClick={onResults}
          className={`${b} text-white`}
          style={{ background: "var(--ok)", minHeight: 50 }}
        >
          {m.see_results()}
        </button>
      ) : (
        <button
          onClick={onNext}
          className={`${b} text-white`}
          style={{ background: accent, minHeight: 50 }}
        >
          {m.next()}
        </button>
      )}
    </div>
  );
}
