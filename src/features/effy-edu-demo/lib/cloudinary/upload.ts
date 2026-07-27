// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
import { putDemoFile, getDemoResourceUrl } from "@/features/effy-edu-demo/lib/demo/mock-file-store";

export type DemoUploadResponse = {
  public_id: string;
  asset_id: string;
  secure_url: string;
  resource_type: "image" | "raw";
  type: "authenticated";
  format: string;
  version: number;
  bytes: number;
  original_filename: string;
  width?: number;
  height?: number;
};

export function sanitizeFilename(filename: string): { sanitizedName: string; extension: string } {
  const name = filename || "file";
  const parts = name.split(".");
  const extension = parts.length > 1 ? parts.pop() || "" : "";
  const sanitizedName = parts.join(".")
    .replace(/\.\./g, "")
    .replace(/[\\/\0]/g, "")
    .replace(/[^\w\s-]/gi, "")
    .replace(/\s+/g, "_")
    .trim() || "unnamed";
  return { sanitizedName, extension: extension.toLowerCase() };
}

export function generatePublicId(batchId: string, filename: string): string {
  const { sanitizedName } = sanitizeFilename(filename);
  return `edupilot-demo/${batchId}/${crypto.randomUUID()}-${sanitizedName}`;
}

export function getCloudinaryResourceType(extension: string): "image" | "raw" {
  return ["jpg", "jpeg", "png", "webp", "pdf"].includes(extension.toLowerCase()) ? "image" : "raw";
}

export async function uploadPrivateAsset(
  fileBuffer: Buffer,
  publicId: string,
  resourceType: "image" | "raw"
): Promise<DemoUploadResponse> {
  const format = publicId.split(".").pop()?.toLowerCase() || (resourceType === "image" ? "png" : "bin");
  const key = `cloudinary/${publicId}.${format}`.replace(/\/+/g, "/");
  const contentType = format === "pdf" ? "application/pdf" : format === "png" ? "image/png" : format === "webp" ? "image/webp" : format === "jpg" || format === "jpeg" ? "image/jpeg" : "application/octet-stream";
  putDemoFile(key, new Uint8Array(fileBuffer), contentType, `${publicId.split("/").pop()}.${format}`);
  return {
    public_id: key,
    asset_id: `demo-asset-${crypto.randomUUID()}`,
    secure_url: getDemoResourceUrl(key),
    resource_type: resourceType,
    type: "authenticated",
    format,
    version: Date.now(),
    bytes: fileBuffer.byteLength,
    original_filename: publicId.split("/").pop() || "demo-file",
  };
}
