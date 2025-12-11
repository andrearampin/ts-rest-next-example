# TS-Rest Next Example

A modern Next.js web application built with TypeScript, featuring type-safe API contracts, server-side rendering, and a comprehensive testing setup.

## Overview

This is a Next.js 16 application that demonstrates modern web development practices including:

- **Type-safe API contracts** between client and server
- **React Server Components** for optimal performance
- **TypeScript** for type safety throughout the stack
- **Tailwind CSS v4** for styling
- **React Query** for efficient data fetching and caching
- **Comprehensive testing** with Vitest and React Testing Library

## Tech Stack

- **Framework**: Next.js 16.0.8 (App Router)
- **Runtime**: React 19.2.1
- **Language**: TypeScript 5.9.3
- **Styling**: Tailwind CSS 4.1.17
- **Testing**: Vitest 4.0.15, React Testing Library 16.3.0
- **Data Fetching**: React Query (@tanstack/react-query)
- **API Contracts**: ts-rest for type-safe client-server communication
- **Node.js**: Requires 20.9.0+

## Getting Started

### Prerequisites

- Node.js 20.9.0 or higher
- pnpm (recommended) or npm/yarn

### Installation

```bash
# Install dependencies
pnpm install
```

### Development

Start the development server with hot reload:

```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Building for Production

Create an optimized production build:

```bash
pnpm build
```

### Running Production Build

Run the production build locally:

```bash
pnpm start
```

## Testing

### Run Tests

Run tests in watch mode:

```bash
pnpm test
```

Run tests once:

```bash
pnpm test:run
```

Run tests with coverage:

```bash
pnpm test:coverage
```

### Test Structure

- Test files are placed alongside components: `Component.test.tsx`
- Uses Vitest with jsdom environment for DOM testing
- React Testing Library for component testing
- Test setup is configured in `src/test/setup.ts`

## Linting

Run ESLint to check code quality:

```bash
pnpm lint
```

## Project Structure

```
src/
├── app/              # Next.js App Router pages and layouts
│   └── api/          # API catch-all handler
├── ui/               # UI layer
│   ├── components/   # Reusable React components
│   └── providers/    # React context providers
├── lib/              # Shared utilities
│   └── api/          # API layer
│       ├── contract.ts       # Main API contract router
│       ├── client.ts         # API client initialization
│       ├── router.ts         # Server-side route router
│       └── *.route.ts        # Individual route handlers
└── test/             # Test setup and utilities

public/               # Static assets
```

## Key Features

- **Type-Safe APIs**: Contract-based API definitions ensure type safety between client and server
- **Server Components**: Default use of React Server Components for optimal performance
- **Modern Styling**: Tailwind CSS v4 with CSS-first configuration
- **Fast Development**: Turbopack bundler for faster builds and hot reload
- **Comprehensive Testing**: Full test coverage with Vitest and React Testing Library

## Development Notes

- Components in `src/app/` are Server Components by default
- Add `'use client'` directive for client-side interactivity
- API contracts and routes are defined in `src/lib/api/` for type-safe communication
- React Query is configured in `src/ui/providers/QueryClientProvider.tsx`

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
