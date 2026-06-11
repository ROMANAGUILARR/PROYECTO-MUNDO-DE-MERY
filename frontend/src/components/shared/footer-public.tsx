import Link from "next/link";

export default function FooterPublic() {
  return (
    <footer className="border-t border-[--border-soft] bg-[rgba(255,251,247,0.72)]">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_0.8fr_0.8fr] md:px-8">
        <div className="space-y-3">
          <Link href="/" className="inline-block font-display text-3xl text-[--foreground]">
            El mundo de Mery
          </Link>
          <p className="max-w-md text-sm leading-6 text-[--muted]">
            Cerámica decorativa artesanal creada para dar carácter, calidez y detalle a
            tus espacios.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-[--muted]">
            Tienda
          </h3>
          <div className="space-y-2 text-sm text-[--foreground]">
            <Link href="/#colecciones" className="block transition hover:text-[--accent]">
              Colecciones
            </Link>
            <Link href="/#destacados" className="block transition hover:text-[--accent]">
              Destacados
            </Link>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-[--muted]">
            Atención
          </h3>
          <p className="text-sm leading-6 text-[--muted]">
            Piezas hechas a mano, sujetas a disponibilidad y variaciones propias del
            trabajo artesanal.
          </p>
        </div>
      </div>
    </footer>
  );
}
