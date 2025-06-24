import {
  Calendar,
  CheckCircle,
  FileText,
  Home,
  MapPin,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FeaturesSection() {
  const features = [
    {
      icon: Users,
      title: "Organização Coletiva",
      description:
        "Trabalhamos com base na união e organização das famílias, fortalecendo laços comunitários e o poder de negociação coletiva.",
    },
    {
      icon: FileText,
      title: "Assessoria Jurídica",
      description:
        "Oferecemos suporte jurídico especializado para garantir a segurança legal dos projetos e direitos das famílias participantes.",
    },
    {
      icon: MapPin,
      title: "Localização Estratégica",
      description:
        "Buscamos áreas com infraestrutura urbana e acesso a serviços públicos, garantindo qualidade de vida e integração à cidade.",
    },
    {
      icon: Home,
      title: "Qualidade Construtiva",
      description:
        "Priorizamos materiais de qualidade e técnicas construtivas adequadas, resultando em moradias duráveis e confortáveis.",
    },
    {
      icon: Calendar,
      title: "Formação Contínua",
      description:
        "Realizamos atividades formativas sobre direito à moradia, cidadania e gestão comunitária para fortalecer o protagonismo das famílias.",
    },
    {
      icon: CheckCircle,
      title: "Transparência",
      description:
        "Mantemos processos transparentes de gestão financeira e tomada de decisões, com prestação de contas regular às famílias participantes.",
    },
  ];

  return (
    <section id="caracteristicas" className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <Badge className="mx-auto mb-4 w-fit bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
            Nossos Diferenciais
          </Badge>
          <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
            Características do Movimento
          </h2>
          <p className="text-lg text-gray-600">
            Conheça os princípios e valores que norteiam nossa atuação e fazem a
            diferença na vida das famílias que participam do movimento.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="flex flex-col border-none shadow-lg transition-shadow hover:shadow-xl"
            >
              <CardHeader className="pb-2">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                  <feature.icon className="h-6 w-6 text-emerald-600" />
                </div>
                <CardTitle className="text-center">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
