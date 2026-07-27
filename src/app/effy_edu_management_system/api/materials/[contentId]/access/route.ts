// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
import { NextRequest, NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { getDemoFile } from "@/features/effy-edu-demo/lib/demo/mock-file-store";
import { requireMaterialAccess } from "@/features/effy-edu-demo/lib/auth-guards";

export const dynamic = "force-dynamic";

const safeLocalPublicPath = (url: string) => {
  if (!url.startsWith("/") || url.includes("..")) return null;
  return path.join(process.cwd(), "public", url.replace(/^\/+/, ""));
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ contentId: string }> }
) {
  const { contentId } = await params;
  const headers = new Headers({ "Cache-Control": "private, no-store", Pragma: "no-cache" });

  try {
    const { material } = await requireMaterialAccess(contentId);
    const mode = request.nextUrl.searchParams.get("mode") || "preview";
    if (mode === "download" && !material.allow_download) {
      return NextResponse.json({ error: "Download is not allowed for this material" }, { status: 403, headers });
    }

    let bytes: Uint8Array | null = null;
    let contentType = material.mime_type || "application/octet-stream";
    let filename = material.original_filename || `${material.title || "material"}.pdf`;

    if (material.storage_path) {
      const stored = getDemoFile(material.storage_path);
      if (stored) {
        bytes = stored.bytes;
        contentType = stored.contentType;
        filename = stored.filename;
      }
    }

    if (!bytes && material.cloudinary_public_id) {
      const stored = getDemoFile(material.cloudinary_public_id);
      if (stored) {
        bytes = stored.bytes;
        contentType = stored.contentType;
        filename = stored.filename;
      }
    }

    if (!bytes && material.external_url?.startsWith("/")) {
      const localPath = safeLocalPublicPath(material.external_url);
      if (localPath) {
        bytes = new Uint8Array(await readFile(localPath));
        const extension = path.extname(localPath).toLowerCase();
        contentType = extension === ".pdf" ? "application/pdf" : extension === ".png" ? "image/png" : extension === ".webp" ? "image/webp" : extension === ".jpg" || extension === ".jpeg" ? "image/jpeg" : contentType;
        filename = path.basename(localPath);
      }
    }

    if (!bytes && material.external_url?.startsWith("http")) {
      return NextResponse.redirect(material.external_url);
    }

    if (!bytes) {
      return NextResponse.json({ error: "Demo file not found" }, { status: 404, headers });
    }

    const cleanName = filename.replace(/[\r\n"]/g, "_");
    headers.set("Content-Type", contentType);
    headers.set("Content-Disposition", `${mode === "download" ? "attachment" : "inline"}; filename="${cleanName}"`);

    return new NextResponse(bytes as BodyInit, { status: 200, headers });
  } catch (error) {
    console.error("Demo material access error:", error);
    return NextResponse.json({ error: "Unable to open this demo material" }, { status: 500, headers });
  }
}
