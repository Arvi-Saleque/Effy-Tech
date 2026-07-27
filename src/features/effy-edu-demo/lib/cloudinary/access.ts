// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
import { getDemoResourceUrl } from "@/features/effy-edu-demo/lib/demo/mock-file-store";

export function generateSignedAccessUrl(
  publicId: string,
  _resourceType: "image" | "raw",
  _format: string | null,
  allowDownload: boolean,
  _expiresInSeconds = 120
): string {
  return getDemoResourceUrl(publicId, allowDownload);
}
