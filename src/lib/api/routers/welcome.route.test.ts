import { describe, it, expect } from 'vitest';
import { createHandler } from './welcome.route';

describe('Welcome API Endpoint', () => {
  describe('Handler Implementation', () => {
    it('should return 200 with welcome message for valid name', async () => {
      const result = await createHandler({ body: { name: 'John' } });
      expect(result.status).toBe(200);
      expect(result.body).toEqual({
        message: 'Welcome John',
      });
    });

    it('should return 200 with welcome message for different names', async () => {
      const result = await createHandler({ body: { name: 'Alice' } });
      expect(result.status).toBe(200);
      expect(result.body).toEqual({
        message: 'Welcome Alice',
      });
    });

    it('should handle empty string name', async () => {
      const result = await createHandler({ body: { name: '' } });
      expect(result.status).toBe(200);
      expect(result.body).toEqual({
        message: 'Welcome ',
      });
    });
  });
});
