import LoginForm from "@/components/auth/login-form";
import { Card, CardContent } from "@/components/ui/card";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
};

const Login = () => {
  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-[52rem]">
          <div className="flex flex-col gap-6">
            <Card className="overflow-hidden">
              <CardContent className="grid p-0 md:grid-cols-2">
                <div className="relative hidden md:block">
                  <div className="absolute inset-0 bg-black/30 z-10" />
                  <Image
                    src="/images/login-bg.jpg"
                    alt="Image"
                    className="object-cover"
                    fill
                    priority
                  />
                </div>
                <LoginForm />
              </CardContent>
            </Card>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
              By clicking continue, you agree to our{" "}
              <Link href="#">Terms of Service</Link> and{" "}
              <Link href="#">Privacy Policy</Link>.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
