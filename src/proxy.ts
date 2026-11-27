import { NextResponse, type NextRequest } from "next/server";

// Kører før alle sider: uden login sendes man til /auth, med login væk fra /auth.
export function proxy(request: NextRequest) {
  const loggedIn = request.cookies.has("access_token");
  const onLogin = request.nextUrl.pathname === "/auth";

  if (!loggedIn && !onLogin) return NextResponse.redirect(new URL("/auth", request.url));
  if (loggedIn && onLogin) return NextResponse.redirect(new URL("/", request.url));

  return NextResponse.next();
}

// Gælder ikke /auth/logout, Next' egne filer og billeder
export const config = {
  matcher: ["/((?!auth/logout|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|ico)$).*)"],
};
