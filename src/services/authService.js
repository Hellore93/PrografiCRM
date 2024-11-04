import { Supabase } from "./credentialBase";

const AuthService = {
  login: async (email, password) => {
    const { user, session, error } = await Supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return { user, session };
  },

//   signUp: async (email, password) => {
//     const { user, session, error } = await Supabase.auth.signUp({
//       email,
//       password,
//     });
//     if (error) throw error;
//     return { user, session };
//   },

  logout: async () => {
    const { error } = await Supabase.auth.signOut();
    if (error) throw error;
  },

  getUser: () => {
    return Supabase.auth.getUser();
  },
};

export default AuthService;