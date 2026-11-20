"use client";

import ButtonLink from "@/components/global/ButtonLink";

export default function Login() {
  return (
    <section>
      <form className="flex flex-col gap-10">
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <ButtonLink href={"/"}>Login</ButtonLink>
      </form>
    </section>
  );
}
