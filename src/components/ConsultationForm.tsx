"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  consultationTypes,
  industryOptions,
  serviceOptions,
} from "@/data/content";
import { EASE_ENTRANCE } from "@/lib/motion";
import { cn } from "@/lib/cn";
import {
  LIMITS,
  isEmail,
  isOffline,
  isPastDate,
  isPhone,
} from "@/lib/validation";
import { BrandIcon } from "./BrandIcon";

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  serviceNeeded: string;
  message: string;
  preferredDate: string;
  preferredTime: string;
  consultationType: "virtual" | "in-person";
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

const initial: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  industry: "",
  serviceNeeded: "",
  message: "",
  preferredDate: "",
  preferredTime: "",
  consultationType: "virtual",
};

function validate(data: FormState): FieldErrors {
  const errors: FieldErrors = {};
  if (!data.name.trim()) errors.name = "Name is required.";
  else if (data.name.trim().length > LIMITS.name)
    errors.name = `Name must be under ${LIMITS.name} characters.`;

  if (!data.company.trim()) errors.company = "Company is required.";
  else if (data.company.trim().length > LIMITS.company)
    errors.company = `Company must be under ${LIMITS.company} characters.`;

  if (!data.email.trim()) errors.email = "Email is required.";
  else if (!isEmail(data.email.trim()))
    errors.email = "Enter a valid email address.";

  if (!data.phone.trim()) errors.phone = "Phone is required.";
  else if (!isPhone(data.phone))
    errors.phone = "Enter a valid phone number (7–15 digits).";

  if (!data.industry) errors.industry = "Select an industry.";
  if (!data.serviceNeeded) errors.serviceNeeded = "Select a service.";

  if (!data.message.trim()) errors.message = "Please add a brief message.";
  else if (data.message.trim().length > LIMITS.message)
    errors.message = `Message must be under ${LIMITS.message} characters.`;

  if (!data.preferredDate) errors.preferredDate = "Select a preferred date.";
  else if (isPastDate(data.preferredDate))
    errors.preferredDate = "Please choose today or a future date.";

  if (!data.preferredTime) errors.preferredTime = "Select a preferred time.";
  return errors;
}

const inputClass =
  "w-full min-w-0 rounded-media border border-cocoa/12 bg-white px-4 py-3.5 font-sans text-sm text-cocoa placeholder:text-cocoa/70 transition-all duration-300 ease-premium focus:border-purple focus:outline-none focus:ring-2 focus:ring-purple/20";

const labelClass = "mb-1.5 block font-sans text-sm font-semibold text-cocoa";

