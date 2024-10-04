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
import { useLoginUser } from "@/hooks/useLoginUser";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth";

const LoginForm = () => {
  const { loading, form, showPassword, showPasswordHandler, onSubmit } =
    useLoginUser();
  const { token } = useAuthStore((state) => state);
  const router = useRouter();
  const onRegisterButtonClick = () => {
    router.push("/register");
  };

  useEffect(() => {
    token && router.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Login to your account.</CardDescription>
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          autoComplete="password"
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
        <CardFooter className="flex-col gap-4">
          <Button
            type="submit"
            disabled={loading || form.formState.isSubmitting}
            className="w-full"
          >
            {form.formState.isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Login"
            )}
          </Button>
          <Button
            type="button"
            variant={"outline"}
            disabled={loading || form.formState.isSubmitting}
            className="w-full"
            onClick={onRegisterButtonClick}
          >
            Register
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginForm;
