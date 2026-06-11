"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { registerUser } from "@/features/auth/services/auth-service";
import { findPersonByDni } from "@/features/auth/services/persona-service";

type Props = {
  onRegister: () => void;
};

export default function RegisterForm({ onRegister }: Props) {
  const [dni, setDni] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [motherLastName, setMotherLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingDni, setLoadingDni] = useState(false);

  const isValidDni = (value: string) => /^\d{8}$/.test(value);

  const resetPersonData = () => {
    setFirstName("");
    setLastName("");
    setMotherLastName("");
    setBirthDate("");
  };

  const handleSearchDni = async () => {
    if (!isValidDni(dni)) {
      const message = "El DNI debe tener 8 dígitos";
      setError(message);
      toast.error(message);
      resetPersonData();
      return;
    }

    setLoadingDni(true);
    setError("");

    try {
      const data = await findPersonByDni(dni);
      setFirstName(data.firstName ?? data.nombres ?? "");
      setLastName(data.lastName ?? data.apellidoPaterno ?? "");
      setMotherLastName(data.motherLastName ?? data.apellidoMaterno ?? "");
      setBirthDate(data.birthDate ?? data.fechaNacimiento ?? "");
      toast.success("Datos del DNI cargados");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error al consultar el DNI";
      setError(message);
      toast.error(message);
      resetPersonData();
    } finally {
      setLoadingDni(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await registerUser({
        dni,
        firstName,
        lastName,
        motherLastName,
        birthDate,
        email,
        password,
      });

      toast.success("¡Cuenta creada correctamente!");
      onRegister();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Error al registrar";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex gap-2">
        <input
          placeholder="DNI"
          value={dni}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "").slice(0, 8);
            setDni(value);
            resetPersonData();
          }}
          className="flex-1 rounded-2xl border border-[rgba(78,54,39,0.14)] bg-[#fffaf7] px-4 py-3 text-[--foreground] outline-none transition placeholder:text-[#8b7667] focus:border-[--accent] focus:bg-white"
          required
        />
        <button
          type="button"
          onClick={handleSearchDni}
          className="cursor-pointer rounded-2xl border border-[rgba(78,54,39,0.14)] bg-white px-4 py-3 text-sm font-semibold text-[--foreground] transition hover:border-[--accent] hover:text-[--accent]"
          disabled={loadingDni}
        >
          {loadingDni ? "Buscando..." : "Buscar"}
        </button>
      </div>
      <input
        placeholder="Nombres"
        value={firstName}
        readOnly
        className="rounded-2xl border border-[rgba(78,54,39,0.14)] bg-[#f4eee8] px-4 py-3 text-[--foreground] outline-none"
      />
      <input
        placeholder="Apellido paterno"
        value={lastName}
        readOnly
        className="rounded-2xl border border-[rgba(78,54,39,0.14)] bg-[#f4eee8] px-4 py-3 text-[--foreground] outline-none"
      />
      <input
        placeholder="Apellido materno"
        value={motherLastName}
        readOnly
        className="rounded-2xl border border-[rgba(78,54,39,0.14)] bg-[#f4eee8] px-4 py-3 text-[--foreground] outline-none"
      />
      <input
        placeholder="Fecha de nacimiento"
        value={birthDate}
        readOnly
        className="rounded-2xl border border-[rgba(78,54,39,0.14)] bg-[#f4eee8] px-4 py-3 text-[--foreground] outline-none"
      />
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="rounded-2xl border border-[rgba(78,54,39,0.14)] bg-[#fffaf7] px-4 py-3 text-[--foreground] outline-none transition placeholder:text-[#8b7667] focus:border-[--accent] focus:bg-white"
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        autoComplete="off"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="rounded-2xl border border-[rgba(78,54,39,0.14)] bg-[#fffaf7] px-4 py-3 text-[--foreground] outline-none transition placeholder:text-[#8b7667] focus:border-[--accent] focus:bg-white"
        required
      />
      <button
        type="submit"
        className="mt-2 cursor-pointer rounded-full border border-[rgba(67,37,22,0.35)] bg-[--foreground] p-3 font-semibold text-black-500 shadow-[0_14px_28px_rgba(67,37,22,0.18)] transition hover:bg-[--accent-strong] disabled:cursor-not-allowed disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Cargando..." : "Crear cuenta"}
      </button>
      {error && (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}
    </form>
  );
}
