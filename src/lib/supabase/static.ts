import "server-only";

import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from "@/lib/supabase/config";

/**
 * Cookieless read-only client using the publishable key. RLS still applies, so
 * this only ever sees published posts. Safe to use at build time (e.g. inside
 * generateStaticParams) and on cached/ISR pages, where the cookie-based server
 * client cannot be used because there is no request.
 */
export function createStaticClient() {
  return createClient<Database>(SUPABASE_URL!, SUPABASE_PUBLISHABLE_KEY!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
