const DEFAULT_API_URL = "http://localhost:8080";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL;

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

async function parseError(response: Response) {
  const fallback = `Error ${response.status}`;
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const data = await response.json().catch(() => null);
    return data?.error || data?.message || fallback;
  }

  const text = await response.text().catch(() => "");
  return text || fallback;
}

// Rutas que NO deben llevar token de autenticación
const PUBLIC_ROUTES = [
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/google',
  '/api/auth/password-reset',
  '/api/admin/reset'
];

export async function apiRequest<T>(path: string, options: RequestOptions = {}) {
  const headers = new Headers(options.headers);

  if (options.body !== undefined && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  // Solo agregar token si NO es una ruta pública
  if (typeof window !== "undefined") {
    const isPublicRoute = PUBLIC_ROUTES.some(route => path.startsWith(route));
    
    if (!isPublicRoute) {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  });

  // Manejar error 403 - Token inválido o expirado
  if (response.status === 403) {
    // Limpiar token inválido
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    throw new Error("No tienes permisos para acceder a este recurso. Por favor, inicia sesión nuevamente.");
  }

  // Manejar error 401 - No autorizado
  if (response.status === 401) {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    throw new Error("Sesión expirada. Por favor, inicia sesión nuevamente.");
  }

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return response.json() as Promise<T>;
  }

  return response.text() as Promise<T>;
}
