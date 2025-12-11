import { describe, it, expect } from 'vitest';
import { welcomeHandler } from './route';

describe('Welcome API Endpoint', () => {
  describe('Handler Implementation', () => {
    it('should return 200 with welcome message for valid name', async () => {
      const result = await welcomeHandler({ body: { name: 'John' } });
      expect(result.status).toBe(200);
      expect(result.body).toEqual({
        message: 'John welcome',
      });
    });

    it('should return 200 with welcome message for different names', async () => {
      const result = await welcomeHandler({ body: { name: 'Alice' } });
      expect(result.status).toBe(200);
      expect(result.body).toEqual({
        message: 'Alice welcome',
      });
    });

    it('should handle empty string name', async () => {
      const result = await welcomeHandler({ body: { name: '' } });
      expect(result.status).toBe(200);
      expect(result.body).toEqual({
        message: ' welcome',
      });
    });
  });
});
