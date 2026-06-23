"use client";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientSchema, updateClientSchema } from "@/lib/admin/client-schema";
import { createClient, updateClient } from "@/lib/admin/client-actions";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

export default function ClientForm({ initialData = null }) {
  const isEditing = !!initialData;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState(null);
  const [serverSuccess, setServerSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isEditing ? updateClientSchema : createClientSchema),
    defaultValues: {
      name: initialData?.name || "",
      company_name: initialData?.company_name || "",
      contact_person: initialData?.contact_person || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      status: initialData?.status || "active",
      notes: initialData?.notes || "",
    },
  });

  const onSubmit = (data) => {
    setServerError(null);
    setServerSuccess(false);

    startTransition(async () => {
      const result = isEditing
        ? await updateClient(initialData.id, data)
        : await createClient(data);

      if (result.error) {
        setServerError(result.error);
      } else {
        setServerSuccess(true);
        // Add a tiny delay to show success before redirecting
        setTimeout(() => {
          router.push(`/admin/clients/${result.data.id}`);
        }, 600);
      }
    });
  };

  return (
    <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-xl overflow-hidden backdrop-blur-sm">
      <div className="px-6 py-5 border-b border-neutral-800/60 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-neutral-100">
          {isEditing ? "Edit Client" : "New Client"}
        </h3>
      </div>
      
      <div className="p-6">
        {serverError && (
          <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="text-sm">{serverError}</div>
          </div>
        )}
        
        {serverSuccess && (
          <div className="mb-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded-lg flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <div className="text-sm font-medium">
              Client successfully {isEditing ? "updated" : "created"}! Redirecting...
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-neutral-300 block">
                Client Name <span className="text-red-400">*</span>
              </label>
              <input
                id="name"
                {...register("name")}
                className="w-full bg-neutral-950/50 border border-neutral-800 rounded-lg px-4 py-2.5 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-neutral-600"
                placeholder="e.g. John Doe"
                disabled={isPending || serverSuccess}
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
            </div>

            {/* Company */}
            <div className="space-y-2">
              <label htmlFor="company_name" className="text-sm font-medium text-neutral-300 block">
                Company Name
              </label>
              <input
                id="company_name"
                {...register("company_name")}
                className="w-full bg-neutral-950/50 border border-neutral-800 rounded-lg px-4 py-2.5 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-neutral-600"
                placeholder="e.g. Acme Corp"
                disabled={isPending || serverSuccess}
              />
              {errors.company_name && <p className="text-red-400 text-xs mt-1">{errors.company_name.message}</p>}
            </div>

            {/* Contact Person */}
            <div className="space-y-2">
              <label htmlFor="contact_person" className="text-sm font-medium text-neutral-300 block">
                Contact Person
              </label>
              <input
                id="contact_person"
                {...register("contact_person")}
                className="w-full bg-neutral-950/50 border border-neutral-800 rounded-lg px-4 py-2.5 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-neutral-600"
                placeholder="e.g. Jane Smith"
                disabled={isPending || serverSuccess}
              />
              {errors.contact_person && <p className="text-red-400 text-xs mt-1">{errors.contact_person.message}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-neutral-300 block">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className="w-full bg-neutral-950/50 border border-neutral-800 rounded-lg px-4 py-2.5 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-neutral-600"
                placeholder="e.g. hello@example.com"
                disabled={isPending || serverSuccess}
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-neutral-300 block">
                Phone Number
              </label>
              <input
                id="phone"
                {...register("phone")}
                className="w-full bg-neutral-950/50 border border-neutral-800 rounded-lg px-4 py-2.5 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-neutral-600"
                placeholder="e.g. +1 234 567 8900"
                disabled={isPending || serverSuccess}
              />
              {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
            </div>

            {/* Status */}
            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium text-neutral-300 block">
                Status {initialData?.status !== "archived" && <span className="text-red-400">*</span>}
              </label>
              
              {initialData?.status === "archived" ? (
                <div className="w-full bg-neutral-900/50 border border-neutral-800 rounded-lg px-4 py-2.5 text-neutral-400 italic text-sm">
                  Use Restore Client to reactivate an archived client.
                </div>
              ) : (
                <select
                  id="status"
                  {...register("status")}
                  className="w-full bg-neutral-950/50 border border-neutral-800 rounded-lg px-4 py-2.5 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all appearance-none"
                  disabled={isPending || serverSuccess}
                >
                  <option value="lead">Lead</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              )}
              {errors.status && <p className="text-red-400 text-xs mt-1">{errors.status.message}</p>}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label htmlFor="notes" className="text-sm font-medium text-neutral-300 block">
              Internal Notes
            </label>
            <textarea
              id="notes"
              {...register("notes")}
              rows={4}
              className="w-full bg-neutral-950/50 border border-neutral-800 rounded-lg px-4 py-3 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-neutral-600 resize-y"
              placeholder="Any additional internal information about this client..."
              disabled={isPending || serverSuccess}
            />
            {errors.notes && <p className="text-red-400 text-xs mt-1">{errors.notes.message}</p>}
          </div>

          <div className="pt-6 flex items-center justify-end gap-3 border-t border-neutral-800/60">
            <button
              type="button"
              onClick={() => router.back()}
              disabled={isPending || serverSuccess}
              className="px-5 py-2.5 text-sm font-medium text-neutral-300 hover:text-white bg-neutral-800/50 hover:bg-neutral-800 border border-neutral-700/50 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending || serverSuccess}
              className="px-5 py-2.5 text-sm font-medium text-neutral-950 bg-emerald-500 hover:bg-emerald-400 rounded-lg transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              {isEditing ? "Save Changes" : "Create Client"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
