import { create } from 'zustand';
import { supabase, isConfigured } from '../lib/supabase';

export const useAuthStore = create((set, get) => ({
  user: null,
  profile: null,
  loading: true,
  error: null,

  initialize: async () => {
    if (!isConfigured) {
      set({ loading: false });
      return;
    }
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        set({ user: session.user });
        await get().fetchProfile(session.user.id);
      }
      set({ loading: false });

      supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session?.user) {
          set({ user: session.user });
          await get().fetchProfile(session.user.id);
        } else {
          set({ user: null, profile: null });
        }
      });
    } catch {
      set({ loading: false, error: 'Failed to initialize auth' });
    }
  },

  fetchProfile: async (userId) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      set({ error: error.message });
      return;
    }
    set({ profile: data });
  },

  signUp: async (email, password, name) => {
    set({ error: null });
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) {
      set({ error: error.message });
      return false;
    }

    if (data.user) {
      const { error: profileError } = await supabase.from('users').insert({
        id: data.user.id,
        name,
        email,
        role: 'user',
      });
      if (profileError) {
        set({ error: profileError.message });
        return false;
      }
    }

    set({ user: data.user });
    return true;
  },

  signIn: async (email, password) => {
    set({ error: null });
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      set({ error: error.message });
      return false;
    }
    set({ user: data.user });
    await get().fetchProfile(data.user.id);
    return true;
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, profile: null, error: null });
  },

  updateProfile: async (updates) => {
    const user = get().user;
    if (!user) return false;
    set({ error: null });

    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();

    if (error) {
      set({ error: error.message });
      return false;
    }
    set({ profile: data });
    return true;
  },

  clearError: () => set({ error: null }),
}));
