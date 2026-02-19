"use client";

import { PageContainer } from "@/components/layout/PageContainer";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <PageContainer maxWidth="lg">
      <h1
        className="text-2xl font-bold text-[var(--foreground)]"
        style={{ animation: "fade-in 0.4s var(--ease-out)" }}
      >
        Settings
      </h1>
      <p className="mt-1 text-[var(--muted)]">
        App preferences and information
      </p>

      <div className="mt-8 space-y-4">
        <section
          className="rounded-[var(--radius-lg)] border border-[var(--card-border)] bg-[var(--card)] overflow-hidden"
          style={{
            animation: "fade-in-up 0.4s var(--ease-out) 0.1s forwards",
            opacity: 0,
          }}
        >
          <h2 className="px-5 py-3 text-sm font-semibold text-[var(--muted)] border-b border-[var(--card-border)]">
            Data & privacy
          </h2>
          <ul className="divide-y divide-[var(--card-border)]">
            <li className="px-5 py-4">
              <p className="font-medium text-[var(--foreground)]">
                Your data is stored privately
              </p>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Daily records are tied to this device. We don’t sell or share your data.
              </p>
            </li>
          </ul>
        </section>

        <section
          className="rounded-[var(--radius-lg)] border border-[var(--card-border)] bg-[var(--card)] overflow-hidden"
          style={{
            animation: "fade-in-up 0.4s var(--ease-out) 0.15s forwards",
            opacity: 0,
          }}
        >
          <h2 className="px-5 py-3 text-sm font-semibold text-[var(--muted)] border-b border-[var(--card-border)]">
            About
          </h2>
          <ul className="divide-y divide-[var(--card-border)]">
            <li className="px-5 py-4">
              <p className="font-medium text-[var(--foreground)]">SakhiCare</p>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Women wellness tracking — PCOD journey, daily record, insights.
              </p>
            </li>
            <li className="px-5 py-4">
              <Link
                href="/onboarding"
                className="text-sm font-medium text-[var(--primary)] hover:underline"
              >
                See how it works
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </PageContainer>
  );
}
