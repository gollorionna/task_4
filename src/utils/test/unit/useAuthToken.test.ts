import { describe, it, expect, beforeEach } from 'vitest';
import { getAuthToken } from '../../authQuery';

describe('getAuthToken', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return token from localStorage', () => {
    localStorage.setItem('token', '12345');

    const token = getAuthToken();

    expect(token).toBe('12345');
  });

  it('should return null if token does not exist', () => {
    const token = getAuthToken();

    expect(token).toBeNull();
  });
});
