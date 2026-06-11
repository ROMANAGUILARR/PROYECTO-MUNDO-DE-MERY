"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import {
  confirmPasswordReset,
  requestPasswordReset,
  verifyPasswordResetCode,
} from "@/features/auth/services/auth-service";

type Props = {
  onBackToLogin: () => void;
};

type Step = "email" | "code" | "password" | "done";

const resetSteps = [
  {
    id: "email",
    label: "Correo",
    description: "Enviar codigo",
  },
  {
    id: "code",
    label: "Codigo",
    description: "Validar acceso",
  },
  {
    id: "password",
    label: "Clave",
    description: "Nueva contrasena",
  },
] as const;

export default function PasswordResetForm({ onBackToLogin }: Props) {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const showError = (message: string) => {
    toast.error(message);
  };

  const handleRequestCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await requestPasswordReset({ email });
      toast.success("Te enviamos un codigo de 6 digitos");
      setStep("code");
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : "No se pudo enviar el codigo");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await verifyPasswordResetCode({ email, code });
      toast.success("Codigo validado");
      setStep("password");
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : "No se pudo validar el codigo");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      showError("La nueva contrasena debe tener al menos 6 caracteres");
      return;
    }

    if (newPassword !== confirmPassword) {
      showError("Las contrasenas no coinciden");
      return;
    }

    setLoading(true);

    try {
      await confirmPasswordReset({ email, code, newPassword });
      toast.success("Contrasena actualizada");
      setStep("done");
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : "No se pudo cambiar la contrasena");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setLoading(true);

    try {
      await requestPasswordReset({ email });
      setCode("");
      toast.success("Codigo reenviado");
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : "No se pudo reenviar el codigo");
    } finally {
      setLoading(false);
    }
  };

  const activeStepIndex = step === "email" ? 0 : step === "code" ? 1 : 2;

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-[rgba(78,54,39,0.14)] bg-white p-3 shadow-[0_14px_36px_rgba(72,49,35,0.08)]">
        <div className="grid grid-cols-3 gap-2">
          {resetSteps.map((resetStep, index) => {
            const isCurrent = index === activeStepIndex && step !== "done";
            const isDone = index < activeStepIndex || step === "done";

            return (
              <div
                key={resetStep.id}
                className={`rounded-2xl border px-2 py-3 text-center transition ${
                  isCurrent
                    ? "border-[--accent] bg-[#fffaf7] shadow-[0_0_0_3px_rgba(165,111,83,0.14)]"
                    : isDone
                      ? "border-[rgba(67,37,22,0.28)] bg-[--foreground]"
                      : "border-[rgba(78,54,39,0.12)] bg-[#f4eee8]"
                }`}
              >
                <div
                  className={`mx-auto mb-2 flex size-7 items-center justify-center rounded-full border text-xs font-bold ${
                    isCurrent
                      ? "border-[--accent] bg-[--accent] text-black"
                      : isDone
                        ? "border-white bg-white text-[--foreground]"
                        : "border-[rgba(78,54,39,0.18)] bg-white text-[--muted]"
                  }`}
                >
                  {isDone ? "✓" : index + 1}
                </div>
                <p
                  className={`text-xs font-bold ${
                    isDone ? "text-black" : "text-[--foreground]"
                  }`}
                >
                  {resetStep.label}
                </p>
                <p
                  className={`mt-1 text-[11px] leading-4 ${
                    isDone ? "text-black/75" : "text-[--muted]"
                  }`}
                >
                  {resetStep.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {step === "email" && (
        <form
          onSubmit={handleRequestCode}
          className="grid gap-3 rounded-2xl border border-[rgba(78,54,39,0.14)] bg-white p-4"
        >
          <div>
            <p className="text-sm font-semibold text-[--foreground]">Primero confirma tu correo</p>
            <p className="mt-1 text-sm leading-6 text-[--muted]">
              Ingresa el correo de tu cuenta local. Si tu acceso fue creado con Google, usa el boton de Google para entrar.
            </p>
          </div>
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
          <button
            type="submit"
            className="cursor-pointer rounded-full border border-[rgba(67,37,22,0.35)] bg-[--foreground] p-3 font-semibold text-black shadow-[0_14px_28px_rgba(67,37,22,0.18)] transition hover:bg-[--accent-strong] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar codigo"}
          </button>
        </form>
      )}

      {step === "code" && (
        <form
          onSubmit={handleVerifyCode}
          className="grid gap-3 rounded-2xl border border-[rgba(78,54,39,0.14)] bg-white p-4"
        >
          <div>
            <p className="text-sm font-semibold text-[--foreground]">Ahora escribe el codigo</p>
            <p className="mt-1 text-sm leading-6 text-[--muted]">
              Enviamos un codigo de 6 digitos a <span className="font-semibold text-[--foreground]">{email}</span>.
            </p>
          </div>
          <label className="grid gap-1 text-sm font-semibold text-[--foreground]">
            Codigo de verificacion
            <input
              inputMode="numeric"
              placeholder="000000"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              className="rounded-2xl border border-[rgba(78,54,39,0.14)] bg-[#fffaf7] px-4 py-3 text-center text-2xl font-bold text-[--foreground] outline-none transition placeholder:text-[#8b7667] focus:border-[--accent] focus:bg-white focus:shadow-[0_0_0_3px_rgba(165,111,83,0.14)]"
              required
            />
          </label>
          <button
            type="submit"
            className="cursor-pointer rounded-full border border-[rgba(67,37,22,0.35)] bg-[--foreground] p-3 font-semibold text-black shadow-[0_14px_28px_rgba(67,37,22,0.18)] transition hover:bg-[--accent-strong] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={loading || code.length !== 6}
          >
            {loading ? "Validando..." : "Validar codigo"}
          </button>
          <button
            type="button"
            onClick={handleResendCode}
            className="rounded-full border border-[rgba(78,54,39,0.14)] px-4 py-2 text-sm font-semibold text-[--muted] transition hover:border-[--accent] hover:text-[--foreground] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={loading}
          >
            Reenviar codigo
          </button>
        </form>
      )}

      {step === "password" && (
        <form
          onSubmit={handleConfirmPassword}
          className="grid gap-3 rounded-2xl border border-[rgba(78,54,39,0.14)] bg-white p-4"
        >
          <div>
            <p className="text-sm font-semibold text-[--foreground]">Por ultimo, crea tu nueva clave</p>
            <p className="mt-1 text-sm leading-6 text-[--muted]">
              Usa al menos 6 caracteres para proteger tu cuenta.
            </p>
          </div>
          <label className="grid gap-1 text-sm font-semibold text-[--foreground]">
            Nueva contrasena
            <input
              type="password"
              placeholder="Nueva contrasena"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="rounded-2xl border border-[rgba(78,54,39,0.14)] bg-[#fffaf7] px-4 py-3 font-normal text-[--foreground] outline-none transition placeholder:text-[#8b7667] focus:border-[--accent] focus:bg-white focus:shadow-[0_0_0_3px_rgba(165,111,83,0.14)]"
              required
            />
          </label>
          <label className="grid gap-1 text-sm font-semibold text-[--foreground]">
            Confirmar contrasena
            <input
              type="password"
              placeholder="Repite la nueva contrasena"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="rounded-2xl border border-[rgba(78,54,39,0.14)] bg-[#fffaf7] px-4 py-3 font-normal text-[--foreground] outline-none transition placeholder:text-[#8b7667] focus:border-[--accent] focus:bg-white focus:shadow-[0_0_0_3px_rgba(165,111,83,0.14)]"
              required
            />
          </label>
          <button
            type="submit"
            className="cursor-pointer rounded-full border border-[rgba(67,37,22,0.35)] bg-[--foreground] p-3 font-semibold text-black shadow-[0_14px_28px_rgba(67,37,22,0.18)] transition hover:bg-[--accent-strong] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Cambiar contrasena"}
          </button>
        </form>
      )}

      {step === "done" && (
        <div className="grid gap-4 rounded-2xl border border-[rgba(78,54,39,0.14)] bg-white p-4 shadow-[0_14px_36px_rgba(72,49,35,0.08)]">
          <div className="rounded-2xl border border-[rgba(67,37,22,0.18)] bg-[#fffaf7] p-4">
            <p className="text-sm font-semibold text-[--foreground]">Contrasena actualizada</p>
            <p className="mt-1 text-sm leading-6 text-[--muted]">
              Ya puedes iniciar sesion con tu correo y la nueva contrasena.
            </p>
          </div>
          <button
            type="button"
            onClick={onBackToLogin}
            className="cursor-pointer rounded-full border border-[rgba(67,37,22,0.35)] bg-[--foreground] p-3 font-semibold text-black shadow-[0_14px_28px_rgba(67,37,22,0.18)] transition hover:bg-[--accent-strong]"
          >
            Ir a iniciar sesion
          </button>
        </div>
      )}

      {step !== "done" && (
        <button
          type="button"
          onClick={onBackToLogin}
          className="rounded-full border border-transparent px-4 py-2 text-sm font-semibold text-[--muted] transition hover:border-[rgba(78,54,39,0.14)] hover:text-[--foreground]"
        >
          Volver al inicio de sesion
        </button>
      )}
    </div>
  );
}
