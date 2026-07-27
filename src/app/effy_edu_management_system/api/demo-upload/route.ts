// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
import { NextRequest, NextResponse } from "next/server";
import { putDemoFile } from "@/features/effy-edu-demo/lib/demo/mock-file-store";

export const dynamic = "force-dynamic";

export async function PUT(request: NextRequest) {
  const key = request.nextUrl.searchParams.get("key");
  if (!key) return NextResponse.json({ error: "Missing key" }, { status: 400 });

  const body = new Uint8Array(await request.arrayBuffer());
  const contentType = request.headers.get("content-type") || request.nextUrl.searchParams.get("contentType") || "application/octet-stream";
  putDemoFile(key, body, contentType, key.split("/").pop());
  return NextResponse.json({ success: true, key, bytes: body.byteLength });
}
