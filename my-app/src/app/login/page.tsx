import LoginForm from "@/components/loginForm";
import { routes } from "@/routes";
import Heading from "@/shared/ui/heading";
import Link from "next/link";

export default function Page() {
  return (
    <div className="container-center-sm">
      <div className="text-center mb-8">
        <Heading type="h1" className="mb-4">
          My First Real-Time Chat App
        </Heading>
        <Heading type="h2">Developed with Next.js and .Net Core 9</Heading>
      </div>

      <div className="w-[300px]">
        <LoginForm />
        <p className="text-center mt-8">
          New here? <Link href={routes.register}>Create an account</Link>
        </p>
      </div>
    </div>
  );
}
