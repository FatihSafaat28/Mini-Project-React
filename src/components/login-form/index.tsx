import { Coffee } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  //  Test Login
  //  Email : lindsay.ferguson@reqres.in
  const router = useRouter();
  const [loginData, setLoginData] = useState<any>({ email: "", password: "" });
  const [open, setOpen] = useState<any>({ isOpen: false, isSuccess: false });

  const submitLogin = async () => {
    const payloadLogin = {
      email: loginData.email,
      password: loginData.password,
    };
    const headers = {
      "Content-Type": "application/json",
      "x-api-key": "reqres_746dd67bd84f4cab98b82566173afb71",
    };
    const response = await fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payloadLogin),
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userEmail", loginData.email);
      setOpen({ isOpen: true, isSuccess: true });
    } else {
      setOpen({ isOpen: true, isSuccess: false });
    }
    console.log("login = ", data);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <Coffee className="size-6" />
              </div>
              <span className="sr-only">My Coffee</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to My Coffee</h1>
            <FieldDescription>
              Don&apos;t have an account? <a href="/register">Sign up</a>
            </FieldDescription>
          </div>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              onChange={(e: any) => {
                setLoginData({ ...loginData, email: e.target.value });
              }}
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder="password"
              onChange={(e: any) => {
                setLoginData({ ...loginData, password: e.target.value });
              }}
              required
            />
          </Field>
          <Field>
            <Button type="button" onClick={() => submitLogin()}>
              Login
            </Button>
          </Field>
        </FieldGroup>
      </form>
      <AlertDialog
        open={open.isOpen}
        onOpenChange={(val) => setOpen({ ...open, isOpen: val })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {open.isSuccess ? "Login Success" : "Login Failed"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {open.isSuccess
                ? "Please press Continue to the homepage."
                : "Sign-in failed. Your email or password is incorrect. Please try again."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                if (open.isSuccess) {
                  router.push("/homepage");
                } else {
                  setOpen({ ...open, isOpen: false });
                }
              }}
            >
              {open.isSuccess ? "Continue" : "Try Again"}
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
