"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, DollarSign, Save, Loader2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { empresas, comissoes, familias, formatarMoeda } from "@/lib/data"

export default function RegistrarPagamentoPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [empresaSelecionada, setEmpresaSelecionada] = useState("")
  const [comissaoSelecionada, setComissaoSelecionada] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState({
    familiaId: "",
    valor: "",
    descricao: "",
  })

  const comissoesDisponiveis = empresaSelecionada
    ? comissoes.filter((comissao) => comissao.empresaId === Number.parseInt(empresaSelecionada))
    : []

  const familiasDisponiveis = useMemo(() => {
    if (!comissaoSelecionada) return []

    const familiasComissao = familias.filter((familia) => familia.comissaoId === Number.parseInt(comissaoSelecionada))

    if (!searchTerm) return familiasComissao

    return familiasComissao.filter(
      (familia) =>
        familia.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        familia.responsavel.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [comissaoSelecionada, searchTerm])

  const familiaSelected = formData.familiaId ? familias.find((f) => f.id === Number.parseInt(formData.familiaId)) : null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simular delay de rede
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Em um sistema real, enviaríamos para a API
      const valorPagamento = Number.parseFloat(formData.valor) || 0

      // Atualizar o valor pendente da família (simulação)
      const familiaIndex = familias.findIndex((f) => f.id === Number.parseInt(formData.familiaId))
      if (familiaIndex !== -1) {
        const valorPendente = familias[familiaIndex].pendencias.valorPendente
        familias[familiaIndex].pendencias.valorPendente = Math.max(0, valorPendente - valorPagamento)
      }

      // Atualizar o valor em caixa da empresa (simulação)
      const empresaIndex = empresas.findIndex((e) => e.id === Number.parseInt(empresaSelecionada))
      if (empresaIndex !== -1) {
        empresas[empresaIndex].valorCaixa += valorPagamento
      }

      toast({
        title: "Pagamento registrado com sucesso!",
        description: `Pagamento de ${formatarMoeda(valorPagamento)} registrado para ${familiaSelected?.nome}.`,
      })

      // Redirecionar para a lista de empresas
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Erro ao registrar pagamento",
        description: "Ocorreu um erro ao processar sua solicitação.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/acoes"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para Ações
        </Link>

        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-t-lg">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-white/20 rounded-lg">
                <DollarSign className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-2xl">Registrar Pagamento</CardTitle>
                <p className="text-rose-100 mt-1">Registre um pagamento para uma família</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="empresaId">Empresa *</Label>
                  <Select
                    value={empresaSelecionada}
                    onValueChange={(value) => {
                      setEmpresaSelecionada(value)
                      setComissaoSelecionada("")
                      setFormData((prev) => ({ ...prev, familiaId: "" }))
                    }}
                    required
                  >
                    <SelectTrigger>
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comissaoId">Comissão *</Label>
                  <Select
                    value={comissaoSelecionada}
                    onValueChange={(value) => {
                      setComissaoSelecionada(value)
                      setFormData((prev) => ({ ...prev, familiaId: "" }))
                    }}
                    disabled={!empresaSelecionada}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma comissão" />
                    </SelectTrigger>
                    <SelectContent>
                      {comissoesDisponiveis.map((comissao) => (
                        <SelectItem key={comissao.id} value={comissao.id.toString()}>
                          {comissao.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {comissaoSelecionada && (
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="searchTerm">Buscar Família</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="searchTerm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                        placeholder="Digite o nome da família ou responsável"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="familiaId">Família *</Label>
                  <Select
                    value={formData.familiaId}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, familiaId: value }))}
                    disabled={!comissaoSelecionada}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma família" />
                    </SelectTrigger>
                    <SelectContent>
                      {familiasDisponiveis.map((familia) => (
                        <SelectItem key={familia.id} value={familia.id.toString()}>
                          {familia.nome} - {familia.responsavel}
                          {familia.pendencias.valorPendente > 0 && (
                            <span className="ml-2 text-red-500">
                              (Pendente: {formatarMoeda(familia.pendencias.valorPendente)})
                            </span>
                          )}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {familiaSelected && (
                  <div className="md:col-span-2 p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-medium text-blue-800">Informações da Família</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div>
                        <p className="text-sm text-gray-600">Nome:</p>
                        <p className="font-medium">{familiaSelected.nome}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Responsável:</p>
                        <p className="font-medium">{familiaSelected.responsavel}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Membros:</p>
                        <p className="font-medium">{familiaSelected.membros}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Pendência:</p>
                        <p
                          className={`font-medium ${familiaSelected.pendencias.valorPendente > 0 ? "text-red-600" : "text-green-600"}`}
                        >
                          {familiaSelected.pendencias.valorPendente > 0
                            ? formatarMoeda(familiaSelected.pendencias.valorPendente)
                            : "Sem pendências"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="valor">Valor do Pagamento (R$) *</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="valor"
                      name="valor"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.valor}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder="0,00"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="descricao">Descrição</Label>
                  <Input
                    id="descricao"
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleChange}
                    placeholder="Ex: Pagamento mensal"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">
                <Button type="button" variant="outline" onClick={() => router.push("/acoes")} disabled={isSubmitting}>
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700"
                  disabled={isSubmitting || !formData.familiaId || !formData.valor}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Registrar Pagamento
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
