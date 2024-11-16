import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const cookies = request.cookies.get("next-auth.session-token");
  if (!cookies) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
