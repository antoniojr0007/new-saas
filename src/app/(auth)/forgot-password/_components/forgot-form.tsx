"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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

const forgotSchema = z.object({
  email: z.string().email("E-mail inválido"),
});

type ForgotFormValues = z.infer<typeof forgotSchema>;

export function ForgotForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: ForgotFormValues) {
    setIsLoading(true);
    setSuccess(null);
    setError(null);
    try {
      await authClient.forgetPassword(
        {
          email: values.email,
          redirectTo: "/reset-password", // URL para onde o usuário será redirecionado após resetar a senha
        },
        {
          onRequest: () => setIsLoading(true),
          onSuccess: () =>
            setSuccess("Enviamos um link de recuperação para seu e-mail."),
          onError: (ctx) => setError(ctx.error.message),
          onResponse: () => setIsLoading(false),
        },
      );
    } catch {
      setError("Erro ao enviar o link de recuperação. Tente novamente.");
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-emerald-100">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="seu@email.com"
                  type="email"
                  autoComplete="email"
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
          {isLoading ? "Enviando..." : "Enviar link de recuperação"}
        </Button>
      </form>
    </Form>
  );
}
