import 'server-only';
import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * A utility which gets a SupabaseClient to use for all INSERTs and SELECTs from supabase on the server.
 *
 * This pattern has been copied from https://supabase.com/docs/guides/troubleshooting/performing-administration-tasks-on-the-server-side-with-the-servicerole-secret-BYM4Fa
 */
export function getSupabaseClient(): SupabaseClient {
    const url = process.env.SUPABASE_PROJECT_URL;
    const key = process.env.SUPABASE_SECRET_KEY;

    // Checked explicitly instead of using `process.env.X!`: with the
    // non-null assertion a missing env var surfaces as a confusing library
    // error ("supabaseUrl is required") deep inside a request. This message
    // names the exact variable, so a misconfigured deployment can be
    // diagnosed from a single log line. The throw is caught by the calling
    // route's try/catch, which logs it and returns a normal 500.
    if (!url || !key) {
        throw new Error(
            `[Thuismeester] Supabase: missing environment variable(s): ` +
            `${!url ? "SUPABASE_PROJECT_URL " : ""}${!key ? "SUPABASE_SECRET_KEY" : ""}`.trim()
        );
    }

    return createClient(
        url,
        key,
        { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } }
    );
}
