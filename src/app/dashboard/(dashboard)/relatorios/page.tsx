"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  BarChart3,
  PieChart,
  TrendingUp,
  Download,
  Filter,
  Mail,
  FileSpreadsheet,
  Send,
  Eye,
  Loader2,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { empresas, comissoes, familias, formatarMoeda } from "@/lib/data"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export default function RelatoriosPage() {
  const [empresaSelecionada, setEmpresaSelecionada] = useState("")
  const [tipoRelatorio, setTipoRelatorio] = useState("geral")
  const [emailModalOpen, setEmailModalOpen] = useState(false)
  const [selectedEmpresa, setSelectedEmpresa] = useState<any>(null)
  const [emailData, setEmailData] = useState({
    destinatario: "",
    assunto: "",
    mensagem: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()

  // Calcular estatísticas gerais
  const totalEmpresas = empresas.length
  const totalComissoes = comissoes.length
  const totalFamilias = familias.length
  const totalCaixa = empresas.reduce((acc, empresa) => acc + empresa.valorCaixa, 0)
  const totalPendencias = familias.reduce((acc, familia) => acc + familia.pendencias.valorPendente, 0)
  const totalFaltas = familias.reduce((acc, familia) => acc + familia.pendencias.faltas, 0)

  // Estatísticas por empresa
  const estatisticasEmpresa = empresaSelecionada
    ? (() => {
        const empresa = empresas.find((e) => e.id === Number.parseInt(empresaSelecionada))
        if (!empresa) return null

        const comissoesEmpresa = comissoes.filter((c) => c.empresaId === empresa.id)
        const comissoesIds = comissoesEmpresa.map((c) => c.id)
        const familiasEmpresa = familias.filter((f) => comissoesIds.includes(f.comissaoId))

        const pendenciasEmpresa = familiasEmpresa.reduce((acc, f) => acc + f.pendencias.valorPendente, 0)
        const faltasEmpresa = familiasEmpresa.reduce((acc, f) => acc + f.pendencias.faltas, 0)

        const comissoesStats = comissoesEmpresa.map((comissao) => {
          const familiasDaComissao = familias.filter((f) => f.comissaoId === comissao.id)
          return {
            id: comissao.id,
            nome: comissao.nome,
            lider: comissao.lider,
            totalFamilias: familiasDaComissao.length,
            pendencias: familiasDaComissao.reduce((acc, f) => acc + f.pendencias.valorPendente, 0),
            faltas: familiasDaComissao.reduce((acc, f) => acc + f.pendencias.faltas, 0),
          }
        })

        return {
          empresa,
          totalComissoes: comissoesEmpresa.length,
          totalFamilias: familiasEmpresa.length,
          pendencias: pendenciasEmpresa,
          faltas: faltasEmpresa,
          comissoes: comissoesStats,
        }
      })()
    : null

  const handleDownloadPDF = async (empresa: any) => {
    setIsProcessing(true)
    try {
      // Simular delay de processamento
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Em um sistema real, geraria e baixaria o PDF
      const link = document.createElement("a")
      link.href = "#"
      link.download = `prestacao-contas-${empresa.nome.replace(/\s+/g, "-").toLowerCase()}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast({
        title: "PDF gerado com sucesso!",
        description: `Prestação de contas da ${empresa.nome} foi baixada.`,
      })
    } catch (error) {
      toast({
        title: "Erro ao gerar PDF",
        description: "Ocorreu um erro ao processar o relatório.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownloadExcel = async (empresa: any) => {
    setIsProcessing(true)
    try {
      // Simular delay de processamento
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Em um sistema real, geraria e baixaria o Excel
      const link = document.createElement("a")
      link.href = "#"
      link.download = `prestacao-contas-${empresa.nome.replace(/\s+/g, "-").toLowerCase()}.xlsx`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast({
        title: "Excel gerado com sucesso!",
        description: `Planilha da ${empresa.nome} foi baixada.`,
      })
    } catch (error) {
      toast({
        title: "Erro ao gerar Excel",
        description: "Ocorreu um erro ao processar a planilha.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleSendEmail = async () => {
    if (!emailData.destinatario || !emailData.assunto) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha o destinatário e assunto.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)
    try {
      // Simular delay de envio
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Em um sistema real, enviaria o email via API
      toast({
        title: "Email enviado com sucesso!",
        description: `Prestação de contas da ${selectedEmpresa?.nome} foi enviada para ${emailData.destinatario}.`,
      })

      setEmailModalOpen(false)
      setEmailData({ destinatario: "", assunto: "", mensagem: "" })
    } catch (error) {
      toast({
        title: "Erro ao enviar email",
        description: "Ocorreu um erro ao enviar o relatório.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const openEmailModal = (empresa: any) => {
    setSelectedEmpresa(empresa)
    setEmailData({
      destinatario: "",
      assunto: `Prestação de Contas - ${empresa.nome}`,
      mensagem: `Segue em anexo a prestação de contas da empresa ${empresa.nome} referente ao período atual.\n\nAtenciosamente,\nEquipe de Gestão`,
    })
    setEmailModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/acoes"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para Ações
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>
            <p className="text-gray-600 mt-1">Visualize estatísticas e dados da organização</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={tipoRelatorio} onValueChange={setTipoRelatorio}>
              <SelectTrigger className="w-full sm:w-[180px] border-0 bg-white/80 backdrop-blur-sm shadow-lg">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Tipo de relatório" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="geral">Relatório Geral</SelectItem>
                <SelectItem value="empresa">Por Empresa</SelectItem>
                <SelectItem value="prestacao-contas">Prestação de Contas Geral</SelectItem>
              </SelectContent>
            </Select>

            {tipoRelatorio === "empresa" && (
              <Select value={empresaSelecionada} onValueChange={setEmpresaSelecionada}>
                <SelectTrigger className="w-full sm:w-[220px] border-0 bg-white/80 backdrop-blur-sm shadow-lg">
                  <SelectValue placeholder="Selecione uma empresa" />
                </SelectTrigger>
                <SelectContent>
                  {empresas.map((empresa) => (
                    <SelectItem key={empresa.id} value={empresa.id.toString()}>
                      {empresa.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            <Button variant="outline" className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </div>

        {tipoRelatorio === "geral" ? (
          <div className="space-y-6">
            {/* Cards de estatísticas gerais */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5" />
                    Visão Geral
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-100">Total de Empresas</span>
                      <span className="text-xl font-bold">{totalEmpresas}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-100">Total de Comissões</span>
                      <span className="text-xl font-bold">{totalComissoes}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-100">Total de Famílias</span>
                      <span className="text-xl font-bold">{totalFamilias}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Financeiro
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-emerald-100">Total em Caixa</span>
                      <span className="text-xl font-bold">{formatarMoeda(totalCaixa)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-emerald-100">Pendências Financeiras</span>
                      <span className="text-xl font-bold">{formatarMoeda(totalPendencias)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-emerald-100">Média por Empresa</span>
                      <span className="text-xl font-bold">{formatarMoeda(totalCaixa / (totalEmpresas || 1))}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <PieChart className="mr-2 h-5 w-5" />
                    Pendências
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-amber-100">Total de Faltas</span>
                      <span className="text-xl font-bold">{totalFaltas}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-amber-100">Famílias com Pendências</span>
                      <span className="text-xl font-bold">
                        {familias.filter((f) => f.pendencias.valorPendente > 0 || f.pendencias.faltas > 0).length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-amber-100">% de Famílias com Pendências</span>
                      <span className="text-xl font-bold">
                        {Math.round(
                          (familias.filter((f) => f.pendencias.valorPendente > 0 || f.pendencias.faltas > 0).length /
                            (totalFamilias || 1)) *
                            100,
                        )}
                        %
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabela de empresas */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Empresas da Organização</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Nome</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700">Comissões</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700">Famílias</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-700">Valor em Caixa</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-700">Pendências</th>
                      </tr>
                    </thead>
                    <tbody>
                      {empresas.map((empresa) => {
                        const comissoesEmpresa = comissoes.filter((c) => c.empresaId === empresa.id)
                        const comissoesIds = comissoesEmpresa.map((c) => c.id)
                        const familiasEmpresa = familias.filter((f) => comissoesIds.includes(f.comissaoId))
                        const pendenciasEmpresa = familiasEmpresa.reduce(
                          (acc, f) => acc + f.pendencias.valorPendente,
                          0,
                        )

                        return (
                          <tr key={empresa.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div className="font-medium text-gray-900">{empresa.nome}</div>
                              <div className="text-sm text-gray-500">{empresa.responsavel}</div>
                            </td>
                            <td className="text-center py-3 px-4">{comissoesEmpresa.length}</td>
                            <td className="text-center py-3 px-4">{familiasEmpresa.length}</td>
                            <td className="text-right py-3 px-4 font-medium text-emerald-600">
                              {formatarMoeda(empresa.valorCaixa)}
                            </td>
                            <td className="text-right py-3 px-4 font-medium text-red-600">
                              {formatarMoeda(pendenciasEmpresa)}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : tipoRelatorio === "empresa" ? (
          <div className="space-y-6">
            {estatisticasEmpresa ? (
              <>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{estatisticasEmpresa.empresa.nome}</h2>
                      <p className="text-gray-600">
                        Responsável: {estatisticasEmpresa.empresa.responsavel} | Fundação:{" "}
                        {new Date(estatisticasEmpresa.empresa.dataFundacao || "").toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 bg-emerald-50 px-4 py-2 rounded-lg">
                      <span className="text-emerald-700 font-medium">Valor em Caixa:</span>
                      <span className="text-emerald-700 font-bold">
                        {formatarMoeda(estatisticasEmpresa.empresa.valorCaixa)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                    <CardHeader className="pb-2 border-b">
                      <CardTitle className="text-lg font-medium">Comissões</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="text-4xl font-bold text-blue-600">{estatisticasEmpresa.totalComissoes}</div>
                      <p className="text-gray-500 mt-1">comissões ativas</p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                    <CardHeader className="pb-2 border-b">
                      <CardTitle className="text-lg font-medium">Famílias</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="text-4xl font-bold text-emerald-600">{estatisticasEmpresa.totalFamilias}</div>
                      <p className="text-gray-500 mt-1">famílias cadastradas</p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                    <CardHeader className="pb-2 border-b">
                      <CardTitle className="text-lg font-medium">Pendências</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="text-4xl font-bold text-amber-600">
                        {formatarMoeda(estatisticasEmpresa.pendencias)}
                      </div>
                      <p className="text-gray-500 mt-1">em pendências financeiras</p>
                    </CardContent>
                  </Card>
                </div>

                <Tabs defaultValue="comissoes" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg p-1 rounded-xl">
                    <TabsTrigger
                      value="comissoes"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg font-medium transition-all duration-200"
                    >
                      Comissões
                    </TabsTrigger>
                    <TabsTrigger
                      value="pendencias"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white rounded-lg font-medium transition-all duration-200"
                    >
                      Pendências
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="comissoes" className="space-y-6 pt-6">
                    <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                      <CardContent className="p-0">
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-gray-200 bg-gray-50">
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Nome</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Líder</th>
                                <th className="text-center py-3 px-4 font-semibold text-gray-700">Famílias</th>
                                <th className="text-right py-3 px-4 font-semibold text-gray-700">Pendências</th>
                                <th className="text-center py-3 px-4 font-semibold text-gray-700">Faltas</th>
                              </tr>
                            </thead>
                            <tbody>
                              {estatisticasEmpresa.comissoes.map((comissao) => (
                                <tr key={comissao.id} className="border-b border-gray-100 hover:bg-gray-50">
                                  <td className="py-3 px-4 font-medium text-gray-900">{comissao.nome}</td>
                                  <td className="py-3 px-4 text-gray-700">{comissao.lider}</td>
                                  <td className="text-center py-3 px-4 font-medium text-blue-600">
                                    {comissao.totalFamilias}
                                  </td>
                                  <td className="text-right py-3 px-4 font-medium text-red-600">
                                    {formatarMoeda(comissao.pendencias)}
                                  </td>
                                  <td className="text-center py-3 px-4 font-medium text-amber-600">
                                    {comissao.faltas}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="pendencias" className="space-y-6 pt-6">
                    <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Resumo de Pendências</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-red-50 p-4 rounded-lg">
                                <p className="text-sm text-red-600 font-medium">Pendências Financeiras</p>
                                <p className="text-2xl font-bold text-red-700">
                                  {formatarMoeda(estatisticasEmpresa.pendencias)}
                                </p>
                              </div>
                              <div className="bg-amber-50 p-4 rounded-lg">
                                <p className="text-sm text-amber-600 font-medium">Total de Faltas</p>
                                <p className="text-2xl font-bold text-amber-700">{estatisticasEmpresa.faltas}</p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Distribuição por Comissão</h3>
                            <div className="space-y-3">
                              {estatisticasEmpresa.comissoes.map((comissao) => (
                                <div key={comissao.id} className="bg-gray-50 p-4 rounded-lg">
                                  <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-medium text-gray-900">{comissao.nome}</h4>
                                    <span className="text-sm text-gray-500">{comissao.totalFamilias} famílias</span>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-sm text-gray-500">Pendências Financeiras</p>
                                      <p className="font-semibold text-red-600">{formatarMoeda(comissao.pendencias)}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-500">Faltas</p>
                                      <p className="font-semibold text-amber-600">{comissao.faltas}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </>
            ) : (
              <div className="flex items-center justify-center h-64 bg-white/80 backdrop-blur-sm rounded-xl shadow-xl">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">Selecione uma empresa</h3>
                  <p className="text-gray-500 mt-1">Escolha uma empresa para visualizar seus relatórios</p>
                </div>
              </div>
            )}
          </div>
        ) : tipoRelatorio === "prestacao-contas" ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Prestação de Contas Geral</h2>
                <p className="text-gray-600 mt-1">Gere relatórios de prestação de contas para todas as empresas</p>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    // Gerar relatório consolidado
                    setIsProcessing(true)
                    setTimeout(() => {
                      setIsProcessing(false)
                      toast({
                        title: "Relatório consolidado gerado!",
                        description: "Prestação de contas de todas as empresas foi baixada.",
                      })
                    }, 3000)
                  }}
                  disabled={isProcessing}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Relatório Consolidado
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {empresas.map((empresa) => {
                const comissoesEmpresa = comissoes.filter((c) => c.empresaId === empresa.id)
                const comissoesIds = comissoesEmpresa.map((c) => c.id)
                const familiasEmpresa = familias.filter((f) => comissoesIds.includes(f.comissaoId))
                const pendenciasEmpresa = familiasEmpresa.reduce((acc, f) => acc + f.pendencias.valorPendente, 0)
                const faltasEmpresa = familiasEmpresa.reduce((acc, f) => acc + f.pendencias.faltas, 0)

                return (
                  <Card key={empresa.id} className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                            {empresa.nome.charAt(0)}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{empresa.nome}</h3>
                            <p className="text-gray-600">Responsável: {empresa.responsavel}</p>
                          </div>
                        </div>
                        <Badge className="bg-emerald-100 text-emerald-800">
                          {empresa.status.charAt(0).toUpperCase() + empresa.status.slice(1)}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-blue-50 p-3 rounded-lg text-center">
                          <p className="text-sm text-blue-600 font-medium">Comissões</p>
                          <p className="text-2xl font-bold text-blue-700">{comissoesEmpresa.length}</p>
                        </div>
                        <div className="bg-emerald-50 p-3 rounded-lg text-center">
                          <p className="text-sm text-emerald-600 font-medium">Famílias</p>
                          <p className="text-2xl font-bold text-emerald-700">{familiasEmpresa.length}</p>
                        </div>
                        <div className="bg-amber-50 p-3 rounded-lg text-center">
                          <p className="text-sm text-amber-600 font-medium">Pendências</p>
                          <p className="text-lg font-bold text-amber-700">{formatarMoeda(pendenciasEmpresa)}</p>
                        </div>
                        <div className="bg-purple-50 p-3 rounded-lg text-center">
                          <p className="text-sm text-purple-600 font-medium">Caixa</p>
                          <p className="text-lg font-bold text-purple-700">{formatarMoeda(empresa.valorCaixa)}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Button
                          onClick={() => handleDownloadPDF(empresa)}
                          disabled={isProcessing}
                          className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Baixar PDF
                        </Button>

                        <Button
                          onClick={() => handleDownloadExcel(empresa)}
                          disabled={isProcessing}
                          className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white"
                        >
                          <FileSpreadsheet className="mr-2 h-4 w-4" />
                          Baixar Excel
                        </Button>

                        <Button
                          onClick={() => openEmailModal(empresa)}
                          disabled={isProcessing}
                          variant="outline"
                          className="border-blue-200 text-blue-700 hover:bg-blue-50"
                        >
                          <Mail className="mr-2 h-4 w-4" />
                          Enviar por Email
                        </Button>

                        <Button
                          onClick={() => router.push(`/empresa/${empresa.id}/prestacao-contas`)}
                          variant="outline"
                          className="border-purple-200 text-purple-700 hover:bg-purple-50"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Visualizar Detalhes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Modal de envio por email */}
            <Dialog open={emailModalOpen} onOpenChange={setEmailModalOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center">
                    <Mail className="mr-2 h-5 w-5 text-blue-600" />
                    Enviar Prestação de Contas por Email
                  </DialogTitle>
                  <DialogDescription>
                    Envie a prestação de contas da {selectedEmpresa?.nome} por email
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="destinatario">Email do Destinatário *</Label>
                    <Input
                      id="destinatario"
                      type="email"
                      placeholder="destinatario@email.com"
                      value={emailData.destinatario}
                      onChange={(e) => setEmailData((prev) => ({ ...prev, destinatario: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="assunto">Assunto *</Label>
                    <Input
                      id="assunto"
                      placeholder="Assunto do email"
                      value={emailData.assunto}
                      onChange={(e) => setEmailData((prev) => ({ ...prev, assunto: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mensagem">Mensagem</Label>
                    <Textarea
                      id="mensagem"
                      placeholder="Mensagem adicional (opcional)"
                      rows={4}
                      value={emailData.mensagem}
                      onChange={(e) => setEmailData((prev) => ({ ...prev, mensagem: e.target.value }))}
                    />
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <strong>Anexos:</strong> Prestação de contas em PDF e planilha Excel
                    </p>
                  </div>
                </div>

                <DialogFooter className="flex gap-2">
                  <Button variant="outline" onClick={() => setEmailModalOpen(false)} disabled={isProcessing}>
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleSendEmail}
                    disabled={isProcessing}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Enviar Email
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        ) : null}
      </div>
    </div>
  )
}
