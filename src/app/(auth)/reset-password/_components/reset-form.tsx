"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

const resetSchema = z
  .object({
    password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres."),
    confirmPassword: z.string().min(8, "Confirme sua senha."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

type ResetFormValues = z.infer<typeof resetSchema>;

export function ResetForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  async function onSubmit(values: ResetFormValues) {
    setIsLoading(true);
    setSuccess(null);
    setError(null);
    if (!token) {
      setError("Token de redefinição inválido ou ausente.");
      setIsLoading(false);
      return;
    }
    try {
      await authClient.resetPassword(
        {
          newPassword: values.password,
          token,
        },
        {
          onRequest: () => setIsLoading(true),
          onSuccess: () => {
            setSuccess(
              "Senha redefinida com sucesso! Faça login com sua nova senha.",
            );
            setTimeout(() => router.replace("/sign-in"), 2000);
          },
          onError: (ctx) => setError(ctx.error.message),
          onResponse: () => setIsLoading(false),
        },
      );
    } catch {
      setError("Erro ao redefinir a senha. Tente novamente.");
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 rounded-lg"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-emerald-100">Nova Senha</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite sua nova senha"
                  type="password"
                  autoComplete="new-password"
                  disabled={isLoading}
                  className="rounded-[20px] border-emerald-800/50 bg-black/50 text-emerald-100 placeholder:text-emerald-600 focus:border-emerald-600 focus:ring-emerald-600"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-emerald-100">
                Confirmar Nova Senha
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Confirme sua nova senha"
                  type="password"
                  autoComplete="new-password"
                  disabled={isLoading}
                  className="rounded-[20px] border-emerald-800/50 bg-black/50 text-emerald-100 placeholder:text-emerald-600 focus:border-emerald-600 focus:ring-emerald-600"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {success && (
          <div className="text-center text-sm text-green-500">{success}</div>
        )}
        {error && (
          <div className="text-center text-sm text-red-500">{error}</div>
        )}
        <Button
          type="submit"
          className="mt-8 w-full rounded-[20px] bg-emerald-600 text-white transition-colors hover:bg-emerald-700"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Redefinindo...
            </>
          ) : (
            "Redefinir Senha"
          )}
        </Button>
      </form>
    </Form>
  );
}
