"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useCart } from "@/features/cart/cart-context";
import { getProductById } from "@/features/products/services/product-service";
import type { ProductDetail } from "@/types/product";

interface ProductDisplayProps {
  productId: number;
}

// Orden específico de tamaños
const SIZE_ORDER = ["Pulga", "Dije", "Mini", "Small", "Super Small"];

// Función para ordenar tamaños según el orden definido
const sortSizes = (sizes: ProductDetail["sizes"]) => {
  return [...sizes].sort((a, b) => {
    const indexA = SIZE_ORDER.indexOf(a.name);
    const indexB = SIZE_ORDER.indexOf(b.name);
    // Si el tamaño no está en la lista, lo pone al final
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });
};

export default function ProductDisplay({ productId }: ProductDisplayProps) {
  const { addItem } = useCart();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cantidad, setCantidad] = useState(1);
  const [selectedSizeId, setSelectedSizeId] = useState<number | null>(null);

  useEffect(() => {
    let ignore = false;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        setProduct(null);
        const data = await getProductById(productId);

if (!ignore) {
          setProduct(data);
          // Ordenar tamaños y seleccionar el primero según el orden definido
          const sortedSizes = sortSizes(data.sizes);
          setSelectedSizeId(sortedSizes[0]?.id ?? null);
          setCantidad(1);
        }
      } catch (err) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : "Error al cargar producto");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      ignore = true;
    };
  }, [productId]);

  const isChangingProduct = product !== null && product.id !== productId;

  if (loading || isChangingProduct) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 lg:py-14">
        <div className="rounded-[2rem] border border-[--border-soft] bg-[--surface] p-4 shadow-[0_24px_70px_rgba(77,50,36,0.1)] md:p-6">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="image-card overflow-hidden rounded-[1.6rem]">
              <div className="aspect-square w-full animate-pulse bg-white/35" />
            </div>
            <div className="rounded-[1.6rem] border border-[--border-soft] bg-white/72 p-5 md:p-7">
              <div className="h-5 w-36 animate-pulse rounded-full bg-[--surface-strong]" />
              <div className="mt-6 h-14 w-4/5 animate-pulse rounded-2xl bg-[--surface-strong]" />
              <div className="mt-4 h-9 w-32 animate-pulse rounded-2xl bg-[--surface-strong]" />
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="h-20 animate-pulse rounded-2xl bg-[--surface-strong]" />
                <div className="h-20 animate-pulse rounded-2xl bg-[--surface-strong]" />
              </div>
              <div className="mt-8 h-14 animate-pulse rounded-full bg-[--surface-strong]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-12">
        <div className="rounded-[2rem] border border-red-100 bg-red-50 p-8 text-center text-red-600">
          {error || "Producto no disponible"}
        </div>
      </div>
    );
  }

  const aumentar = () => setCantidad((prev) => (prev < product.stock ? prev + 1 : prev));
  const disminuir = () => setCantidad((prev) => (prev > 1 ? prev - 1 : 1));
