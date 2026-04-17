import { useTranslation } from 'react-i18next';
import { formatDate, formatTime, formatPrice } from '../../lib/helpers';
import Button from '../common/Button';

const statusKeys = {
  pending: 'bookingCard.status.pending',
  confirmed: 'bookingCard.status.confirmed',
  cancelled: 'bookingCard.status.cancelled',
  completed: 'bookingCard.status.completed',
};

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  completed: 'bg-blue-100 text-blue-700',
};

export default function BookingCard({ booking, onCancel, cancelling }) {
  const { t } = useTranslation();
  const ride = booking.ride;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {ride && (
            <>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-gray-800">{ride.departure_city}</span>
                <span className="text-primary-500">→</span>
                <span className="font-semibold text-gray-800">{ride.destination_city}</span>
              </div>
              <div className="text-sm text-gray-500 space-y-1">
                <p>
                  📅 {formatDate(ride.departure_time)} {t('bookingCard.at')}{' '}
                  {formatTime(ride.departure_time)}
                </p>
                <p>💰 {formatPrice(ride.price)}</p>
                {ride.driver && (
                  <p>🧑 {t('bookingCard.driver')}: {ride.driver.name}</p>
                )}
              </div>
            </>
          )}
        </div>

        <div className="text-right flex-shrink-0">
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${statusColors[booking.status]}`}>
            {t(statusKeys[booking.status] ?? booking.status)}
          </span>
        </div>
      </div>

      {booking.status === 'pending' && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <Button
            variant="danger"
            size="sm"
            loading={cancelling}
            onClick={() => onCancel(booking.id, ride?.id)}
          >
            {t('bookingCard.cancelBooking')}
          </Button>
        </div>
      )}
    </div>
  );
}
