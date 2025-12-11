import { NextRequest } from 'next/server';

/**
 * Options for creating a mock NextRequest
 */
export interface CreateMockRequestOptions {
  /**
   * The URL for the request. Can be a string or URL object.
   * Defaults to 'http://localhost:3000' if not provided.
   */
  url?: string | URL;
  /**
   * HTTP method for the request
   * @default 'POST'
   */
  method?: string;
  /**
   * Custom headers for the request
   * Automatically includes 'Content-Type: application/json' if body is provided
   */
  headers?: Record<string, string>;
  /**
   * Request body. Will be automatically JSON stringified if it's an object
   */
  body?: unknown;
}

/**
 * Creates a mock NextRequest for testing API routes
 * 
 * @example
 * ```typescript
 * const request = createMockRequest({
 *   url: 'http://localhost:3000/api/welcome',
 *   method: 'POST',
 *   body: { name: 'John' }
 * });
 * ```
 */
export const createMockRequest = (options: CreateMockRequestOptions = {}): NextRequest => {
  const {
    url = 'http://localhost:3000',
    method = 'POST',
    headers = {},
    body,
  } = options;

  const requestUrl = typeof url === 'string' ? new URL(url) : url;
  
  // Automatically add Content-Type header if body is provided and not already set
  const finalHeaders = {
    ...(body && !headers['Content-Type'] ? { 'Content-Type': 'application/json' } : {}),
    ...headers,
  };

  return new NextRequest(requestUrl, {
    method,
    headers: finalHeaders,
    body: body !== undefined
      ? typeof body === 'string'
        ? body
        : JSON.stringify(body)
      : undefined,
  });
};

/**
 * Options for creating a mock Next.js route handler context
 */
export interface CreateMockContextOptions {
  /**
   * Route parameters (dynamic route segments)
   * @default {}
   */
  params?: Record<string, string | string[]>;
}

/**
 * Creates a mock context object for Next.js route handlers
 * 
 * @example
 * ```typescript
 * const context = createMockContext({
 *   params: { id: '123' }
 * });
 * ```
 */
export const createMockContext = (options: CreateMockContextOptions = {}) => {
  const { params = {} } = options;
  
  return {
    params: Promise.resolve(params),
  };
};
