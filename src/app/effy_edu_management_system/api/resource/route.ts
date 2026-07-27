// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
import { NextRequest, NextResponse } from "next/server";
import { getDemoFile } from "@/features/effy-edu-demo/lib/demo/mock-file-store";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get("key");
  if (!key) return NextResponse.json({ error: "Missing key parameter" }, { status: 400 });

  const file = getDemoFile(key);
  if (!file) {
    return NextResponse.json(
      { error: "This demo file is no longer available. Upload it again after restarting the demo server." },
      { status: 404 }
    );
  }

  const isDownload = ["true", "1", "download"].includes(
    request.nextUrl.searchParams.get("download") || request.nextUrl.searchParams.get("mode") || ""
  );
  const safeName = file.filename.replace(/[\r\n"]/g, "_");

  return new NextResponse(file.bytes as BodyInit, {
    status: 200,
    headers: {
      "Content-Type": file.contentType,
      "Content-Disposition": `${isDownload ? "attachment" : "inline"}; filename="${safeName}"`,
      "Cache-Control": "private, no-store",
      Pragma: "no-cache",
    },
  });
}
