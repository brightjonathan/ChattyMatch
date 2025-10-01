import { createBrowserClient } from "@supabase/ssr";

export const createClient=()=> {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPERBASE_URL!,
    process.env.NEXT_PUBLIC_SUPERBASE_KEY!
  );
}
