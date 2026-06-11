"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import toast from "react-hot-toast";
import { notifyAuthChanged } from "@/features/auth/hooks/useAuth";
import { loginWithEmail, loginWithGoogle } from "@/features/auth/services/auth-service";

type Props = {
  onLogin: (user: { name: string; role: string }) => void;
  onForgotPassword: () => void;
};

export default function LoginForm({ onLogin, onForgotPassword }: Props) {
  const [loading, setLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const buttonRef = useRef<HTMLDivElement | null>(null);

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (window.google) {
      setScriptLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!scriptLoaded || !clientId || !buttonRef.current || !window.google) {
      return;
    }

    buttonRef.current.innerHTML = "";

    if (!window.__googleIdentityInitialized) {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: async ({ credential }) => {
          setLoading(true);
          setError("");

          try {
            const data = await loginWithGoogle(credential);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify({ name: data.name, role: data.role }));
            notifyAuthChanged();
            toast.success(`¡Bienvenido ${data.name}!`);
            onLogin({ name: data.name, role: data.role });
          } catch (err: unknown) {
            const errorMsg = err instanceof Error ? err.message : "Error al iniciar con Google";
            setError(errorMsg);
            toast.error(errorMsg);
          } finally {
            setLoading(false);
          }
        },
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      window.__googleIdentityInitialized = true;
    }

    window.google.accounts.id.renderButton(buttonRef.current, {
      theme: "outline",
      size: "large",
      shape: "pill",
      text: "continue_with",
      width: 320,
      logo_alignment: "left",
    });
  }, [clientId, onLogin, scriptLoaded]);

  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !password) {
      setError("Completa tu correo y contraseña.");
      setLoading(false);
      return;
    }

    try {
      const data = await loginWithEmail({ email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({ name: data.name, role: data.role }));
      notifyAuthChanged();
      toast.success(`¡Bienvenido ${data.name}!`);
      onLogin({ name: data.name, role: data.role });
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Error al iniciar sesión";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
        onReady={() => setScriptLoaded(true)}
      />

      <div className="space-y-4">
        <div className="rounded-2xl border border-[rgba(78,54,39,0.14)] bg-[#fffaf7] p-4">
          <p className="text-sm font-semibold text-[--foreground]">Acceso rapido</p>
          <p className="mt-1 text-sm leading-6 text-[--muted]">
            Usa Google o entra con tu correo y contrasena.
          </p>
        </div>

        <div className="grid gap-4 rounded-2xl border border-[rgba(78,54,39,0.14)] bg-white p-4 shadow-[0_14px_36px_rgba(72,49,35,0.08)]">
          {clientId ? (
            <div className="flex flex-col items-center gap-3">
              <div ref={buttonRef} className="flex justify-center" />
              {loading && <p className="text-sm text-[--muted]">Validando cuenta de Google...</p>}
            </div>
          ) : (
            <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              Falta configurar NEXT_PUBLIC_GOOGLE_CLIENT_ID en el frontend.
            </p>
          )}

          <div className="relative py-2 text-center text-sm text-[--muted]">
            <div className="absolute left-0 top-1/2 h-px w-full bg-[rgba(78,54,39,0.14)]" />
            <span className="relative bg-white px-3">o utiliza tu correo</span>
          </div>

          <form onSubmit={handleEmailLogin} className="grid gap-3">
            <label className="grid gap-1 text-sm font-semibold text-[--foreground]">
              Correo electronico
              <input
                type="email"
                placeholder="tu-correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-2xl border border-[rgba(78,54,39,0.14)] bg-[#fffaf7] px-4 py-3 font-normal text-[--foreground] outline-none transition placeholder:text-[#8b7667] focus:border-[--accent] focus:bg-white focus:shadow-[0_0_0_3px_rgba(165,111,83,0.14)]"
                required
              />
            </label>
            <label className="grid gap-1 text-sm font-semibold text-[--foreground]">
              Contrasena
              <input
                type="password"
                placeholder="Ingresa tu contrasena"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-2xl border border-[rgba(78,54,39,0.14)] bg-[#fffaf7] px-4 py-3 font-normal text-[--foreground] outline-none transition placeholder:text-[#8b7667] focus:border-[--accent] focus:bg-white focus:shadow-[0_0_0_3px_rgba(165,111,83,0.14)]"
                required
              />
            </label>
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onForgotPassword}
                className="rounded-full border border-[rgba(78,54,39,0.14)] px-4 py-2 text-sm font-semibold text-[--muted] transition hover:border-[--accent] hover:text-[--foreground]"
              >
                Olvide mi contrasena
              </button>
            </div>
            <button
              type="submit"
              className="mt-1 cursor-pointer rounded-full border border-[rgba(67,37,22,0.35)] bg-[--foreground] p-3 font-semibold text-black-500 shadow-[0_14px_28px_rgba(67,37,22,0.18)] transition hover:bg-[--accent-strong] disabled:cursor-not-allowed disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Iniciando sesión..." : "Entrar con correo"}
            </button>
            {error && (
              <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
