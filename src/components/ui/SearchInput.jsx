/* ============================================================
   SearchInput — Styled search input with icon
   Used in Navbar for search functionality.
   ============================================================ */

"use client";

import { useState } from "react";
import { HiOutlineSearch, HiX } from "react-icons/hi";

export default function SearchInput({
  placeholder = "Search...",
  onSearch,
  className = "",
}) {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
    onSearch?.(e.target.value);
  };

  const handleClear = () => {
    setValue("");
    onSearch?.("");
  };

  return (
    <div className={`relative ${className}`}>
      <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-9 py-2 rounded-full bg-neutral-100 border border-transparent 
          text-sm text-text-primary placeholder:text-text-tertiary
          focus:outline-none focus:border-primary focus:bg-surface focus:ring-1 focus:ring-primary/30
          transition-all duration-[var(--transition-base)]"
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary cursor-pointer"
        >
          <HiX className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
