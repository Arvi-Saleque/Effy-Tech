// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
import { deleteDemoFile, getDemoResourceUrl } from "@/features/effy-edu-demo/lib/demo/mock-file-store";

/**
 * Local demo replacement for Cloudflare R2. No cloud account or credentials
 * are used. Uploads are sent to an in-process Next.js route and disappear when
 * the demo server restarts.
 */
export const r2BucketName = "edupilot-local-demo";
export const r2Client = null;

export async function generateR2UploadUrl(filename: string, contentType: string) {
  const query = new URLSearchParams({ key: filename, contentType });
  return `/effy_edu_management_system/api/demo-upload?${query.toString()}`;
}

export async function generateR2DownloadUrl(filename: string) {
  return getDemoResourceUrl(filename);
}

export async function deleteR2File(filename: string) {
  deleteDemoFile(filename);
  return true;
}
