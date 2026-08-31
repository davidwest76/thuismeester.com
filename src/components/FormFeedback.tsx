import { JSX, ReactNode } from "react";
import { CONTACT_EMAIL } from "@/lib/site";

/**
 * Shared feedback blocks for the site's forms (RegisterForm + ContactForm).
 * Both forms show the same success and error HTML — only the wording differs —
 * so the markup lives here once instead of being copied into each form.
 */

/**
 * FormSuccess — replaces the form after a successful submission.
 * The title and message come from the caller; the checkmark and styling
 * are identical for every form.
 */
export function FormSuccess({ title, warningMessage, children }: { title: string; warningMessage: string; children: ReactNode }): JSX.Element {
    return (
        <div className="rounded-sm border border-green/30 bg-green/5 p-8 text-center">
            {/* Checkmark circle icon — pure CSS, no icon library needed */}
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green text-white text-xl">
                ✓
            </div>
            <h3 className="font-serif text-xl font-semibold text-ink">
                {title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {children}
            </p>
            {/* Non-fatal issue (e.g. confirmation email failed): the
                submission succeeded, but the visitor should know why no
                email is coming. */}
            {warningMessage && (
                <p className="mt-4 rounded-sm border border-amber-200 bg-amber-50 px-4 py-3 text-left text-sm leading-relaxed text-amber-800">
                    {warningMessage}
                </p>
            )}
        </div>
    );
}

/**
 * FormError — the message shown above the submit button when a
 * submission fails. The form stays editable so the visitor can retry.
 *
 * Error messages (both the client-side fallbacks and the ones the API
 * routes send back) often end with "mail ons gerust via
 * contact@thuismeester.com" — linkify() turns that address into a
 * clickable mailto link wherever it appears in the message.
 * 
 * This is a little strange since we do not look at the email. But
 * to change the code such that this is strucurally possible is a 
 * lot of work for a change that now already works.
 */
function linkify(message: string): ReactNode {
    return message.split(CONTACT_EMAIL).flatMap((part, i) =>
        i === 0
            ? [part]
            : [
                  <a
                      key={i}
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="font-medium underline underline-offset-2"
                  >
                      {CONTACT_EMAIL}
                  </a>,
                  part,
              ]
    );
}

export function FormError({ message }: { message: string }): JSX.Element {
    return (
        <p className="rounded-sm bg-red-50 px-4 py-3 text-sm text-red-700">
            {linkify(message)}
        </p>
    );
}
