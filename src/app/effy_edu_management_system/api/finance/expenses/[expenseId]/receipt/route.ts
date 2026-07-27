// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
import { NextRequest, NextResponse } from "next/server";
import { requireTeacher } from "@/features/effy-edu-demo/lib/auth-guards";
import { getDemoFile } from "@/features/effy-edu-demo/lib/demo/mock-file-store";
import { createAdminClient } from "@/features/effy-edu-demo/lib/supabase/admin";
import {
  getClientIp,
  rateLimit,
} from "@/features/effy-edu-demo/lib/rate-limit";

function safeFileName(value: string) {
  return (
    value.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 180) ||
    "expense-receipt"
  );
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ expenseId: string }> }
) {
  const headers = new Headers({
    "Cache-Control": "private, no-store, max-age=0",
    Pragma: "no-cache",
  });

  try {
    await requireTeacher();
    const ip = await getClientIp();
    await rateLimit(`finance-demo-receipt-${ip}`, 30, 60);
    const { expenseId } = await params;
    const admin = createAdminClient();
    const { data: expense, error } = await admin
      .from("finance_expenses")
      .select(
        "id, receipt_storage_path, receipt_file_name, receipt_content_type, receipt_size_bytes"
      )
      .eq("id", expenseId)
      .maybeSingle();

    if (error || !expense?.receipt_storage_path) {
      return NextResponse.json(
        { error: "Receipt not found." },
        { status: 404, headers }
      );
    }
    if (!expense.receipt_storage_path.startsWith("finance/receipts/")) {
      return NextResponse.json(
        { error: "Invalid receipt path." },
        { status: 400, headers }
      );
    }

    const file = getDemoFile(expense.receipt_storage_path);
    if (!file) {
      return NextResponse.json(
        {
          error:
            "This process-local demo receipt has reset. Upload it again.",
        },
        { status: 404, headers }
      );
    }

    headers.set(
      "Content-Type",
      expense.receipt_content_type ||
        file.contentType ||
        "application/octet-stream"
    );
    headers.set(
      "Content-Disposition",
      `inline; filename="${safeFileName(
        expense.receipt_file_name || file.filename
      )}"`
    );
    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("Content-Length", String(file.bytes.byteLength));

    return new NextResponse(file.bytes as BodyInit, {
      status: 200,
      headers,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "";
    const status = message.toLowerCase().includes("too many") ? 429 : 403;
    return NextResponse.json(
      {
        error:
          status === 429
            ? "Too many receipt requests."
            : "Access denied.",
      },
      { status, headers }
    );
  }
}
