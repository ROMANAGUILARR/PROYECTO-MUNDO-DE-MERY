"use client";

import { useEffect, useState } from "react";
import AuthModal from "@/features/auth/components/auth-modal";
import type { AuthUser } from "@/features/auth/types";
import CategoryCard from "@/features/home/components/category-card";
import HeroShowcase from "@/features/home/components/hero-showcase";
import SectionHeading from "@/features/home/components/section-heading";
import ValueCard from "@/features/home/components/value-card";
import {
  brandValues,
  categories,
  featuredProducts as staticFeaturedProducts,
} from "@/features/home/data/catalog";
import ProductCard from "@/features/products/components/product-card";
import { getFeaturedProducts, type FeaturedProduct } from "@/features/home/services/home-service";

export default function Home() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState<FeaturedProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Cargar productos destacados desde la API
  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        setLoadingProducts(true);
        const apiProducts = await getFeaturedProducts();
        
        // Si hay productos en la API, usarlos. Si no, usar los estáticos.
        if (apiProducts.length > 0) {
          setFeaturedProducts(apiProducts);
        } else {
          setFeaturedProducts(staticFeaturedProducts);
        }
      } catch (error) {
        console.error("Error cargando productos destacados:", error);
        // En caso de error, usar productos estáticos
        setFeaturedProducts(staticFeaturedProducts);
      } finally {
        setLoadingProducts(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  return (
    <>
      <main>
        <section className="hero-shell">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
            <div className="space-y-8">
              <span className="inline-flex rounded-full border border-[--border-soft] bg-white/75 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-[--muted]">
                Colección 2026
              </span>

              <div className="space-y-6">
                <h1 className="max-w-3xl font-display text-6xl leading-[0.92] text-[--foreground] md:text-7xl lg:text-8xl">
                  Creamos cerámica. Tú defines el estilo.
                </h1>
                <p className="max-w-xl text-base leading-8 text-[--muted] md:text-lg">
                  Diseñamos vasijas, figuras y piezas decorativas de sobremesa con una
                  estética limpia, tonos tierra y presencia artesanal.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href="#destacados"
                  className="inline-flex items-center justify-center rounded-full bg-[--foreground] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[--accent]"
                >
                  Ver productos destacados
                </a>
                <a
                  href="#colecciones"
                  className="inline-flex items-center justify-center rounded-full border border-[--border-strong] px-6 py-3.5 text-sm font-semibold text-[--foreground] transition hover:bg-white"
                >
                  Explorar colecciones
                </a>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.5rem] border border-[--border-soft] bg-white/80 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-[--muted]">
                    Piezas
                  </p>
                  <p className="mt-3 font-display text-4xl text-[--foreground]">40+</p>
                </div>
                <div className="rounded-[1.5rem] border border-[--border-soft] bg-white/80 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-[--muted]">
                    Acabado
                  </p>
                  <p className="mt-3 font-display text-4xl text-[--foreground]">Brillante </p>
                </div>
                <div className="rounded-[1.5rem] border border-[--border-soft] bg-white/80 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-[--muted]">
                    Hecho
                  </p>
                  <p className="mt-3 font-display text-4xl text-[--foreground]">A mano</p>
                </div>
              </div>
            </div>

            <HeroShowcase />
          </div>
        </section>

        <section id="colecciones" className="mx-auto max-w-7xl px-5 py-16 md:px-8 lg:py-24">
          <div className="space-y-10">
            <SectionHeading
              eyebrow="Colecciones"
              title="Una tienda pensada como galería doméstica."
              description="Explora nuestras categorías y encuentra la pieza de cerámica perfecta para ti."
            />

            <div className="grid gap-6 md:grid-cols-3">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>

        <section id="destacados" className="mx-auto max-w-7xl px-5 py-16 md:px-8 lg:py-24">
          <div className="space-y-10">
            <SectionHeading
              eyebrow="Destacados"
              title="Productos con lenguaje limpio y carácter artesanal."
              description="Descubre piezas únicas de cerámica, creadas para decorar y dar vida a tus espacios."
              fullWidth
            />

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  producto={product}
                  user={user}
                  onRequireAuth={() => setShowModal(true)}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="proceso" className="mx-auto max-w-7xl px-5 py-16 md:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[2.5rem] border border-[--border-soft] bg-[--surface-strong] p-8 shadow-[0_20px_60px_rgba(82,53,38,0.08)]">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[--accent]">
                Proceso
              </p>
              <h2 className="mt-5 max-w-lg font-display text-5xl leading-tight text-[--foreground]">
                Del barro al objeto decorativo sin exceso visual.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-[--muted]">
                De la idea a la pieza final, cada etapa está cuidada para lograr un resultado único y hecho a mano.
              </p>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.75rem] bg-white/75 p-5">
                  <p className="font-display text-3xl text-[--foreground]">01</p>
                  <p className="mt-2 text-sm leading-6 text-[--muted]">
                    Damos forma a cada pieza desde cero, cuidando cada detalle en el modelado.
                  </p>
                </div>
                <div className="rounded-[1.75rem] bg-white/75 p-5">
                  <p className="font-display text-3xl text-[--foreground]">02</p>
                  <p className="mt-2 text-sm leading-6 text-[--muted]">
                    Aplicamos color y acabados que resaltan el carácter artesanal de cada pieza.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-5">
              {brandValues.map((value) => (
                <ValueCard key={value.id} value={value} />
              ))}
            </div>
          </div>
        </section>
      </main>

      {showModal && (
        <AuthModal
          onClose={() => setShowModal(false)}
          onLogin={(loggedUser) => setUser(loggedUser)}
        />
      )}
    </>
  );
}
