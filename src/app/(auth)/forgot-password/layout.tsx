import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recupere sua Senha | SaaS Platform",
  description: "Recupere sua Senha para acessar a plataforma",
  keywords: ["Recupere sua Senha", "autenticação", "saas", "plataforma"],
  authors: [{ name: "SaaS Platform" }],
  openGraph: {
    title: "Recupere sua Senha | SaaS Platform",
    description: "Recupere sua Senha para acessar a plataforma",
    type: "website",
  },
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
