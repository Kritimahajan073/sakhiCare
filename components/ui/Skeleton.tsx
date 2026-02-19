interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`rounded-[var(--radius)] bg-[var(--card-border)]/30 animate-pulse-soft ${className}`}
      aria-hidden
    />
  );
}
