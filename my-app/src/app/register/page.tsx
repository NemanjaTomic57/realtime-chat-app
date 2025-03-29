import RegisterForm from "@/components/registerForm";
import Heading from "@/shared/ui/heading";
import Link from "next/link";

export default function Page() {
  return (
    <div className="container-center">
      <div className="text-center mb-8">
        <Heading type="h1">
          Sign up
        </Heading>
      </div>

      <div className="w-[300px]">
        <RegisterForm />
        <p className="text-center mt-8">
          Already have an account? <Link href="/">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
