import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export const useBookingStore = create((set) => ({
  bookings: [],
  loading: false,
  error: null,

  fetchUserBookings: async (userId) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*, ride:rides(*, driver:users!rides_driver_id_fkey(id, name))')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ bookings: data || [], loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createBooking: async (rideId, userId) => {
    set({ loading: true, error: null });
    try {
      // Check available seats
      const { data: ride, error: rideError } = await supabase
        .from('rides')
        .select('available_seats')
        .eq('id', rideId)
        .single();

      if (rideError) throw rideError;
      if (ride.available_seats <= 0) {
        throw new Error('No seats available');
      }

      // Check for existing booking
      const { data: existing } = await supabase
        .from('bookings')
        .select('id')
        .eq('ride_id', rideId)
        .eq('user_id', userId)
        .neq('status', 'cancelled')
        .single();

      if (existing) {
        throw new Error('You already have a booking for this ride');
      }

      // Create booking
      const { data, error } = await supabase
        .from('bookings')
        .insert({ ride_id: rideId, user_id: userId, status: 'pending' })
        .select()
        .single();

      if (error) throw error;

      // Decrease available seats
      await supabase
        .from('rides')
        .update({ available_seats: ride.available_seats - 1 })
        .eq('id', rideId);

      set((state) => ({
        bookings: [data, ...state.bookings],
        loading: false,
      }));
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      return null;
    }
  },

  cancelBooking: async (bookingId, rideId) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId);

      if (error) throw error;

      // Increase available seats back
      const { data: ride } = await supabase
        .from('rides')
        .select('available_seats')
        .eq('id', rideId)
        .single();

      if (ride) {
        await supabase
          .from('rides')
          .update({ available_seats: ride.available_seats + 1 })
          .eq('id', rideId);
      }

      set((state) => ({
        bookings: state.bookings.map((b) =>
          b.id === bookingId ? { ...b, status: 'cancelled' } : b,
        ),
        loading: false,
      }));
      return true;
    } catch (error) {
      set({ error: error.message, loading: false });
      return false;
    }
  },

  clearError: () => set({ error: null }),
}));
