// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
"use server";

import { requireTeacher } from "@/features/effy-edu-demo/lib/auth-guards";
import { generateR2UploadUrl } from "@/features/effy-edu-demo/lib/r2";

export async function getPreSignedUploadUrl(
  filename: string,
  contentType: string
) {
  try {
    // 1. Authorize: Only teachers/admins can upload materials
    await requireTeacher();

    // 2. Generate a unique key for the file to avoid collisions
    const timestamp = Date.now();
    const cleanFileName = filename.replace(/[^a-zA-Z0-9.\-_]/g, "");
    const uniqueKey = `materials/${timestamp}-${cleanFileName}`;

    // 3. Generate presigned URL
    const uploadUrl = await generateR2UploadUrl(uniqueKey, contentType);

    return {
      success: true,
      uploadUrl,
      r2Key: uniqueKey,
    };
  } catch (error: any) {
    console.error("Error generating presigned URL:", error);
    return {
      success: false,
      error: error.message || "Failed to generate upload URL",
    };
  }
}
