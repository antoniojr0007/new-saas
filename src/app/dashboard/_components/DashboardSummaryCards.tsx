import { Building2, DollarSign, Sparkles, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardSummaryCardsProps {
  totalEmpresas: number;
  totalFamilias: number;
  totalCaixa: number;
  formatarMoeda: (valor: number) => string;
}

export function DashboardSummaryCards({
  totalEmpresas,
  totalFamilias,
  totalCaixa,
  formatarMoeda,
}: DashboardSummaryCardsProps) {
  return (
    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl">
        <CardHeader className="relative z-10 flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-100">
            Total de Multirões
          </CardTitle>
          <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
            <Building2 className="h-5 w-5" />
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="mb-1 text-3xl font-bold">{totalEmpresas}</div>
          <p className="flex items-center text-xs text-blue-100">
            <Sparkles className="mr-1 h-3 w-3" />
            empresas ativas
          </p>
        </CardContent>
      </Card>
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-xl">
        <CardHeader className="relative z-10 flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-emerald-100">
            Total de Famílias
          </CardTitle>
          <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
            <Users className="h-5 w-5" />
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="mb-1 text-3xl font-bold">{totalFamilias}</div>
          <p className="flex items-center text-xs text-emerald-100">
            <Sparkles className="mr-1 h-3 w-3" />
            famílias cadastradas
          </p>
        </CardContent>
      </Card>
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-xl">
        <CardHeader className="relative z-10 flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-amber-100">
            Total em Caixa
          </CardTitle>
          <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
            <DollarSign className="h-5 w-5" />
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="mb-1 text-3xl font-bold">
            {formatarMoeda(totalCaixa)}
          </div>
          <p className="flex items-center text-xs text-amber-100">
            <Sparkles className="mr-1 h-3 w-3" />
            valor total disponível
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
