import { DollarSign, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Empresa {
  id: number;
  nome: string;
  numeroFamilias: number;
  valorCaixa: number;
  responsavel?: string;
}

interface EmpresaCardProps {
  empresa: Empresa;
  formatarMoeda: (valor: number) => string;
}

export function EmpresaCard({ empresa, formatarMoeda }: EmpresaCardProps) {
  return (
    <Card className="group overflow-hidden border-0 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
      {/* Header do card com gradiente sutil */}
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="line-clamp-2 text-xl font-bold text-gray-900 transition-colors duration-200 group-hover:text-blue-600">
              {empresa.nome}
            </CardTitle>
            <div className="mt-2 flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-600">
                  Ativa
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="mb-1 text-xs text-gray-500">ID</div>
            <div className="rounded bg-gray-100 px-2 py-1 font-mono text-sm font-bold text-gray-700">
              #{empresa.id.toString().padStart(3, "0")}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Métricas em grid de rows */}
        <div className="grid w-full grid-rows-2 gap-3">
          {/* Número de Famílias */}
          <div className="flex w-full items-center justify-between rounded-xl border border-blue-200/50 bg-gradient-to-br from-blue-50 to-blue-100 p-4">
            <div className="flex items-center">
              <Users className="mr-1 h-4 w-4 text-blue-600" />
              <span className="mr-2 text-xs font-medium text-blue-600">
                Famílias
              </span>
            </div>
            <span className="text-2xl font-bold text-blue-700">
              {empresa.numeroFamilias}
            </span>
          </div>
          {/* Valor no Caixa */}
          <div className="flex w-full items-center justify-between rounded-xl border border-emerald-200/50 bg-gradient-to-br from-emerald-50 to-emerald-100 p-4">
            <div className="flex items-center">
              <DollarSign className="mr-1 h-4 w-4 text-emerald-600" />
              <span className="mr-4 text-xs font-medium text-emerald-600">
                Caixa
              </span>
            </div>
            <span className="text-2xl font-bold text-emerald-700">
              {formatarMoeda(empresa.valorCaixa)}
            </span>
          </div>
        </div>
        {/* Informações adicionais */}
        <div className="border-t border-gray-100 pt-2">
          <div className="mb-3 flex items-center justify-between text-xs text-gray-500">
            <span>Responsável: {empresa.responsavel ?? "-"}</span>
          </div>
          {/* Botão de ação melhorado */}
          <Link
            href={`/empresa/${empresa.id}`}
            className="group/button flex w-full items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 font-medium text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
          >
            <TrendingUp className="h-4 w-4 transition-transform duration-200 group-hover/button:scale-110" />
            <span>Ver Detalhes Completos</span>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
