// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";

interface SecurePdfCanvasProps {
  previewUrl: string;
  onError: () => void;
}

export default function SecurePdfCanvas({ previewUrl, onError }: SecurePdfCanvasProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative flex h-full w-full flex-1 flex-col bg-slate-100">
      {isLoading ? (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center space-y-3 bg-gray-100/95">
          <Loader2 className="h-8 w-8 animate-spin text-[#08132E]" />
          <span className="text-sm font-bold text-[#08132E]">
            Loading secure PDF preview...
          </span>
        </div>
      ) : null}
      <iframe
        src={`${previewUrl}#toolbar=1&navpanes=0&view=FitH`}
        title="Demo study material PDF preview"
        className="h-full min-h-[32rem] w-full border-0 bg-white"
        onLoad={() => setIsLoading(false)}
        onError={onError}
        referrerPolicy="same-origin"
      />
    </div>
  );
}
