import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher({ className = '' }) {
  const { i18n } = useTranslation();
  const current = i18n.language;

  const toggle = (lang) => {
    if (lang === current) return;
    i18n.changeLanguage(lang);
    localStorage.setItem('wasalni_lang', lang);
  };

  return (
    <div
      className={`flex items-center rounded-lg border border-gray-200 overflow-hidden text-sm font-medium ${className}`}
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => toggle('fr')}
        className={`px-2 py-1 transition-colors ${
          current === 'fr'
            ? 'bg-primary-600 text-white'
            : 'bg-white text-gray-500 hover:text-primary-600'
        }`}
        aria-pressed={current === 'fr'}
      >
        FR
      </button>
      <button
        type="button"
        onClick={() => toggle('en')}
        className={`px-2 py-1 transition-colors ${
          current === 'en'
            ? 'bg-primary-600 text-white'
            : 'bg-white text-gray-500 hover:text-primary-600'
        }`}
        aria-pressed={current === 'en'}
      >
        EN
      </button>
    </div>
  );
}
