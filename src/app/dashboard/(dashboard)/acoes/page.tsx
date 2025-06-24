"use client";

import {
  ArrowLeft,
  FileText,
  Loader2,
  Save,
  Upload,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { comissoes, empresas } from "@/lib/data";

export default function AdicionarComissaoPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    lider: "",
    empresaId: "",
  });

  const [uploadMode, setUploadMode] = useState<"individual" | "massa">(
    "individual",
  );
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);
    setIsProcessing(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const lines = text.split("\n").filter((line) => line.trim());

        const data = lines.slice(1).map((line, index) => {
          const values = line.split(",").map((v) => v.trim());
          return {
            id: index + 1,
            nome: values[0] || "",
            lider: values[1] || "",
            empresaId: values[2] || "",
          };
        });

        setPreviewData(data);
      } catch (error) {
        toast({
          title: "Erro ao processar arquivo",
          description: "Verifique se o arquivo está no formato correto.",
          variant: "destructive",
        });
      } finally {
        setIsProcessing(false);
      }
    };
    reader.readAsText(file);
  };

  const handleMassSubmit = async () => {
    if (!previewData.length) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      previewData.forEach((comissao) => {
        comissoes.push({
          id: comissoes.length + 1,
          nome: comissao.nome,
          lider: comissao.lider,
          empresaId: Number.parseInt(comissao.empresaId),
        });
      });

      toast({
        title: "Comissões adicionadas com sucesso!",
        description: `${previewData.length} comissões foram cadastradas.`,
      });

      router.push("/dashboard");
    } catch (error) {
      toast({
        title: "Erro ao adicionar comissões",
        description: "Ocorreu um erro ao processar sua solicitação.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simular delay de rede
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Em um sistema real, enviaríamos para a API
      const novaComissao = {
        id: comissoes.length + 1,
        nome: formData.nome,
        lider: formData.lider,
        empresaId: Number.parseInt(formData.empresaId),
      };

      // Adicionar à lista (simulação)
      comissoes.push(novaComissao);

      toast({
        title: "Comissão adicionada com sucesso!",
        description: `A comissão ${formData.nome} foi cadastrada.`,
      });

      // Redirecionar para a lista de empresas
      router.push("/dashboard");
    } catch (error) {
      toast({
        title: "Erro ao adicionar comissão",
        description: "Ocorreu um erro ao processar sua solicitação.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/acoes"
          className="mb-6 inline-flex items-center text-blue-600 transition-colors hover:text-blue-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para Ações
        </Link>

        <Card className="border-0 bg-white/80 shadow-xl backdrop-blur-sm">
          <CardHeader className="rounded-t-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <div className="flex items-center space-x-4">
              <div className="rounded-lg bg-white/20 p-2">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-2xl">
                  Adicionar Nova Comissão
                </CardTitle>
                <p className="mt-1 text-purple-100">
                  Preencha os dados da comissão
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs
              value={uploadMode}
              onValueChange={(value) =>
                setUploadMode(value as "individual" | "massa")
              }
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="individual">
                  Adicionar Individual
                </TabsTrigger>
                <TabsTrigger value="massa">Upload em Massa</TabsTrigger>
              </TabsList>

              <TabsContent value="individual" className="mt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="empresaId">Empresa *</Label>
                      <Select
                        value={formData.empresaId}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, empresaId: value }))
                        }
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma empresa" />
                        </SelectTrigger>
                        <SelectContent>
                          {empresas.map((empresa) => (
                            <SelectItem
                              key={empresa.id}
                              value={empresa.id.toString()}
                            >
                              {empresa.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome da Comissão *</Label>
                      <Input
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        placeholder="Ex: Comissão de Educação"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lider">Líder da Comissão *</Label>
                      <Input
                        id="lider"
                        name="lider"
                        value={formData.lider}
                        onChange={handleChange}
                        placeholder="Nome do líder"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 border-t border-gray-100 pt-4">
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
                      className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                      disabled={isSubmitting || !formData.empresaId}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Salvando...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Salvar Comissão
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="massa" className="mt-6">
                <div className="space-y-6">
                  <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      Upload de Arquivo
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Faça upload de um arquivo CSV com as comissões
                    </p>
                    <div className="mt-6">
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-purple-600 hover:text-purple-500">
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
                      Formato: Nome, Líder, ID Empresa
                    </p>
                  </div>

                  {uploadedFile && (
                    <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-purple-500" />
                          <span className="ml-2 text-sm font-medium text-purple-900">
                            {uploadedFile.name}
                          </span>
                          <Badge variant="secondary" className="ml-2">
                            {previewData.length} comissões
                          </Badge>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setUploadedFile(null);
                            setPreviewData([]);
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
                        <h4 className="text-lg font-medium">
                          Pré-visualização dos Dados
                        </h4>
                        <Badge variant="outline">
                          {previewData.length} registros
                        </Badge>
                      </div>

                      <div className="max-h-64 overflow-y-auto rounded-lg border">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                Nome
                              </th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                Líder
                              </th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                Empresa ID
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {previewData.slice(0, 10).map((comissao, index) => (
                              <tr key={index}>
                                <td className="px-4 py-2 text-sm text-gray-900">
                                  {comissao.nome}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-900">
                                  {comissao.lider}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-900">
                                  {comissao.empresaId}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {previewData.length > 10 && (
                        <p className="text-center text-sm text-gray-500">
                          Mostrando 10 de {previewData.length} registros
                        </p>
                      )}

                      <div className="flex justify-end space-x-4 border-t border-gray-100 pt-4">
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
                          className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
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
                              Importar {previewData.length} Comissões
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
  );
}
