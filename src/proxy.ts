import { NextRequest, NextResponse } from "next/server"
import { userService } from "./service/user.service"

export async function proxy(request: NextRequest) {
  let data = null;
  try {
    const session = await userService.getSession();
    data = session.data;
  } catch (err) {
    console.error("Failed to get session:", err);
  }

  const pathname = request.nextUrl.pathname.replace(/\/$/, "");

  if (pathname === "/addtocart") {
    if (!data) {
      // Add a redirect query to remember the original page
      const loginUrl = new URL("/login", request.nextUrl.origin);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/addtocart",
}
