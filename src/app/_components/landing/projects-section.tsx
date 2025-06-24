import { Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ProjectsSection() {
  const projectsInProgress = [
    {
      title: "Residencial Jardim Esperança",
      location: "São Paulo, SP - 240 unidades",
      progress: 70,
      description:
        "Apartamentos de 2 quartos com 50m², área de lazer completa e centro comunitário. Previsão de entrega: Dezembro/2023.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "Condomínio Nova Aurora",
      location: "Belo Horizonte, MG - 180 unidades",
      progress: 45,
      description:
        "Casas geminadas de 2 e 3 quartos com quintal. Projeto inclui praça central e horta comunitária. Previsão de entrega: Março/2024.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "Residencial Bela Vista",
      location: "Recife, PE - 120 unidades",
      progress: 25,
      description:
        "Apartamentos de 2 quartos com 45m², próximo a escolas e posto de saúde. Previsão de entrega: Julho/2024.",
      image: "/placeholder.svg?height=400&width=600",
    },
  ];

  const projectsPlanning = [
    {
      title: "Conjunto Novo Horizonte",
      location: "Porto Alegre, RS - 200 unidades",
      status: "Fase de aprovação de projetos",
      description:
        "Apartamentos de 2 e 3 quartos com área de lazer. Início das obras previsto para Janeiro/2024.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "Vila dos Ipês",
      location: "Fortaleza, CE - 150 unidades",
      status: "Fase de captação de recursos",
      description:
        "Casas térreas de 2 quartos com possibilidade de ampliação. Início das obras previsto para Março/2024.",
      image: "/placeholder.svg?height=400&width=600",
    },
  ];

  const projectsCompleted = [
    {
      title: "Residencial Primavera",
      location: "São Paulo, SP - 320 unidades",
      completedYear: "2022",
      description:
        "Apartamentos de 2 quartos com 45m², área de lazer e centro comunitário.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "Conjunto Vitória",
      location: "Rio de Janeiro, RJ - 180 unidades",
      completedYear: "2021",
      description:
        "Casas térreas de 2 quartos com quintal, praça central e equipamentos comunitários.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "Residencial Boa Esperança",
      location: "Salvador, BA - 150 unidades",
      completedYear: "2020",
      description:
        "Apartamentos de 2 quartos com 50m², área de lazer e centro comunitário.",
      image: "/placeholder.svg?height=400&width=600",
    },
  ];

  return (
    <section id="projetos" className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <Badge className="mx-auto mb-4 w-fit bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
            Nossos Projetos
          </Badge>
          <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
            Projetos Habitacionais em Andamento
          </h2>
          <p className="text-lg text-gray-600">
            Conheça os projetos que estamos desenvolvendo atualmente e seus
            respectivos estágios de implementação.
          </p>
        </div>

        <Tabs defaultValue="andamento" className="w-full">
          <TabsList className="mx-auto mb-8 grid w-full max-w-2xl grid-cols-3">
            <TabsTrigger value="andamento">Em Andamento</TabsTrigger>
            <TabsTrigger value="planejamento">Em Planejamento</TabsTrigger>
            <TabsTrigger value="concluidos">Concluídos</TabsTrigger>
          </TabsList>

          <TabsContent value="andamento" className="space-y-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projectsInProgress.map((project, index) => (
                <Card
                  key={index}
                  className="flex flex-col border-none shadow-lg transition-shadow hover:shadow-xl"
                >
                  <CardHeader className="flex flex-col">
                    <div className="relative -mx-6 -mt-6 mb-4 h-48 overflow-hidden rounded-t-lg">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="h-full w-full object-cover"
                      />
                      <Badge className="absolute top-4 right-4 bg-emerald-500">
                        {project.progress}% Concluído
                      </Badge>
                    </div>
                    <CardTitle className="text-center">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-center">
                      {project.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col space-y-4">
                    <div>
                      <div className="mb-1 flex justify-between text-sm">
                        <span>Progresso da obra</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    <p className="text-sm text-gray-600">
                      {project.description}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Ver detalhes
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="planejamento" className="space-y-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projectsPlanning.map((project, index) => (
                <Card
                  key={index}
                  className="flex flex-col border-none shadow-lg transition-shadow hover:shadow-xl"
                >
                  <CardHeader className="flex flex-col">
                    <div className="relative -mx-6 -mt-6 mb-4 h-48 overflow-hidden rounded-t-lg">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="h-full w-full object-cover"
                      />
                      <Badge className="absolute top-4 right-4 bg-amber-500">
                        Em Planejamento
                      </Badge>
                    </div>
                    <CardTitle className="text-center">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-center">
                      {project.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col space-y-4">
                    <div className="flex items-center justify-center gap-2 text-amber-600">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        {project.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {project.description}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Ver detalhes
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="concluidos" className="space-y-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projectsCompleted.map((project, index) => (
                <Card
                  key={index}
                  className="flex flex-col border-none shadow-lg transition-shadow hover:shadow-xl"
                >
                  <CardHeader className="flex flex-col">
                    <div className="relative -mx-6 -mt-6 mb-4 h-48 overflow-hidden rounded-t-lg">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="h-full w-full object-cover"
                      />
                      <Badge className="absolute top-4 right-4 bg-emerald-500">
                        Concluído em {project.completedYear}
                      </Badge>
                    </div>
                    <CardTitle className="text-center">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-center">
                      {project.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col">
                    <p className="text-sm text-gray-600">
                      {project.description}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Ver detalhes
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
