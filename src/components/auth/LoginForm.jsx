import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useTranslation } from 'react-i18next';
import Input from '../common/Input';
import Button from '../common/Button';

export default function LoginForm() {
  const navigate = useNavigate();
  const { signIn, loading, error, clearError } = useAuthStore();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    const success = await signIn(email, password);
    if (success) {
      navigate('/rides');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{t('auth.welcomeBack')}</h1>
        <p className="text-gray-500 mt-1">{t('auth.signInSubtitle')}</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">{error}</div>
        )}
        <Input
          id="email"
          label={t('auth.email')}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          autoComplete="email"
        />
        <Input
          id="password"
          label={t('auth.password')}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          autoComplete="current-password"
        />
        <Button type="submit" loading={loading} className="w-full" size="lg">
          {t('auth.signIn')}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-4">
        {t('auth.noAccount')}{' '}
        <Link to="/register" className="text-primary-600 hover:underline font-medium">
          {t('nav.signUp')}
        </Link>
      </p>
    </div>
  );
}
