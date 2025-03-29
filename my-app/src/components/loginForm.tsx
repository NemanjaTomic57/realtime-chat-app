"use client";

import { apiUrl } from "@/environment";
import { routes } from "@/routes";
import { generalErrorToast } from "@/shared/libs/toasts";
import Button from "@/shared/ui/button";
import InputPassword from "@/shared/ui/inputPassword";
import InputText from "@/shared/ui/inputText";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const loginSchema = z.object({
  user: z.string().nonempty("Username is required"),
  password: z.string().nonempty("Password is required"),
});

type LoginFields = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const methods = useForm<LoginFields>({ resolver: zodResolver(loginSchema) });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<LoginFields> = async (data) => {
    const result = await fetch(apiUrl + "account/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (result.status == 200) {
      toast.success("Login successful!");
      router.push(routes.home);
    } else if (result.status == 401) {
      toast.error("Wrong username or password");
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
        <InputText inputName="user" label="Username or email address" background="bg-background" />
        <InputPassword inputName="password" label="Password" className="mb-2" background="bg-background" />
        <Button type="submit" className="fill h-[32px] sm">
          Sign in
        </Button>
      </form>
    </FormProvider>
  );
}
