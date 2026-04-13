import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRideStore } from '../stores/rideStore';
import RideSearchForm from '../components/rides/RideSearchForm';
import RideCard from '../components/rides/RideCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';

export default function RideListPage() {
  const { rides, loading, fetchRides } = useRideStore();
  const { t } = useTranslation();

  useEffect(() => {
    fetchRides();
  }, [fetchRides]);

  const handleSearch = (filters) => {
    fetchRides(filters);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">{t('rideList.title')}</h1>
        <p className="text-gray-500">{t('rideList.subtitle')}</p>
      </div>

      <RideSearchForm onSearch={handleSearch} loading={loading} />

      {loading ? (
        <LoadingSpinner size="lg" className="py-12" />
      ) : rides.length > 0 ? (
        <div className="space-y-3">
          <p className="text-sm text-gray-400">
            {t('rideList.ridesFound', { count: rides.length })}
          </p>
          {rides.map((ride) => (
            <RideCard key={ride.id} ride={ride} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="🚗"
          title={t('rideList.noRidesTitle')}
          message={t('rideList.noRidesMessage')}
        />
      )}
    </div>
  );
}
