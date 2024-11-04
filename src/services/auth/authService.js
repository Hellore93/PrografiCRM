import { createClient } from "@supabase/supabase-js";

// Ustawienia Supabase - wstaw tutaj swoje dane
const SUPABASE_URL = "https://pgoskpnxvscaxyyzytft.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnb3NrcG54dnNjYXh5eXp5dGZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAxOTAzNzMsImV4cCI6MjA0NTc2NjM3M30.sR7SxmGY7fbc3ipQTfJA6eO5QsPLullcdD6qT1ciK04";

// Inicjalizacja klienta Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Funkcje autoryzacji
const AuthService = {
  // Funkcja logowania użytkownika
  login: async (email, password) => {
    const { user, session, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return { user, session };
  },

  // Funkcja rejestracji nowego użytkownika
  signUp: async (email, password) => {
    const { user, session, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    return { user, session };
  },

  // Funkcja wylogowania użytkownika
  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Funkcja sprawdzająca stan użytkownika
  getUser: () => {
    return supabase.auth.getUser();
  },
};

export default AuthService;