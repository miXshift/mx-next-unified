import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("next-auth.session-token"); // Example for NextAuth
  
  const isAuthenticated = Boolean(token); // Adjust based on your auth method
  
  const protectedRoutes = ["/dashboard", "/profile"]; // Define protected pages
  
  if (protectedRoutes.includes(req.nextUrl.pathname) && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Apply middleware only to specific paths
export const config = {
  matcher: [
    "/dashboard", "/profile",
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
