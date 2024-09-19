import { registerSchema, UserDataToRegister } from "@/modules/users/domain";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useRegisterUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (data: UserDataToRegister) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/users/register", data);
      const { token } = response.data;

      if (token) {
        sessionStorage.setItem("authToken", token);
      }

      alert("Registration successful!");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const defaultValues: UserDataToRegister = {
    email: "",
    password: "",
    username: "",
  };

  const showPasswordHandler = () => {
    setShowPassword((prev) => !prev);
  };

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues,
  });

  useEffect(() => {
    setLoading(form.formState.isSubmitting);
  }, [form.formState.isSubmitting]);
  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      await register(values);
      form.reset();
    } catch (err) {
      console.error("Error during registration", err);
    }
  };

  return {
    register,
    loading,
    error,
    showPassword,
    showPasswordHandler,
    onSubmit,
    form,
  };
};
