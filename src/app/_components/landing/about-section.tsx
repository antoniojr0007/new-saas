import { Badge } from "@/components/ui/badge";

export function AboutSection() {
  return (
    <section id="sobre" className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <Badge className="mx-auto mb-4 w-fit bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
            Nossa História
          </Badge>
          <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
            Sobre o Movimento pela Casa Própria
          </h2>
          <p className="text-lg text-gray-600">
            Somos um movimento social organizado que luta pelo direito à moradia
            digna e pela democratização do acesso à terra urbana para famílias
            de baixa renda.
          </p>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="flex flex-col space-y-6">
            <p className="text-gray-600">
              Fundado em 2010, o movimento surgiu da necessidade de organizar
              famílias que viviam em condições precárias de moradia ou pagavam
              aluguéis que comprometiam grande parte de sua renda familiar.
            </p>
            <p className="text-gray-600">
              Através da mobilização coletiva, negociações com o poder público e
              parcerias com entidades de apoio, conseguimos viabilizar diversos
              projetos habitacionais que já beneficiaram mais de 5.000 famílias
              em todo o país.
            </p>
            <p className="text-gray-600">
              Nossa atuação se baseia em princípios de autogestão, participação
              democrática e solidariedade, buscando não apenas a conquista da
              casa própria, mas a construção de comunidades sustentáveis e
              integradas à cidade.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-lg shadow-md">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Assembleia do movimento"
                className="h-auto w-full"
              />
            </div>
            <div className="mt-8 overflow-hidden rounded-lg shadow-md">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Construção de moradias"
                className="h-auto w-full"
              />
            </div>
            <div className="overflow-hidden rounded-lg shadow-md">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Famílias em mutirão"
                className="h-auto w-full"
              />
            </div>
            <div className="mt-8 overflow-hidden rounded-lg shadow-md">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Entrega de casas"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
