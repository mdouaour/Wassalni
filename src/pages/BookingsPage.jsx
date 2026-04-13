import { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useBookingStore } from '../stores/bookingStore';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import BookingCard from '../components/booking/BookingCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

export default function BookingsPage() {
  const { user } = useAuthStore();
  const { bookings, loading, fetchUserBookings, cancelBooking } = useBookingStore();
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    if (user) {
      fetchUserBookings(user.id);
    }
  }, [user, fetchUserBookings]);

  const handleCancel = async (bookingId, rideId) => {
    setCancellingId(bookingId);
    await cancelBooking(bookingId, rideId);
    setCancellingId(null);
  };

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">My Bookings</h1>
          <p className="text-gray-500">Manage your ride reservations</p>
        </div>

        {loading ? (
          <LoadingSpinner size="lg" className="py-12" />
        ) : bookings.length > 0 ? (
          <div className="space-y-3">
            {bookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onCancel={handleCancel}
                cancelling={cancellingId === booking.id}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="📋"
            title="No bookings yet"
            message="You haven't booked any rides. Search for available rides to get started."
            action={
              <Link to="/rides">
                <Button>Find Rides</Button>
              </Link>
            }
          />
        )}
      </div>
    </ProtectedRoute>
  );
}
