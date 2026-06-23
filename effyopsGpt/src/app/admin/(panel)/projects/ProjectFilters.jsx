"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export default function ProjectFilters({ clients = [] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentStatus = searchParams.get("status") || "current";
  const currentPriority = searchParams.get("priority") || "all";
  const currentClient = searchParams.get("clientId") || "all";
  const currentSearch = searchParams.get("search") || "";

  const handleFilterChange = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // If status isn't current, but we cleared it, don't leave it blank if that's not desired.
    // URL will just lack status, which page.js will interpret as "current" by default fallback.
    router.push(`/admin/projects?${params.toString()}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const search = form.search.value;
    handleFilterChange("search", search);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <form onSubmit={handleSearch} className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
        <input
          type="text"
          name="search"
          defaultValue={currentSearch}
          placeholder="Search projects by name, description, or client..."
          className="w-full bg-[#1C1C1E] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-emerald-500/50"
        />
      </form>

      <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
        <select
          value={currentStatus}
          onChange={(e) => handleFilterChange("status", e.target.value)}
          className="bg-[#1C1C1E] border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50 whitespace-nowrap min-w-[140px]"
        >
          <option value="current">Current Projects</option>
          <option value="all">All Projects</option>
          <option value="planning">Planning</option>
          <option value="active">Active</option>
          <option value="on_hold">On Hold</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
          <option value="archived">Archived</option>
        </select>

        <select
          value={currentPriority}
          onChange={(e) => handleFilterChange("priority", e.target.value)}
          className="bg-[#1C1C1E] border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50 whitespace-nowrap min-w-[140px]"
        >
          <option value="all">All Priorities</option>
          <option value="urgent">Urgent</option>
          <option value="high">High</option>
          <option value="normal">Normal</option>
          <option value="low">Low</option>
        </select>

        <select
          value={currentClient}
          onChange={(e) => handleFilterChange("clientId", e.target.value)}
          className="bg-[#1C1C1E] border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50 whitespace-nowrap min-w-[160px]"
        >
          <option value="all">All Clients</option>
          {clients.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
