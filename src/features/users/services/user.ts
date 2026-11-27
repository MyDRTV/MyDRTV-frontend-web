import { cookies } from "next/headers";
import { apiFetch } from "@/lib/api";
import type { User } from "@/features/users/types/user";

// Henter den indloggede bruger. user_pk gemmes i en cookie ved login.
export async function getCurrentUser(): Promise<User> {
  const userPk = (await cookies()).get("user_pk")?.value;
  const response = await apiFetch(`/users/${userPk}`);
  if (!response.ok)
    throw new Error(`Kunne ikke hente bruger (status ${response.status})`);
  return response.json();
}
