"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useMemo } from "react"
import {
  ArrowLeft,
  Building2,
  Users,
  DollarSign,
  Phone,
  Mail,
  Calendar,
  User,
  AlertTriangle,
  Search,
  MapPin,
  Crown,
  TrendingUp,
  Filter,
  Eye,
  FileText,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"

import {
  getEmpresaById,
  getComissoesByEmpresaId,
  getFamiliasByComissaoId,
  getFamiliasComPendencias,
  formatarMoeda,
} from "@/lib/data"

export default function EmpresaDetalhes() {
  const params = useParams()
  const router = useRouter()
  const empresaId = Number(params.id)

  const [searchTerm, setSearchTerm] = useState("")
  const [filtroTipo, setFiltroTipo] = useState("todos")

  const empresa = getEmpresaById(empresaId)
  const comissoes = getComissoesByEmpresaId(empresaId)
  const familiasPendentes = getFamiliasComPendencias(empresaId)

  const familiasFiltradas = useMemo(() => {
    let resultado = [...familiasPendentes]

    if (searchTerm) {
      resultado = resultado.filter(
        (familia) =>
          familia.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          familia.responsavel.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (filtroTipo === "faltas") {
      resultado = resultado.filter((familia) => familia.pendencias.faltas > 0)
    } else if (filtroTipo === "monetaria") {
      resultado = resultado.filter((familia) => familia.pendencias.valorPendente > 0)
    }

    return resultado
  }, [familiasPendentes, searchTerm, filtroTipo])

  if (!empresa) {
    router.push("/")
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header com gradiente melhorado */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-100 hover:text-white mb-4 transition-colors duration-200 group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
            Voltar para o Dashboard
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Building2 className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{empresa.nome}</h1>
                <p className="text-blue-100 mt-1">Detalhes completos da empresa</p>
              </div>
            </div>
            <Badge className="bg-emerald-500/20 text-emerald-100 border-emerald-400/30 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              ✓ {empresa.status.charAt(0).toUpperCase() + empresa.status.slice(1)}
            </Badge>
            <Link
              href={`/empresa/${empresaId}/prestacao-contas`}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
            >
              <FileText className="mr-2 h-4 w-4" />
              Prestação de Contas
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 -mt-6 pb-12">
        {/* Cards de métricas melhorados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-blue-100">Famílias</CardTitle>
              <div className="p-2 bg-white/20 rounded-lg">
                <Users className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-2xl font-bold">{empresa.numeroFamilias}</div>
              <p className="text-xs text-blue-100">cadastradas</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-emerald-100">Valor em Caixa</CardTitle>
              <div className="p-2 bg-white/20 rounded-lg">
                <DollarSign className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-2xl font-bold">{formatarMoeda(empresa.valorCaixa)}</div>
              <p className="text-xs text-emerald-100">disponível</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-purple-100">Comissões</CardTitle>
              <div className="p-2 bg-white/20 rounded-lg">
                <Building2 className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-2xl font-bold">{comissoes.length}</div>
              <p className="text-xs text-purple-100">ativas</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-amber-100">Pendências</CardTitle>
              <div className="p-2 bg-white/20 rounded-lg">
                <AlertTriangle className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-2xl font-bold">{familiasPendentes.length}</div>
              <p className="text-xs text-amber-100">famílias</p>
            </CardContent>
          </Card>
        </div>

        {/* Informações da empresa melhoradas */}
        <Card className="mb-8 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-t-lg">
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
              <Building2 className="mr-2 h-5 w-5 text-blue-600" />
              Informações da Empresa
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">Responsável</p>
                  <p className="font-semibold text-gray-900">{empresa.responsavel}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl">
                <div className="p-2 bg-emerald-500 rounded-lg">
                  <Phone className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-medium text-emerald-600 uppercase tracking-wide">Telefone</p>
                  <p className="font-semibold text-gray-900">{empresa.telefone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <Mail className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-medium text-purple-600 uppercase tracking-wide">Email</p>
                  <p className="font-semibold text-gray-900 text-sm">{empresa.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl">
                <div className="p-2 bg-amber-500 rounded-lg">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-medium text-amber-600 uppercase tracking-wide">Fundação</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(empresa.dataFundacao || "").toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-rose-50 to-rose-100 rounded-xl md:col-span-2">
                <div className="p-2 bg-rose-500 rounded-lg">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-medium text-rose-600 uppercase tracking-wide">Endereço</p>
                  <p className="font-semibold text-gray-900">{empresa.endereco}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs melhoradas */}
        <Tabs defaultValue="comissoes" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg p-1 rounded-xl">
            <TabsTrigger
              value="comissoes"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg font-medium transition-all duration-200"
            >
              <Building2 className="mr-2 h-4 w-4" />
              Comissões
            </TabsTrigger>
            <TabsTrigger
              value="pendencias"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white rounded-lg font-medium transition-all duration-200"
            >
              <AlertTriangle className="mr-2 h-4 w-4" />
              Pendências
            </TabsTrigger>
          </TabsList>

          {/* Tab de Comissões melhorada */}
          <TabsContent value="comissoes" className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Comissões e Famílias</h2>
                <p className="text-gray-600 mt-1">Visualize todas as comissões e suas respectivas famílias</p>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
                <TrendingUp className="h-4 w-4" />
                <span>{comissoes.length} comissões ativas</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {comissoes.map((comissao, index) => {
                const familias = getFamiliasByComissaoId(comissao.id)
                const gradients = [
                  "from-blue-500 to-blue-600",
                  "from-emerald-500 to-emerald-600",
                  "from-purple-500 to-purple-600",
                  "from-amber-500 to-orange-500",
                  "from-rose-500 to-rose-600",
                  "from-indigo-500 to-indigo-600",
                ]
                const gradient = gradients[index % gradients.length]

                return (
                  <Card
                    key={comissao.id}
                    className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm hover:scale-[1.02] overflow-hidden"
                  >
                    <div className={`h-1 bg-gradient-to-r ${gradient}`}></div>

                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                            {comissao.nome}
                          </CardTitle>
                          <div className="flex items-center mt-2 space-x-2">
                            <Crown className="h-4 w-4 text-amber-500" />
                            <span className="text-sm text-gray-600">
                              <span className="font-medium">Líder:</span> {comissao.lider}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div
                        className={`bg-gradient-to-br ${gradient.replace("to-", "to-").replace("from-", "from-").replace("-500", "-50").replace("-600", "-100")} p-4 rounded-xl border border-opacity-20`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Users
                              className={`h-4 w-4 ${gradient.includes("blue") ? "text-blue-600" : gradient.includes("emerald") ? "text-emerald-600" : gradient.includes("purple") ? "text-purple-600" : gradient.includes("amber") ? "text-amber-600" : gradient.includes("rose") ? "text-rose-600" : "text-indigo-600"}`}
                            />
                            <span
                              className={`text-sm font-medium ${gradient.includes("blue") ? "text-blue-700" : gradient.includes("emerald") ? "text-emerald-700" : gradient.includes("purple") ? "text-purple-700" : gradient.includes("amber") ? "text-amber-700" : gradient.includes("rose") ? "text-rose-700" : "text-indigo-700"}`}
                            >
                              Total de Famílias
                            </span>
                          </div>
                          <span
                            className={`text-2xl font-bold ${gradient.includes("blue") ? "text-blue-700" : gradient.includes("emerald") ? "text-emerald-700" : gradient.includes("purple") ? "text-purple-700" : gradient.includes("amber") ? "text-amber-700" : gradient.includes("rose") ? "text-rose-700" : "text-indigo-700"}`}
                          >
                            {familias.length}
                          </span>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold mb-3 text-gray-700 flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          Lista de Famílias:
                        </h4>
                        <div className="max-h-48 overflow-y-auto pr-2 space-y-2">
                          {familias.map((familia) => (
                            <div
                              key={familia.id}
                              className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 group/familia"
                            >
                              <div>
                                <p className="font-medium text-gray-900 text-sm">{familia.nome}</p>
                                <p className="text-xs text-gray-500">{familia.responsavel}</p>
                              </div>
                              <div className="text-right">
                                <Badge variant="outline" className="text-xs">
                                  {familia.membros} membros
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Tab de Pendências melhorada */}
          <TabsContent value="pendencias" className="space-y-6 pt-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Famílias com Pendências</h2>
                <p className="text-gray-600 mt-1">Gerencie e acompanhe as pendências das famílias</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar família ou responsável..."
                    className="pl-10 w-full sm:w-[250px] border-0 bg-white/80 backdrop-blur-sm shadow-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                  <SelectTrigger className="w-full sm:w-[200px] border-0 bg-white/80 backdrop-blur-sm shadow-lg">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filtrar por tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todas as pendências</SelectItem>
                    <SelectItem value="faltas">Apenas faltas</SelectItem>
                    <SelectItem value="monetaria">Apenas monetárias</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gradient-to-r from-gray-50 to-blue-50 border-b-0">
                        <TableHead className="font-semibold text-gray-700">Família</TableHead>
                        <TableHead className="font-semibold text-gray-700">Responsável</TableHead>
                        <TableHead className="font-semibold text-gray-700">Comissão</TableHead>
                        <TableHead className="text-center font-semibold text-gray-700">Faltas</TableHead>
                        <TableHead className="text-right font-semibold text-gray-700">Pendência Monetária</TableHead>
                        <TableHead className="text-right font-semibold text-gray-700">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {familiasFiltradas.length > 0 ? (
                        familiasFiltradas.map((familia, index) => {
                          const comissao = comissoes.find((c) => c.id === familia.comissaoId)
                          return (
                            <TableRow
                              key={familia.id}
                              className={`hover:bg-blue-50/50 transition-colors duration-200 ${index % 2 === 0 ? "bg-white/50" : "bg-gray-50/30"}`}
                            >
                              <TableCell className="font-medium">
                                <div>
                                  <p className="font-semibold text-gray-900">{familia.nome}</p>
                                  <p className="text-xs text-gray-500">{familia.membros} membros</p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  <User className="h-4 w-4 text-gray-400" />
                                  <span className="text-gray-700">{familia.responsavel}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                  {comissao?.nome}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-center">
                                {familia.pendencias.faltas > 0 ? (
                                  <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white">
                                    {familia.pendencias.faltas} faltas
                                  </Badge>
                                ) : (
                                  <Badge
                                    variant="outline"
                                    className="bg-emerald-50 text-emerald-700 border-emerald-200"
                                  >
                                    ✓ Em dia
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell className="text-right">
                                {familia.pendencias.valorPendente > 0 ? (
                                  <div className="text-right">
                                    <span className="text-red-600 font-bold">
                                      {formatarMoeda(familia.pendencias.valorPendente)}
                                    </span>
                                    <p className="text-xs text-red-500">pendente</p>
                                  </div>
                                ) : (
                                  <span className="text-emerald-600 font-medium">✓ Quitado</span>
                                )}
                              </TableCell>
                              <TableCell className="text-right">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200"
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  Ver
                                </Button>
                              </TableCell>
                            </TableRow>
                          )
                        })
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-12">
                            <div className="flex flex-col items-center space-y-3">
                              <div className="p-4 bg-gray-100 rounded-full">
                                <Search className="h-8 w-8 text-gray-400" />
                              </div>
                              <div>
                                <p className="text-gray-500 font-medium">Nenhuma família encontrada</p>
                                <p className="text-sm text-gray-400">Tente ajustar os filtros de busca</p>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
