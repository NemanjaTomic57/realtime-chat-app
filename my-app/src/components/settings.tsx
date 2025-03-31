"use client";

import Button from "@/shared/ui/button";
import { useState } from "react";
import ContainerSmCenter from "@/shared/ui/containerMdCenter";
import Heading from "@/shared/ui/heading";
import Icon from "@/shared/ui/icon";
import Overlay from "@/shared/ui/overlay";
import Image from "next/image";
import { Form, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import InputEmail from "@/shared/ui/inputEmail";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiUrl } from "@/environment";
import toast from "react-hot-toast";
import { generalErrorToast } from "@/shared/libs/toasts";

const emailSchema = z.object({
  email: z.string().email(),
});

type EmailField = z.infer<typeof emailSchema>;

interface Props {
  user: User;
  className: string;
}

export default function Settings({ user, className }: Props) {
  const [show, setShow] = useState(false);
  const methods = useForm<EmailField>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: user.email,
    },
  });
  const { handleSubmit, watch } = methods;
  const currentEmail = watch("email");

  const updateEmail: SubmitHandler<EmailField> = async (data) => {
    const res = await fetch(apiUrl + "account/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (res.status == 200) {
      toast.success("Email update successful");
    } else {
      generalErrorToast();
    }
  };

  return (
    <>
      <Button onClick={() => setShow(true)} className={className}>
        Settings
      </Button>

      {show && (
        <>
          <Overlay />
          <ContainerSmCenter>
            <div className="grid gap-8">
              <div className="flex justify-between items-center">
                <Heading type="h2">Settings</Heading>
                <button
                  onClick={() => setShow(false)}
                  className="p-2 cursor-pointer hover:bg-primary-light rounded-full"
                >
                  <Icon name="close" size="lg" />
                </button>
              </div>

              <div className="grid gap-4">
                <Image
                  src="/profilePicturePlaceholder.png"
                  alt="Profile Picture"
                  height={140}
                  width={140}
                  className="m-auto rounded-full"
                />
                <Button className="btn__chat-header m-auto">
                  Change or set profile picture
                </Button>
              </div>

              <FormProvider {...methods}>
                <form noValidate onSubmit={handleSubmit(updateEmail)} className="grid gap-4">
                  <InputEmail inputName="email" label="Email" placeholder="Your Email" background="bg-primary-tint" />
                  <p>Submit your email to get an instant notification upon receiving a message.</p>
                  <Button
                    type="submit"
                    className="btn__chat-header mr-auto"
                    disabled={user.email === currentEmail}
                  >
                    Submit
                  </Button>
                </form>
              </FormProvider>
            </div>
          </ContainerSmCenter>
        </>
      )}
    </>
  );
}
