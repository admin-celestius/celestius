import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
// Use service role key only on the server, anon key on the client
export const supabase =
  typeof window === 'undefined' && supabaseServiceRoleKey
    ? createClient(supabaseUrl, supabaseServiceRoleKey)
    : createClient(supabaseUrl, supabaseAnonKey);
