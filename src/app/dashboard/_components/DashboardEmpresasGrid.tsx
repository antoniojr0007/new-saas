import { Empresa } from "@/lib/data";

import { EmpresaCard } from "./EmpresaCard";

interface DashboardEmpresasGridProps {
  empresas: Empresa[];
  formatarMoeda: (valor: number) => string;
}

export function DashboardEmpresasGrid({
  empresas,
  formatarMoeda,
}: DashboardEmpresasGridProps) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {empresas.map((empresa) => (
        <EmpresaCard
          key={empresa.id}
          empresa={empresa}
          formatarMoeda={formatarMoeda}
        />
      ))}
    </div>
  );
}
