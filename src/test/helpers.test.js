import { describe, it, expect } from 'vitest';
import {
  formatDate,
  formatTime,
  formatPrice,
  isValidEmail,
  truncate,
  getInitials,
  calculateAverageRating,
} from '../lib/helpers';

describe('helpers', () => {
  describe('formatPrice', () => {
    it('formats price with DA suffix', () => {
      expect(formatPrice(500)).toBe('500 DA');
    });

    it('formats large numbers with locale', () => {
      const result = formatPrice(1500);
      expect(result).toContain('DA');
      expect(result).toContain('1');
      expect(result).toContain('500');
    });

    it('handles zero', () => {
      expect(formatPrice(0)).toBe('0 DA');
    });
  });

  describe('isValidEmail', () => {
    it('validates correct emails', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user@mail.dz')).toBe(true);
    });

    it('rejects invalid emails', () => {
      expect(isValidEmail('notanemail')).toBe(false);
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail('a@')).toBe(false);
      expect(isValidEmail('@b.com')).toBe(false);
    });
  });

  describe('truncate', () => {
    it('returns short text unchanged', () => {
      expect(truncate('hello', 100)).toBe('hello');
    });

    it('truncates long text', () => {
      expect(truncate('hello world', 5)).toBe('hello...');
    });

    it('handles null/undefined', () => {
      expect(truncate(null)).toBeNull();
      expect(truncate(undefined)).toBeUndefined();
    });
  });

  describe('getInitials', () => {
    it('extracts initials from a name', () => {
      expect(getInitials('Ahmed Benali')).toBe('AB');
    });

    it('handles single name', () => {
      expect(getInitials('Ahmed')).toBe('A');
    });

    it('handles null/empty', () => {
      expect(getInitials('')).toBe('?');
      expect(getInitials(null)).toBe('?');
    });

    it('limits to 2 characters', () => {
      expect(getInitials('A B C D')).toBe('AB');
    });
  });

  describe('calculateAverageRating', () => {
    it('calculates average of ratings', () => {
      const ratings = [{ rating: 5 }, { rating: 3 }, { rating: 4 }];
      expect(calculateAverageRating(ratings)).toBe(4);
    });

    it('returns 0 for empty array', () => {
      expect(calculateAverageRating([])).toBe(0);
      expect(calculateAverageRating(null)).toBe(0);
    });

    it('rounds to one decimal', () => {
      const ratings = [{ rating: 5 }, { rating: 4 }];
      expect(calculateAverageRating(ratings)).toBe(4.5);
    });
  });

  describe('formatDate', () => {
    it('formats a date string', () => {
      const result = formatDate('2025-06-15T10:00:00Z');
      expect(result).toBeTruthy();
      expect(typeof result).toBe('string');
    });
  });

  describe('formatTime', () => {
    it('formats a time string', () => {
      const result = formatTime('2025-06-15T10:30:00Z');
      expect(result).toBeTruthy();
      expect(typeof result).toBe('string');
    });
  });
});