export function ConsultationForm() {
  const reduce = useReducedMotion();
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [serverError, setServerError] = useState("");
  const [lastMode, setLastMode] = useState<"book" | "schedule">("book");
  const abortRef = useRef<AbortController | null>(null);

  const minDate = useMemo(() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }, []);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  }

  async function handleSubmit(e: FormEvent, mode: "book" | "schedule") {
    e.preventDefault();
    if (status === "loading") return;

    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const first = Object.keys(nextErrors)[0];
      document.getElementById(first)?.focus();
      return;
    }

    if (isOffline()) {
      setStatus("error");
      setServerError(
        "You appear to be offline. Check your connection and try again."
      );
      return;
    }

    setLastMode(mode);
    setStatus("loading");
    setServerError("");

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 20000);

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          name: form.name.trim(),
          company: form.company.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          industry: form.industry,
          service_needed: form.serviceNeeded,
          message: form.message.trim(),
          preferred_date: form.preferredDate,
          preferred_time: form.preferredTime,
          consultation_type: form.consultationType,
          submit_mode: mode,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        if (res.status === 429) {
          throw new Error(
            "Too many requests. Please wait a moment and try again."
          );
        }
        throw new Error(
          body.error || "Submission failed. Please try again."
        );
      }

      setStatus("success");
      setForm(initial);
      setErrors({});
    } catch (err) {
      setStatus("error");
      if (err instanceof DOMException && err.name === "AbortError") {
        setServerError(
          "The request timed out. Please try again."
        );
      } else {
        setServerError(
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again."
        );
      }
    } finally {
      window.clearTimeout(timeout);
    }
  }

  if (status === "success") {
    return (
      <motion.div
        className="flex flex-col items-center justify-center py-12 text-center"
        initial={reduce ? false : { opacity: 1, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE_ENTRANCE }}
        role="status"
        aria-live="polite"
      >
        <BrandIcon name="checkCircle" className="mb-4 h-12 w-12 text-purple" />
        <h3 className="mb-2 font-display text-2xl font-semibold text-cocoa">
          Request received
        </h3>
        <p className="mb-6 max-w-md text-sm leading-relaxed text-cocoa/70 break-words">
          Thank you. Our team will review your consultation request and respond
          within one business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn-primary"
        >
          Submit another request
        </button>
      </motion.div>
    );
  }

  return (
    <form className="space-y-5" noValidate>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {status === "loading" ? "Submitting consultation request…" : ""}
        {serverError || ""}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field id="name" label="Name" error={errors.name} required>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={LIMITS.name}
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={cn(inputClass, errors.name && "border-red-500/60")}
            placeholder="Your full name"
          />
        </Field>
        <Field id="company" label="Company" error={errors.company} required>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            maxLength={LIMITS.company}
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? "company-error" : undefined}
            className={cn(inputClass, errors.company && "border-red-500/60")}
            placeholder="Organization name"
          />
        </Field>
        <Field id="email" label="Email" error={errors.email} required>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            maxLength={LIMITS.email}
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn(inputClass, errors.email && "border-red-500/60")}
            placeholder="you@company.com"
          />
        </Field>
        <Field id="phone" label="Phone" error={errors.phone} required>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            maxLength={LIMITS.phone}
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={cn(inputClass, errors.phone && "border-red-500/60")}
            placeholder="+234 …"
          />
        </Field>
        <Field id="industry" label="Industry" error={errors.industry} required>
          <select
            id="industry"
            name="industry"
            value={form.industry}
            onChange={(e) => update("industry", e.target.value)}
            aria-invalid={!!errors.industry}
            aria-describedby={errors.industry ? "industry-error" : undefined}
            className={cn(inputClass, errors.industry && "border-red-500/60")}
          >
            <option value="">Select industry</option>
            {industryOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </Field>
        <Field
          id="serviceNeeded"
          label="Service Needed"
          error={errors.serviceNeeded}
          required
        >
          <select
            id="serviceNeeded"
            name="serviceNeeded"
            value={form.serviceNeeded}
            onChange={(e) => update("serviceNeeded", e.target.value)}
            aria-invalid={!!errors.serviceNeeded}
            aria-describedby={
              errors.serviceNeeded ? "serviceNeeded-error" : undefined
            }
            className={cn(
              inputClass,
              errors.serviceNeeded && "border-red-500/60"
            )}
          >
            <option value="">Select service</option>
            {serviceOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </Field>
        <Field
          id="preferredDate"
          label="Preferred Date"
          error={errors.preferredDate}
          required
        >
          <input
            id="preferredDate"
            name="preferredDate"
            type="date"
            min={minDate}
            value={form.preferredDate}
            onChange={(e) => update("preferredDate", e.target.value)}
            aria-invalid={!!errors.preferredDate}
            aria-describedby={
              errors.preferredDate ? "preferredDate-error" : undefined
            }
            className={cn(
              inputClass,
              errors.preferredDate && "border-red-500/60"
            )}
          />
        </Field>
        <Field
          id="preferredTime"
          label="Preferred Time"
          error={errors.preferredTime}
          required
        >
          <input
            id="preferredTime"
            name="preferredTime"
            type="time"
            value={form.preferredTime}
            onChange={(e) => update("preferredTime", e.target.value)}
            aria-invalid={!!errors.preferredTime}
            aria-describedby={
              errors.preferredTime ? "preferredTime-error" : undefined
            }
            className={cn(
              inputClass,
              errors.preferredTime && "border-red-500/60"
            )}
          />
        </Field>
      </div>

      <fieldset>
        <legend className={labelClass}>Consultation Type</legend>
        <div className="flex flex-wrap gap-3" role="radiogroup" aria-label="Consultation type">
          {consultationTypes.map((type) => (
            <label
              key={type.value}
              className={cn(
                "flex min-h-11 cursor-pointer items-center gap-2 rounded-media border px-5 py-3 text-sm font-medium transition-all duration-300 ease-premium",
                form.consultationType === type.value
                  ? "border-purple bg-purple/5 text-purple"
                  : "border-cocoa/12 text-cocoa hover:border-cocoa/25"
              )}
            >
              <input
                type="radio"
                name="consultationType"
                value={type.value}
                checked={form.consultationType === type.value}
                onChange={() => update("consultationType", type.value)}
                className="sr-only"
              />
              {type.label}
            </label>
          ))}
        </div>
      </fieldset>

      <Field
        id="message"
        label="Message"
        error={errors.message}
        required
        hint={`${form.message.length}/${LIMITS.message}`}
      >
        <textarea
          id="message"
          name="message"
          rows={4}
          maxLength={LIMITS.message}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={
            errors.message ? "message-error" : "message-hint"
          }
          className={cn(
            inputClass,
            "min-h-[7rem] resize-y break-words",
            errors.message && "border-red-500/60"
          )}
          placeholder="Briefly describe your objectives or challenges."
        />
      </Field>

      {serverError ? (
        <div
          className="rounded-media border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          role="alert"
        >
          <p className="break-words">{serverError}</p>
          <button
            type="button"
            className="mt-2 font-medium underline underline-offset-2"
            onClick={(e) => handleSubmit(e, lastMode)}
          >
            Try again
          </button>
        </div>
      ) : null}

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:flex-wrap">
        <button
          type="submit"
          disabled={status === "loading"}
          onClick={(e) => handleSubmit(e, "book")}
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-70"
          aria-busy={status === "loading"}
        >
          {status === "loading" ? (
            <>
              <BrandIcon name="spinner" className="h-4 w-4 animate-spin" />
              Submitting…
            </>
          ) : (
            "Book Consultation"
          )}
        </button>
        <button
          type="button"
          disabled={status === "loading"}
          onClick={(e) => handleSubmit(e, "schedule")}
          className="text-sm font-medium text-cocoa/70 underline-offset-4 transition-colors hover:text-purple hover:underline disabled:opacity-50"
        >
          Prefer a calendar link later
        </button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  required,
  children,
  hint,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className={labelClass}>
        {label}
        {required ? (
          <span className="text-purple" aria-hidden>
            {" "}
            *
          </span>
        ) : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-cocoa/50">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
