import { NextRequest, NextResponse } from "next/server";
import { userService } from "./service/user.service";
import { Role } from "./constants/Role";

export async function proxy(request: NextRequest) {
  let data = null;

  try {
    const session = await userService.getSession();
    data = session?.data ?? null;
  } catch (err) {
    console.error("Failed to get session:", err);
  }

  const pathname = request.nextUrl.pathname.replace(/\/$/, "");

  if (pathname === "/cart") {
    // Not logged in → login
    if (!data) {
      const loginUrl = new URL("/login", request.nextUrl.origin);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Logged in but wrong role → forbidden
    if (data.role !== Role.SELLER) {
      const forbiddenUrl = new URL("/fobidden", request.nextUrl.origin);
      return NextResponse.redirect(forbiddenUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/cart",
};
