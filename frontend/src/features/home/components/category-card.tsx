import Image from "next/image";
import type { Category } from "@/features/home/data/catalog";

type CategoryCardProps = {
  category: Category;
};

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-[--border-soft] bg-[--surface] p-4 shadow-[0_18px_45px_rgba(81,53,38,0.08)] transition-transform duration-300 hover:-translate-y-1">
      <div className="image-card mb-6 overflow-hidden rounded-[1.5rem]">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${category.accent} opacity-30`}
        />
        <Image
          src={decodeURIComponent(category.image)}
          alt={category.alt}
          width={1200}
          height={900}
          loading="eager"
          className="h-60 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="space-y-3 px-2 pb-2">
        <span className="inline-flex rounded-full border border-[--border-soft] bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[--muted]">
          {category.countLabel}
        </span>
        <h3 className="font-display text-3xl text-[--foreground]">{category.title}</h3>
        <p className="text-sm leading-6 text-[--muted]">{category.description}</p>
      </div>
    </article>
  );
}
