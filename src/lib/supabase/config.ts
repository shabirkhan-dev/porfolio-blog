/**
 * Client-safe Supabase config. Only reads NEXT_PUBLIC_ vars, so this module is
 * safe to import from both client and server code.
 *
 * Prefers the new publishable key (`sb_publishable_...`) and falls back to the
 * legacy `anon` key for compatibility. The legacy key is deprecated by Supabase.
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

export const SUPABASE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function isSupabaseConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY);
}
