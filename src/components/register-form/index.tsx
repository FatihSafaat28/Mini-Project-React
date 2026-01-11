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

export function RegisterForm() {
  //      REGISTER
  //     "email": "lindsay.ferguson@reqres.in",
  //     "password": "pistol"
  const router = useRouter();
  const [registerData, setRegisterData] = useState<any>({
    email: "",
    password: "",
  });
  const [open, setOpen] = useState<any>({ isOpen: false, isSuccess: false });

  const submitRegister = async () => {
    const payloadRegister = {
      email: registerData.email,
      password: registerData.password,
    };
    const headers = {
      "Content-Type": "application/json",
      "x-api-key": "reqres_746dd67bd84f4cab98b82566173afb71",
    };
    const response = await fetch("https://reqres.in/api/register", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payloadRegister),
    });
    const data = await response.json();
    if (data.token) {
      setOpen({ isOpen: true, isSuccess: true });
    } else {
      setOpen({ isOpen: true, isSuccess: false });
    }
    console.log("register = ", data);
  };

  return (
    <div className={cn("flex flex-col gap-6")}>
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
            <h1 className="text-xl font-bold">Create your new account</h1>
            <FieldDescription>
              You have an account? <a href="./">Sign In</a>
            </FieldDescription>
          </div>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              onChange={(e: any) => {
                setRegisterData({ ...registerData, email: e.target.value });
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
                setRegisterData({ ...registerData, password: e.target.value });
              }}
              required
            />
          </Field>
          <Field>
            <Button type="button" onClick={() => submitRegister()}>
              Register
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
              {open.isSuccess ? "Register Success" : "Register Failed"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {open.isSuccess
                ? "Please press Continue to Sign-in."
                : "Sign-up failed. Your email or password is incorrect. Please try again."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                if (open.isSuccess) {
                  router.push("./");
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
