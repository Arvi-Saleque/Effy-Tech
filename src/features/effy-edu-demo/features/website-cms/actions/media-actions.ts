// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
"use server";

const media = [
  { id: "media-instructor", folder_key: "TEACHER", secure_url: "/effy_edu_management_system/images/demo-instructor.png", public_id: "demo-instructor", resource_type: "image", format: "png", original_filename: "demo-instructor.png", width: 900, height: 1200, bytes: 450000, created_at: new Date().toISOString() },
  { id: "media-classroom", folder_key: "GALLERY", secure_url: "/effy_edu_management_system/images/gallery-classroom.png", public_id: "gallery-classroom", resource_type: "image", format: "png", original_filename: "gallery-classroom.png", width: 1200, height: 800, bytes: 350000, created_at: new Date().toISOString() },
];

export async function generateCloudinarySignature(folderKey: string) {
  return { signature: "local-demo", timestamp: Math.floor(Date.now() / 1000), cloudName: "local-demo", apiKey: "local-demo", folder: `demo/${folderKey.toLowerCase()}` };
}

export async function getMediaAssets(folderKey?: string) {
  return folderKey ? media.filter(item => item.folder_key === folderKey) : media;
}

export async function finalizeMediaUpload(payload: any) {
  const item = {
    id: `media-${Date.now()}`,
    folder_key: payload.folder_key || "GENERAL",
    secure_url: payload.secure_url || "/effy_edu_management_system/images/gallery-classroom.png",
    public_id: payload.public_id || `demo-${Date.now()}`,
    resource_type: payload.resource_type || "image",
    format: payload.format || "png",
    original_filename: payload.original_filename || "demo-upload.png",
    width: payload.width || null,
    height: payload.height || null,
    bytes: payload.bytes || 0,
    created_at: new Date().toISOString(),
  };
  media.unshift(item as any);
  return { success: true, media: item, mediaId: item.id, secureUrl: item.secure_url };
}

export async function findMediaReferences() { return []; }
export async function deleteMediaAsset(mediaId: string) {
  const index = media.findIndex(item => item.id === mediaId);
  if (index >= 0) media.splice(index, 1);
  return { success: true };
}
