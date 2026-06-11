import type { BrandValue } from "@/features/home/data/catalog";

type ValueCardProps = {
  value: BrandValue;
};

export default function ValueCard({ value }: ValueCardProps) {
  return (
    <article className="rounded-[1.75rem] border border-[--border-soft] bg-white/80 p-6 shadow-[0_18px_40px_rgba(68,44,31,0.06)]">
      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[--accent]">
        0{value.id}
      </span>
      <h3 className="mt-4 font-display text-3xl text-[--foreground]">{value.title}</h3>
      <p className="mt-3 text-sm leading-6 text-[--muted]">{value.description}</p>
    </article>
  );
}
