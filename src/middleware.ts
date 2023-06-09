// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import VerifyToken from "@/components/utils/conversion/VerifyToken";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  console.log("request.url: ", request.url);

  const verifiedToken =
    token &&
    (await VerifyToken({ token }).catch((err) => {
      console.log("Middleware.ts - error: ", err);
    }));

  if (request.nextUrl.pathname.startsWith("/auth") && !verifiedToken) {
    return;
  }

  if (request.url.includes("auth") && verifiedToken) {
    return NextResponse.redirect(new URL("/app/courses", request.url));
  }

  if (!verifiedToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/app/:path*", "/auth/:path*"],
};
