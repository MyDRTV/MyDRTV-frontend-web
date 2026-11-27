import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Backendens adresse. Docker sætter den til http://backend:3000.
export const API_URL = process.env.API_URL || "http://localhost:3000";

// fetch med JWT fra cookien. Ved 401 sendes brugeren til logout.
export async function apiFetch(path: string, init: RequestInit = {}) {
  const token = (await cookies()).get("access_token")?.value;

  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { ...init.headers, Authorization: `Bearer ${token}` },
  });

  if (response.status === 401) {
    redirect("/auth/logout");
  }

  return response;
}
