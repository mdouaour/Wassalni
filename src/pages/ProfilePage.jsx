import { useState, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useRideStore } from '../stores/rideStore';
import { useRatingStore } from '../stores/ratingStore';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Button from '../components/common/Button';
import RideCard from '../components/rides/RideCard';
import RatingList from '../components/ratings/RatingList';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { USER_ROLES } from '../lib/constants';
import { calculateAverageRating, getInitials } from '../lib/helpers';

export default function ProfilePage() {
  const { user, profile, updateProfile, loading: authLoading } = useAuthStore();
  const { rides, fetchDriverRides, loading: ridesLoading } = useRideStore();
  const { ratings, fetchUserRatings, loading: ratingsLoading } = useRatingStore();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [tab, setTab] = useState('info');

  useEffect(() => {
    if (profile) {
      setName(profile.name || '');
    }
  }, [profile]);

  useEffect(() => {
    if (user) {
      fetchUserRatings(user.id);
      if (profile?.role === 'driver' || profile?.role === 'admin') {
        fetchDriverRides(user.id);
      }
    }
  }, [user, profile?.role, fetchDriverRides, fetchUserRatings]);

  const handleSave = async () => {
    const success = await updateProfile({ name: name.trim() });
    if (success) setEditing(false);
  };

  const handleBecomeDriver = async () => {
    await updateProfile({ role: USER_ROLES.DRIVER });
  };

  const avgRating = calculateAverageRating(ratings);

  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Profile header */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-2xl font-bold">
              {getInitials(profile?.name)}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">{profile?.name || 'User'}</h1>
              <p className="text-sm text-gray-500">{user?.email}</p>
              <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                profile?.role === 'driver' ? 'bg-green-100 text-green-700' :
                profile?.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                'bg-gray-100 text-gray-600'
              }`}>
                {profile?.role || 'user'}
              </span>
              {avgRating > 0 && (
                <span className="text-sm text-yellow-500 ml-2">★ {avgRating}</span>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 border-b border-gray-100 mb-4">
            {['info', 'rides', 'reviews'].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 text-sm font-medium capitalize border-b-2 transition-colors ${
                  tab === t
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Info tab */}
          {tab === 'info' && (
            <div className="space-y-4">
              {editing ? (
                <div className="space-y-3">
                  <div>
                    <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      id="edit-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSave} loading={authLoading} size="sm">
                      Save
                    </Button>
                    <Button variant="secondary" onClick={() => setEditing(false)} size="sm">
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{profile?.name}</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setEditing(true)}>
                      Edit
                    </Button>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Role</p>
                    <p className="font-medium capitalize">{profile?.role}</p>
                  </div>
                </div>
              )}

              {profile?.role === 'user' && (
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-sm text-gray-500 mb-2">
                    Want to offer rides? Become a driver to publish trips.
                  </p>
                  <Button variant="outline" onClick={handleBecomeDriver} loading={authLoading}>
                    🚗 Become a Driver
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Rides tab */}
          {tab === 'rides' && (
            <div>
              {ridesLoading ? (
                <LoadingSpinner className="py-8" />
              ) : rides.length > 0 ? (
                <div className="space-y-3">
                  {rides.map((ride) => (
                    <RideCard key={ride.id} ride={{ ...ride, driver: profile }} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">No rides published yet.</p>
              )}
            </div>
          )}

          {/* Reviews tab */}
          {tab === 'reviews' && (
            <div>
              {ratingsLoading ? (
                <LoadingSpinner className="py-8" />
              ) : (
                <RatingList ratings={ratings} />
              )}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
