import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import EmptyState from '../components/common/EmptyState';

describe('EmptyState', () => {
  it('renders title and message', () => {
    render(<EmptyState title="No results" message="Try again later" />);
    expect(screen.getByText('No results')).toBeInTheDocument();
    expect(screen.getByText('Try again later')).toBeInTheDocument();
  });

  it('renders custom icon', () => {
    render(<EmptyState icon="🚗" title="No rides" />);
    expect(screen.getByText('🚗')).toBeInTheDocument();
  });

  it('renders action element', () => {
    render(<EmptyState title="Test" action={<button>Action</button>} />);
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });
});
