import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registro | SaaS Platform",
  description: "Faça seu registro para acessar a plataforma",
  keywords: ["registro", "autenticação", "saas", "plataforma"],
  authors: [{ name: "SaaS Platform" }],
  openGraph: {
    title: "Registro | SaaS Platform",
    description: "Faça seu registro para acessar a plataforma",
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
