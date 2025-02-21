"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, MoveRight } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import AppLogo from "@/components/app-logo";
import { loginRequestSchema } from "@/lib/validations/auth_validations";
import { LoginRequestInput } from "@/types/auth_types";
import { useLoginUser } from "@/services/auth_services/auth_mutations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useState } from "react";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginRequestInput>({
    mode: "all",
    resolver: zodResolver(loginRequestSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutate: loginUser, isPending } = useLoginUser();

  const onFormSubmit = (data: LoginRequestInput) => {
    loginUser(data);
  };

  return (
    <div className="p-6 md:p-8">
      <div className="flex justify-center">
        <AppLogo width={80} />
      </div>
      <div className="flex flex-col items-center text-center">
        <h1 className="text-2xl font-semibold">Welcome back</h1>
        <p className="text-balance text-muted-foreground">
          Login to your CETA account
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter your username"
                    className={`${
                      form.formState.errors.username ? "border-red-500" : ""
                    }`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <div className="flex items-center">
                  <FormLabel>Password</FormLabel>
                  <Link
                    href="#"
                    className="ml-auto text-xs underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className={`${
                        form.formState.errors.password ? "border-red-500" : ""
                      } pr-14`}
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="absolute right-2 top-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button size="lg" className="w-full gap-6 h-12">
            {isPending ? (
              <>
                <span>Please wait</span>
                <ClipLoader color="#fff" size={24} />
              </>
            ) : (
              <>
                <span>Continue</span>
                <span>
                  <MoveRight />
                </span>
              </>
            )}
          </Button>

          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline underline-offset-4">
              Contact support
            </Link>
          </div>
        </form>
      </Form>
      {/* <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="flex flex-col gap-6">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              {...register("username")}
              error={!!errors.username}
              helperText={errors.username?.message}
              placeholder="Enter your username"
            />
          </div>
          <div>
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                href="#"
                className="ml-auto text-sm underline-offset-2 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Input
              type="password"
              id="password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              placeholder="Enter your password"
            />
          </div>
          <div>
            <Button size="lg" className="w-full gap-6">
              {isPending ? (
                <>
                  <span>Please wait</span>
                  <ClipLoader color="#fff" size={24} />
                </>
              ) : (
                <>
                  <span>Continue</span>
                  <span>
                    <MoveRight />
                  </span>
                </>
              )}
            </Button>
          </div>

          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline underline-offset-4">
              Contact support
            </Link>
          </div>
        </div>
      </form> */}
    </div>
  );
};

export default LoginForm;
