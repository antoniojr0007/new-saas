"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Save, Loader2, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { empresas, comissoes } from "@/lib/data"

// Simulação de eventos
const eventos: any[] = []

export default function CriarEventoPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [empresaSelecionada, setEmpresaSelecionada] = useState("")
  const [formData, setFormData] = useState({
    titulo: "",
    data: "",
    horario: "",
    local: "",
    descricao: "",
    comissaoId: "",
  })

  const comissoesDisponiveis = empresaSelecionada
    ? comissoes.filter((comissao) => comissao.empresaId === Number.parseInt(empresaSelecionada))
    : []

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
      const novoEvento = {
        id: eventos.length + 1,
        titulo: formData.titulo,
        data: formData.data,
        horario: formData.horario,
        local: formData.local,
        descricao: formData.descricao,
        comissaoId: Number.parseInt(formData.comissaoId),
        empresaId: Number.parseInt(empresaSelecionada),
        createdAt: new Date().toISOString(),
      }

      // Adicionar à lista (simulação)
      eventos.push(novoEvento)

      toast({
        title: "Evento criado com sucesso!",
        description: `O evento ${formData.titulo} foi agendado para ${formData.data}.`,
      })

      // Redirecionar para a lista de empresas
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Erro ao criar evento",
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
          <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-t-lg">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-white/20 rounded-lg">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-2xl">Criar Novo Evento</CardTitle>
                <p className="text-amber-100 mt-1">Agende um evento para as famílias</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="titulo">Título do Evento *</Label>
                  <Input
                    id="titulo"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                    placeholder="Ex: Reunião Mensal"
                    required
                  />
                </div>

                <div className="space-y-2">
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

                <div className="space-y-2">
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="data">Data *</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="data"
                      name="data"
                      type="date"
                      value={formData.data}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="horario">Horário *</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="horario"
                      name="horario"
                      type="time"
                      value={formData.horario}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="local">Local *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="local"
                      name="local"
                      value={formData.local}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder="Endereço do evento"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea
                    id="descricao"
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleChange}
                    placeholder="Detalhes sobre o evento..."
                    rows={4}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">
                <Button type="button" variant="outline" onClick={() => router.push("/acoes")} disabled={isSubmitting}>
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
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
                      Criar Evento
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
