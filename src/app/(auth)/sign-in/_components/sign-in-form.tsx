"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import * as z from "zod";

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

import { SocialSignIn } from "./social-login";

const loginSchema = z.object({
  identifier: z.string().min(3, {
    message: "Digite seu e-mail ou CPF válido.",
  }),
  password: z.string().min(6, {
    message: "A senha deve ter pelo menos 6 caracteres.",
  }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  function isEmail(value: string) {
    // Simples validação de email
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
  }

  function isCPF(value: string) {
    // Aceita CPF formatado ou só números
    return /^(\d{3}\.?\d{3}\.?\d{3}-?\d{2})$/.test(value);
  }

  async function onSubmit(formData: LoginFormValues) {
    setIsLoading(true);
    try {
      if (isEmail(formData.identifier)) {
        await authClient.signIn.email(
          {
            email: formData.identifier,
            password: formData.password,
            callbackURL: "/dashboard",
          },
          {
            onRequest: () => {},
            onSuccess: (ctx) => {
              console.log("LOGADO: ", ctx);
              router.replace("/dashboard");
            },
            onError: (ctx) => {
              console.log("ERRO AO LOGAR: ", ctx);
              if (ctx.error.code === "INVALID_EMAIL_OR_PASSWORD") {
                alert("Email ou senha incorretos");
              }
            },
          },
        );
      } else if (isCPF(formData.identifier)) {
        await authClient.signIn.username(
          {
            username: formData.identifier,
            password: formData.password,
          },
          {
            onRequest: () => {},
            onSuccess: (ctx) => {
              console.log("LOGADO: ", ctx);
              router.replace("/dashboard");
            },
            onError: (ctx) => {
              console.log("ERRO AO LOGAR: ", ctx);
              if (ctx.error.code === "INVALID_EMAIL_OR_PASSWORD") {
                alert("CPF ou senha incorretos");
              }
            },
          },
        );
      } else {
        alert("Digite um e-mail ou CPF válido.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 rounded-lg"
        >
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-emerald-100">
                  E-mail ou CPF
                </FormLabel>
                <FormControl>
                  {isCPF(field.value) ? (
                    <PatternFormat
                      format="###.###.###-##"
                      mask="_"
                      customInput={Input}
                      placeholder="Digite seu CPF"
                      className="rounded-[20px] border-emerald-800/50 bg-black/50 text-emerald-100 placeholder:text-emerald-600 focus:border-emerald-600 focus:ring-emerald-600"
                      disabled={isLoading || form.formState.isSubmitting}
                      autoComplete="username"
                      value={field.value}
                      onValueChange={(values) =>
                        field.onChange(values.formattedValue)
                      }
                    />
                  ) : (
                    <Input
                      placeholder="Digite seu e-mail ou CPF"
                      type="text"
                      className="rounded-[20px] border-emerald-800/50 bg-black/50 text-emerald-100 placeholder:text-emerald-600 focus:border-emerald-600 focus:ring-emerald-600"
                      {...field}
                      disabled={isLoading || form.formState.isSubmitting}
                      autoComplete="username"
                    />
                  )}
                </FormControl>
                <FormMessage className="text-emerald-400" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-emerald-100">Senha</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="••••••"
                      type={showPassword ? "text" : "password"}
                      className="rounded-[20px] border-emerald-800/50 bg-black/50 text-emerald-100 placeholder:text-emerald-600 focus:border-emerald-600 focus:ring-emerald-600"
                      {...field}
                      disabled={isLoading || form.formState.isSubmitting}
                      autoComplete="current-password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading || form.formState.isSubmitting}
                    >
                      {showPassword ? (
                        <EyeOff className="text-muted-foreground h-4 w-4" />
                      ) : (
                        <Eye className="text-muted-foreground h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Esconder senha" : "Mostrar senha"}
                      </span>
                    </Button>
                  </div>
                </FormControl>
                <FormMessage className="text-emerald-400" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full rounded-[20px] bg-emerald-600 text-white transition-colors hover:bg-emerald-700"
            disabled={isLoading || form.formState.isSubmitting}
          >
            {isLoading || form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-emerald-800/50" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-black/50 px-2 text-emerald-400">
            Ou continue com
          </span>
        </div>
      </div>
      <div className="grid gap-2">
        <SocialSignIn />
      </div>
    </div>
  );
}
