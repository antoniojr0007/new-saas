"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, UserPlus, Save, Loader2, Upload, FileText, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { empresas, comissoes, familias } from "@/lib/data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function AdicionarFamiliaPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [empresaSelecionada, setEmpresaSelecionada] = useState("")
  const [formData, setFormData] = useState({
    nome: "",
    responsavel: "",
    membros: "",
    comissaoId: "",
  })

  const [uploadMode, setUploadMode] = useState<"individual" | "massa">("individual")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [previewData, setPreviewData] = useState<any[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const comissoesDisponiveis = empresaSelecionada
    ? comissoes.filter((comissao) => comissao.empresaId === Number.parseInt(empresaSelecionada))
    : []

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            nome: values[0] || "",
            responsavel: values[1] || "",
            membros: values[2] || "1",
            empresaId: values[3] || "",
            comissaoId: values[4] || "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simular delay de rede
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Em um sistema real, enviaríamos para a API
      const novaFamilia = {
        id: familias.length + 1,
        nome: formData.nome,
        responsavel: formData.responsavel,
        membros: Number.parseInt(formData.membros) || 1,
        comissaoId: Number.parseInt(formData.comissaoId),
        pendencias: { faltas: 0, valorPendente: 0 },
      }

      // Adicionar à lista (simulação)
      familias.push(novaFamilia)

      // Atualizar o número de famílias da empresa
      const empresaIndex = empresas.findIndex((e) => e.id === Number.parseInt(empresaSelecionada))
      if (empresaIndex !== -1) {
        empresas[empresaIndex].numeroFamilias += 1
      }

      toast({
        title: "Família adicionada com sucesso!",
        description: `A família ${formData.nome} foi cadastrada.`,
      })

      // Redirecionar para a lista de empresas
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Erro ao adicionar família",
        description: "Ocorreu um erro ao processar sua solicitação.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleMassSubmit = async () => {
    if (!previewData.length) return

    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      previewData.forEach((familia) => {
        familias.push({
          id: familias.length + 1,
          nome: familia.nome,
          responsavel: familia.responsavel,
          membros: Number.parseInt(familia.membros) || 1,
          comissaoId: Number.parseInt(familia.comissaoId),
          pendencias: { faltas: 0, valorPendente: 0 },
        })

        const empresaIndex = empresas.findIndex((e) => e.id === Number.parseInt(familia.empresaId))
        if (empresaIndex !== -1) {
          empresas[empresaIndex].numeroFamilias += 1
        }
      })

      toast({
        title: "Famílias adicionadas com sucesso!",
        description: `${previewData.length} famílias foram cadastradas.`,
      })

      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Erro ao adicionar famílias",
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
          <CardHeader className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-t-lg">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-white/20 rounded-lg">
                <UserPlus className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-2xl">Adicionar Nova Família</CardTitle>
                <p className="text-emerald-100 mt-1">Preencha os dados da família</p>
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
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="empresaId">Empresa *</Label>
                      <Select
                        value={empresaSelecionada}
                        onValueChange={(value) => {
                          setEmpresaSelecionada(value)
                          setFormData((prev) => ({ ...prev, comissaoId: "" }))
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

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="comissaoId">Comissão *</Label>
                      <Select
                        value={formData.comissaoId}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, comissaoId: value }))}
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
                      {!empresaSelecionada && (
                        <p className="text-sm text-gray-500 mt-1">Selecione uma empresa primeiro</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome da Família *</Label>
                      <Input
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        placeholder="Ex: Família Silva"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="responsavel">Responsável *</Label>
                      <Input
                        id="responsavel"
                        name="responsavel"
                        value={formData.responsavel}
                        onChange={handleChange}
                        placeholder="Nome do responsável"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="membros">Número de Membros *</Label>
                      <Input
                        id="membros"
                        name="membros"
                        type="number"
                        min="1"
                        value={formData.membros}
                        onChange={handleChange}
                        placeholder="Quantidade de pessoas"
                        required
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
                      className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
                      disabled={isSubmitting || !formData.comissaoId}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Salvando...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Salvar Família
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
                    <p className="mt-1 text-sm text-gray-500">Faça upload de um arquivo CSV com as famílias</p>
                    <div className="mt-6">
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-emerald-600 hover:text-emerald-500">
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
                      Formato: Nome, Responsável, Membros, ID Empresa, ID Comissão
                    </p>
                  </div>

                  {uploadedFile && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-emerald-500" />
                          <span className="ml-2 text-sm font-medium text-emerald-900">{uploadedFile.name}</span>
                          <Badge variant="secondary" className="ml-2">
                            {previewData.length} famílias
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
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                Responsável
                              </th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                Membros
                              </th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                Empresa ID
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {previewData.slice(0, 10).map((familia, index) => (
                              <tr key={index}>
                                <td className="px-4 py-2 text-sm text-gray-900">{familia.nome}</td>
                                <td className="px-4 py-2 text-sm text-gray-900">{familia.responsavel}</td>
                                <td className="px-4 py-2 text-sm text-gray-900">{familia.membros}</td>
                                <td className="px-4 py-2 text-sm text-gray-900">{familia.empresaId}</td>
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
                          className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
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
                              Importar {previewData.length} Famílias
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
