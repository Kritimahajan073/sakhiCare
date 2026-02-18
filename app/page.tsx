import Link from "next/link";
import { PageLayout } from "@/components/layout/PageLayout";
import { MainContent } from "@/components/layout/MainContent";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <PageLayout>
      <MainContent maxWidth="4xl">
        <section className="text-center py-8">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            Your wellness,{" "}
            <span className="text-rose-600 dark:text-rose-400">
              tracked with care
            </span>
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            SakhiCare helps you track period, mood, and health in one private
            place. Built for you.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/dashboard">
              <Button variant="primary" size="lg">Go to Dashboard</Button>
            </Link>
          </div>
        </section>

        <section className="mt-20 grid gap-8 sm:grid-cols-3 text-center">
          <Card className="p-6">
            <div className="text-2xl font-semibold text-rose-600 dark:text-rose-400">
              Cycle
            </div>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Track your period and cycle with ease.
            </p>
          </Card>
          <Card className="p-6">
            <div className="text-2xl font-semibold text-rose-600 dark:text-rose-400">
              Mood
            </div>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Log how you feel and spot patterns.
            </p>
          </Card>
          <Card className="p-6">
            <div className="text-2xl font-semibold text-rose-600 dark:text-rose-400">
              Insights
            </div>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Simple insights, no overwhelm.
            </p>
          </Card>
        </section>
      </MainContent>

      <footer className="border-t border-rose-100 dark:border-zinc-800 mt-20 py-6 text-center text-sm text-zinc-500 dark:text-zinc-500">
        SakhiCare — Built with GraphQL, reusable components, and custom hooks.
      </footer>
    </PageLayout>
  );
}
