"use client";

import { useState, FormEvent } from "react";
import Button from "./Button";

type FormState = "idle" | "loading" | "success" | "error";

// -------------------------------------------------------
// Contact topics — edit this list as needed
// -------------------------------------------------------
const topics = [
  "Vraag over de dienst",
  "Vraag over aanmelden",
  "Vraag over mijn regio",
  "Samenwerking / partnerschap",
  "Anders",
];

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setState("success");
      } else {
        const json = await res.json();
        setErrorMessage(
          json.message || "Er is iets misgegaan. Probeer het opnieuw."
        );
        setState("error");
      }
    } catch {
      setErrorMessage(
        "Er kon geen verbinding worden gemaakt. Controleer je internetverbinding."
      );
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="rounded-sm border border-green/30 bg-green/5 p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center
                        rounded-full bg-green text-white text-xl">
          ✓
        </div>
        <h3 className="font-serif text-xl font-semibold text-ink">
          Bericht ontvangen
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          Dank voor je bericht. We reageren zo snel mogelijk, doorgaans binnen
          één werkdag.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Naam */}
      <div>
        <label htmlFor="contact-naam" className="form-label">
          Naam <span className="text-green">*</span>
        </label>
        <input
          id="contact-naam"
          name="naam"
          type="text"
          required
          autoComplete="name"
          placeholder="Voor- en achternaam"
          className="form-input"
        />
      </div>

      {/* E-mail */}
      <div>
        <label htmlFor="contact-email" className="form-label">
          E-mailadres <span className="text-green">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="jouw@emailadres.nl"
          className="form-input"
        />
      </div>

      {/* Onderwerp */}
      <div>
        <label htmlFor="contact-onderwerp" className="form-label">
          Onderwerp
        </label>
        <select
          id="contact-onderwerp"
          name="onderwerp"
          className="form-input bg-white"
          defaultValue=""
        >
          <option value="" disabled>
            Selecteer een onderwerp
          </option>
          {topics.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Bericht */}
      <div>
        <label htmlFor="contact-bericht" className="form-label">
          Bericht <span className="text-green">*</span>
        </label>
        <textarea
          id="contact-bericht"
          name="bericht"
          required
          rows={5}
          placeholder="Schrijf hier je vraag of opmerking…"
          className="form-input resize-none"
        />
      </div>

      {/* Error */}
      {state === "error" && errorMessage && (
        <p className="text-sm text-red-600">{errorMessage}</p>
      )}

      {/* Submit */}
      <div>
        <Button
          type="submit"
          disabled={state === "loading"}
          size="lg"
          className="w-full justify-center"
        >
          {state === "loading" ? "Bezig met verzenden…" : "Versturen"}
        </Button>
      </div>
    </form>
  );
}
