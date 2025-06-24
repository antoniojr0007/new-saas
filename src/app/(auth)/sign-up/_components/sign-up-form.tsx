"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { toast } from "sonner";
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

const signUpSchema = z
  .object({
    nome: z.string().min(2, "Nome obrigatório"),
    email: z.string().email("E-mail inválido"),
    cpf: z
      .string()
      .min(14, "CPF inválido")
      .regex(/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string().min(6, "Confirme sua senha"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type SignUpFormValues = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      nome: "",
      email: "",
      cpf: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(formData: SignUpFormValues) {
    setIsLoading(true);
    try {
      await authClient.signUp.email(
        {
          username: formData.cpf.replace(/\D/g, ""),
          email: formData.email,
          password: formData.password,
          name: formData.nome,
        },
        {
          onSuccess: (ctx) => {
            console.log("CADASTRADO: ", ctx);
            router.push("/dashboard");
          },
          onError: (ctx) => {
            if (ctx.error.code === "USER_ALREADY_EXISTS") {
              toast.error("CPF ou e-mail já cadastrado.");
              return;
            }
            toast.error("Erro ao criar conta.");
          },
        },
      );
    } finally {
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
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-emerald-100">Nome</FormLabel>
              <FormControl>
                <Input
                  placeholder="Seu nome completo"
                  {...field}
                  disabled={isLoading || form.formState.isSubmitting}
                  autoComplete="name"
                  className="rounded-[20px] border-emerald-800/50 bg-black/50 text-emerald-100 placeholder:text-emerald-600 focus:border-emerald-600 focus:ring-emerald-600"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-emerald-100">E-mail</FormLabel>
              <FormControl>
                <Input
                  placeholder="seu@email.com"
                  type="email"
                  {...field}
                  disabled={isLoading || form.formState.isSubmitting}
                  autoComplete="email"
                  className="rounded-[20px] border-emerald-800/50 bg-black/50 text-emerald-100 placeholder:text-emerald-600 focus:border-emerald-600 focus:ring-emerald-600"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cpf"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-emerald-100">CPF</FormLabel>
              <FormControl>
                <PatternFormat
                  format="###.###.###-##"
                  mask="_"
                  customInput={Input}
                  placeholder="000.000.000-00"
                  {...field}
                  disabled={isLoading || form.formState.isSubmitting}
                  value={field.value}
                  onValueChange={(values) => field.onChange(values.value)}
                  autoComplete="cpf"
                  className="rounded-[20px] border-emerald-800/50 bg-black/50 text-emerald-100 placeholder:text-emerald-600 focus:border-emerald-600 focus:ring-emerald-600"
                />
              </FormControl>
              <FormMessage />
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
                    placeholder="Sua senha"
                    type={showPassword ? "text" : "password"}
                    {...field}
                    disabled={isLoading || form.formState.isSubmitting}
                    autoComplete="new-password"
                    className="rounded-[20px] border-emerald-800/50 bg-black/50 text-emerald-100 placeholder:text-emerald-600 focus:border-emerald-600 focus:ring-emerald-600"
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
                Confirmar Senha
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Confirme sua senha"
                    type={showConfirmPassword ? "text" : "password"}
                    {...field}
                    disabled={isLoading || form.formState.isSubmitting}
                    autoComplete="new-password"
                    className="rounded-[20px] border-emerald-800/50 bg-black/50 text-emerald-100 placeholder:text-emerald-600 focus:border-emerald-600 focus:ring-emerald-600"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading || form.formState.isSubmitting}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="text-muted-foreground h-4 w-4" />
                    ) : (
                      <Eye className="text-muted-foreground h-4 w-4" />
                    )}
                    <span className="sr-only">
                      {showConfirmPassword ? "Esconder senha" : "Mostrar senha"}
                    </span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
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
              Registrando...
            </>
          ) : (
            "Registrar"
          )}
        </Button>
      </form>
    </Form>
  );
}
