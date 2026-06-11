"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { loginWithEmail } from "@/features/auth/services/auth-service";
import { notifyAuthChanged } from "@/features/auth/hooks/useAuth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Completa tu correo y contrasena.");
      return;
    }

    try {
      setLoading(true);
      const data = await loginWithEmail({ email, password });

      if (data.role !== "ADMIN") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        throw new Error("Estas credenciales no tienen permisos de administrador.");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({ name: data.name, role: data.role }));
      notifyAuthChanged();
      toast.success(`Bienvenido ${data.name}`);
      router.replace("/admin/dashboard");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error al iniciar sesion";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-6 py-10">
        <section className="grid w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl md:grid-cols-[1fr_420px]">
          <div className="hidden bg-slate-900 p-10 text-white md:flex md:flex-col md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-200">
                Administracion
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight">
                Panel de gestion de productos
              </h1>
              <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
                Acceso reservado para usuarios administradores. Inicia sesion con tu correo y
                contrasena para gestionar el catalogo.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
              Sin acceso por Google en esta vista.
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
                Admin
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">Iniciar sesion</h2>
              <p className="mt-2 text-sm text-slate-500">
                Usa las credenciales registradas manualmente.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4">
              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Correo electronico
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="admin@correo.com"
                  autoComplete="email"
                  className="rounded-lg border border-slate-300 bg-white px-4 py-3 font-normal text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </label>

              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Contrasena
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Ingresa tu contrasena"
                  autoComplete="current-password"
                  className="rounded-lg border border-slate-300 bg-white px-4 py-3 font-normal text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </label>

              {error && (
                <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Validando credenciales..." : "Entrar al panel"}
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
