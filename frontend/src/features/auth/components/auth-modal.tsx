"use client";

import { useState } from "react";
import LoginForm from "./login-form";
import PasswordResetForm from "./password-reset-form";
import RegisterForm from "./register-form";
import type { AuthModalProps, AuthUser } from "@/features/auth/types";

export default function AuthModal({ onClose, onLogin }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register" | "forgot">("login");

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleLoginSuccess = (user: AuthUser) => {
    onLogin(user);
    onClose();
  };

  const handleRegisterSuccess = () => {
    setMode("login");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[rgba(22,14,9,0.62)] px-4 py-6 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div className="relative w-full max-w-md rounded-[1.5rem] border border-[rgba(72,49,35,0.16)] bg-[#fffdfb] p-6 shadow-[0_30px_80px_rgba(50,29,18,0.24)] sm:p-7">
        <div className="mb-6 space-y-4">
          <div className="flex overflow-hidden rounded-full border border-[rgba(72,49,35,0.14)] bg-[#f6efe8] p-1">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${
                mode === "login"
                  ? "bg-white text-[--foreground] shadow-[0_8px_20px_rgba(72,49,35,0.12)]"
                  : "text-[--muted] hover:text-[--foreground]"
              }`}
            >
              Iniciar sesión
            </button>
            <button
              type="button"
              onClick={() => setMode("register")}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${
                mode === "register"
                  ? "bg-white text-[--foreground] shadow-[0_8px_20px_rgba(72,49,35,0.12)]"
                  : "text-[--muted] hover:text-[--foreground]"
              }`}
            >
              Registrarse
            </button>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase text-[--accent]">
              El mundo de Mery
            </p>
            <h2 className="font-display text-4xl leading-none text-[--foreground] sm:text-5xl">
              {mode === "login"
                ? "Accede con tu cuenta"
                : mode === "register"
                  ? "Crea tu cuenta"
                  : "Recupera tu cuenta"}
            </h2>
            <p className="text-sm leading-6 text-[--muted]">
              {mode === "login"
                ? "Elige Google o tu correo y contraseña para entrar al sistema."
                : mode === "register"
                  ? "Si no tienes cuenta, regístrate con tu DNI, correo y contraseña."
                  : "Te enviaremos un codigo para cambiar la contrasena de tu cuenta local."}
            </p>
          </div>
        </div>

        {mode === "login" ? (
          <LoginForm onLogin={handleLoginSuccess} onForgotPassword={() => setMode("forgot")} />
        ) : mode === "register" ? (
          <RegisterForm onRegister={handleRegisterSuccess} />
        ) : (
          <PasswordResetForm onBackToLogin={() => setMode("login")} />
        )}
      </div>
    </div>
  );
}
