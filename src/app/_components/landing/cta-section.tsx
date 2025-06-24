import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="bg-emerald-700 py-20 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col space-y-6">
            <h2 className="text-3xl leading-tight font-bold md:text-4xl">
              Junte-se ao movimento e conquiste sua casa própria
            </h2>
            <p className="text-lg text-emerald-100">
              Participe das nossas reuniões informativas e conheça como o
              movimento pode ajudar você a realizar o sonho da casa própria.
            </p>
            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-white text-emerald-700 hover:bg-emerald-50"
              >
                <Link href="/sign-in">
                  Área do Membro
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-emerald-700 hover:bg-emerald-600 dark:text-white"
              >
                <Link href="#contato">Entre em contato</Link>
              </Button>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-xl shadow-2xl">
            <img
              src="/placeholder.svg?height=500&width=700"
              alt="Reunião do movimento"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
