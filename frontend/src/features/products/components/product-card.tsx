"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type { AuthUser } from "@/features/auth/types";

type Props = {
  producto: {
    id: number;
    nombre: string;
    precio: number;
    descripcion: string;
    etiqueta: string;
    formato: string;
    tonos: [string, string];
    image: string;
    alt: string;
  };
  user: AuthUser | null;
  onRequireAuth: () => void;
};

export default function ProductCard(props: Props) {
  const { producto } = props;
  const router = useRouter();

  const handleComprar = () => {
    console.log("ID del producto:", producto.id);
    router.push(`/producto/${producto.id}`);
  };

  // Procesar la URL de la imagen para manejar tanto rutas relativas como URLs completas
  const getImageSrc = () => {
    const imageUrl = producto.image;
    
    // Si es una URL completa (empieza con http:// o https://), usarla directamente
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    
    // Si es una ruta relativa, decodificar y usar como está (será servida por Next.js)
    try {
      return decodeURIComponent(imageUrl);
    } catch {
      return imageUrl;
    }
  };

  const imageSrc = getImageSrc();

  return (
    <article className="group flex flex-col rounded-[2rem] border border-[--border-soft] bg-[--surface] p-4 shadow-[0_18px_45px_rgba(77,50,36,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(77,50,36,0.14)]">
      <div
        className="image-card relative overflow-hidden rounded-[1.6rem]"
        style={{
          background: `linear-gradient(140deg, ${producto.tonos[0]} 0%, ${producto.tonos[1]} 100%)`,
        }}
      >
        <span className="absolute left-4 top-4 z-10 inline-flex rounded-full border border-white/35 bg-[rgba(37,23,15,0.48)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white backdrop-blur-sm">
          {producto.etiqueta}
        </span>

        <Image
          src={imageSrc}
          alt={producto.alt}
          width={1200}
          height={1000}
          loading="eager"
          className="h-72 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-col flex-grow space-y-4 px-2 pb-2 pt-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-grow">
            <h3 className="font-display text-3xl text-[--foreground] line-clamp-2">{producto.nombre}</h3>
            <p className="mt-1 text-sm text-[--muted]">{producto.formato}</p>
          </div>
          <p className="text-base font-semibold text-[--foreground] flex-shrink-0">S/{producto.precio}</p>
        </div>

        <p className="text-sm leading-6 text-[--muted] flex-grow min-h-[3rem] line-clamp-3">{producto.descripcion}</p>

        <div className="mt-auto flex justify-center pt-2">
          <button
            onClick={handleComprar}
            className="button-primary inline-flex w-full max-w-xs cursor-pointer items-center justify-center rounded-full px-5 py-3 text-sm font-semibold text-black"
          >
            Comprar
          </button>
        </div>
      </div>
    </article>
  );
}
