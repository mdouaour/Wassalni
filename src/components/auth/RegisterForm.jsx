import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useTranslation } from 'react-i18next';
import Input from '../common/Input';
import Button from '../common/Button';
import { isValidEmail } from '../../lib/helpers';

export default function RegisterForm() {
  const navigate = useNavigate();
  const { signUp, loading, error, clearError } = useAuthStore();
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = t('auth.nameRequired');
    if (!form.email) newErrors.email = t('auth.emailRequired');
    else if (!isValidEmail(form.email)) newErrors.email = t('auth.invalidEmail');
    if (!form.password) newErrors.password = t('auth.passwordRequired');
    else if (form.password.length < 6) newErrors.password = t('auth.passwordMinLength');
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = t('auth.passwordMismatch');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    if (!validate()) return;

    const success = await signUp(form.email, form.password, form.name.trim());
    if (success) {
      navigate('/rides');
    }
  };

  const updateField = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{t('auth.createAccount')}</h1>
        <p className="text-gray-500 mt-1">{t('auth.createAccountSubtitle')}</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">{error}</div>
        )}
        <Input
          id="name"
          label={t('auth.fullName')}
          value={form.name}
          onChange={updateField('name')}
          error={errors.name}
          placeholder="Ahmed Benali"
          required
          autoComplete="name"
        />
        <Input
          id="email"
          label={t('auth.email')}
          type="email"
          value={form.email}
          onChange={updateField('email')}
          error={errors.email}
          placeholder="your@email.com"
          required
          autoComplete="email"
        />
        <Input
          id="password"
          label={t('auth.password')}
          type="password"
          value={form.password}
          onChange={updateField('password')}
          error={errors.password}
          placeholder="••••••••"
          required
          autoComplete="new-password"
        />
        <Input
          id="confirmPassword"
          label={t('auth.confirmPassword')}
          type="password"
          value={form.confirmPassword}
          onChange={updateField('confirmPassword')}
          error={errors.confirmPassword}
          placeholder="••••••••"
          required
          autoComplete="new-password"
        />
        <Button type="submit" loading={loading} className="w-full" size="lg">
          {t('auth.createAccount')}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-4">
        {t('auth.alreadyAccount')}{' '}
        <Link to="/login" className="text-primary-600 hover:underline font-medium">
          {t('auth.signIn')}
        </Link>
      </p>
    </div>
  );
}
