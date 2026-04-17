import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export const useRatingStore = create((set) => ({
  ratings: [],
  loading: false,
  error: null,

  fetchUserRatings: async (userId) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('ratings')
        .select('*, from:users!ratings_from_user_fkey(id, name)')
        .eq('to_user', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ ratings: data || [], loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createRating: async (fromUser, toUser, rating, comment) => {
    set({ loading: true, error: null });
    try {
      // Check for existing rating
      const { data: existing } = await supabase
        .from('ratings')
        .select('id')
        .eq('from_user', fromUser)
        .eq('to_user', toUser)
        .single();

      if (existing) {
        throw new Error('You have already rated this user');
      }

      const { data, error } = await supabase
        .from('ratings')
        .insert({ from_user: fromUser, to_user: toUser, rating, comment })
        .select()
        .single();

      if (error) throw error;
      set((state) => ({
        ratings: [data, ...state.ratings],
        loading: false,
      }));
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      return null;
    }
  },

  clearError: () => set({ error: null }),
}));
