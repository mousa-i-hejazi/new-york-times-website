// ============================================================
// ErrorMessage — displays API errors with retry option
// ============================================================

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  // Special guidance for missing API key
  const isMissingKey = message.toLowerCase().includes('api key');

  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 gap-6 text-center">
      <div className="w-16 h-16 flex items-center justify-center border-2 border-accent-red text-accent-red">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
      </div>

      <div className="max-w-md">
        <h3 className="font-display tracking-widest text-ink text-xl mb-3">
          UNABLE TO LOAD STORIES
        </h3>
        <p className="font-sans text-ink-muted text-sm leading-relaxed">{message}</p>

        {isMissingKey && (
          <div className="mt-4 p-4 bg-paper-warm border border-ink/10 text-left text-xs font-sans text-ink-muted space-y-1.5">
            <p className="font-semibold text-ink">Quick setup:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>
                Get a free API key at{' '}
                <a
                  href="https://developer.nytimes.com/get-started"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-red underline"
                >
                  developer.nytimes.com
                </a>
              </li>
              <li>Create a <code className="bg-paper-card px-1">.env</code> file in the project root</li>
              <li>Add: <code className="bg-paper-card px-1">VITE_NYT_API_KEY=your_key_here</code></li>
              <li>Restart the dev server</li>
            </ol>
          </div>
        )}
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="font-display tracking-widest text-sm px-6 py-3 bg-ink text-paper hover:bg-ink-soft transition-colors"
        >
          TRY AGAIN
        </button>
      )}
    </div>
  );
}
