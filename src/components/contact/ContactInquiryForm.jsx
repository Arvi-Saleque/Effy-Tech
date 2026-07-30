"use client";

import { startTransition, useActionState, useEffect, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { submitContact } from "@/app/actions/submitContact";
import { trackEvent } from "@/lib/analytics";
import { contactSchema, serviceOptions } from "@/lib/contactSchema";

const fieldDefinitions = [
  {
    name: "name",
    label: "Full name",
    type: "text",
    autoComplete: "name",
    required: true,
  },
  {
    name: "email",
    label: "Email address",
    type: "email",
    autoComplete: "email",
    required: true,
  },
  {
    name: "phone",
    label: "Phone number",
    type: "tel",
    autoComplete: "tel",
    inputMode: "tel",
    required: true,
  },
  {
    name: "company",
    label: "Company or organization",
    type: "text",
    autoComplete: "organization",
    required: false,
  },
];

function FieldError({ id, error }) {
  if (!error?.message) {
    return null;
  }

  return (
    <p id={id} className="contact6-field-error" role="alert">
      {error.message}
    </p>
  );
}

function TextField({ field, register, error }) {
  const errorId = `${field.name}-error`;

  return (
    <div className="contact6-field">
      <label htmlFor={field.name}>
        {field.label}
        {!field.required && <span>Optional</span>}
      </label>
      <input
        id={field.name}
        type={field.type}
        autoComplete={field.autoComplete}
        inputMode={field.inputMode}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...register(field.name)}
      />
      <FieldError id={errorId} error={error} />
    </div>
  );
}

export default function ContactInquiryForm() {
  const [serverState, formAction, isPending] = useActionState(
    submitContact,
    null,
  );
  const analyticsSent = useRef(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    shouldFocusError: true,
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      message: "",
    },
  });

  useEffect(() => {
    if (!serverState?.errors) {
      return;
    }

    for (const [fieldName, messages] of Object.entries(serverState.errors)) {
      const message = Array.isArray(messages) ? messages[0] : messages;

      if (message) {
        setError(fieldName, {
          type: "server",
          message,
        });
      }
    }
  }, [serverState, setError]);

  useEffect(() => {
    if (!serverState?.success || analyticsSent.current) {
      return;
    }

    analyticsSent.current = true;
    trackEvent("contact_form_submit", {
      form_name: "home_contact_form",
      page_path: window.location.pathname,
    });
  }, [serverState]);

  const onSubmit = (values) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(values)) {
      formData.append(key, value);
    }

    startTransition(() => {
      formAction(formData);
    });
  };

  if (serverState?.success) {
    return (
      <div
        className="contact6-success"
        role="status"
        aria-live="polite"
        tabIndex={-1}
      >
        <CheckCircle2 aria-hidden="true" />
        <p className="contact6-success-kicker">PROJECT BRIEF SUBMITTED</p>
        <h3>Thank you for sharing the context.</h3>
        <p>
          Your brief passed validation and was submitted. Use the direct email
          or WhatsApp options on this page if you need to add files or
          supporting references.
        </p>
      </div>
    );
  }

  return (
    <form
      className="contact6-form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-describedby="contact-form-guidance"
    >
      <p id="contact-form-guidance" className="contact6-form-guidance">
        Required fields are marked. Your brief can be refined later; start with
        the workflow and outcome.
      </p>

      <div className="contact6-form-grid">
        {fieldDefinitions.map((field) => (
          <TextField
            key={field.name}
            field={field}
            register={register}
            error={errors[field.name]}
          />
        ))}
      </div>

      <div className="contact6-field">
        <label htmlFor="service">Project type</label>
        <div className="contact6-select-wrap">
          <select
            id="service"
            defaultValue=""
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? "service-error" : undefined}
            {...register("service")}
          >
            {serviceOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.value === ""}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <FieldError id="service-error" error={errors.service} />
      </div>

      <div className="contact6-field">
        <label htmlFor="message">Project requirement</label>
        <textarea
          id="message"
          rows={7}
          maxLength={2000}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message
              ? "message-guidance message-error"
              : "message-guidance"
          }
          {...register("message")}
        />
        <div className="contact6-message-meta">
          <p id="message-guidance">
            Include the current workflow, users, main problem, required outcome,
            important timing, and an optional budget range.
          </p>
          <span>Maximum 2,000 characters</span>
        </div>
        <FieldError id="message-error" error={errors.message} />
      </div>

      {serverState?.success === false && (
        <div className="contact6-form-alert" role="alert" aria-live="assertive">
          The brief could not be submitted. Review the marked fields and try
          again.
        </div>
      )}

      <button
        className="contact6-submit"
        type="submit"
        disabled={isPending}
        aria-disabled={isPending}
        aria-busy={isPending}
      >
        {isPending ? (
          <>
            <LoaderCircle className="contact6-spinner" aria-hidden="true" />
            Submitting project brief
          </>
        ) : (
          <>
            Submit project brief
            <ArrowRight aria-hidden="true" />
          </>
        )}
      </button>

      <p className="contact6-pending-status" role="status" aria-live="polite">
        {isPending ? "Your project brief is being submitted." : ""}
      </p>
    </form>
  );
}
