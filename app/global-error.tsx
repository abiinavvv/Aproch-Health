"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-[#f8f1e8] px-4 text-center font-sans text-[#1c1008]">
        <h1 className="text-3xl font-bold">Something went wrong</h1>
        <p className="mt-4 max-w-md text-base opacity-80">
          Aproch Health encountered an unexpected error. Please refresh and try again.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 rounded-2xl bg-[#2d6a4f] px-8 py-4 text-lg font-semibold text-white"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
