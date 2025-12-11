'use client';

import { useState } from 'react';
import Button from '@/ui/components/Button';
import { apiClient } from '@/lib/api/client';

export default function Home() {
  const [name, setName] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    mutate: submitWelcome,
    isPending,
  } = apiClient.welcome.create.useMutation({
    onSuccess: (response) => {
      setErrorMessage(null);
      setWelcomeMessage(response.body.message);
    },
    onError: (error) => {
      console.error(error);
      setWelcomeMessage(null);
      setErrorMessage('An unexpected error occurred. Please try again.');
    },
  });

  const handleSubmit = () => {
    const trimmedName = name.trim();
    if (!trimmedName) return;
    
    submitWelcome({
      body: {
        name: trimmedName,
      },
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="flex flex-col items-center gap-8 p-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 min-w-[400px]">
          {welcomeMessage && (
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              {welcomeMessage}
            </h2>
          )}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-md">
              <p className="text-red-800 dark:text-red-200 text-sm">
                {errorMessage}
              </p>
            </div>
          )}
          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <Button onClick={handleSubmit} loading={isPending}>
              Submit
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
