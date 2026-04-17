import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import StarRating from '../common/StarRating';
import Button from '../common/Button';

export default function RatingForm({ onSubmit, loading }) {
  const { t } = useTranslation();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      setError(t('rating.selectRating'));
      return;
    }
    setError('');
    onSubmit(rating, comment.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && (
        <div className="bg-red-50 text-red-700 p-2 rounded-lg text-sm">{error}</div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('rating.rating')}
        </label>
        <StarRating rating={rating} onChange={setRating} />
      </div>
      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
          {t('rating.comment')}
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={t('rating.commentPlaceholder')}
          rows={2}
          maxLength={500}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>
      <Button type="submit" loading={loading} size="sm">
        {t('rating.submit')}
      </Button>
    </form>
  );
}
