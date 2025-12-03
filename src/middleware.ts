import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Only protect admin routes (except login)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const sessionCookie = request.cookies.get("admin_session");
    
    console.log("[Middleware] Checking admin route:", pathname, "Cookie:", sessionCookie ? "found" : "not found");
    
    if (!sessionCookie) {
      console.log("[Middleware] No session, redirecting to login");
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
    
    // Verify session is valid (not expired)
    try {
      const session = JSON.parse(
        Buffer.from(sessionCookie.value, "base64").toString()
      );
      
      if (session.exp < Date.now()) {
        console.log("[Middleware] Session expired, redirecting to login");
        const loginUrl = new URL("/admin/login", request.url);
        const response = NextResponse.redirect(loginUrl);
        response.cookies.delete("admin_session");
        return response;
      }
      
      console.log("[Middleware] Session valid for:", session.email);
    } catch (error) {
      console.log("[Middleware] Invalid session cookie, redirecting to login");
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
