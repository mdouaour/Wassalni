import { describe, it, expect } from 'vitest';
import { ALGERIAN_CITIES, BOOKING_STATUS, USER_ROLES } from '../lib/constants';

describe('constants', () => {
  it('has a list of Algerian cities', () => {
    expect(ALGERIAN_CITIES).toBeInstanceOf(Array);
    expect(ALGERIAN_CITIES.length).toBeGreaterThan(40);
  });

  it('includes major cities', () => {
    expect(ALGERIAN_CITIES).toContain('Alger');
    expect(ALGERIAN_CITIES).toContain('Oran');
    expect(ALGERIAN_CITIES).toContain('Constantine');
    expect(ALGERIAN_CITIES).toContain('Sétif');
  });

  it('has booking statuses', () => {
    expect(BOOKING_STATUS.PENDING).toBe('pending');
    expect(BOOKING_STATUS.CONFIRMED).toBe('confirmed');
    expect(BOOKING_STATUS.CANCELLED).toBe('cancelled');
    expect(BOOKING_STATUS.COMPLETED).toBe('completed');
  });

  it('has user roles', () => {
    expect(USER_ROLES.USER).toBe('user');
    expect(USER_ROLES.DRIVER).toBe('driver');
    expect(USER_ROLES.ADMIN).toBe('admin');
  });
});
