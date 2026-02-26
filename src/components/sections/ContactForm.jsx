/* ============================================================
   ContactForm — Floating-label form with Zod + React Hook Form
   ─────────────────────────────────────────────────
   • Floating labels: placeholder-position → above-field on focus/filled
   • Fields: Name, Email, Phone, Company (optional), Service dropdown, Message
   • Validation: Zod schema via @hookform/resolvers (client) + server action
   • On success: inline animated checkmark (not just toast)
   • Submit: Next.js server action (submitContact)
   ============================================================ */

"use client";

import { useState, useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { contactSchema, serviceOptions } from "@/lib/contactSchema";
import { submitContact } from "@/app/actions/submitContact";

/* ── Floating Label Input ──────────────────────────────────── */
function FloatingInput({
  id,
  label,
  type = "text",
  register,
  error,
  required = false,
}) {
  const [focused, setFocused] = useState(false);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <input
        id={id}
        type={type}
        placeholder=" "
        {...register(id, {
          onBlur: () => setFocused(false),
        })}
        onFocus={() => setFocused(true)}
        className={`peer w-full rounded-lg border bg-transparent px-4 pb-2.5 pt-5 text-sm text-neutral-200 outline-none transition-all duration-200
          ${error ? "border-error/60 focus:border-error" : "border-neutral-700 focus:border-primary-light"}
          focus:ring-2 ${error ? "focus:ring-error/10" : "focus:ring-primary-light/10"}`}
      />
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm transition-all duration-200
          peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm
          peer-focus:top-2.5 peer-focus:-translate-y-0 peer-focus:text-[11px] peer-focus:font-medium
          peer-not-placeholder-shown:top-2.5 peer-not-placeholder-shown:-translate-y-0 peer-not-placeholder-shown:text-[11px] peer-not-placeholder-shown:font-medium
          ${error ? "text-error" : focused ? "text-primary-light" : "text-neutral-500"}`}
      >
        {label}
        {required && <span className="text-error ml-0.5">*</span>}
      </label>
      <AnimatePresence>
        {error && (
          <motion.p
            className="mt-1 text-xs text-error"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
          >
            {error.message}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Floating Label Textarea ───────────────────────────────── */
function FloatingTextarea({ id, label, register, error, required = false }) {
  const [focused, setFocused] = useState(false);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <textarea
        id={id}
        rows={5}
        placeholder=" "
        {...register(id, {
          onBlur: () => setFocused(false),
        })}
        onFocus={() => setFocused(true)}
        className={`peer w-full resize-none rounded-lg border bg-transparent px-4 pb-3 pt-6 text-sm text-neutral-200 outline-none transition-all duration-200
          ${error ? "border-error/60 focus:border-error" : "border-neutral-700 focus:border-primary-light"}
          focus:ring-2 ${error ? "focus:ring-error/10" : "focus:ring-primary-light/10"}`}
      />
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-4 top-4 text-sm transition-all duration-200
          peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
          peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:font-medium
          peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:text-[11px] peer-not-placeholder-shown:font-medium
          ${error ? "text-error" : focused ? "text-primary-light" : "text-neutral-500"}`}
      >
        {label}
        {required && <span className="text-error ml-0.5">*</span>}
      </label>
      <AnimatePresence>
        {error && (
          <motion.p
            className="mt-1 text-xs text-error"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
          >
            {error.message}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Floating Label Select ─────────────────────────────────── */
function FloatingSelect({
  id,
  label,
  options,
  register,
  error,
  required = false,
}) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <select
        id={id}
        {...register(id)}
        defaultValue=""
        className={`peer w-full appearance-none rounded-lg border bg-transparent px-4 pb-2.5 pt-5 text-sm text-neutral-200 outline-none transition-all duration-200 cursor-pointer
          ${error ? "border-error/60 focus:border-error" : "border-neutral-700 focus:border-primary-light"}
          focus:ring-2 ${error ? "focus:ring-error/10" : "focus:ring-primary-light/10"}`}
      >
        {options.map(({ value, label: optLabel }) => (
          <option key={value} value={value} disabled={value === ""}>
            {optLabel}
          </option>
        ))}
      </select>
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-4 top-2.5 text-[11px] font-medium
          ${error ? "text-error" : "text-neutral-500"}`}
      >
        {label}
        {required && <span className="text-error ml-0.5">*</span>}
      </label>
      {/* Chevron */}
      <svg
        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
      <AnimatePresence>
        {error && (
          <motion.p
            className="mt-1 text-xs text-error"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
          >
            {error.message}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Animated Checkmark SVG ────────────────────────────────── */
function SuccessCheckmark() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-12 text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.svg
        className="mb-4 h-16 w-16 text-success"
        viewBox="0 0 52 52"
        fill="none"
        initial="hidden"
        animate="visible"
      >
        {/* Circle */}
        <motion.circle
          cx="26"
          cy="26"
          r="24"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        {/* Checkmark */}
        <motion.path
          d="M14 27l8 8 16-16"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
        />
      </motion.svg>
      <h3 className="text-xl font-semibold text-neutral-100">Message Sent!</h3>
      <p className="mt-2 text-sm text-neutral-400 max-w-xs">
        Thank you for reaching out. We&apos;ll get back to you within 24 hours.
      </p>
    </motion.div>
  );
}

/* ── Main ContactForm ──────────────────────────────────────── */
export default function ContactForm() {
  const [serverState, formAction, isPending] = useActionState(
    submitContact,
    null,
  );
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      message: "",
    },
  });

  /* Client-side validation passes → call server action via form submission */
  const onSubmit = (data) => {
    const fd = new FormData();
    Object.entries(data).forEach(([key, val]) => fd.append(key, val));
    formAction(fd);
  };

  /* Watch for server success */
  if (serverState?.success && !submitted) {
    setSubmitted(true);
  }

  /* ── Success State ─── */
  if (submitted) {
    return <SuccessCheckmark />;
  }

  /* ── Form State ──── */
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Name + Email row */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FloatingInput
          id="name"
          label="Full Name"
          register={register}
          error={errors.name}
          required
        />
        <FloatingInput
          id="email"
          label="Email Address"
          type="email"
          register={register}
          error={errors.email}
          required
        />
      </div>

      {/* Phone + Company row */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FloatingInput
          id="phone"
          label="Phone Number"
          type="tel"
          register={register}
          error={errors.phone}
          required
        />
        <FloatingInput
          id="company"
          label="Company (optional)"
          register={register}
          error={errors.company}
        />
      </div>

      {/* Service dropdown */}
      <FloatingSelect
        id="service"
        label="Service"
        options={serviceOptions}
        register={register}
        error={errors.service}
        required
      />

      {/* Message */}
      <FloatingTextarea
        id="message"
        label="Your Message"
        register={register}
        error={errors.message}
        required
      />

      {/* Server-side errors */}
      <AnimatePresence>
        {serverState?.errors && (
          <motion.div
            className="rounded-lg border border-error/20 bg-error/5 p-3 text-sm text-error"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            Something went wrong. Please check your inputs and try again.
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit button */}
      <motion.button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-text-inverse shadow-md transition-all hover:bg-primary-dark hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        whileTap={{ scale: 0.98 }}
      >
        {isPending ? (
          <span className="inline-flex items-center gap-2">
            <svg
              className="h-4 w-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
                className="opacity-25"
              />
              <path
                d="M4 12a8 8 0 018-8"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                className="opacity-75"
              />
            </svg>
            Sending...
          </span>
        ) : (
          "Send Message"
        )}
      </motion.button>
    </form>
  );
}
