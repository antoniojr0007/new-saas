"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useRef } from "react"
import {
  ArrowLeft,
  DollarSign,
  FileText,
  Download,
  Printer,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import {
  getEmpresaById,
  getComissoesByEmpresaId,
  getFamiliasByEmpresaId,
  getFamiliasComPendencias,
  formatarMoeda,
  familias,
} from "@/lib/data"

// Add print styles
const printStyles = `
  @media print {
    body * {
      visibility: hidden;
    }
    #print-content, #print-content * {
      visibility: visible;
    }
    #print-content {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
    }
    .print-hidden {
      display: none !important;
    }
    .print-break-inside-avoid {
      break-inside: avoid;
    }
    .print-break-after {
      break-after: page;
    }
  }
`

export default function PrestacaoContasPage() {
  const params = useParams()
  const router = useRouter()
  const empresaId = Number(params.id)
  const printRef = useRef<HTMLDivElement>(null)

  const [periodo, setPeriodo] = useState({
    inicio: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split("T")[0],
    fim: new Date().toISOString().split("T")[0],
  })

  const empresa = getEmpresaById(empresaId)
  const comissoesEmpresa = getComissoesByEmpresaId(empresaId)
  const familiasEmpresa = getFamiliasByEmpresaId(empresaId)
  const familiasPendentes = getFamiliasComPendencias(empresaId)

  // Calcular estatísticas
  const totalRecebido = familiasEmpresa.reduce((acc, familia) => {
    // Simular valores recebidos (em um sistema real, viria do banco de dados)
    return acc + Math.random() * 500 + 100
  }, 0)

  const totalGasto = empresa ? empresa.valorCaixa * 0.3 : 0 // Simular gastos
  const saldoAtual = empresa ? empresa.valorCaixa : 0
  const totalPendencias = familiasPendentes.reduce((acc, familia) => acc + familia.pendencias.valorPendente, 0)

  // Simular movimentações financeiras
  const movimentacoes = [
    {
      id: 1,
      data: "2024-01-15",
      tipo: "entrada",
      descricao: "Contribuição Família Silva",
      valor: 150.0,
      categoria: "Contribuição",
    },
    {
      id: 2,
      data: "2024-01-10",
      tipo: "saida",
      descricao: "Compra de materiais",
      valor: 85.0,
      categoria: "Material",
    },
    {
      id: 3,
      data: "2024-01-08",
      tipo: "entrada",
      descricao: "Contribuição Família Santos",
      valor: 200.0,
      categoria: "Contribuição",
    },
    {
      id: 4,
      data: "2024-01-05",
      tipo: "saida",
      descricao: "Evento da comunidade",
      valor: 120.0,
      categoria: "Evento",
    },
    {
      id: 5,
      data: "2024-01-03",
      tipo: "entrada",
      descricao: "Contribuição Família Oliveira",
      valor: 175.0,
      categoria: "Contribuição",
    },
  ]

  const handlePrint = () => {
    if (printRef.current) {
      window.print()
    }
  }

  const handleExportPDF = () => {
    // Em um sistema real, você usaria uma biblioteca como jsPDF ou html2pdf
    window.print()
  }

  if (!empresa) {
    router.push("/dashboard")
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <style>{printStyles}</style>
      {/* Header - não será impresso */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white print:hidden print-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
          <Link
            href={`/empresa/${empresaId}`}
            className="inline-flex items-center text-blue-100 hover:text-white mb-4 transition-colors duration-200 group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
            Voltar para Detalhes da Empresa
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <FileText className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Prestação de Contas</h1>
                <p className="text-blue-100 mt-1">{empresa.nome}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handlePrint}
                className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm"
              >
                <Printer className="mr-2 h-4 w-4" />
                Imprimir
              </Button>
              <Button
                onClick={handleExportPDF}
                className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm"
              >
                <Download className="mr-2 h-4 w-4" />
                Salvar PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo para impressão */}
      <div
        ref={printRef}
        className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 print:px-0 print:py-0"
        id="print-content"
      >
        {/* Cabeçalho do relatório - será impresso */}
        <div className="mb-8 print:mb-6">
          <div className="text-center mb-6 print:mb-4">
            <h1 className="text-3xl font-bold text-gray-900 print:text-2xl">PRESTAÇÃO DE CONTAS</h1>
            <h2 className="text-xl text-gray-700 mt-2 print:text-lg">{empresa.nome}</h2>
            <p className="text-gray-600 mt-1">
              Período: {new Date(periodo.inicio).toLocaleDateString("pt-BR")} a{" "}
              {new Date(periodo.fim).toLocaleDateString("pt-BR")}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Relatório gerado em: {new Date().toLocaleDateString("pt-BR")} às {new Date().toLocaleTimeString("pt-BR")}
            </p>
          </div>

          <Separator className="my-6" />

          {/* Informações da empresa */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Dados da Empresa</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Responsável:</span> {empresa.responsavel}
                </p>
                <p>
                  <span className="font-medium">Telefone:</span> {empresa.telefone}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {empresa.email}
                </p>
                <p>
                  <span className="font-medium">Endereço:</span> {empresa.endereco}
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Estatísticas Gerais</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Total de Comissões:</span> {comissoesEmpresa.length}
                </p>
                <p>
                  <span className="font-medium">Total de Famílias:</span> {familiasEmpresa.length}
                </p>
                <p>
                  <span className="font-medium">Famílias com Pendências:</span> {familiasPendentes.length}
                </p>
                <p>
                  <span className="font-medium">Data de Fundação:</span>{" "}
                  {new Date(empresa.dataFundacao || "").toLocaleDateString("pt-BR")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Resumo Financeiro */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 print:mb-6">
          <Card className="border-0 shadow-lg print:shadow-none print:border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <TrendingUp className="mr-2 h-4 w-4 text-green-600" />
                Total Recebido
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{formatarMoeda(totalRecebido)}</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg print:shadow-none print:border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <AlertTriangle className="mr-2 h-4 w-4 text-red-600" />
                Total Gasto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{formatarMoeda(totalGasto)}</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg print:shadow-none print:border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <DollarSign className="mr-2 h-4 w-4 text-blue-600" />
                Saldo Atual
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{formatarMoeda(saldoAtual)}</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg print:shadow-none print:border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <Clock className="mr-2 h-4 w-4 text-amber-600" />
                Pendências
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">{formatarMoeda(totalPendencias)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Movimentações Financeiras */}
        <Card className="mb-8 print:mb-6 border-0 shadow-lg print:shadow-none print:border">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">Movimentações Financeiras</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2 font-semibold text-gray-700">Data</th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-700">Descrição</th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-700">Categoria</th>
                    <th className="text-center py-3 px-2 font-semibold text-gray-700">Tipo</th>
                    <th className="text-right py-3 px-2 font-semibold text-gray-700">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {movimentacoes.map((mov) => (
                    <tr key={mov.id} className="border-b border-gray-100">
                      <td className="py-3 px-2">{new Date(mov.data).toLocaleDateString("pt-BR")}</td>
                      <td className="py-3 px-2">{mov.descricao}</td>
                      <td className="py-3 px-2">{mov.categoria}</td>
                      <td className="text-center py-3 px-2">
                        <Badge
                          variant={mov.tipo === "entrada" ? "default" : "destructive"}
                          className={
                            mov.tipo === "entrada"
                              ? "bg-green-100 text-green-800 print:bg-transparent print:border print:border-green-800"
                              : "bg-red-100 text-red-800 print:bg-transparent print:border print:border-red-800"
                          }
                        >
                          {mov.tipo === "entrada" ? "Entrada" : "Saída"}
                        </Badge>
                      </td>
                      <td className="text-right py-3 px-2 font-medium">
                        <span className={mov.tipo === "entrada" ? "text-green-600" : "text-red-600"}>
                          {mov.tipo === "entrada" ? "+" : "-"}
                          {formatarMoeda(mov.valor)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-gray-300 font-bold">
                    <td colSpan={4} className="py-3 px-2 text-right">
                      Saldo do Período:
                    </td>
                    <td className="py-3 px-2 text-right text-lg">
                      <span className="text-blue-600">{formatarMoeda(totalRecebido - totalGasto)}</span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Detalhamento por Comissão */}
        <Card className="mb-8 print:mb-6 border-0 shadow-lg print:shadow-none print:border">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">Detalhamento por Comissão</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {comissoesEmpresa.map((comissao) => {
                const familiasDaComissao = familias.filter((f) => f.comissaoId === comissao.id)
                const pendenciasDaComissao = familiasDaComissao.reduce((acc, f) => acc + f.pendencias.valorPendente, 0)
                const faltasDaComissao = familiasDaComissao.reduce((acc, f) => acc + f.pendencias.faltas, 0)

                return (
                  <div key={comissao.id} className="border border-gray-200 rounded-lg p-4 print:break-inside-avoid">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-semibold text-gray-900">{comissao.nome}</h4>
                      <Badge variant="outline" className="print:border print:border-gray-400">
                        {familiasDaComissao.length} famílias
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      <span className="font-medium">Líder:</span> {comissao.lider}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="bg-blue-50 p-3 rounded-lg print:bg-transparent print:border print:border-blue-200">
                        <p className="font-medium text-blue-800">Total de Famílias</p>
                        <p className="text-2xl font-bold text-blue-600">{familiasDaComissao.length}</p>
                      </div>
                      <div className="bg-red-50 p-3 rounded-lg print:bg-transparent print:border print:border-red-200">
                        <p className="font-medium text-red-800">Pendências Financeiras</p>
                        <p className="text-2xl font-bold text-red-600">{formatarMoeda(pendenciasDaComissao)}</p>
                      </div>
                      <div className="bg-amber-50 p-3 rounded-lg print:bg-transparent print:border print:border-amber-200">
                        <p className="font-medium text-amber-800">Total de Faltas</p>
                        <p className="text-2xl font-bold text-amber-600">{faltasDaComissao}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Famílias com Pendências */}
        {familiasPendentes.length > 0 && (
          <Card className="mb-8 print:mb-6 border-0 shadow-lg print:shadow-none print:border">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-amber-600" />
                Famílias com Pendências
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 font-semibold text-gray-700">Família</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-700">Responsável</th>
                      <th className="text-center py-3 px-2 font-semibold text-gray-700">Faltas</th>
                      <th className="text-right py-3 px-2 font-semibold text-gray-700">Valor Pendente</th>
                    </tr>
                  </thead>
                  <tbody>
                    {familiasPendentes.map((familia) => (
                      <tr key={familia.id} className="border-b border-gray-100">
                        <td className="py-3 px-2 font-medium">{familia.nome}</td>
                        <td className="py-3 px-2">{familia.responsavel}</td>
                        <td className="text-center py-3 px-2">
                          {familia.pendencias.faltas > 0 ? (
                            <Badge
                              variant="destructive"
                              className="print:bg-transparent print:border print:border-red-800"
                            >
                              {familia.pendencias.faltas}
                            </Badge>
                          ) : (
                            <CheckCircle className="h-4 w-4 text-green-600 mx-auto" />
                          )}
                        </td>
                        <td className="text-right py-3 px-2 font-medium">
                          {familia.pendencias.valorPendente > 0 ? (
                            <span className="text-red-600">{formatarMoeda(familia.pendencias.valorPendente)}</span>
                          ) : (
                            <span className="text-green-600">Quitado</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Rodapé do relatório */}
        <div className="mt-12 print:mt-8 text-center border-t border-gray-200 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            <div>
              <div className="border-t border-gray-400 pt-2 mt-8">
                <p className="font-medium">Responsável pela Empresa</p>
                <p>{empresa.responsavel}</p>
              </div>
            </div>
            <div>
              <div className="border-t border-gray-400 pt-2 mt-8">
                <p className="font-medium">Tesoureiro</p>
                <p>_________________________</p>
              </div>
            </div>
            <div>
              <div className="border-t border-gray-400 pt-2 mt-8">
                <p className="font-medium">Data</p>
                <p>{new Date().toLocaleDateString("pt-BR")}</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-6">
            Este relatório foi gerado automaticamente pelo Sistema de Gestão Empresarial
          </p>
        </div>
      </div>
    </div>
  )
}
