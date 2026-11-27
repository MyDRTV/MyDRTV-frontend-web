"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/features/auth/services/auth";
import Button from "@/components/Button";

const Header = () => {
  const pathname = usePathname();

  // Skjult på login-siden. proxy.ts sikrer, at alle andre sider kræver login.
  if (pathname === "/auth") return null;

  // Aktivt menupunkt har fuld farve, de andre er nedtonede
  const linkClass = (active: boolean) =>
    `transition-opacity hover:opacity-100 ${active ? "" : "opacity-60"}`;

  return (
    <header>
      <nav className="flex justify-end pb-6 mb-10">
        <ul className="flex gap-8 items-center">
          <li>
            <Link href="/" className={linkClass(pathname === "/")}>
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/movies"
              className={linkClass(pathname.startsWith("/movies"))}
            >
              Movies
            </Link>
          </li>
          <li>
            <Link href="/users" className={linkClass(pathname === "/users")}>
              Profile
            </Link>
          </li>
          <li>
            <Link
              href="/create-movie"
              className={linkClass(pathname === "/create-movie")}
            >
              Create new movie
            </Link>
          </li>
          <li>
            <form action={logout}>
              <Button>Log out</Button>
            </form>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
