// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
import { NextResponse, type NextRequest } from "next/server";
export async function updateSession(request: NextRequest) {
  return NextResponse.next({ request });
}
