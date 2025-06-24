"use client";

import Link from "next/link";

import { SignInForm } from "./_components/sign-in-form";

export default function SignInPage() {
  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-emerald-950 to-black" />

      {/* Animated gradient overlay */}
      <div className="animate-gradient absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/30 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative w-full max-w-md space-y-8 rounded-[5%] border border-emerald-800/50 bg-black/50 p-8 shadow-[0_0_15px_rgba(16,185,129,0.1)] backdrop-blur-sm">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-emerald-100">
            Bem-vindo de volta
          </h1>
          <p className="text-sm text-emerald-400">
            Entre com suas credenciais para acessar sua conta
          </p>
        </div>
        <div className="mt-8">
          <SignInForm />
        </div>
        <p className="text-center text-sm text-emerald-400">
          Não tem uma conta?{" "}
          <Link
            href="/sign-up"
            className="underline underline-offset-4 transition-colors hover:text-emerald-300"
          >
            Criar conta
          </Link>
        </p>
        <p className="text-center text-sm text-emerald-400">
          Esqueceu sua Senha{" "}
          <Link
            href="/forgot-password"
            className="underline underline-offset-4 transition-colors hover:text-emerald-300"
          >
            Recupere sua Senha?
          </Link>
        </p>
      </div>
    </div>
  );
}
