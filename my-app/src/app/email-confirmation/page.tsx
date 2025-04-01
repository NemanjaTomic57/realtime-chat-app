"use client";

import { apiUrl } from "@/environment";
import { generalErrorToast } from "@/shared/libs/toasts";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Page() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email");
  const token = params.get("token");

  useEffect(() => {
    const callEndpoint = async () => {
      const data: EmailToken = {
        email: email!,
        token: token!,
      };

      toast.loading("Changing email ...");
      const res = await fetch(apiUrl + "account/email/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      toast.dismiss();
      if (res.status == 200) {
        toast.success("Email confirmation successful!");
      } else {
        generalErrorToast();
      }

      setTimeout(function () {
        router.push("/");
      }, 2000);
    };
    callEndpoint();
  }, []);
}
