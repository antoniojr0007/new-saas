import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | SaaS Platform",
  description: "Faça login na sua conta para acessar a plataforma",
  keywords: ["login", "autenticação", "saas", "plataforma"],
  authors: [{ name: "SaaS Platform" }],
  openGraph: {
    title: "Login | SaaS Platform",
    description: "Faça login na sua conta para acessar a plataforma",
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
