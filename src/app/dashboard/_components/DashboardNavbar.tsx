"use client";
import {
  BarChart3,
  BarChart3 as BarChartIcon,
  Home,
  LogOut,
  Menu,
  PlusCircle,
  Settings,
  UserCircle,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { getFirstAndLastName } from "../page";

interface DashboardNavbarProps {
  user: { name: string; email: string; role: string };
  onLogout: () => void;
}

export function DashboardNavbar({ user, onLogout }: DashboardNavbarProps) {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const nomeCurto = getFirstAndLastName(user?.name);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo e título */}
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="mr-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 p-2 text-white">
                <BarChart3 className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">MoraBem</h1>
                <p className="text-xs text-gray-500">Sistema de Gestão</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-4 md:flex">
            <Button
              variant="ghost"
              className="text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
              onClick={() => router.push("/dashboard")}
            >
              <Home className="mr-2 h-5 w-5" />
              Dashboard
            </Button>
            <Button
              variant="ghost"
              className="text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
              onClick={() => router.push("/dashboard/acoes")}
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              Ações
            </Button>
            <Button
              variant="ghost"
              className="text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
              onClick={() => router.push("/dashboard/acoes/relatorios")}
            >
              <BarChartIcon className="mr-2 h-5 w-5" />
              Relatórios
            </Button>
            <Button
              variant="ghost"
              className="text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
              onClick={() => router.push("/dashboard/configuracoes")}
            >
              <Settings className="mr-2 h-5 w-5" />
              Configurações
            </Button>
            {/* Separador */}
            <div className="mx-2 h-6 border-l border-gray-200"></div>
            {/* User menu */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <UserCircle className="h-6 w-6 text-gray-600" />
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{nomeCurto}</p>
                  <p className="text-xs text-gray-500">
                    {user.role === "admin" ? "Administrador" : "Usuário"}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="text-gray-700 transition-colors hover:bg-red-50 hover:text-red-600"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="text-gray-700">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between py-4">
                    <div className="flex items-center">
                      <div className="mr-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 p-2 text-white">
                        <BarChart3 className="h-5 w-5" />
                      </div>
                      <span className="text-xl font-bold">Dashboard</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-gray-700"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="mt-4 flex flex-col space-y-1">
                    <Button
                      variant="ghost"
                      className="justify-start px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      onClick={() => {
                        router.push("/dashboard");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <Home className="mr-3 h-5 w-5" />
                      Dashboard
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      onClick={() => {
                        router.push("/dashboard/acoes");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <PlusCircle className="mr-3 h-5 w-5" />
                      Ações
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      onClick={() => {
                        router.push("/dashboard/acoes/relatorios");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <BarChartIcon className="mr-3 h-5 w-5" />
                      Relatórios
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      onClick={() => {
                        router.push("/dashboard/configuracoes");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <Settings className="mr-3 h-5 w-5" />
                      Configurações
                    </Button>
                  </div>
                  <div className="mt-auto border-t border-gray-200 pt-4">
                    <div className="flex items-center px-4 py-3">
                      <UserCircle className="mr-3 h-8 w-8 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">{nomeCurto}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <p className="text-xs text-blue-600">
                          {user.role === "admin" ? "Administrador" : "Usuário"}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      className="mt-2 w-full justify-start px-4 py-3 text-red-600 hover:bg-red-50"
                      onClick={onLogout}
                    >
                      <LogOut className="mr-3 h-5 w-5" />
                      Sair
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
