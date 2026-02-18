import Link from "next/link";

interface NavLink {
  href: string;
  label: string;
  active?: boolean;
}

interface HeaderProps {
  currentPath?: string;
}

const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/daily-record", label: "Daily record" },
];

export function Header({ currentPath }: HeaderProps) {
  return (
    <header className="border-b border-rose-100 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
        <Link
          href="/"
          className="text-xl font-semibold text-rose-700 dark:text-rose-300"
        >
          SakhiCare
        </Link>
        <nav className="flex gap-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          {navLinks.map((link) => {
            const isActive = currentPath === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  isActive
                    ? "text-rose-600 dark:text-rose-400"
                    : "hover:text-rose-600 dark:hover:text-rose-400"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
