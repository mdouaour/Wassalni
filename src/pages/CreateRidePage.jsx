import { useTranslation } from 'react-i18next';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import RideCreateForm from '../components/rides/RideCreateForm';

export default function CreateRidePage() {
  const { t } = useTranslation();

  return (
    <ProtectedRoute requiredRole="driver">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{t('createRide.title')}</h1>
          <p className="text-gray-500">{t('createRide.subtitle')}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <RideCreateForm />
        </div>
      </div>
    </ProtectedRoute>
  );
}
