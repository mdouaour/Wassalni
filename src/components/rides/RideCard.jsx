import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { formatDate, formatTime, formatPrice } from '../../lib/helpers';

export default function RideCard({ ride }) {
  const { t } = useTranslation();

  return (
    <Link
      to={`/rides/${ride.id}`}
      className="block bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md hover:border-primary-200 transition-all"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* Route */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg font-semibold text-gray-800 truncate">
              {ride.departure_city}
            </span>
            <span className="text-primary-500 flex-shrink-0">→</span>
            <span className="text-lg font-semibold text-gray-800 truncate">
              {ride.destination_city}
            </span>
          </div>

          {/* Date & Time */}
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
            <span className="flex items-center gap-1">
              📅 {formatDate(ride.departure_time)}
            </span>
            <span className="flex items-center gap-1">
              🕐 {formatTime(ride.departure_time)}
            </span>
          </div>

          {/* Driver name */}
          {ride.driver && (
            <p className="text-sm text-gray-500">
              🧑 {ride.driver.name}
            </p>
          )}
        </div>

        {/* Price & Seats */}
        <div className="text-right flex-shrink-0">
          <p className="text-xl font-bold text-primary-600">
            {formatPrice(ride.price)}
          </p>
          <p className={`text-sm font-medium ${ride.available_seats > 0 ? 'text-green-600' : 'text-red-500'}`}>
            {t('rideCard.seat', { count: ride.available_seats })}
          </p>
        </div>
      </div>

      {ride.notes && (
        <p className="mt-2 text-sm text-gray-400 truncate border-t border-gray-50 pt-2">
          📝 {ride.notes}
        </p>
      )}
    </Link>
  );
}
