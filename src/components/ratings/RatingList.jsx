import StarRating from '../common/StarRating';
import { formatDate } from '../../lib/helpers';

export default function RatingList({ ratings }) {
  if (!ratings || ratings.length === 0) {
    return <p className="text-gray-400 text-sm">No ratings yet.</p>;
  }

  return (
    <div className="space-y-3">
      {ratings.map((r) => (
        <div key={r.id} className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">
              {r.from?.name || 'Anonymous'}
            </span>
            <span className="text-xs text-gray-400">{formatDate(r.created_at)}</span>
          </div>
          <StarRating rating={r.rating} readOnly size="sm" />
          {r.comment && (
            <p className="text-sm text-gray-600 mt-1">{r.comment}</p>
          )}
        </div>
      ))}
    </div>
  );
}
