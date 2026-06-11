import { apiRequest } from "@/lib/api-client";

export type DniPersonResponse = {
  firstName?: string;
  nombres?: string;
  lastName?: string;
  apellidoPaterno?: string;
  motherLastName?: string;
  apellidoMaterno?: string;
  birthDate?: string;
  fechaNacimiento?: string;
};

export function findPersonByDni(dni: string) {
  return apiRequest<DniPersonResponse>(`/api/personas/dni/${dni}`);
}
