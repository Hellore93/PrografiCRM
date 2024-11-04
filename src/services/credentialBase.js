import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://pgoskpnxvscaxyyzytft.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnb3NrcG54dnNjYXh5eXp5dGZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAxOTAzNzMsImV4cCI6MjA0NTc2NjM3M30.sR7SxmGY7fbc3ipQTfJA6eO5QsPLullcdD6qT1ciK04";

export const Supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);