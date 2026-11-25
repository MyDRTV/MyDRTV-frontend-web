// "use server" gør funktionen til en Server Action:
// den kører på serveren, selvom den kaldes fra formularen i browseren.
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL = process.env.API_URL || "http://localhost:3000";

// Det funktionen sender tilbage til formularen: en fejlbesked eller ingenting.
export type LoginState = { error?: string };

// useActionState i Login.tsx kalder funktionen med to ting:
// den forrige state (bruges ikke her) og formularens felter (formData).
export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  // 1. Send email og password til backenden.
  //    formData.get("email") læser feltet med name="email".
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: formData.get("email"),
      password: formData.get("password"),
    }),
  });

  // 2. Backenden svarer 401, hvis email eller password er forkert.
  //    Andre koder (fx 502, når backenden er nede) er ikke brugerens fejl.
  if (response.status === 401) {
    return { error: "Forkert email eller adgangskode" };
  }
  if (!response.ok) {
    return { error: `Serveren svarer ikke (status ${response.status})` };
  }

  // 3. Svaret indeholder access_token (JWT) og user_role.
  const data = await response.json();

  // 4. Kun admins må logge ind på websitet.
  if (data.user_role !== "admin") {
    return { error: "Kun administratorer har adgang" };
  }

  // 5. Gem tokenet i en cookie, så serveren kan sende det med til backenden.
  //    httpOnly betyder, at JavaScript i browseren ikke kan læse cookien.
  const cookieStore = await cookies();
  cookieStore.set("access_token", data.access_token, { httpOnly: true });

  // 6. Send brugeren videre til filmsiden.
  redirect("/movies");
}
