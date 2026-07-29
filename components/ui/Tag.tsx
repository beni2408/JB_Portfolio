export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono-tag inline-flex items-center rounded-full border border-royal/25 bg-royal/8 px-3 py-1 text-xs tracking-wide text-ink">
      {children}
    </span>
  );
}
