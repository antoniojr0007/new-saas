import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resete sua Senha | SaaS Platform",
  description: "Resete sua Senha para acessar a plataforma",
  keywords: ["Resete sua Senha", "autenticação", "saas", "plataforma"],
  authors: [{ name: "SaaS Platform" }],
  openGraph: {
    title: "Resete sua Senha | SaaS Platform",
    description: "Resete sua Senha para acessar a plataforma",
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
