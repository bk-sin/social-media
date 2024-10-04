import { loginSchema, UserDataToAuthenticate } from "@/modules/users/domain";
import { useAuthStore } from "@/store/auth";
import { handleError } from "@/utils/errorHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useLoginUser = () => {
  const [loading, setLoading] = useState(false);

  const login = async (data: UserDataToAuthenticate) => {
    setLoading(true);

    try {
      const response = await axios.post("/api/users/login", data);
      const { token, ...user } = response.data;
      if (token) {
        useAuthStore.getState().setToken(token);
        useAuthStore.getState().setUser(user);
      }

      alert("Login successful!");
    } catch (err) {
      const errorMessage = handleError(err);
      console.error(errorMessage);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const defaultValues: UserDataToAuthenticate = {
    username: "emilianogalegre",
    password: "Emiliano97!",
  };

  const showPasswordHandler = () => {
    setShowPassword((prev) => !prev);
  };

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues,
  });

  useEffect(() => {
    setLoading(form.formState.isSubmitting);
  }, [form.formState.isSubmitting]);
  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      await login(values);
    } catch (err) {
      console.error("Error during registration", err);
    }
  };

  return {
    loading,
    showPassword,
    showPasswordHandler,
    onSubmit,
    form,
  };
};
