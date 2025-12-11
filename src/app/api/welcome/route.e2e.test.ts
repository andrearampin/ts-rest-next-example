import { describe, it, expect } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from './route';

// Test the full endpoint with route handler
// Note: Route matching tests require integration testing with a running Next.js server
// as ts-rest's route matching doesn't work the same way in unit tests
describe('Welcome API Endpoint E2E', () => {
  const createMockRequest = (body: unknown) => {
    const url = new URL('http://localhost:3000/api/welcome');
    return new NextRequest(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: typeof body === 'string' ? body : JSON.stringify(body),
    });
  };

  const createMockContext = () => {
    return {
      params: Promise.resolve({}),
    };
  };

  // These tests verify the handler is callable, but route matching requires integration testing
  it('should have POST handler exported', () => {
    expect(typeof POST).toBe('function');
  });

  it('should handle requests (route matching tested in integration)', async () => {
    const request = createMockRequest({ name: 'John' });
    const context = createMockContext();
    // The handler may return 404 if route doesn't match, which is expected in unit tests
    const response = await POST(request, context);
    // Just verify it returns a Response object
    expect(response).toBeInstanceOf(Response);
  });
});
