import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Maria Silva",
      role: "Moradora do Residencial Primavera",
      content:
        "Depois de 15 anos pagando aluguel, finalmente tenho meu cantinho. Participar do movimento mudou minha vida e a dos meus filhos. Hoje temos segurança e dignidade.",
      avatar: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "João Santos",
      role: "Morador do Conjunto Vitória",
      content:
        "No início eu tinha dúvidas, mas a união das famílias e a seriedade do movimento me convenceram. Hoje tenho uma casa própria que jamais conseguiria comprar sozinho.",
      avatar: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Ana Oliveira",
      role: "Moradora do Residencial Boa Esperança",
      content:
        "Além da casa, ganhei uma comunidade. Os laços que formamos durante a luta continuam fortes. Nos ajudamos mutuamente e cuidamos do nosso espaço coletivo.",
      avatar: "/placeholder.svg?height=200&width=200",
    },
  ];

  return (
    <section id="depoimentos" className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <Badge className="mx-auto mb-4 w-fit bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
            Depoimentos
          </Badge>
          <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
            O que nossos usuários dizem
          </h2>
          <p className="text-lg text-gray-600">
            Conheça as histórias de pessoas que conquistaram sua casa própria
            através do movimento.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="flex flex-col border-none shadow-lg transition-shadow hover:shadow-xl"
            >
              <CardHeader className="flex flex-col items-center">
                <div className="mb-4 h-16 w-16 overflow-hidden rounded-full">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <CardTitle>{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.role}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <p className="text-center text-gray-600 italic">
                  &quot;{testimonial.content}&quot;
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
