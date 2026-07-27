// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
export {
  sanitizeFilename,
  generatePublicId,
  getCloudinaryResourceType,
  uploadPrivateAsset,
  type DemoUploadResponse,
} from "./upload";
export { generateSignedAccessUrl } from "./access";
export { deletePrivateAsset } from "./delete";
export { validateUploadedFile, validateFileMagicBytes } from "./validation";

export const cloudinary = null;

export function isValidUploadResponse(response: any) {
  return Boolean(response && typeof response.public_id === "string" && typeof response.asset_id === "string");
}
