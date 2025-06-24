"use client";

import { Home, LogIn,Menu } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  const navItems = [
    { href: "#sobre", label: "Sobre o Movimento" },
    { href: "#caracteristicas", label: "Características" },
    { href: "#projetos", label: "Projetos" },
    { href: "#depoimentos", label: "Depoimentos" },
    { href: "#contato", label: "Contato" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Home className="h-6 w-6 text-emerald-600" />
          <span className="text-lg font-bold text-emerald-700">MoraBem</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-emerald-600"
            >
              {item.label}
            </Link>
          ))}
          <Button
            asChild
            variant="default"
            className="bg-emerald-600 hover:bg-emerald-700 dark:text-white"
          >
            <Link href="/sign-in">
              <LogIn className="mr-2 h-4 w-4" />
              Área do Membro
            </Link>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-gray-600 transition-colors hover:text-emerald-600"
                >
                  {item.label}
                </Link>
              ))}
              <Button
                asChild
                variant="default"
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Link href="/sign-in">
                  <LogIn className="mr-2 h-4 w-4" />
                  Área do Membro
                </Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
