# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 application with TypeScript, using the App Router architecture with React Server Components. The project uses the latest versions of major tools and is configured with Turbopack as the default bundler.

## Development Commands

### Running the Development Server
```bash
pnpm dev
```
Starts the development server on http://localhost:3000 with Turbopack (hot reload enabled).

### Building for Production
```bash
pnpm build
```
Creates an optimized production build using Turbopack.

### Starting Production Server
```bash
pnpm start
```
Runs the production build locally.

### Linting
```bash
pnpm lint
```
Runs ESLint with the Next.js flat config format.

### Testing
```bash
# Run tests in watch mode
pnpm test

# Run tests once
pnpm test:run

# Run tests with coverage
pnpm test:coverage

# Run a specific test file
pnpm test <path-to-test-file>
```

## Architecture

### Directory Structure
- **src/app/**: Next.js App Router pages and layouts
  - Uses file-based routing with the App Router
  - Server Components by default (use 'use client' directive for client components)
  - API routes are defined in `app/api/[...ts-rest]/route.ts` (catch-all handler)
- **src/ui/**: UI layer
  - **components/**: Reusable React components with test files alongside
  - **providers/**: React context providers (e.g., QueryClientProvider)
- **src/lib/**: Shared utilities and libraries
  - **api/**: API layer with contracts, routes, and client
    - **contract.ts**: Main API contract router
    - **client.ts**: Initialized API client for type-safe requests
    - **router.ts**: Server-side router combining all route handlers
    - **\*.contract.ts**: Individual contract definitions (e.g., welcome.contract.ts)
    - **\*.route.ts**: Individual route handlers (e.g., welcome.route.ts)
- **src/test/**: Test setup and utilities
- **public/**: Static assets

### Next.js 16 Specifics

**Important Breaking Changes:**
- Dynamic APIs are now async: Always `await` the following functions:
  - `await params`
  - `await searchParams`
  - `await cookies()`
  - `await headers()`
  - `await draftMode()`

**Turbopack:**
- Default bundler in Next.js 16 (stable)
- 2-5x faster builds, up to 10x faster Fast Refresh
- To use webpack instead: Add `--webpack` flag to commands

**React 19.2:**
- This project uses React 19.2 with all latest features
- Server Components are used by default in App Router

### Styling with Tailwind CSS v4

This project uses Tailwind CSS v4, which has significant changes from v3:

**CSS-First Configuration:**
- No `tailwind.config.js` file needed
- Customize themes in CSS using `@theme` blocks in `src/app/globals.css`
- Example:
```css
@theme {
  --color-primary: #3b82f6;
  --font-heading: "Inter", sans-serif;
}
```

**PostCSS Configuration:**
- Uses `@tailwindcss/postcss` plugin (configured in `postcss.config.mjs`)
- Single `@import "tailwindcss"` directive in CSS
- Automatic content detection (no manual content array needed)

**Performance:**
- 3.78x faster full builds
- 182x faster incremental builds

### Testing with Vitest 4

**Configuration:**
- Vitest config in `vitest.config.ts`
- Uses `jsdom` environment for DOM testing
- React Testing Library 16.3.0 (requires `@testing-library/dom` as peer dependency)
- Global test utilities enabled

**Writing Tests:**
- Place test files alongside components: `Component.test.tsx`
- Use React Testing Library for component testing
- Import assertions from `@testing-library/jest-dom` (auto-imported via setup)

**Running Specific Tests:**
```bash
vitest run <path-to-test-file>
```

### TypeScript Configuration

- TypeScript 5.9.3+
- Strict mode enabled
- Path aliases configured: `@/*` maps to `src/*`
- ESLint integration with TypeScript

### ESLint Configuration

- Uses ESLint Flat Config format (`eslint.config.mjs`)
- Extends `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- Automatic linting for Next.js best practices

### API Architecture

This project uses a contract-based API architecture for type-safe client-server communication:

**Contract Pattern:**
- API contracts are defined in `src/lib/api/` using ts-rest
- Each domain has its own contract file (e.g., `welcome.contract.ts`)
- Contracts are combined in `contract.ts` using `initContract().router()`
- Uses Zod for request/response validation

**Route Handlers:**
- Route handlers are defined in `src/lib/api/*.route.ts`
- Each route file exports a router created with `tsr.router()`
- All routes are combined in `router.ts`
- Test files are placed alongside route files (e.g., `welcome.route.test.ts`)

**API Client:**
- Initialized in `src/lib/api/client.ts` using `initTsrReactQuery`
- Provides type-safe hooks for making API requests
- Handles data fetching, caching, and state management automatically

**Catch-All Handler:**
- Single catch-all route at `src/app/api/[...ts-rest]/route.ts`
- Uses `createNextHandler` from `@ts-rest/serverless/next`
- Handles all HTTP methods (GET, POST, PUT, PATCH, DELETE, OPTIONS)
- Enables response validation and JSON query support

### React Query Integration

**Provider Setup:**
- React Query is configured in `src/ui/providers/QueryClientProvider.tsx`
- Wraps the application in the root layout
- Provides query client with default options (1 minute stale time)
- Nests `apiClient.ReactQueryProvider` for ts-rest integration

**Usage Pattern:**
- Use `apiClient` hooks (e.g., `useMutation`, `useQuery`) for data operations
- Hooks are automatically typed based on contract definitions
- Handles loading states, errors, and caching automatically

## Key Configuration Files

- **next.config.ts**: Next.js configuration (TypeScript support)
- **vitest.config.ts**: Vitest test runner configuration
- **postcss.config.mjs**: PostCSS with Tailwind v4 plugin
- **eslint.config.mjs**: ESLint flat config format
- **tsconfig.json**: TypeScript compiler options
- **src/app/globals.css**: Global styles with Tailwind v4 import and theme

## Tech Stack Versions

- **Next.js**: 16.0.8
- **React**: 19.2.1
- **TypeScript**: 5.9.3
- **Tailwind CSS**: 4.1.17
- **Vitest**: 4.0.15
- **React Testing Library**: 16.3.0
- **Node.js**: Requires 20.9.0+

## Development Notes

### Server vs Client Components
- Components in `src/app/` are Server Components by default
- Add `'use client'` directive at the top for client components (needed for hooks, event handlers)
- Server Components can't use hooks or browser APIs
- Client Components can't use async/await at component level

### Turbopack Caveats
- If experiencing issues, can fallback to webpack with `pnpm dev --webpack`
- Turbopack is stable but some edge cases may differ from webpack

### Tailwind v4 Migration Notes
- Arbitrary values work the same: `className="w-[123px]"`
- Dynamic classes work automatically (no safelist needed)
- Use CSS variables for theming instead of JavaScript config
- Container queries available with `@container` directive

## Common Development Tasks

### Adding a New Component
1. Create component file in `src/ui/components/`
2. Create corresponding test file alongside the component (e.g., `Button.test.tsx`)
3. Import and use in pages or other components using the `@/ui/components/` path alias

### Adding a New Page
1. Create file in `src/app/` following Next.js file-based routing conventions
2. Use Server Components by default for optimal performance
3. Add `'use client'` directive if component needs client-side interactivity

### Adding a New API Endpoint
1. Create a contract file in `src/lib/api/` (e.g., `users.contract.ts`) with Zod schemas
2. Add the contract to the main router in `src/lib/api/contract.ts`
3. Create a route handler file (e.g., `users.route.ts`) using `tsr.router()`
4. Add the route handler to `src/lib/api/router.ts`
5. Create tests alongside the route file (e.g., `users.route.test.ts`)
6. Use `apiClient` hooks in components for type-safe client requests

### Customizing Tailwind Theme
1. Edit `src/app/globals.css`
2. Add custom values in `@theme` block
3. Use CSS custom properties: `--color-name`, `--font-name`, etc.
