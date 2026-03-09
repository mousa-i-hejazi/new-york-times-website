// ============================================================
// LoadingSpinner — animated loading indicator
// ============================================================

interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({ message = 'Loading stories…' }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-6">
      {/* Animated newspaper-style loading graphic */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-2 border-ink/20 rounded-full" />
        <div className="absolute inset-0 border-t-2 border-accent-red rounded-full animate-spin" />
      </div>
      <div className="flex flex-col items-center gap-1">
        <p className="font-display tracking-widest text-ink-muted text-sm uppercase">
          {message}
        </p>
        <div className="flex gap-1 mt-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 bg-accent-red rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
