"use client"

import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { usePathname } from "next/navigation";
import { lessons } from "@/lib/lessons";

export function Header() {
  const pathname = usePathname();
  const lesson = lessons.find((l) => l.link === pathname);
  const title = lesson ? lesson.title : "React Basics Tutorial";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between max-w-6xl mx-auto w-full px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-2xl">{title}</span>
        </Link>
        <nav className="flex items-center">
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
