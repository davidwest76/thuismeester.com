"use client";

import { useState, FormEvent } from "react";
import Button from "./Button";

type FormState = "idle" | "loading" | "success" | "error";

// -------------------------------------------------------
// Woonplaats options — edit to add/remove regions
// -------------------------------------------------------
const woonplaatsen = [
  "Amersfoort",
  "Leusden",
  "Hoevelaken",
  "Nijkerk",
  "Soest",
  "Anders",
];

export default function AanmeldenForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/aanmelden", {
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

  // -------------------------------------------------------
  // Success state
  // -------------------------------------------------------
  if (state === "success") {
    return (
      <div className="rounded-sm border border-green/30 bg-green/5 p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center
                        rounded-full bg-green text-white text-xl">
          ✓
        </div>
        <h3 className="font-serif text-xl font-semibold text-ink">
          Aanmelding ontvangen
        </h3>
        {/* -------------------------------------------------------
            Success message — edit this text if needed
            ------------------------------------------------------- */}
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          Dank voor je aanmelding. We houden je op de hoogte van de
          ontwikkeling van Thuismeester in jouw regio.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Naam */}
      <div>
        <label htmlFor="naam" className="form-label">
          Naam <span className="text-green" aria-hidden="true">*</span>
        </label>
        <input
          id="naam"
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
        <label htmlFor="email" className="form-label">
          E-mailadres <span className="text-green" aria-hidden="true">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="jouw@emailadres.nl"
          className="form-input"
        />
      </div>

      {/* Telefoonnummer */}
      <div>
        <label htmlFor="telefoon" className="form-label">
          Telefoonnummer
        </label>
        <input
          id="telefoon"
          name="telefoon"
          type="tel"
          autoComplete="tel"
          placeholder="06 00 000 000"
          className="form-input"
        />
      </div>

      {/* Postcode + Woonplaats (two columns) */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="postcode" className="form-label">
            Postcode <span className="text-green" aria-hidden="true">*</span>
          </label>
          <input
            id="postcode"
            name="postcode"
            type="text"
            required
            autoComplete="postal-code"
            placeholder="1234 AB"
            className="form-input"
            maxLength={7}
          />
        </div>

        <div>
          <label htmlFor="woonplaats" className="form-label">
            Woonplaats <span className="text-green" aria-hidden="true">*</span>
          </label>
          <select
            id="woonplaats"
            name="woonplaats"
            required
            className="form-input bg-white"
            defaultValue=""
          >
            <option value="" disabled>
              Selecteer woonplaats
            </option>
            {woonplaatsen.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Opmerkingen */}
      <div>
        <label htmlFor="opmerkingen" className="form-label">
          Opmerkingen
          <span className="ml-1 text-xs text-ink-muted">(optioneel)</span>
        </label>
        <textarea
          id="opmerkingen"
          name="opmerkingen"
          rows={4}
          placeholder="Vragen, wensen of aanvullende informatie…"
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
          {state === "loading" ? "Bezig met verzenden…" : "Aanmelden"}
        </Button>
      </div>

      <p className="text-xs text-ink-muted">
        Velden met <span className="text-green">*</span> zijn verplicht.
      </p>
    </form>
  );
}
