'use client';

import { useState } from 'react';
import Button from '@/components/Button';

export default function Home() {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    console.log(name);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="flex flex-col items-center gap-8 p-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 min-w-[400px]">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Welcome to Canva
          </h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <Button onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
