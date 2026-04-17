import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CitySelect from '../common/CitySelect';
import Button from '../common/Button';

export default function RideSearchForm({ onSearch, loading }) {
  const { t } = useTranslation();
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ departure, destination, date, maxPrice });
  };

  const handleReset = () => {
    setDeparture('');
    setDestination('');
    setDate('');
    setMaxPrice('');
    onSearch({});
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <CitySelect
          id="search-departure"
          label={t('rideSearch.from')}
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
          placeholder={t('rideSearch.anyCity')}
        />
        <CitySelect
          id="search-destination"
          label={t('rideSearch.to')}
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder={t('rideSearch.anyCity')}
        />
        <div>
          <label htmlFor="search-date" className="block text-sm font-medium text-gray-700 mb-1">
            {t('rideSearch.date')}
          </label>
          <input
            id="search-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label htmlFor="search-price" className="block text-sm font-medium text-gray-700 mb-1">
            {t('rideSearch.maxPrice')}
          </label>
          <input
            id="search-price"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder={t('rideSearch.anyPrice')}
            min="0"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <Button type="submit" loading={loading} className="flex-1">
          {t('rideSearch.searchButton')}
        </Button>
        <Button type="button" variant="secondary" onClick={handleReset}>
          {t('clear')}
        </Button>
      </div>
    </form>
  );
}
