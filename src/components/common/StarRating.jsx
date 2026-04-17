export default function StarRating({ rating = 0, onChange, size = 'md', readOnly = false }) {
  const sizes = { sm: 'text-lg', md: 'text-2xl', lg: 'text-3xl' };

  return (
    <div className="flex gap-1" role="group" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => onChange?.(star)}
          className={`
            ${sizes[size]} transition-colors
            ${readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-110'}
            ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}
          `}
          aria-label={`${star} star${star > 1 ? 's' : ''}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
