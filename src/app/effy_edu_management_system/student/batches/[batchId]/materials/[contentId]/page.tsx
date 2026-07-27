// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
import React from "react";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { resolveAuthenticatedDestination } from "@/features/effy-edu-demo/lib/supabase/auth";
import { createClient } from "@/features/effy-edu-demo/lib/supabase/server";
import { createAdminClient } from "@/features/effy-edu-demo/lib/supabase/admin";
import { ArrowLeft, Download, FileText, FileImage } from "lucide-react";

interface PageProps {
  params: Promise<{
    batchId: string;
    contentId: string;
  }>;
}

export default async function StudentMaterialDetailsPage({ params }: PageProps) {
  const { batchId, contentId } = await params;

  // 1. Authoritative Auth Check
  const { destination, profile, studentProfile } = await resolveAuthenticatedDestination(undefined, "STUDENT");

  if (destination === "UNAUTHENTICATED") {
    redirect("/effy_edu_management_system/login");
  }
  if (destination === "PENDING_APPROVAL") {
    redirect("/effy_edu_management_system/pending-approval");
  }
  if (destination === "ACCOUNT_DISABLED") {
    redirect("/effy_edu_management_system/account-disabled");
  }
  if (destination === "INVALID_PROFILE") {
    redirect("/effy_edu_management_system/login?error=invalid_profile");
  }

  const supabase = await createClient();

  // 2. Fetch Batch details
  const { data: batch, error: batchError } = await supabase
    .from("batches")
    .select("*")
    .eq("id", batchId)
    .single();

  if (batchError || !batch) {
    notFound();
  }

  // 3. Authorization Check: Active student enrollment
  if (!studentProfile) {
    redirect("/effy_edu_management_system/login?error=invalid_profile");
  }

  const { data: enrollment, error: enrollError } = await supabase
    .from("enrollments")
    .select("id")
    .eq("student_id", studentProfile.id)
    .eq("batch_id", batchId)
    .eq("status", "ACTIVE")
    .maybeSingle();

  if (enrollError || !enrollment) {
    redirect("/effy_edu_management_system/student?error=unauthorized_batch");
  }

  // 4. Fetch material details
  const admin = createAdminClient();
  const { data: material, error: materialError } = await admin
    .from("batch_contents")
    .select("*")
    .eq("id", contentId)
    .eq("batch_id", batchId)
    .single();

  if (materialError || !material) {
    notFound();
  }

  // Enforce Student gating rules
  if (material.status !== "PUBLISHED") {
    redirect(`/effy_edu_management_system/student/batches/${batchId}/materials?error=unavailable`);
  }

  const now = new Date();
  if (material.release_at && new Date(material.release_at) > now) {
    redirect(`/effy_edu_management_system/student/batches/${batchId}/materials?error=scheduled`);
  }
  if (material.expires_at && new Date(material.expires_at) <= now) {
    redirect(`/effy_edu_management_system/student/batches/${batchId}/materials?error=expired`);
  }

  // Only PDF and IMAGE are previewable
  const isPdf = material.cloudinary_format === "pdf" || material.content_type === "PDF";
  const isImage = ["jpg", "jpeg", "png", "webp"].includes(material.cloudinary_format || "") || material.content_type === "IMAGE";

  if (!isPdf && !isImage) {
    redirect(`/effy_edu_management_system/student/batches/${batchId}/materials`);
  }

  // Local process-only demo access route. No external file storage is used.
  const signedPreviewUrl = `/effy_edu_management_system/api/materials/${material.id}/access?mode=preview`;

  return (
    <div className="space-y-6 text-xs font-bold text-slate-800">
      {/* Navigation and header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <Link
            href={`/effy_edu_management_system/student/batches/${batchId}/materials`}
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors font-bold text-xs"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Materials List
          </Link>
          <h1 className="text-xl font-extrabold text-slate-900 mt-2">{material.title}</h1>
          {material.description && (
            <p className="text-[11px] text-slate-500 font-semibold max-w-2xl">{material.description}</p>
          )}
        </div>

        {material.allow_download && (
          <div>
            <a
              href={`/effy_edu_management_system/api/materials/${material.id}/access?mode=download`}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white hover:bg-primary-dark rounded-xl transition-all font-bold text-xs shadow-sm"
            >
              <Download className="h-4 w-4" />
              Download Document
            </a>
          </div>
        )}
      </div>

      {/* Preview box */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden flex flex-col items-center justify-center p-6 min-h-[600px]">
        {isPdf ? (
          <div className="w-full h-[650px] flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100 bg-slate-50 text-[10px] text-slate-500 font-semibold">
              <span className="flex items-center gap-1.5 font-bold">
                <FileText className="h-4 w-4 text-primary" />
                Document Viewer (Secure PDF)
              </span>
              <span>Short-lived access link refreshed</span>
            </div>
            <iframe
              src={signedPreviewUrl}
              className="w-full flex-grow border-none"
              title={material.title}
            />
          </div>
        ) : isImage ? (
          <div className="w-full flex flex-col items-center">
            <div className="w-full flex items-center justify-between px-4 py-2 border-b border-slate-100 bg-slate-50 text-[10px] text-slate-500 font-semibold mb-4">
              <span className="flex items-center gap-1.5 font-bold">
                <FileImage className="h-4 w-4 text-primary" />
                Image Preview
              </span>
            </div>
            <div className="max-w-4xl max-h-[600px] overflow-auto border border-slate-100 rounded-xl bg-slate-50 p-2 flex items-center justify-center">
              <img
                src={signedPreviewUrl}
                alt={material.title}
                className="max-w-full h-auto object-contain rounded"
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
