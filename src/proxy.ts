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

  /* ===================== CART ===================== */
  if (pathname === "/cart") {
    // Not logged in → login
    if (!data) {
      const loginUrl = new URL("/login", request.nextUrl.origin);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Logged in but not customer → forbidden
    if (data.role !== Role.CUSTOMER) {
      return NextResponse.redirect(
        new URL("/forbidden", request.nextUrl.origin)
      );
    }
  }

  /* ===================== DASHBOARD ===================== */
  if (pathname.startsWith("/dashboard")) {
    // Not logged in → login
    
    if (!data) {
      return NextResponse.redirect(
        new URL("/login", request.nextUrl.origin)
      );
    }
    if(data.role === Role.SELLER) {
       return NextResponse.redirect(new URL("/seller-dashboard", request.url));
    }
    if(data.role ===Role.CUSTOMER) {
      return NextResponse.redirect(new URL("/dashboard", request.url));

    }
      if(data.role ===Role.ADMIN) {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));

    }

    // Only ADMIN and SELLER allowed
    if (data.role !== Role.ADMIN && data.role !== Role.SELLER) {
      return NextResponse.redirect(
        new URL("/forbidden", request.nextUrl.origin)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cart", "/dashboard", "/dashboard/:path*",
    "/seller-dashboard",
    "/seller-dashboard/:path*",
    "/admin-deshboard",
    "/admin-deshboard/:path*"

  ],
};
