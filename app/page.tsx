"use client";

import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";

export default function Home() {
  return (
    <PageContainer maxWidth="4xl" className="text-center">
      <section className="pt-8 sm:pt-16">
        <h1
          className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--foreground)]"
          style={{ animation: "fade-in-up 0.5s var(--ease-out)" }}
        >
          Your wellness,{" "}
          <span className="text-[var(--primary)]">tracked with care</span>
        </h1>
        <p
          className="mt-4 text-lg text-[var(--muted)] max-w-2xl mx-auto"
          style={{
            animation: "fade-in-up 0.5s var(--ease-out) forwards",
            animationDelay: "0.1s",
            opacity: 0,
          }}
        >
          SakhiCare helps you track your PCOD journey, daily habits, and
          wellness in one private place.
        </p>
        <div
          className="mt-10 flex flex-wrap justify-center gap-4"
          style={{
            animation: "fade-in-up 0.5s var(--ease-out) forwards",
            animationDelay: "0.2s",
            opacity: 0,
          }}
        >
          <Link
            href="/onboarding"
            className="inline-flex items-center justify-center rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-medium text-white shadow-lg hover:bg-[var(--primary-hover)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Get started
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-full border-2 border-[var(--primary)] px-6 py-3 text-sm font-medium text-[var(--primary)] hover:bg-[var(--primary-muted)] transition-all duration-200"
          >
            Go to Dashboard
          </Link>
        </div>
      </section>

      <section className="mt-20 grid gap-6 sm:grid-cols-3 text-left">
        {[
          {
            icon: "📝",
            title: "Daily record",
            desc: "Log what you did right and wrong each day on your PCOD journey.",
            href: "/dashboard/daily-record",
          },
          {
            icon: "📈",
            title: "Insights",
            desc: "See patterns and simple insights from your entries over time.",
            href: "/dashboard/insights",
          },
          {
            icon: "📅",
            title: "History",
            desc: "Browse and edit past daily records in a calendar view.",
            href: "/dashboard/history",
          },
        ].map((card, i) => (
          <Link
            key={card.href}
            href={card.href}
            className="block p-6 rounded-[var(--radius-lg)] border border-[var(--card-border)] bg-[var(--card)] shadow-[var(--shadow)] hover:shadow-[var(--shadow-lg)] hover:border-[var(--primary)]/30 transition-all duration-200 text-left"
            style={{
              animation: "fade-in-up 0.5s var(--ease-out) forwards",
              animationDelay: `${0.15 + i * 0.08}s`,
              opacity: 0,
            }}
          >
            <span className="text-3xl">{card.icon}</span>
            <h3 className="mt-3 text-lg font-semibold text-[var(--foreground)]">
              {card.title}
            </h3>
            <p className="mt-2 text-sm text-[var(--muted)]">{card.desc}</p>
          </Link>
        ))}
      </section>

      <footer className="mt-24 py-8 border-t border-[var(--card-border)] text-sm text-[var(--muted)]">
        SakhiCare — Your wellness, tracked with care
      </footer>
    </PageContainer>
  );
}
