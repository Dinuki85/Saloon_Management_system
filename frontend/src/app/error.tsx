'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6 px-4">
      <div className="text-6xl text-red-500 font-black">Oops!</div>
      <h2 className="text-2xl font-bold text-gray-900">Something went wrong!</h2>
      <p className="text-gray-500 text-center max-w-md">
        We encountered an unexpected error. Don't worry, our team has been notified.
      </p>
      <div className="flex space-x-4">
        <button
          onClick={() => reset()}
          className="bg-purple-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-purple-700 transition-all"
        >
          Try again
        </button>
        <button
          onClick={() => window.location.href = '/'}
          className="bg-gray-100 text-gray-700 px-8 py-3 rounded-2xl font-bold hover:bg-gray-200 transition-all"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
}
