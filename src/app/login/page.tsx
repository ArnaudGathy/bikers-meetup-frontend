"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { login } from "@/lib/actions/login";
import { useFormState } from "react-dom";
import LoginButton from "@/app/login/LoginButton";

export default function Login() {
  const [errorMessage, dispatch] = useFormState(login, undefined);

  return (
    <div className="mt-16 flex items-center justify-center">
      <form action={dispatch}>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your administrator details below to login.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" type="text" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" name="password" required />
            </div>
            {errorMessage && <p className="text-destructive">{errorMessage}</p>}
          </CardContent>
          <CardFooter>
            <LoginButton />
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
