// Small decorative label placed above section headings.
// Usage: <SectionLabel>Hoe werkt het</SectionLabel>

export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 inline-block font-sans text-xs font-semibold uppercase tracking-widest text-green">
      {children}
    </p>
  );
}
