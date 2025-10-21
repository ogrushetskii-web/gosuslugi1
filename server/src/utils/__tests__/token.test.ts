import { describe, expect, it } from 'vitest';
import { signToken, verifyToken } from '../token';

describe('token utilities', () => {
  it('signs and verifies payload', () => {
    const token = signToken({ sub: 'user-1', familyId: 'family-1', role: 'ADMIN' });
    const payload = verifyToken(token);
    expect(payload.sub).toBe('user-1');
    expect(payload.familyId).toBe('family-1');
  });
});
