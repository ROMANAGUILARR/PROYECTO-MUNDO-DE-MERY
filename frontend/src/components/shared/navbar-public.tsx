"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AuthModal from "@/features/auth/components/auth-modal";
import { useCart } from "@/features/cart/cart-context";
import { AUTH_CHANGED_EVENT, notifyAuthChanged } from "@/features/auth/hooks/useAuth";
import type { AuthUser } from "@/features/auth/types";

export default function Navbar() {
  const {
    items,
    totalItems,
    totalAmount,
    lastAddedAt,
    increaseItem,
    decreaseItem,
    removeItem,
  } = useCart();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const syncUserFromStorage = () => {
      const storedUser = window.localStorage.getItem("user");

      if (!storedUser) {
        setUser(null);
        return;
      }

      try {
        setUser(JSON.parse(storedUser) as AuthUser);
      } catch {
        window.localStorage.removeItem("user");
        window.localStorage.removeItem("token");
        setUser(null);
      }
    };

    syncUserFromStorage();
    window.addEventListener("storage", syncUserFromStorage);
    window.addEventListener(AUTH_CHANGED_EVENT, syncUserFromStorage);

    return () => {
      window.removeEventListener("storage", syncUserFromStorage);
      window.removeEventListener(AUTH_CHANGED_EVENT, syncUserFromStorage);
    };
  }, []);

  const handleLogin = (userData: AuthUser) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    notifyAuthChanged();
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    notifyAuthChanged();
    setShowDropdown(false);
  };

  const formattedTotal = `S/${totalAmount.toFixed(2)}`;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[rgba(120,87,66,0.1)] bg-[rgba(251,246,241,0.82)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 md:px-8">
          <Link href="/" className="space-y-1">
            <p className="font-display text-3xl leading-none text-[--foreground]">
              El mundo de Mery
            </p>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[--muted]">
              Cerámica decorativa
            </p>
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-[--muted] md:flex">
            <Link href="/#colecciones" className="transition hover:text-[--foreground]">
              Colecciones
            </Link>
            <Link href="/#destacados" className="transition hover:text-[--foreground]">
              Destacados
            </Link>
            <Link href="/#proceso" className="transition hover:text-[--foreground]">
              Proceso
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <button
              key={lastAddedAt || "cart-button"}
              type="button"
              onClick={() => setShowCart(true)}
              className={`relative inline-flex cursor-pointer items-center gap-2 rounded-full border border-[--border-soft] bg-white/60 px-4 py-2 text-sm font-semibold text-[--foreground] hover:border-[--accent] ${
                lastAddedAt ? "cart-bump" : ""
              }`}
              aria-label="Abrir carrito"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              <span className="hidden md:inline">Carrito</span>
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[--accent-strong] px-1 text-[11px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </button>

            {!user ? (
              <button
                onClick={() => setShowModal(true)}
                className="button-primary cursor-pointer rounded-full px-5 py-2.5 text-sm font-semibold text-black"
              >
                Iniciar sesión
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="cursor-pointer rounded-full border border-[--border-soft] bg-white px-4 py-2 text-sm font-semibold text-[--foreground]"
                >
                  {user.name}
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-3 min-w-44 rounded-2xl border border-[--border-soft] bg-white p-2 shadow-[0_20px_50px_rgba(51,31,21,0.14)]">
                    <button
                      onClick={handleLogout}
                      className="w-full cursor-pointer rounded-xl px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {showCart && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            className="absolute inset-0 cursor-default bg-[rgba(28,18,12,0.38)]"
            aria-label="Cerrar carrito"
            onClick={() => setShowCart(false)}
          />
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-[--border-soft] bg-[#fffaf7] shadow-[0_30px_90px_rgba(34,21,14,0.28)]">
            <div className="flex items-start justify-between gap-4 border-b border-[--border-soft] p-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[--muted]">
                  Carrito
                </p>
                <h2 className="mt-1 font-display text-4xl text-[--foreground]">
                  Tu selección
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[--border-soft] bg-white text-lg text-[--foreground] hover:border-[--accent]"
                aria-label="Cerrar carrito"
              >
                ×
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 items-center justify-center p-8 text-center">
                <div className="space-y-3">
                  <p className="font-display text-3xl text-[--foreground]">
                    Tu carrito está vacío
                  </p>
                  <p className="text-sm leading-6 text-[--muted]">
                    Agrega una pieza con su tamaño para verla aquí.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-4 overflow-y-auto p-5">
                  {items.map((item) => (
                    <article
                      key={`${item.productId}-${item.sizeId}`}
                      className="grid grid-cols-[84px_1fr] gap-4 rounded-2xl border border-[--border-soft] bg-white p-3"
                    >
                      <div className="image-card overflow-hidden rounded-xl">
                        <div className="relative aspect-square w-full">
                          <Image
                            src={item.imageUrl ? decodeURIComponent(item.imageUrl) : "/categorias/default.webp"}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="84px"
                          />
                        </div>
                      </div>

                      <div className="min-w-0 space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-display text-2xl leading-none text-[--foreground]">
                              {item.name}
                            </h3>
                            <p className="mt-1 text-xs text-[--muted]">
                              {item.sizeName}, {item.sizeDimension}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.productId, item.sizeId)}
                            className="cursor-pointer rounded-full px-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            Quitar
                          </button>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-semibold text-[--accent]">
                            S/{(item.price * item.quantity).toFixed(2)}
                          </p>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => decreaseItem(item.productId, item.sizeId)}
                              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[--border-soft] bg-[#fffaf7] font-semibold"
                            >
                              -
                            </button>
                            <span className="w-6 text-center text-sm font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => increaseItem(item.productId, item.sizeId)}
                              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[--border-soft] bg-[#fffaf7] font-semibold"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="border-t border-[--border-soft] bg-white/72 p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm text-[--muted]">Total</span>
                    <span className="text-xl font-bold text-[--foreground]">{formattedTotal}</span>
                  </div>
                  <Link href="/cart" className="button-primary inline-flex w-full items-center justify-center rounded-full bg-[#e3b792] px-6 py-4 text-sm font-semibold text-black hover:bg-[#d9a77d]">Pagar carrito</Link>
                </div>
              </>
            )}
          </aside>
        </div>
      )}

      {showModal && <AuthModal onClose={() => setShowModal(false)} onLogin={handleLogin} />}
    </>
  );
}
