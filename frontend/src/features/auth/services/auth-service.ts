import { apiRequest } from "@/lib/api-client";
import type { AuthUser } from "@/features/auth/types";

export type RegisterPayload = {
  dni: string;
  firstName: string;
  lastName: string;
  motherLastName: string;
  birthDate: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthLoginResponse = AuthUser & {
  token: string;
};

export type PasswordResetRequestPayload = {
  email: string;
};

export type PasswordResetVerifyPayload = {
  email: string;
  code: string;
};

export type PasswordResetConfirmPayload = PasswordResetVerifyPayload & {
  newPassword: string;
};

export function registerUser(payload: RegisterPayload) {
  return apiRequest<string>("/api/auth/register", {
    method: "POST",
    body: payload,
  });
}

export function loginWithEmail(payload: LoginPayload) {
  return apiRequest<AuthLoginResponse>("/api/auth/login", {
    method: "POST",
    body: payload,
  });
}

export function loginWithGoogle(credential: string) {
  return apiRequest<AuthLoginResponse>("/api/auth/google", {
    method: "POST",
    body: { credential },
  });
}

export function requestPasswordReset(payload: PasswordResetRequestPayload) {
  return apiRequest<{ message: string }>("/api/auth/password-reset/request", {
    method: "POST",
    body: payload,
  });
}

export function verifyPasswordResetCode(payload: PasswordResetVerifyPayload) {
  return apiRequest<{ message: string }>("/api/auth/password-reset/verify", {
    method: "POST",
    body: payload,
  });
}

export function confirmPasswordReset(payload: PasswordResetConfirmPayload) {
  return apiRequest<{ message: string }>("/api/auth/password-reset/confirm", {
    method: "POST",
    body: payload,
  });
}
