"use client";

import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";

const steps = [
  {
    title: "Track daily",
    body: "Each day, note what you did right and wrong for your PCOD journey—diet, exercise, sleep, stress.",
  },
  {
    title: "Stay consistent",
    body: "A few lines per day add up. You’ll see patterns in Insights over time.",
  },
  {
    title: "Stay private",
    body: "Your data stays in your account. We don’t sell or share it.",
  },
];

export default function OnboardingPage() {
  return (
    <PageContainer maxWidth="lg">
      <div className="text-center mb-12">
        <h1
          className="text-3xl font-bold text-[var(--foreground)]"
          style={{ animation: "fade-in 0.4s var(--ease-out)" }}
        >
          Welcome to SakhiCare
        </h1>
        <p
          className="mt-2 text-[var(--muted)]"
          style={{
            animation: "fade-in 0.4s var(--ease-out) 0.1s forwards",
            opacity: 0,
          }}
        >
          Here’s how it works
        </p>
      </div>

      <ul className="space-y-8">
        {steps.map((step, i) => (
          <li
            key={step.title}
            className="flex gap-4 p-5 rounded-[var(--radius-lg)] border border-[var(--card-border)] bg-[var(--card)]"
            style={{
              animation: "slide-in-right 0.4s var(--ease-out) forwards",
              animationDelay: `${0.15 + i * 0.1}s`,
              opacity: 0,
            }}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--primary-muted)] text-[var(--primary)] font-bold">
              {i + 1}
            </span>
            <div>
              <h2 className="font-semibold text-[var(--foreground)]">
                {step.title}
              </h2>
              <p className="mt-1 text-sm text-[var(--muted)]">{step.body}</p>
            </div>
          </li>
        ))}
      </ul>

      <div
        className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
        style={{
          animation: "fade-in 0.4s var(--ease-out) 0.5s forwards",
          opacity: 0,
        }}
      >
        <Link
          href="/dashboard/daily-record"
          className="inline-flex items-center justify-center rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-medium text-white hover:bg-[var(--primary-hover)] transition-colors"
        >
          Log today’s record
        </Link>
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center rounded-full border border-[var(--border)] px-6 py-3 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--primary-muted)]/30 transition-colors"
        >
          Go to Dashboard
        </Link>
      </div>
    </PageContainer>
  );
}
