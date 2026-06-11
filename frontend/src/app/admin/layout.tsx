"use client";

import Link from "next/link";
import { FaHome, FaUsers, FaBoxOpen, FaChartBar } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isAdmin, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isAdminLogin = pathname === "/admin";

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (isAdminLogin && user && isAdmin) {
      router.replace("/admin/dashboard");
      return;
    }

    if (!isAdminLogin && (!user || !isAdmin)) {
      router.replace("/admin");
    }
  }, [user, isAdmin, isLoading, isAdminLogin, router]);

  if (isAdminLogin) {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500 font-medium">Verificando credenciales...</p>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Acceso denegado</h2>
          <p className="text-slate-600">No tienes permisos para acceder a esta seccion.</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { name: "Inicio", href: "/admin/dashboard", icon: FaHome },
    { name: "Usuarios", href: "/admin/users", icon: FaUsers },
    { name: "Productos", href: "/admin/productos", icon: FaBoxOpen },
    { name: "Reportes", href: "/admin/reportes", icon: FaChartBar },
  ];

  return (
    <div className="flex h-screen bg-[var(--surface)]">
      <aside className="w-64 bg-[var(--surface-strong)] border-r border-[var(--border-soft)] flex flex-col shadow-md">
        <div className="p-6 border-b border-[var(--border-soft)]">
          <h2 className="text-2xl font-bold text-[var(--foreground)]">Admin Panel</h2>
          <p className="text-sm text-[var(--muted)] mt-1">Hola, {user.name}</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-2 block px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-[var(--accent-strong)] text-[var(--foreground)] font-medium"
                    : "text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
                }`}
              >
                {(() => {
                  const Icon = item.icon;
                  return <Icon className="w-4 h-4" />;
                })()}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-[var(--border-soft)] space-y-2">
          <Link href="/" className="block text-sm text-[var(--muted)] hover:text-[var(--foreground)] font-medium">
            Volver a la tienda
          </Link>
          <button
            onClick={() => {
              logout();
              router.replace("/admin");
            }}
            className="block text-sm text-[var(--muted)] hover:text-red-600 font-medium"
          >
            Cerrar sesion
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
