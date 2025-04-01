"use client";

import Button from "@/shared/ui/button";
import { ChangeEvent, useState } from "react";
import ContainerSmCenter from "@/shared/ui/containerMdCenter";
import Heading from "@/shared/ui/heading";
import Icon from "@/shared/ui/icon";
import Overlay from "@/shared/ui/overlay";
import Image from "next/image";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
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
  const [file, setFile] = useState<File | null>();
  const [initialImageUrl, setInitialImageUrl] = useState(user.profilePictureUrl || "/profilePicturePlaceholder.png");
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [submittingImage, setSubmittingImage] = useState(false);
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
      toast.success("Check your inbox!");
    } else {
      generalErrorToast();
    }
  };

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setImageUrl(URL.createObjectURL(selectedFile));
    }
  }

  async function handleFileUpload() {
    if (!file) return;
    setSubmittingImage(true);
    const formData = new FormData();
    formData.append("profilePicture", file);
    console.log(formData)

    const res = await fetch(apiUrl + "account/profile-picture", {
      method: "POST",
      credentials: "include",
      body: formData,
    })

    setSubmittingImage(false);
    if (res.status == 200) {
      setInitialImageUrl(imageUrl);
      toast.success("Profile picture updated");
    } else {
      generalErrorToast();
    }
  }

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
                <div className="relative w-[140px] aspect-square m-auto rounded-full overflow-hidden">
                  <Image src={imageUrl} alt="Profile Picture" fill className="object-cover" />
                </div>

                <div className="w-full flex gap-2">
                  <label htmlFor="file" className="btn w-full btn__chat-header text-center block">
                    Choose profile picture to upload (PNG, JPG)
                  </label>

                  <input
                    type="file"
                    id="file"
                    name="image_uploads"
                    accept=".jpg, .jpeg, .png"
                    onChange={handleFileChange}
                  />

                  <Button
                    onClick={handleFileUpload}
                    className="btn w-full btn__chat-header text-center h-full!"
                    disabled={imageUrl === initialImageUrl || submittingImage}
                  >
                    Submit Picture
                  </Button>
                </div>
              </div>

              <FormProvider {...methods}>
                <form noValidate onSubmit={handleSubmit(updateEmail)} className="grid gap-4">
                  <InputEmail inputName="email" label="Email" placeholder="Your Email" background="bg-primary-tint" />

                  <p>Submit your email to get an instant notification upon receiving a message.</p>

                  <Button type="submit" className="btn__chat-header mr-auto" disabled={user.email === currentEmail}>
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
