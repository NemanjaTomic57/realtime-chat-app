"use client";

import Button from "@/shared/ui/button";
import InputEmail from "@/shared/ui/inputEmail";
import InputPassword from "@/shared/ui/inputPassword";
import InputText from "@/shared/ui/inputText";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const registerSchema = z
  .object({
    username: z.string().nonempty("Username is required"),
    email: z.string().optional(),
    password: z.string().nonempty("Password is required"),
    repeatPassword: z.string().nonempty("Repeat password is required"),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"],
  });

type RegisterFields = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const methods = useForm<RegisterFields>({ resolver: zodResolver(registerSchema) });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<RegisterFields> = (data) => {
    console.log(data);
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
        <Button type="submit" className="fill h-[32px] sm">
          Continue
        </Button>
      </form>
    </FormProvider>
  );
}
