"use client";

import { ResetForm } from "./_components/reset-form";

export default function ResetPasswordPage() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-emerald-950 to-black" />
      {/* Animated gradient overlay */}
      <div className="animate-gradient absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/30 via-transparent to-transparent" />
      {/* Content */}
      <div className="relative w-full max-w-md space-y-8 rounded-[5%] border border-emerald-800/50 bg-black/50 p-8 shadow-[0_0_15px_rgba(16,185,129,0.1)] backdrop-blur-sm">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-emerald-100">
            Redefinir Senha
          </h1>
          <p className="text-sm text-emerald-400">
            Crie uma nova senha para sua conta
          </p>
        </div>
        <div className="mt-8">
          <ResetForm />
        </div>
        <p className="text-center text-sm text-emerald-400">
          Lembrou sua senha?{" "}
          <a
            href="/sign-in"
            className="underline underline-offset-4 transition-colors hover:text-emerald-300"
          >
            Fazer Login
          </a>
        </p>
      </div>
    </div>
  );
}
