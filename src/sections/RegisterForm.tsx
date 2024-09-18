import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
  Card,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerSchema } from "@/validations/registerSchema";
import { useState } from "react";
import { UserDataCreate } from "@/modules/users/domain/UserDataCreate";

import { EyeIcon, EyeOffIcon, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
export interface RegisterFormData {
  username: string;
  lastName: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const defaultValues: UserDataCreate = {
    email: "",
    password: "",
    username: "",
  };

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      await axios.post("/api/users/register", {
        username: values.username,
        email: values.email,
        password: values.password,
      });
      alert("Registration successful!");
      form.reset();
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message || "Error during registration");
      }
    }
  };
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Create a new account to get started.</CardDescription>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <CardContent>
          <Form {...form}>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} autoComplete="username" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} autoComplete="email" type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          autoComplete="new-password"
                          type={showPassword ? "text" : "password"}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 bottom-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? (
                            <EyeIcon className="h-4 w-4" aria-hidden="true" />
                          ) : (
                            <EyeOffIcon
                              className="h-4 w-4"
                              aria-hidden="true"
                            />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Form>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full"
          >
            {form.formState.isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Register"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default RegisterForm;
