import { Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import Button from '../components/common/Button';

export default function HomePage() {
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col items-center">
      {/* Hero */}
      <section className="text-center py-12 md:py-20 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          🚗 Share Rides Across{' '}
          <span className="text-primary-600">Algeria</span>
        </h1>
        <p className="text-lg text-gray-500 mb-8 max-w-lg mx-auto">
          WASALNI connects drivers with empty seats to passengers going the same way. 
          Save money, reduce traffic, and travel together.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/rides">
            <Button size="lg">🔍 Find a Ride</Button>
          </Link>
          {user ? (
            <Link to="/rides/create">
              <Button size="lg" variant="outline">🚗 Offer a Ride</Button>
            </Link>
          ) : (
            <Link to="/register">
              <Button size="lg" variant="outline">📝 Sign Up Free</Button>
            </Link>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="w-full py-12 border-t border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="text-center p-4">
            <span className="text-4xl mb-3 block">🔍</span>
            <h3 className="font-semibold text-gray-800 mb-1">Search</h3>
            <p className="text-sm text-gray-500">
              Enter your destination and find available rides
            </p>
          </div>
          <div className="text-center p-4">
            <span className="text-4xl mb-3 block">📱</span>
            <h3 className="font-semibold text-gray-800 mb-1">Book</h3>
            <p className="text-sm text-gray-500">
              Reserve a seat with one click and coordinate with the driver
            </p>
          </div>
          <div className="text-center p-4">
            <span className="text-4xl mb-3 block">🚗</span>
            <h3 className="font-semibold text-gray-800 mb-1">Travel</h3>
            <p className="text-sm text-gray-500">
              Share the ride, split the cost, and enjoy the journey
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="w-full py-12 border-t border-gray-100">
        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto text-center">
          <div>
            <p className="text-3xl font-bold text-primary-600">48</p>
            <p className="text-sm text-gray-500">Wilayas Covered</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary-600">24/7</p>
            <p className="text-sm text-gray-500">Available</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary-600">Free</p>
            <p className="text-sm text-gray-500">To Use</p>
          </div>
        </div>
      </section>
    </div>
  );
}
