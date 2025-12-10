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
pnpm test src/components/Button.test.tsx
```

## Architecture

### Directory Structure
- **src/app/**: Next.js App Router pages and layouts
  - Uses file-based routing with the App Router
  - Server Components by default (use 'use client' directive for client components)
- **src/components/**: Reusable React components
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
vitest run src/components/Button.test.tsx
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
1. Create component in `src/components/ComponentName.tsx`
2. Create test file `src/components/ComponentName.test.tsx`
3. Import and use in pages or other components using `@/components/ComponentName`

### Adding a New Page
1. Create file in `src/app/` following file-based routing
2. Use Server Components by default
3. Add `'use client'` if component needs interactivity

### Customizing Tailwind Theme
1. Edit `src/app/globals.css`
2. Add custom values in `@theme` block
3. Use CSS custom properties: `--color-name`, `--font-name`, etc.
