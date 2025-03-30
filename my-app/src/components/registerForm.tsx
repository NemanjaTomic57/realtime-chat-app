"use client";

import { apiUrl } from "@/environment";
import { routes } from "@/routes";
import { generalErrorToast } from "@/shared/libs/toasts";
import Button from "@/shared/ui/button";
import InputEmail from "@/shared/ui/inputEmail";
import InputPassword from "@/shared/ui/inputPassword";
import InputText from "@/shared/ui/inputText";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const registerSchema = z
  .object({
    username: z
      .string()
      .nonempty("Username is required")
      .regex(/^[a-zA-Z0-9]+$/, "Can only contain letters or digits"),
    email: z.string().optional(),
    password: z.string().nonempty("Password is required").min(6),
    repeatPassword: z.string().nonempty("Repeat password is required"),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"],
  });

type RegisterFields = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const methods = useForm<RegisterFields>({ resolver: zodResolver(registerSchema) });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<RegisterFields> = async (data) => {
    const result = await fetch(apiUrl + "account/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (result.status == 200) {
      toast.success("Superb! Please log into your brand new account.");
      router.push(routes.login);
    } else if (result.status == 500) {
      toast.error("This username is already taken. Please take another one.");
    } else {
      generalErrorToast();
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="bg-tone p-4 rounded-lg border-1 border-border grid gap-3"
      >
        <InputText inputName="username" label="Username" background="bg-background" />
        <InputEmail inputName="email" label="E-Mail (optional)" background="bg-background" questionTooltip />
        <InputPassword inputName="password" label="Password" className="mb-2" background="bg-background" />
        <InputPassword inputName="repeatPassword" label="Repeat password" className="mb-2" background="bg-background" />
        <Button type="submit" className="btn-fill h-[32px] btn-sm">
          Continue
        </Button>
      </form>
    </FormProvider>
  );
}
