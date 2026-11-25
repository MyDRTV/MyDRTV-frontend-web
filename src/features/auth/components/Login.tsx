"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/features/auth/services/login";

export default function Login() {
  const [state, formAction, isPending] = useActionState<LoginState, FormData>(
    login,
    {},
  );

  return (
    <section>
      <form action={formAction} className="flex flex-col gap-10">
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        {state.error && <p role="alert">{state.error}</p>}
        <button type="submit" disabled={isPending}>
          {isPending ? "Logger ind..." : "Login"}
        </button>
      </form>
    </section>
  );
}
