export default function HeroShowcase() {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-[radial-gradient(circle_at_top,#f8efe7_0%,#efe0d2_48%,#ddc5b3_100%)] p-6 shadow-[0_30px_80px_rgba(84,54,38,0.18)]">
      <div className="absolute -right-8 top-12 h-44 w-44 rounded-full bg-white/25 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-32 w-32 rounded-tr-[3rem] bg-[#ab7757]/20" />

      <div className="image-card overflow-hidden rounded-[2rem]">
        <video
          className="h-[420px] w-full object-cover md:h-[520px]"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source src="/video/hero/video-hero.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 rounded-[1.5rem] border border-white/40 bg-[rgba(37,23,15,0.52)] px-5 py-4 backdrop-blur-md">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-white/75">
            Selección curada
          </p>
          <p className="mt-2 font-display text-3xl text-white">
            Cerámica artesanal con presencia real
          </p>
        </div>
        <div className="hidden h-14 w-px bg-white/25 md:block" />
        <p className="max-w-56 text-sm leading-6 text-white/82">
          Observa cómo una idea se convierte en una pieza única de cerámica.
        </p>
      </div>
    </div>
  );
}
