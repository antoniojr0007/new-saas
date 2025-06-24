import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-emerald-50 to-white md:py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col space-y-6">
            <Badge className="w-fit bg-emerald-100 px-3 py-1 text-sm text-emerald-800 hover:bg-emerald-200">
              Movimento pela moradia digna
            </Badge>
            <h1 className="text-4xl leading-tight font-bold text-gray-900 md:text-5xl lg:text-6xl">
              Juntos pela conquista da{" "}
              <span className="text-emerald-600">casa própria</span>
            </h1>
            <p className="max-w-lg text-lg text-gray-600">
              Transformando sonhos em realidade através da organização coletiva,
              luta por direitos e projetos habitacionais acessíveis para todos.
            </p>
            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Link href="#projetos">
                  Conhecer Projetos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
              >
                <Link href="#sobre">Saiba Mais</Link>
              </Button>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-xl shadow-2xl">
            <img
              src="/placeholder.svg?height=600&width=800"
              alt="Famílias celebrando a conquista da casa própria"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
