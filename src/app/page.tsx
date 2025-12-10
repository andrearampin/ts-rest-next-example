'use client';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="flex flex-col items-center gap-8 p-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 min-w-[400px]">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Welcome to Canva
          </h2>
        </div>
      </main>
    </div>
  );
}
