import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getUser } from "./action/User";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const user = token ? await getUser() : null;
  // console.log(user);

  if (!token || !user) {
    if (
      !request.nextUrl.pathname.startsWith("/login") &&
      !request.nextUrl.pathname.startsWith("/register")
    )
      return NextResponse.redirect(new URL("/login", request.url));
  } else {
    if (
      request.nextUrl.pathname.startsWith("/login") ||
      request.nextUrl.pathname.startsWith("/register")
    )
      return NextResponse.redirect(new URL("/", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
