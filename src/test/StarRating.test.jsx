import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StarRating from '../components/common/StarRating';

describe('StarRating', () => {
  it('renders 5 star buttons', () => {
    render(<StarRating rating={3} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(5);
  });

  it('renders stars as readonly when readOnly is true', () => {
    render(<StarRating rating={4} readOnly />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  });
});
