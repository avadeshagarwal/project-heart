"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen flex-col items-center justify-center space-y-4 p-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Critical Error</h1>
          <p className="text-lg text-slate-500">
            A critical error occurred in the application shell.
          </p>
          <button
            onClick={() => reset()}
            className="rounded-md bg-rose-500 px-6 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity"
          >
            Reload Application
          </button>
          {process.env.NODE_ENV === 'development' && (
             <pre className="mt-8 max-w-full overflow-auto rounded-lg bg-slate-900 p-4 text-left text-sm text-slate-50">{error.message}</pre>
          )}
        </div>
      </body>
    </html>
  );
}
