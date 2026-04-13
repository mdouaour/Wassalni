export default function Input({
  label,
  error,
  id,
  className = '',
  ...props
}) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`
          w-full rounded-lg border px-3 py-2 text-gray-900
          placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500
          ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
