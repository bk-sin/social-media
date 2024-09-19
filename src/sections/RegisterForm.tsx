import { LoaderCircle, EyeOffIcon, EyeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardHeader,
  CardFooter,
  CardDescription,
  CardContent,
  Card,
} from "@/components/ui/card";
import {
  FormMessage,
  FormLabel,
  FormItem,
  FormField,
  FormControl,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRegisterUser } from "@/hooks/useRegisterUser";

const RegisterForm = () => {
  const { loading, form, showPassword, showPasswordHandler, onSubmit } =
    useRegisterUser();
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
                          onClick={showPasswordHandler}
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
            disabled={loading || form.formState.isSubmitting}
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
