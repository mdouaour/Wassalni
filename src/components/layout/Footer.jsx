import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <span className="font-bold text-primary-600">🚗 {t('appName')}</span>
            <span className="text-sm">— {t('appSlogan')}</span>
          </div>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} {t('appName')}. {t('footer.tagline')}
          </p>
        </div>
      </div>
    </footer>
  );
}
