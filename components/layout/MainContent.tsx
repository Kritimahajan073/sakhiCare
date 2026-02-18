interface MainContentProps {
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl";
}

const maxWidthClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "4xl": "max-w-4xl",
};

export function MainContent({
  children,
  maxWidth = "4xl",
}: MainContentProps) {
  return (
    <main className={`mx-auto ${maxWidthClasses[maxWidth]} px-4 py-8 sm:py-12`}>
      {children}
    </main>
  );
}
