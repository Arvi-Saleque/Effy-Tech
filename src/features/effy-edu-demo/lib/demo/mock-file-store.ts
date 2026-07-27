// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
/**
 * Process-local file store used only by the frontend demo.
 * Files survive navigation while the Next.js process is running and are
 * intentionally discarded when the process restarts.
 */
export type DemoStoredFile = {
  key: string;
  bytes: Uint8Array;
  contentType: string;
  filename: string;
  createdAt: string;
};

type DemoFileGlobal = typeof globalThis & {
  __EDUPILOT_DEMO_FILES__?: Map<string, DemoStoredFile>;
};

const demoGlobal = globalThis as DemoFileGlobal;
const store = demoGlobal.__EDUPILOT_DEMO_FILES__ ||= new Map<string, DemoStoredFile>();

export function putDemoFile(key: string, bytes: Uint8Array, contentType = "application/octet-stream", filename?: string) {
  const normalizedKey = key.replace(/^\/+/, "");
  const record: DemoStoredFile = {
    key: normalizedKey,
    bytes,
    contentType,
    filename: filename || normalizedKey.split("/").pop() || "demo-file",
    createdAt: new Date().toISOString(),
  };
  store.set(normalizedKey, record);
  return record;
}

const seededReceiptKey = "finance/receipts/demo-rent-receipt.txt";
if (!store.has(seededReceiptKey)) {
  putDemoFile(
    seededReceiptKey,
    new TextEncoder().encode(
      [
        "EDUPILOT COACHING ACADEMY - DEMO RECEIPT",
        "Expense: Academy classroom rent",
        "Payee: Urban Learning Space",
        "Amount: BDT 18,000",
        "Method: Bank transfer",
        "Reference: RNT-CURRENT",
        "Status: PAID (DEMO DATA ONLY)",
      ].join("\n")
    ),
    "text/plain; charset=utf-8",
    "academy-rent-receipt.txt"
  );
}

export function getDemoFile(key: string) {
  return store.get(key.replace(/^\/+/, "")) || null;
}

export function deleteDemoFile(key: string) {
  return store.delete(key.replace(/^\/+/, ""));
}

export function getDemoResourceUrl(key: string, download = false) {
  const query = new URLSearchParams({ key: key.replace(/^\/+/, "") });
  if (download) query.set("download", "1");
  return `/effy_edu_management_system/api/resource?${query.toString()}`;
}
