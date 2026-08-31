// Small decorative label placed above section headings.
// Usage: <SectionLabel>Hoe werkt het</SectionLabel>

export default function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <p className="mb-4 inline-flex items-center gap-2.5 font-sans text-xs font-semibold uppercase tracking-widest text-green">
            {/*
        Purple accent dash before the label text. bg-purple-light (instead of
        the default purple) so it stays visible on both beige and dark-green
        section backgrounds. aria-hidden: purely decorative.
      */}
            <span aria-hidden="true" className="inline-block h-[2px] w-6 shrink-0 bg-purple-light" />
            {children}
        </p>
    );
}
