"use client";

interface PageContainerProps {
  children: React.ReactNode;
  maxWidth?: "md" | "lg" | "xl" | "2xl" | "4xl";
  className?: string;
}

const maxWidthClasses = {
  md: "max-w-2xl",
  lg: "max-w-3xl",
  xl: "max-w-4xl",
  "2xl": "max-w-5xl",
  "4xl": "max-w-6xl",
};

export function PageContainer({
  children,
  maxWidth = "xl",
  className = "",
}: PageContainerProps) {
  return (
    <div
      className={`mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 ${maxWidthClasses[maxWidth]} ${className}`}
      style={{ animation: "fade-in 0.4s var(--ease-out)" }}
    >
      {children}
    </div>
  );
}
