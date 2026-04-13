import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export const useRideStore = create((set, get) => ({
  rides: [],
  currentRide: null,
  loading: false,
  error: null,
  filters: {
    departure: '',
    destination: '',
    date: '',
    maxPrice: '',
  },

  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),

  clearFilters: () =>
    set({
      filters: { departure: '', destination: '', date: '', maxPrice: '' },
    }),

  fetchRides: async (filters = {}) => {
    set({ loading: true, error: null });
    try {
      let query = supabase
        .from('rides')
        .select('*, driver:users!rides_driver_id_fkey(id, name, role)')
        .gte('departure_time', new Date().toISOString())
        .gt('available_seats', 0)
        .order('departure_time', { ascending: true });

      if (filters.departure) {
        query = query.ilike('departure_city', `%${filters.departure}%`);
      }
      if (filters.destination) {
        query = query.ilike('destination_city', `%${filters.destination}%`);
      }
      if (filters.date) {
        const startOfDay = new Date(filters.date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(filters.date);
        endOfDay.setHours(23, 59, 59, 999);
        query = query
          .gte('departure_time', startOfDay.toISOString())
          .lte('departure_time', endOfDay.toISOString());
      }
      if (filters.maxPrice) {
        query = query.lte('price', Number(filters.maxPrice));
      }

      const { data, error } = await query;
      if (error) throw error;
      set({ rides: data || [], loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchRide: async (id) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('rides')
        .select('*, driver:users!rides_driver_id_fkey(id, name, role)')
        .eq('id', id)
        .single();

      if (error) throw error;
      set({ currentRide: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createRide: async (ride) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('rides')
        .insert(ride)
        .select()
        .single();

      if (error) throw error;
      set((state) => ({
        rides: [data, ...state.rides],
        loading: false,
      }));
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      return null;
    }
  },

  fetchDriverRides: async (driverId) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('rides')
        .select('*, bookings(id, status, user:users!bookings_user_id_fkey(id, name))')
        .eq('driver_id', driverId)
        .order('departure_time', { ascending: false });

      if (error) throw error;
      set({ rides: data || [], loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
