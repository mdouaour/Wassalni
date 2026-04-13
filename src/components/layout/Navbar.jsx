import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import LanguageSwitcher from '../common/LanguageSwitcher';

export default function Navbar() {
  const { user, profile, signOut } = useAuthStore();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary-600">
            🚗 {t('appName')}
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/rides" className="text-gray-600 hover:text-primary-600 font-medium">
              {t('nav.findRides')}
            </Link>
            {user ? (
              <>
                {(profile?.role === 'driver' || profile?.role === 'admin') && (
                  <Link to="/rides/create" className="text-gray-600 hover:text-primary-600 font-medium">
                    {t('nav.offerRide')}
                  </Link>
                )}
                <Link to="/bookings" className="text-gray-600 hover:text-primary-600 font-medium">
                  {t('nav.myBookings')}
                </Link>
                <Link to="/profile" className="text-gray-600 hover:text-primary-600 font-medium">
                  {t('nav.profile')}
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-gray-500 hover:text-red-600 font-medium"
                >
                  {t('nav.signOut')}
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-primary-600 font-medium">
                  {t('nav.login')}
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 font-medium"
                >
                  {t('nav.signUp')}
                </Link>
              </>
            )}
            <LanguageSwitcher />
          </div>

          {/* Mobile: language + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-gray-600"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 py-2 pb-4">
            <Link
              to="/rides"
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-gray-600 hover:text-primary-600 font-medium"
            >
              {t('nav.findRides')}
            </Link>
            {user ? (
              <>
                {(profile?.role === 'driver' || profile?.role === 'admin') && (
                  <Link
                    to="/rides/create"
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 text-gray-600 hover:text-primary-600 font-medium"
                  >
                    {t('nav.offerRide')}
                  </Link>
                )}
                <Link
                  to="/bookings"
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 text-gray-600 hover:text-primary-600 font-medium"
                >
                  {t('nav.myBookings')}
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 text-gray-600 hover:text-primary-600 font-medium"
                >
                  {t('nav.profile')}
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block py-2 text-red-600 font-medium"
                >
                  {t('nav.signOut')}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 text-gray-600 hover:text-primary-600 font-medium"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 text-primary-600 font-medium"
                >
                  {t('nav.signUp')}
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
