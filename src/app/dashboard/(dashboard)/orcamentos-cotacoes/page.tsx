"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calculator, Save, Loader2, Upload, FileText, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { empresas } from "@/lib/data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Simulação de orçamentos e cotações
const orcamentosCotacoes: any[] = []

export default function OrcamentosCotacoesPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    tipo: "",
    fornecedor: "",
    empresaId: "",
    descricao: "",
    valor: "",
    dataSolicitacao: "",
    dataValidade: "",
    statusAprovacao: "pendente",
    observacoes: "",
    categoria: "",
  })

  const [uploadMode, setUploadMode] = useState<"individual" | "massa">("individual")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [previewData, setPreviewData] = useState<any[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadedFile(file)
    setIsProcessing(true)

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string
        const lines = text.split("\n").filter((line) => line.trim())

        const data = lines.slice(1).map((line, index) => {
          const values = line.split(",").map((v) => v.trim())
          return {
            id: index + 1,
            tipo: values[0] || "",
            fornecedor: values[1] || "",
            empresaId: values[2] || "",
            descricao: values[3] || "",
            valor: values[4] || "",
            dataSolicitacao: values[5] || "",
            dataValidade: values[6] || "",
            categoria: values[7] || "",
            observacoes: values[8] || "",
            statusAprovacao: "pendente",
          }
        })

        setPreviewData(data)
      } catch (error) {
        toast({
          title: "Erro ao processar arquivo",
          description: "Verifique se o arquivo está no formato correto.",
          variant: "destructive",
        })
      } finally {
        setIsProcessing(false)
      }
    }
    reader.readAsText(file)
  }

  const handleMassSubmit = async () => {
    if (!previewData.length) return

    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      previewData.forEach((item) => {
        orcamentosCotacoes.push({
          id: orcamentosCotacoes.length + 1,
          tipo: item.tipo,
          fornecedor: item.fornecedor,
          empresaId: Number.parseInt(item.empresaId),
          descricao: item.descricao,
          valor: Number.parseFloat(item.valor) || 0,
          dataSolicitacao: item.dataSolicitacao,
          dataValidade: item.dataValidade,
          statusAprovacao: item.statusAprovacao,
          observacoes: item.observacoes,
          categoria: item.categoria,
          createdAt: new Date().toISOString(),
        })
      })

      toast({
        title: "Orçamentos/Cotações adicionados com sucesso!",
        description: `${previewData.length} itens foram cadastrados.`,
      })

      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Erro ao adicionar orçamentos/cotações",
        description: "Ocorreu um erro ao processar sua solicitação.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const novoItem = {
        id: orcamentosCotacoes.length + 1,
        tipo: formData.tipo,
        fornecedor: formData.fornecedor,
        empresaId: Number.parseInt(formData.empresaId),
        descricao: formData.descricao,
        valor: Number.parseFloat(formData.valor) || 0,
        dataSolicitacao: formData.dataSolicitacao,
        dataValidade: formData.dataValidade,
        statusAprovacao: formData.statusAprovacao,
        observacoes: formData.observacoes,
        categoria: formData.categoria,
        createdAt: new Date().toISOString(),
      }

      orcamentosCotacoes.push(novoItem)

      toast({
        title: `${formData.tipo === "orcamento" ? "Orçamento" : "Cotação"} adicionado com sucesso!`,
        description: `O ${formData.tipo} de ${formData.fornecedor} foi cadastrado.`,
      })

      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Erro ao adicionar orçamento/cotação",
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
          <CardHeader className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-t-lg">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-white/20 rounded-lg">
                <Calculator className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-2xl">Orçamentos e Cotações</CardTitle>
                <p className="text-cyan-100 mt-1">Adicione orçamentos e cotações para aprovação</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs value={uploadMode} onValueChange={(value) => setUploadMode(value as "individual" | "massa")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="individual">Adicionar Individual</TabsTrigger>
                <TabsTrigger value="massa">Upload em Massa</TabsTrigger>
              </TabsList>

              <TabsContent value="individual" className="mt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="tipo">Tipo *</Label>
                      <Select
                        value={formData.tipo}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, tipo: value }))}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="orcamento">Orçamento</SelectItem>
                          <SelectItem value="cotacao">Cotação</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="categoria">Categoria *</Label>
                      <Select
                        value={formData.categoria}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, categoria: value }))}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="servicos">Serviços</SelectItem>
                          <SelectItem value="produtos">Produtos</SelectItem>
                          <SelectItem value="equipamentos">Equipamentos</SelectItem>
                          <SelectItem value="manutencao">Manutenção</SelectItem>
                          <SelectItem value="consultoria">Consultoria</SelectItem>
                          <SelectItem value="outros">Outros</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="empresaId">Empresa *</Label>
                      <Select
                        value={formData.empresaId}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, empresaId: value }))}
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
                      <Label htmlFor="fornecedor">Fornecedor *</Label>
                      <Input
                        id="fornecedor"
                        name="fornecedor"
                        value={formData.fornecedor}
                        onChange={handleChange}
                        placeholder="Nome do fornecedor"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="valor">Valor (R$) *</Label>
                      <Input
                        id="valor"
                        name="valor"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.valor}
                        onChange={handleChange}
                        placeholder="0,00"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dataSolicitacao">Data de Solicitação *</Label>
                      <Input
                        id="dataSolicitacao"
                        name="dataSolicitacao"
                        type="date"
                        value={formData.dataSolicitacao}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dataValidade">Data de Validade</Label>
                      <Input
                        id="dataValidade"
                        name="dataValidade"
                        type="date"
                        value={formData.dataValidade}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="statusAprovacao">Status de Aprovação</Label>
                      <Select
                        value={formData.statusAprovacao}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, statusAprovacao: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pendente">Pendente</SelectItem>
                          <SelectItem value="em_analise">Em Análise</SelectItem>
                          <SelectItem value="aprovado">Aprovado</SelectItem>
                          <SelectItem value="rejeitado">Rejeitado</SelectItem>
                          <SelectItem value="executado">Executado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="descricao">Descrição *</Label>
                      <Textarea
                        id="descricao"
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleChange}
                        placeholder="Descrição detalhada do serviço/produto..."
                        rows={3}
                        required
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="observacoes">Observações</Label>
                      <Textarea
                        id="observacoes"
                        name="observacoes"
                        value={formData.observacoes}
                        onChange={handleChange}
                        placeholder="Observações adicionais..."
                        rows={2}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.push("/acoes")}
                      disabled={isSubmitting}
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Salvando...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Salvar {formData.tipo === "orcamento" ? "Orçamento" : "Cotação"}
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="massa" className="mt-6">
                <div className="space-y-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Upload de Arquivo</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Faça upload de um arquivo CSV com orçamentos e cotações
                    </p>
                    <div className="mt-6">
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-cyan-600 hover:text-cyan-500">
                          Selecionar arquivo CSV
                        </span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          accept=".csv,.xlsx,.xls"
                          onChange={handleFileUpload}
                          className="sr-only"
                        />
                      </label>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      Formato: Tipo, Fornecedor, ID Empresa, Descrição, Valor, Data Solicitação, Data Validade,
                      Categoria, Observações
                    </p>
                  </div>

                  {uploadedFile && (
                    <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-cyan-500" />
                          <span className="ml-2 text-sm font-medium text-cyan-900">{uploadedFile.name}</span>
                          <Badge variant="secondary" className="ml-2">
                            {previewData.length} itens
                          </Badge>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setUploadedFile(null)
                            setPreviewData([])
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {previewData.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-medium">Pré-visualização dos Dados</h4>
                        <Badge variant="outline">{previewData.length} registros</Badge>
                      </div>

                      <div className="max-h-64 overflow-y-auto border rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                Fornecedor
                              </th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                Descrição
                              </th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Valor</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {previewData.slice(0, 10).map((item, index) => (
                              <tr key={index}>
                                <td className="px-4 py-2 text-sm text-gray-900">{item.tipo}</td>
                                <td className="px-4 py-2 text-sm text-gray-900">{item.fornecedor}</td>
                                <td className="px-4 py-2 text-sm text-gray-900">
                                  {item.descricao.substring(0, 50)}...
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-900">R$ {item.valor}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {previewData.length > 10 && (
                        <p className="text-sm text-gray-500 text-center">
                          Mostrando 10 de {previewData.length} registros
                        </p>
                      )}

                      <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => router.push("/acoes")}
                          disabled={isSubmitting}
                        >
                          Cancelar
                        </Button>
                        <Button
                          onClick={handleMassSubmit}
                          className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700"
                          disabled={isSubmitting || previewData.length === 0}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Importando...
                            </>
                          ) : (
                            <>
                              <Upload className="mr-2 h-4 w-4" />
                              Importar {previewData.length} Itens
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
