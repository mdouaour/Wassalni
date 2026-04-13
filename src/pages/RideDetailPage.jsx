import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRideStore } from '../stores/rideStore';
import { useBookingStore } from '../stores/bookingStore';
import { useAuthStore } from '../stores/authStore';
import { useRatingStore } from '../stores/ratingStore';
import { formatDate, formatTime, formatPrice, calculateAverageRating } from '../lib/helpers';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Button from '../components/common/Button';
import RatingForm from '../components/ratings/RatingForm';
import RatingList from '../components/ratings/RatingList';

export default function RideDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { currentRide, loading, fetchRide } = useRideStore();
  const { createBooking, loading: bookingLoading, error: bookingError } = useBookingStore();
  const { user } = useAuthStore();
  const { ratings, fetchUserRatings, createRating, loading: ratingLoading } = useRatingStore();
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [showRatingForm, setShowRatingForm] = useState(false);

  useEffect(() => {
    fetchRide(id);
  }, [id, fetchRide]);

  useEffect(() => {
    if (currentRide?.driver?.id) {
      fetchUserRatings(currentRide.driver.id);
    }
  }, [currentRide?.driver?.id, fetchUserRatings]);

  const handleBook = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    const booking = await createBooking(id, user.id);
    if (booking) {
      setBookingSuccess(true);
    }
  };

  const handleRating = async (rating, comment) => {
    if (!user || !currentRide?.driver?.id) return;
    const result = await createRating(user.id, currentRide.driver.id, rating, comment);
    if (result) {
      setShowRatingForm(false);
      fetchUserRatings(currentRide.driver.id);
    }
  };

  if (loading) return <LoadingSpinner size="lg" className="py-20" />;

  if (!currentRide) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 mb-4">{t('rideDetail.rideNotFound')}</p>
        <Link to="/rides" className="text-primary-600 hover:underline">
          {t('rideDetail.backToRides')}
        </Link>
      </div>
    );
  }

  const isDriver = user?.id === currentRide.driver_id;
  const avgRating = calculateAverageRating(ratings);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link to="/rides" className="text-primary-600 hover:underline text-sm">
        {t('rideDetail.backToRides')}
      </Link>

      {/* Main ride info */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            {currentRide.departure_city}
          </h1>
          <span className="text-primary-500 text-xl">→</span>
          <h1 className="text-2xl font-bold text-gray-800">
            {currentRide.destination_city}
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">{t('rideDetail.date')}</p>
            <p className="font-medium">{formatDate(currentRide.departure_time)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">{t('rideDetail.time')}</p>
            <p className="font-medium">{formatTime(currentRide.departure_time)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">{t('rideDetail.pricePerSeat')}</p>
            <p className="font-bold text-primary-600 text-xl">{formatPrice(currentRide.price)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">{t('rideDetail.availableSeats')}</p>
            <p className={`font-bold text-xl ${currentRide.available_seats > 0 ? 'text-green-600' : 'text-red-500'}`}>
              {currentRide.available_seats}
            </p>
          </div>
        </div>

        {currentRide.notes && (
          <div className="border-t border-gray-100 pt-4 mb-4">
            <p className="text-sm text-gray-500 mb-1">{t('rideDetail.notes')}</p>
            <p className="text-gray-700">{currentRide.notes}</p>
          </div>
        )}

        {/* Driver info */}
        {currentRide.driver && (
          <div className="border-t border-gray-100 pt-4 mb-4">
            <p className="text-sm text-gray-500 mb-1">{t('rideDetail.driver')}</p>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold">
                {currentRide.driver.name?.[0]?.toUpperCase() || '?'}
              </div>
              <div>
                <p className="font-medium">{currentRide.driver.name}</p>
                {avgRating > 0 && (
                  <p className="text-sm text-yellow-500">
                    ★ {avgRating} ({t('rideDetail.reviews', { count: ratings.length })})
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Booking action */}
        {!isDriver && (
          <div className="border-t border-gray-100 pt-4">
            {bookingSuccess ? (
              <div className="bg-green-50 text-green-700 p-3 rounded-lg text-center">
                ✅ {t('rideDetail.bookedSuccess')}{' '}
                <Link to="/bookings" className="underline font-medium">
                  {t('rideDetail.bookings')}
                </Link>.
              </div>
            ) : bookingError ? (
              <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm mb-3">
                {bookingError}
              </div>
            ) : null}

            {!bookingSuccess && currentRide.available_seats > 0 && (
              <Button
                onClick={handleBook}
                loading={bookingLoading}
                size="lg"
                className="w-full"
              >
                {t('rideDetail.bookButton')}
              </Button>
            )}

            {currentRide.available_seats === 0 && !bookingSuccess && (
              <p className="text-center text-red-500 font-medium">
                {t('rideDetail.fullyBooked')}
              </p>
            )}
          </div>
        )}

        {isDriver && (
          <div className="border-t border-gray-100 pt-4">
            <p className="text-center text-gray-400 text-sm">{t('rideDetail.thisIsYourRide')}</p>
          </div>
        )}
      </div>

      {/* Ratings section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">{t('rideDetail.driverReviews')}</h2>
          {user && !isDriver && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowRatingForm(!showRatingForm)}
            >
              {showRatingForm ? t('cancel') : t('rideDetail.rateDriver')}
            </Button>
          )}
        </div>

        {showRatingForm && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <RatingForm onSubmit={handleRating} loading={ratingLoading} />
          </div>
        )}

        <RatingList ratings={ratings} />
      </div>
    </div>
  );
}