// Ordenar tamaños según el orden definido
  const sortedSizes = sortSizes(product.sizes);
  const selectedSize =
    sortedSizes.find((size) => size.id === selectedSizeId) ?? sortedSizes[0];
  // Usar el precio del tamaño seleccionado si está disponible, sino el precio base
  const currentPrice = selectedSize?.price ?? product.price;
  const formattedPrice = `S/${Number(currentPrice).toFixed(2)}`;
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Selecciona un tamaño");
      return;
    }

    addItem({
      productId: product.id,
      name: product.name,
      price: currentPrice,
      imageUrl: product.imageUrl,
      sizeId: selectedSize.id,
      sizeName: selectedSize.name,
      sizeDimension: selectedSize.dimension,
      quantity: cantidad,
    });
    toast.success("Producto agregado al carrito");
  };

  return (
    <>
      <main className="mx-auto max-w-7xl px-5 py-10 md:px-8 lg:py-14">
        <section className="rounded-[2rem] border border-[--border-soft] bg-[--surface] p-4 shadow-[0_24px_70px_rgba(77,50,36,0.1)] md:p-6">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="image-card overflow-hidden rounded-[1.6rem]">
              <div className="relative aspect-square w-full">
                <Image
                  src={product.imageUrl ? decodeURIComponent(product.imageUrl) : "/categorias/default.webp"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  priority
                />
              </div>
            </div>

            <aside className="flex flex-col justify-center rounded-[1.6rem] border border-[--border-soft] bg-white/72 p-5 md:p-7">
              <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-[--border-soft] bg-[#fffaf7] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[--muted]">
                    {product.categoryName}
                  </span>
                  {product.stock > 0 ? (
                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                      Stock disponible ({product.stock})
                    </span>
                  ) : (
                    <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
                      Agotado
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  <h1 className="font-display text-5xl leading-tight text-[--foreground] md:text-6xl">
                    {product.name}
                  </h1>
                  <p className="text-3xl font-semibold text-[--foreground]">{formattedPrice}</p>
                </div>

                <div className="space-y-3">
                  <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-[--muted]">
                    Tamaños
                  </h2>
<div className="grid gap-3 sm:grid-cols-2">
                    {sortedSizes.map((size) => {
                      const isSelected = selectedSize?.id === size.id;

                      return (
                        <button
                          key={size.id}
                          type="button"
                          onClick={() => setSelectedSizeId(size.id)}
                          className={`cursor-pointer rounded-2xl border p-4 text-left transition ${
                            isSelected
                              ? "border-[--accent] bg-[#fff4ec] shadow-[0_12px_24px_rgba(91,57,37,0.12)]"
                              : "border-[--border-soft] bg-white hover:border-[--accent]"
                          }`}
                        >
                          <span className="block text-sm font-semibold text-[--foreground]">
                            {size.name}
                          </span>
                          <span className="mt-1 block text-sm text-[--muted]">
                            {size.dimension}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-wrap items-end justify-between gap-4 border-y border-[--border-soft] py-5">
                  <div className="space-y-2">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-[--muted]">
                      Cantidad
                    </h2>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={disminuir}
                        disabled={cantidad <= 1}
                        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[--border-soft] bg-white text-lg font-semibold transition hover:border-[--accent] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={cantidad}
                        onChange={(event) => {
                          const value = parseInt(event.target.value);

                          if (!isNaN(value) && value > 0 && value <= product.stock) {
                            setCantidad(value);
                          }
                        }}
                        min="1"
                        max={product.stock}
                        className="h-11 w-20 rounded-2xl border border-[--border-soft] bg-[#fffaf7] text-center font-semibold outline-none focus:border-[--accent]"
                      />
                      <button
                        type="button"
                        onClick={aumentar}
                        disabled={cantidad >= product.stock}
                        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[--border-soft] bg-white text-lg font-semibold transition hover:border-[--accent] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {selectedSize && (
                    <p className="text-sm text-[--muted]">
                      Selección:{" "}
                      <span className="font-semibold text-[--foreground]">
                        {selectedSize.name}, {selectedSize.dimension}
                      </span>
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0 || !selectedSize}
                  className="button-primary inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-[#e3b792] px-6 py-4 text-sm font-semibold text-black transition hover:bg-[#d9a77d] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {product.stock === 0 ? "Agotado" : "Agregar al carrito"}
                </button>
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] border border-[--border-soft] bg-white/72 p-6 shadow-[0_18px_45px_rgba(77,50,36,0.06)] md:p-8">
          <div className="max-w-4xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[--muted]">
              Descripción
            </span>
            <h2 className="font-display text-4xl text-[--foreground]">
              Detalles de la pieza
            </h2>
            <p className="text-base leading-8 text-[--muted] md:text-lg">
              {product.description}
            </p>
          </div>
        </section>

        {product.relatedProducts.length > 0 && (
          <section className="mt-10 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[--muted]">
                Recomendados
              </span>
              <h2 className="font-display text-4xl text-[--foreground]">
                También te puede interesar
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {product.relatedProducts.map((related) => (
                <Link
                  key={related.id}
                  href={`/producto/${related.id}`}
                  className="group rounded-[1.5rem] border border-[--border-soft] bg-[--surface] p-3 shadow-[0_18px_45px_rgba(77,50,36,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(77,50,36,0.14)]"
                >
                  <div className="image-card overflow-hidden rounded-[1.2rem]">
                    <div className="relative aspect-square w-full">
                      <Image
                        src={related.imageUrl ? decodeURIComponent(related.imageUrl) : "/categorias/default.webp"} 
                        alt={related.name}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                  </div>
                  <div className="px-2 pt-4">
                    <h3 className="font-display text-2xl text-[--foreground]">
                      {related.name}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-[--accent]">
                      S/{Number(related.price).toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
