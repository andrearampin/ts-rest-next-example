'use client';

import {
  QueryClient,
  QueryClientProvider as TanstackQueryClientProvider,
} from '@tanstack/react-query';
import { useState } from 'react';
import { apiClient } from '@/lib/api/client';

export function QueryClientProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
          },
        },
      }),
  );

  return (
    <TanstackQueryClientProvider client={queryClient}>
      <apiClient.ReactQueryProvider>{children}</apiClient.ReactQueryProvider>
    </TanstackQueryClientProvider>
  );
}
