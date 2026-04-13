import { Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useTranslation } from 'react-i18next';
import Button from '../components/common/Button';

export default function HomePage() {
  const { user } = useAuthStore();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center">
      {/* Hero */}
      <section className="text-center py-12 md:py-20 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          🚗 {t('home.hero_title')}{' '}
          <span className="text-primary-600">Algeria</span>
        </h1>
        <p className="text-lg text-gray-500 mb-8 max-w-lg mx-auto">
          {t('home.hero_subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/rides">
            <Button size="lg">{t('home.findRide')}</Button>
          </Link>
          {user ? (
            <Link to="/rides/create">
              <Button size="lg" variant="outline">{t('home.offerRide')}</Button>
            </Link>
          ) : (
            <Link to="/register">
              <Button size="lg" variant="outline">{t('home.signUpFree')}</Button>
            </Link>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="w-full py-12 border-t border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
          {t('home.howItWorks')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="text-center p-4">
            <span className="text-4xl mb-3 block">🔍</span>
            <h3 className="font-semibold text-gray-800 mb-1">{t('home.search')}</h3>
            <p className="text-sm text-gray-500">{t('home.searchDesc')}</p>
          </div>
          <div className="text-center p-4">
            <span className="text-4xl mb-3 block">📱</span>
            <h3 className="font-semibold text-gray-800 mb-1">{t('home.book')}</h3>
            <p className="text-sm text-gray-500">{t('home.bookDesc')}</p>
          </div>
          <div className="text-center p-4">
            <span className="text-4xl mb-3 block">🚗</span>
            <h3 className="font-semibold text-gray-800 mb-1">{t('home.travel')}</h3>
            <p className="text-sm text-gray-500">{t('home.travelDesc')}</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="w-full py-12 border-t border-gray-100">
        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto text-center">
          <div>
            <p className="text-3xl font-bold text-primary-600">48</p>
            <p className="text-sm text-gray-500">{t('home.wilayasCovered')}</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary-600">24/7</p>
            <p className="text-sm text-gray-500">{t('home.available')}</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary-600">{t('home.free')}</p>
            <p className="text-sm text-gray-500">{t('home.toUse')}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
