
import { createClient } from '@supabase/supabase-js';

import { Database } from '@/integrations/supabase/types';

// Project: Site hotel mahadev (ymhooojhctunxttehqfv)
const supabaseUrl = 'https://ymhooojhctunxttehqfv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltaG9vb2poY3R1bnh0dGVocWZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzODEwMjUsImV4cCI6MjA4Mzk1NzAyNX0.ldbsMGDvJnhOgPv8_AyfJJaQ6uTrT4qiiwdllYpx6J4';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
