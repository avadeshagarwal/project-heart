import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function proxy(request: NextRequest) {
  // Add middleware logic here (e.g. auth checks, headers, i18n)
  
  // Example: add standard security headers to all responses
  const response = NextResponse.next();
  
  response.headers.set("x-frame-options", "DENY");
  response.headers.set("x-content-type-options", "nosniff");
  response.headers.set("referrer-policy", "strict-origin-when-cross-origin");
  
  return response;
}

export const config = {
  // Apply middleware to all routes except static assets and api routes (for now)
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api|public).*)",
  ],
};
