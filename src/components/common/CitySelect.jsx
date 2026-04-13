import { ALGERIAN_CITIES } from '../../lib/constants';

export default function CitySelect({
  label,
  value,
  onChange,
  error,
  id,
  placeholder = 'Select a city',
  className = '',
}) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={`
          w-full rounded-lg border px-3 py-2 text-gray-900 bg-white
          focus:outline-none focus:ring-2 focus:ring-primary-500
          ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}
        `}
      >
        <option value="">{placeholder}</option>
        {ALGERIAN_CITIES.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
