import { createClient } from "@supabase/supabase-js";

// URL de notre projet supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

// Clé publique Supabase
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Création du client Supabase
export const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey
);
