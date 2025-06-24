"use client";

import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

import { empresas, formatarMoeda } from "../../lib/data";
import { DashboardEmpresasGrid } from "./_components/DashboardEmpresasGrid";
import { DashboardNavbar } from "./_components/DashboardNavbar";
import { DashboardSummaryCards } from "./_components/DashboardSummaryCards";

// Função utilitária para extrair primeiro e último nome
export function getFirstAndLastName(fullName?: string | null): string {
  if (!fullName) return "";
  const parts = fullName.trim().split(" ").filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0];
  return `${parts[0]} ${parts[parts.length - 1]}`;
}

export default function Dashboard() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  // Redireciona se não estiver logado
  if (!isPending && !session?.user) {
    if (typeof window !== "undefined") {
      router.replace("/sign-in");
    }
    return null;
  }

  // Calcular totais
  const totalEmpresas = empresas.length;
  const totalFamilias = empresas.reduce(
    (acc, empresa) => acc + empresa.numeroFamilias,
    0,
  );
  const totalCaixa = empresas.reduce(
    (acc, empresa) => acc + empresa.valorCaixa,
    0,
  );

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/sign-in");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <DashboardNavbar
        user={{
          name: session?.user?.name || "Usuário",
          email: session?.user?.email || "",
          role: session?.user?.role || "user",
        }}
        onLogout={handleLogout}
      />
      {/* Faixa azul de fundo dos cards */}
      <div className="h-32 w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 md:h-36 lg:h-40" />
      <div className="mx-auto -mt-28 max-w-7xl px-4 pb-12 md:px-6 lg:px-8">
        <DashboardSummaryCards
          totalEmpresas={totalEmpresas}
          totalFamilias={totalFamilias}
          totalCaixa={totalCaixa}
          formatarMoeda={formatarMoeda}
        />
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Multirões do Projeto
              </h2>
              <p className="mt-1 text-gray-600">
                Clique em um multirão para ver detalhes completos
              </p>
            </div>
            <div className="hidden items-center space-x-2 text-sm text-gray-500 md:flex">
              <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
              <span>Todas ativas</span>
            </div>
          </div>
          <DashboardEmpresasGrid
            empresas={empresas}
            formatarMoeda={formatarMoeda}
          />
        </div>
      </div>
    </div>
  );
}
