import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../components/common/Button';

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <span className="text-6xl mb-4">🗺️</span>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('notFound.title')}</h1>
      <p className="text-gray-500 mb-6">{t('notFound.message')}</p>
      <Link to="/">
        <Button>{t('goHome')}</Button>
      </Link>
    </div>
  );
}
