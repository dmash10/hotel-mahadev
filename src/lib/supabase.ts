
import { createClient } from '@supabase/supabase-js';

import { Database } from '@/integrations/supabase/types';

// Project: Site hotel mahadev
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
