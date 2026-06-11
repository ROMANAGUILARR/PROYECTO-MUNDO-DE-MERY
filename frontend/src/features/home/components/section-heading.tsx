type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  fullWidth?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  fullWidth = false,
}: SectionHeadingProps) {
  return (
    <div className={`${fullWidth ? "w-full" : "max-w-2xl"} space-y-4`}>
      <span className="inline-flex rounded-full border border-[--border-soft] bg-white/75 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-[--muted]">
        {eyebrow}
      </span>
      <div className="space-y-3">
        <h2 className="font-display text-4xl leading-tight text-[--foreground] md:text-5xl">
          {title}
        </h2>
        <p className="text-base leading-7 text-[--muted] md:text-lg">
          {description}
        </p>
      </div>
    </div>
  );
}
