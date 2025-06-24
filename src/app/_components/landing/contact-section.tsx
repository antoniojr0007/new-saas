import { AlertCircle, Clock, MapPin, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ContactSection() {
  return (
    <section id="contato" className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <Badge className="mb-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
            Contato
          </Badge>
          <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
            Entre em Contato Conosco
          </h2>
          <p className="text-lg text-gray-600">
            Tire suas dúvidas, agende uma visita ou participe de nossas reuniões
            informativas.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="flex flex-col space-y-8">
            <div className="flex items-start gap-6">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100">
                <MapPin className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                  Endereço
                </h3>
                <p className="text-gray-600">
                  Av. Paulista, 1000, Sala 301
                  <br />
                  Bela Vista, São Paulo - SP
                  <br />
                  CEP: 01310-100
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100">
                <Clock className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                  Horário de Atendimento
                </h3>
                <p className="text-gray-600">
                  Segunda a Sexta: 9h às 18h
                  <br />
                  Sábados: 9h às 12h (apenas reuniões agendadas)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100">
                <Users className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                  Reuniões Informativas
                </h3>
                <p className="text-gray-600">
                  Toda primeira e terceira quarta-feira do mês, às 19h
                  <br />
                  Local: Sede do Movimento (endereço acima)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100">
                <AlertCircle className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                  Canais de Contato
                </h3>
                <p className="text-gray-600">
                  Telefone: (11) 3456-7890
                  <br />
                  WhatsApp: (11) 98765-4321
                  <br />
                  Email: contato@morabem.org.br
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <Card className="h-full border-none shadow-lg">
              <CardHeader className="space-y-3">
                <CardTitle className="text-2xl">Envie uma mensagem</CardTitle>
                <CardDescription className="text-base">
                  Preencha o formulário abaixo e entraremos em contato o mais
                  breve possível.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium text-gray-700 dark:text-gray-100"
                      >
                        Nome completo
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="w-full rounded-md border border-gray-300 px-4 py-2.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                        placeholder="Seu nome"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-700 dark:text-gray-100"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="w-full rounded-md border border-gray-300 px-4 py-2.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                        placeholder="seu@email.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="text-sm font-medium text-gray-700 dark:text-gray-100"
                    >
                      Telefone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      className="w-full rounded-md border border-gray-300 px-4 py-2.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="subject"
                      className="text-sm font-medium text-gray-700 dark:text-gray-100"
                    >
                      Assunto
                    </label>
                    <select
                      id="subject"
                      className="w-full rounded-md border border-gray-300 px-4 py-2.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                      required
                    >
                      <option value="">Selecione um assunto</option>
                      <option value="info">Informações gerais</option>
                      <option value="join">
                        Quero participar do movimento
                      </option>
                      <option value="project">Dúvidas sobre projetos</option>
                      <option value="meeting">Agendar reunião</option>
                      <option value="other">Outro assunto</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium text-gray-700 dark:text-gray-100"
                    >
                      Mensagem
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full rounded-md border border-gray-300 px-4 py-2.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                      placeholder="Digite sua mensagem aqui..."
                      required
                    ></textarea>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-emerald-600 py-2.5 text-white hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700"
                  >
                    Enviar mensagem
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
