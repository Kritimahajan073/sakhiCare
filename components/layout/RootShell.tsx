"use client";

import { AppShell } from "./AppShell";

export function RootShell({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
