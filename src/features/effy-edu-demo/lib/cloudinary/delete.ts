// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
import { deleteDemoFile } from "@/features/effy-edu-demo/lib/demo/mock-file-store";

export async function deletePrivateAsset(publicId: string, _resourceType: "image" | "raw") {
  return { result: deleteDemoFile(publicId) ? "ok" : "not found" };
}
