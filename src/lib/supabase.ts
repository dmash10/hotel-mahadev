
import { createClient } from '@supabase/supabase-js';

import { Database } from '@/integrations/supabase/types';

// Project: Site hotel mahadev
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase environment variables are missing! Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your Vercel project settings.");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
