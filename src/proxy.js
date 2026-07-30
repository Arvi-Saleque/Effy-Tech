import { NextResponse } from "next/server";

export function proxy() {
  return new NextResponse(null, { status: 404 });
}

export const config = {
  matcher: "/demo/pioneer-girls-college/:path*",
};
