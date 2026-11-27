"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { API_URL } from "@/lib/api";

export type LoginState = { error?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: formData.get("email"),
      password: formData.get("password"),
    }),
  });

  if (response.status === 401) return { error: "Forkert email eller adgangskode" };
  if (!response.ok) return { error: `Serveren svarer ikke (status ${response.status})` };

  const data = await response.json();

  // Kun admins må logge ind på websitet
  if (data.user_role !== "admin") return { error: "Kun administratorer har adgang" };

  // httpOnly: browserens JavaScript kan ikke læse tokenet
  const cookieStore = await cookies();
  cookieStore.set("access_token", data.access_token, { httpOnly: true });
  cookieStore.set("user_pk", data.user_pk, { httpOnly: true });

  redirect("/");
}
export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("user_pk");
  redirect("/auth");
}
