"use client";

import { routes } from "@/routes";
import { logout } from "@/services/account";
import Button from "@/shared/ui/button";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";

interface Props {
  userPromise: Promise<User | null>;
}

export default function ChatPanel({ userPromise }: Props) {
  const user = use(userPromise);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push(routes.login);
    }
  }, []);

  return (
    <>
      <Button onClick={logout}>Logout</Button>
    </>
  );
}
