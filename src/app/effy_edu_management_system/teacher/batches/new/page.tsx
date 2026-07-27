// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
import React from "react";
import { DashboardPageHeader } from "@/features/effy-edu-demo/components/dashboard/dashboard-page-header";
import { NewBatchForm } from "./new-batch-form";

export default async function NewBatchPage() {
  return (
    <div className="space-y-8">
      <DashboardPageHeader
        title="Create New Batch"
        description="Set up a new study program, pricing, schedules, and capacity parameters."
      />
      <div className="flex justify-center md:justify-start">
        <NewBatchForm />
      </div>
    </div>
  );
}
