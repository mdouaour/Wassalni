import ProtectedRoute from '../components/auth/ProtectedRoute';
import RideCreateForm from '../components/rides/RideCreateForm';

export default function CreateRidePage() {
  return (
    <ProtectedRoute requiredRole="driver">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Offer a Ride</h1>
          <p className="text-gray-500">Share your empty seats with fellow travelers</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <RideCreateForm />
        </div>
      </div>
    </ProtectedRoute>
  );
}
