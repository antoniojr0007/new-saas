import { Home, LogIn } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-gray-900 py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col">
            <div className="mb-6 flex items-center gap-2">
              <Home className="h-6 w-6 text-emerald-400" />
              <span className="text-lg font-bold text-white">MoraBem</span>
            </div>
            <p className="text-gray-400">
              Movimento pela conquista da casa própria e direito à moradia
              digna.
            </p>
          </div>
          <div className="flex flex-col">
            <h3 className="mb-6 text-lg font-semibold">Links Rápidos</h3>
            <ul className="flex flex-col space-y-3">
              <li>
                <Link
                  href="#sobre"
                  className="text-gray-400 transition-colors hover:text-emerald-400"
                >
                  Sobre o Movimento
                </Link>
              </li>
              <li>
                <Link
                  href="#projetos"
                  className="text-gray-400 transition-colors hover:text-emerald-400"
                >
                  Projetos
                </Link>
              </li>
              <li>
                <Link
                  href="#depoimentos"
                  className="text-gray-400 transition-colors hover:text-emerald-400"
                >
                  Depoimentos
                </Link>
              </li>
              <li>
                <Link
                  href="#contato"
                  className="text-gray-400 transition-colors hover:text-emerald-400"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h3 className="mb-6 text-lg font-semibold">Contato</h3>
            <ul className="flex flex-col space-y-3 text-gray-400">
              <li>(11) 3456-7890</li>
              <li>contato@morabem.org.br</li>
              <li>Av. Paulista, 1000</li>
              <li>São Paulo - SP</li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h3 className="mb-6 text-lg font-semibold">Área do Membro</h3>
            <Button
              asChild
              className="w-fit bg-emerald-600 hover:bg-emerald-700 dark:text-white"
            >
              <Link href="/sign-in">
                <LogIn className="mr-2 h-4 w-4" />
                Fazer Login
              </Link>
            </Button>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>
            &copy; 2023 MoraBem - Movimento pela Casa Própria. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
