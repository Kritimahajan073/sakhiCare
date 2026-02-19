import { MobileNav } from "@/components/layout/MobileNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="sm:pt-0 pt-4 pb-20 sm:pb-8">{children}</div>
      <MobileNav />
    </>
  );
}
