import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
      <div className="flex h-16 items-center justify-between max-w-6xl mx-auto w-full">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-2xl">React Basics Tutorial</span>
        </Link>
        <nav className="flex items-center">
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
