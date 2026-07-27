// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { generateCloudinarySignature, finalizeMediaUpload } from "../actions/media-actions";

type AllowedFolder = "BRANDING" | "HERO" | "COURSES" | "RESULTS" | "MONTHLY_STARS" | "TESTIMONIALS" | "GALLERY" | "ABOUT" | "PROJECTS" | "PUBLICATIONS" | "CONTACT" | "MATERIALS" | "ACADEMIC_CALENDAR" | "CLASS_ROUTINE";

interface CloudinaryUploadResponse {
  public_id: string;
  asset_id: string;
  secure_url: string;
  resource_type: string;
  format: string;
  version: number;
  width: number;
  height: number;
  bytes: number;
  original_filename: string;
  signature: string;
}

interface MediaUploaderProps {
  folderKey: AllowedFolder;
  onUploadSuccess?: (mediaId: string, secureUrl: string) => void;
  onUploadError?: (error: string) => void;
}

export function MediaUploader({
  folderKey,
  onUploadSuccess,
  onUploadError
}: MediaUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Synchronized with Server Limits
  const MAX_SIZE_MB = 10;
  const ACCEPTED_FORMATS = "image/jpeg, image/png, image/webp, image/avif, application/pdf";

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      const errorMsg = `File size exceeds the ${MAX_SIZE_MB}MB limit.`;
      if (onUploadError) onUploadError(errorMsg);
      else alert(errorMsg);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setIsUploading(true);
    setProgress(0);

    try {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
      const key = `cms/${folderKey.toLowerCase()}/${Date.now()}-${safeName}`;
      const uploadUrl = `/effy_edu_management_system/api/demo-upload?${new URLSearchParams({ key, contentType: file.type || "application/octet-stream" }).toString()}`;

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", uploadUrl, true);
        xhr.setRequestHeader("Content-Type", file.type || "application/octet-stream");
        xhr.upload.onprogress = event => {
          if (event.lengthComputable) setProgress(Math.round((event.loaded / event.total) * 100));
        };
        xhr.onload = () => xhr.status >= 200 && xhr.status < 300 ? resolve() : reject(new Error("Local demo upload failed."));
        xhr.onerror = () => reject(new Error("Local demo upload failed."));
        xhr.send(file);
      });

      const secureUrl = `/effy_edu_management_system/api/resource?${new URLSearchParams({ key }).toString()}`;
      const finalizeRes = await finalizeMediaUpload({
        folder_key: folderKey,
        secure_url: secureUrl,
        public_id: key,
        resource_type: file.type.startsWith("image/") ? "image" : "raw",
        format: file.name.split(".").pop()?.toLowerCase() || "bin",
        original_filename: file.name,
        bytes: file.size,
      });

      if (!finalizeRes.success) throw new Error("Unable to add the uploaded file to the demo media library.");
      setPreviewUrl(secureUrl);
      if (onUploadSuccess) onUploadSuccess(finalizeRes.mediaId, finalizeRes.secureUrl);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Upload failed";
      if (onUploadError) onUploadError(message);
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
      setProgress(0);
      URL.revokeObjectURL(objectUrl);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="media-uploader border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center relative overflow-hidden bg-gray-50/50 hover:bg-gray-50 transition-colors">
      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_FORMATS}
        onChange={handleFileChange}
        disabled={isUploading}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
      />

      {previewUrl ? (
        <div className="relative w-full aspect-video max-h-64 rounded-md overflow-hidden bg-black/5 pointer-events-none">
          <Image
            src={previewUrl}
            alt="Upload preview"
            fill
            className={`object-contain transition-opacity duration-300 ${isUploading ? 'opacity-50 blur-sm' : 'opacity-100'}`}
          />
        </div>
      ) : (
        <div className="text-center pointer-events-none">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
            </svg>
          </div>
          <p className="mt-2 text-sm font-medium text-gray-900">Click to upload or drag and drop</p>
          <p className="text-xs text-gray-500 mt-1">JPEG, PNG, WEBP or AVIF (max. {MAX_SIZE_MB}MB)</p>
        </div>
      )}

      {isUploading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm z-20">
          <div className="w-2/3 max-w-xs bg-gray-200 rounded-full h-2.5 mb-4 overflow-hidden">
            <div className="bg-primary h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="text-sm font-medium text-primary font-mono">{progress}%</p>
          <p className="text-xs text-gray-600 mt-1">Uploading...</p>
        </div>
      )}
    </div>
  );
}
