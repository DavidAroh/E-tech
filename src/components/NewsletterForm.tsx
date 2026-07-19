"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { LIMITS, isEmail, isOffline } from "@/lib/validation";
import { BrandIcon } from "./BrandIcon";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  async function handleNewsletter(e: FormEvent) {
    e.preventDefault();
    if (status === "loading") return;

    const value = email.trim().toLowerCase();
    if (!value || !isEmail(value)) {
      setStatus("error");
      setMessage("Enter a valid email address.");
      return;
    }

    if (isOffline()) {
      setStatus("error");
      setMessage("You appear offline. Check your connection and try again.");
      return;
    }

    setStatus("loading");
    setMessage("");

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({ email: value }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        if (res.status === 429) {
          throw new Error("Too many requests. Please wait and try again.");
        }
        throw new Error(body.error || "Subscription failed.");
      }
      const body = await res.json().catch(() => ({}));
      setStatus("success");
      setMessage(
        body.duplicate
          ? "You are already on the list."
          : "You are on the list. Thank you."
      );
      setEmail("");
    } catch (err) {
      setStatus("error");
      if (err instanceof DOMException && err.name === "AbortError") {
        setMessage("Request timed out. Please try again.");
      } else {
        setMessage(
          err instanceof Error ? err.message : "Something went wrong."
        );
      }
    } finally {
      window.clearTimeout(timeout);
    }
  }

  return (
    <div className="max-w-md min-w-0">
      <p className="mb-2 font-sans text-sm font-semibold text-beige">
        Newsletter
      </p>
      <p className="mb-4 text-sm text-beige-muted">
        Occasional briefings on AI governance and cyber risk. No noise.
      </p>
      <form
        onSubmit={handleNewsletter}
        className="flex flex-col gap-2 sm:flex-row"
        noValidate
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          maxLength={LIMITS.newsletter}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          aria-invalid={status === "error"}
          aria-describedby={message ? "newsletter-status" : undefined}
          className="w-full min-w-0 rounded-full border border-beige/15 bg-black/30 px-5 py-3.5 font-sans text-sm text-beige placeholder:text-beige-muted focus:border-purple-light focus:outline-none focus:ring-2 focus:ring-purple-light/20 sm:max-w-xs"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary shrink-0 disabled:cursor-not-allowed disabled:opacity-70"
          aria-busy={status === "loading"}
        >
          {status === "loading" ? (
            <BrandIcon name="spinner" className="h-4 w-4 animate-spin" />
          ) : (
            "Subscribe"
          )}
        </button>
      </form>
      {message ? (
        <p
          id="newsletter-status"
          className={`mt-2 text-xs break-words ${
            status === "error" ? "text-red-400" : "text-beige-muted"
          }`}
          role={status === "error" ? "alert" : "status"}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}
