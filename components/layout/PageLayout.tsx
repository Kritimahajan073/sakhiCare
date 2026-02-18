"use client";

import { Header } from "./Header";
import { usePathname } from "next/navigation";

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-linear-to-b from-rose-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      <Header currentPath={pathname || undefined} />
      {children}
    </div>
  );
}
