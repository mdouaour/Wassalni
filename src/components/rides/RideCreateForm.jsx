import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useRideStore } from '../../stores/rideStore';
import { useTranslation } from 'react-i18next';
import CitySelect from '../common/CitySelect';
import Input from '../common/Input';
import Button from '../common/Button';

export default function RideCreateForm() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { createRide, loading, error, clearError } = useRideStore();
  const { t } = useTranslation();

  const [form, setForm] = useState({
    departure_city: '',
    destination_city: '',
    departure_time: '',
    price: '',
    available_seats: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.departure_city) newErrors.departure_city = t('createRide.departureCityRequired');
    if (!form.destination_city) newErrors.destination_city = t('createRide.destinationCityRequired');
    if (form.departure_city && form.departure_city === form.destination_city) {
      newErrors.destination_city = t('createRide.differentCities');
    }
    if (!form.departure_time) newErrors.departure_time = t('createRide.departureTimeRequired');
    if (form.departure_time && new Date(form.departure_time) < new Date()) {
      newErrors.departure_time = t('createRide.departureTimeFuture');
    }
    if (!form.price || Number(form.price) <= 0) newErrors.price = t('createRide.validPrice');
    if (!form.available_seats || Number(form.available_seats) < 1 || Number(form.available_seats) > 8) {
      newErrors.available_seats = t('createRide.seatsRange');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    if (!validate()) return;

    const ride = await createRide({
      driver_id: user.id,
      departure_city: form.departure_city,
      destination_city: form.destination_city,
      departure_time: new Date(form.departure_time).toISOString(),
      price: Number(form.price),
      available_seats: Number(form.available_seats),
      notes: form.notes.trim() || null,
    });

    if (ride) {
      navigate(`/rides/${ride.id}`);
    }
  };

  const updateField = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">{error}</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CitySelect
          id="departure_city"
          label={t('createRide.departureCity')}
          value={form.departure_city}
          onChange={updateField('departure_city')}
          error={errors.departure_city}
        />
        <CitySelect
          id="destination_city"
          label={t('createRide.destinationCity')}
          value={form.destination_city}
          onChange={updateField('destination_city')}
          error={errors.destination_city}
        />
      </div>

      <Input
        id="departure_time"
        label={t('createRide.departureDateTime')}
        type="datetime-local"
        value={form.departure_time}
        onChange={updateField('departure_time')}
        error={errors.departure_time}
        min={new Date().toISOString().slice(0, 16)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          id="price"
          label={t('createRide.pricePerSeat')}
          type="number"
          value={form.price}
          onChange={updateField('price')}
          error={errors.price}
          placeholder="e.g. 500"
          min="0"
        />
        <Input
          id="available_seats"
          label={t('createRide.availableSeats')}
          type="number"
          value={form.available_seats}
          onChange={updateField('available_seats')}
          error={errors.available_seats}
          placeholder={t('createRide.seatsPlaceholder')}
          min="1"
          max="8"
        />
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
          {t('createRide.notes')}
        </label>
        <textarea
          id="notes"
          value={form.notes}
          onChange={updateField('notes')}
          placeholder={t('createRide.notesPlaceholder')}
          rows={3}
          maxLength={500}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <Button type="submit" loading={loading} size="lg" className="w-full">
        {t('createRide.publish')}
      </Button>
    </form>
  );
}
