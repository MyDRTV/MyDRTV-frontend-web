"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/features/auth/services/auth";
import Button from "@/components/Button";

// Samme feltstil som CreateMovie
const inputClass =
  "w-full rounded-lg border border-gray-400 px-4 py-3 focus:border-gray-700 focus:outline-none";

export default function Auth() {
  const [state, formAction, isPending] = useActionState<LoginState, FormData>(
    login,
    {},
  );

  return (
    <section className="mx-auto w-full max-w-md pt-20">
      <h1>Login</h1>
      <form action={formAction} className="mt-8 flex flex-col gap-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className={inputClass}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className={inputClass}
        />

        {state.error && (
          <p role="alert" className="text-red-700">
            {state.error}
          </p>
        )}

        <div className="flex justify-center">
          <Button disabled={isPending}>
            {isPending ? "Logger ind..." : "Login"}
          </Button>
        </div>
      </form>
    </section>
  );
}
