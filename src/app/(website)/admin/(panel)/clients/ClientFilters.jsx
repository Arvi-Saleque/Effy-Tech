"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Filter } from "lucide-react";

export default function ClientFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "current");

  // Debounced search
  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      
      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }
      
      if (status && status !== "current") {
        params.set("status", status);
      } else {
        params.delete("status");
      }

      router.push(`/admin/clients?${params.toString()}`);
    }, 300);

    return () => clearTimeout(handler);
  }, [search, status, router, searchParams]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-neutral-500" />
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by client, company, contact, email..."
          className="w-full pl-10 pr-4 py-2 bg-neutral-900/40 border border-neutral-800 rounded-lg text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
        />
      </div>
      
      <div className="relative min-w-[160px]">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Filter className="h-4 w-4 text-neutral-500" />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full pl-10 pr-8 py-2 bg-neutral-900/40 border border-neutral-800 rounded-lg text-sm text-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 appearance-none"
        >
          <option value="current">Current</option>
          <option value="all">All Statuses</option>
          <option value="lead">Lead</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="archived">Archived</option>
        </select>
      </div>
    </div>
  );
}
