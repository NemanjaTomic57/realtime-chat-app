"use client";

import Button from "@/shared/ui/button";
import InputPassword from "@/shared/ui/inputPassword";
import InputText from "@/shared/ui/inputText";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().nonempty("Username is required"),
  password: z.string().nonempty("Password is required"),
});

type LoginFields = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const methods = useForm<LoginFields>({ resolver: zodResolver(loginSchema) });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<LoginFields> = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="bg-tone p-4 rounded-lg border-1 border-border grid gap-3"
      >
        <InputText inputName="username" label="Username or email address" background="bg-background" />
        <InputPassword inputName="password" label="Password" className="mb-2" background="bg-background" />
        <Button type="submit" className="fill h-[32px] sm">
          Sign in
        </Button>
      </form>
    </FormProvider>
  );
}
