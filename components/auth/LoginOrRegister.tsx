"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { signIn, signUp } from "@/lib/auth-client";
import { loginSchema, registerSchema } from "@/lib/validations/auth";
import { toast } from "sonner";

export default function LoginOrRegister() {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = Object.fromEntries(
      new FormData(e.currentTarget),
    ) as Record<string, string>;

    try {
      if (isLogin) {
        const parsed = loginSchema.safeParse(formData);

        if (!parsed.success) {
          toast.error(parsed.error.issues[0].message);
          return;
        }

        const { error } = await signIn.email({
          email: parsed.data.email,
          password: parsed.data.password,
          rememberMe: true,
          callbackURL: "/controlBooth",
        });

        if (error) {
          toast.error(error.message);
        }
      } else {
        const parsed = registerSchema.safeParse(formData);

        if (!parsed.success) {
          toast.error(parsed.error.issues[0].message);
          return;
        }

        const { error } = await signUp.email({
          name: parsed.data.username,
          email: parsed.data.email,
          password: parsed.data.password,
        });

        if (error) {
          toast.error(error.message);
        } else {
          toast.success("Registration success. Please login.");
          setIsLogin(true);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{isLogin ? "Login" : "Create account"}</CardTitle>

          <CardDescription>Enter your details to continue</CardDescription>

          <CardAction>
            <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Sign Up" : "Sign In"}
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="grid gap-2">
                <Label>Username</Label>
                <Input name="username" type="text" required />
              </div>
            )}

            <div className="grid gap-2">
              <Label>Email</Label>
              <Input name="email" type="email" required />
            </div>

            <div className="grid gap-2">
              <Label>Password</Label>
              <Input name="password" type="password" required />
            </div>

            <Separator />

            <Button type="submit" className="w-full">
              {isLogin ? "Login" : "Register"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              signIn.social({
                provider: "google",
                callbackURL: "/controlBooth",
                fetchOptions: {
                  query: {
                    prompt: "consent select_account",
                  },
                },
              });
            }}
          >
            Continue with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
