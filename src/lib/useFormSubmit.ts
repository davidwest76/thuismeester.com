/**
 * useFormSubmit hook
 *
 * Shared submit logic for the site's forms (RegisterForm + ContactForm).
 * Both forms do exactly the same thing — POST their fields as JSON to an API
 * route and track a loading / success / error state — so that logic lives here
 * once instead of being copied into each form.
 *
 * Usage:
 *   const { state, errorMessage, handleSubmit } = useFormSubmit("/api/contact");
 *   <form onSubmit={handleSubmit}> … </form>
 */
"use client";

import { useState, SubmitEvent } from "react";
import { CONTACT_EMAIL } from "@/lib/site";

/**
 * FormState — the lifecycle of a form submission:
 *   idle     → ready for input
 *   loading  → request in flight (disable the button)
 *   success  → swap the form for a thank-you message
 *   error    → show errorMessage, form stays editable
 */
type FormState = "idle" | "loading" | "success" | "error";

export function useFormSubmit(endpoint: string) {
    const [state, setState] = useState<FormState>("idle");
    const [errorMessage, setErrorMessage] = useState("");
    // Optional `warning` from a 200 response: the submission succeeded, but
    // something non-fatal went wrong (e.g. the confirmation email failed to
    // send). Shown inside the success message.
    const [warningMessage, setWarningMessage] = useState("");

    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault(); // no full-page reload — we POST via fetch
        setState("loading");
        setErrorMessage("");
        setWarningMessage("");

        const data = Object.fromEntries(new FormData(e.currentTarget).entries());

        try {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                const json = await res.json().catch(() => null);
                setWarningMessage(json?.warning || "");
                setState("success");
                return;
            }

            const json = await res.json().catch(() => null);
            setErrorMessage(
                json?.message ||
                `Er is iets misgegaan. Probeer het opnieuw, of mail ons gerust via ${CONTACT_EMAIL}.`
            );
            setState("error");
        } catch {
            setErrorMessage(
                `Er kon geen verbinding worden gemaakt. Controleer je internetverbinding en ` +
                `probeer het opnieuw, of mail ons gerust via ${CONTACT_EMAIL}.`
            );
            setState("error");
        }
    }

    return { state, errorMessage, warningMessage, handleSubmit };
}
