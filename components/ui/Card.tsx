import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", hover = false, ...props }, ref) => {
    const baseStyles =
      "rounded-2xl border border-rose-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm";
    const hoverStyles = hover
      ? "transition-colors hover:border-rose-200 dark:hover:border-zinc-700"
      : "";

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${hoverStyles} ${className}`}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";
