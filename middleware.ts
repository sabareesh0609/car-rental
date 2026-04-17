import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/auth-constants";
import { verifySessionToken } from "@/lib/session-token";
import { getAuthSecret } from "@/lib/session-secret";

function needsAuthCheck(pathname: string): boolean {
  return (
    pathname.startsWith("/login") ||
    pathname.startsWith("/my-bookings") ||
    pathname.startsWith("/admin")
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!needsAuthCheck(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = token
    ? await verifySessionToken(token, getAuthSecret())
    : null;

  if (pathname.startsWith("/login")) {
    if (session) {
      const url = request.nextUrl.clone();
      url.pathname =
        session.role === "admin" ? "/admin/dashboard" : "/";
      url.search = "";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    if (!session) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
    if (session.role !== "admin") {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/my-bookings")) {
    if (!session) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff|woff2)$).*)",
  ],
};
