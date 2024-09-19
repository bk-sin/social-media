import { registerSchema, UserDataToRegister } from "@/modules/users/domain";
import { useAuthStore } from "@/store/auth";
import { handleError } from "@/utils/errorHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useLoginUser = () => {
  const [loading, setLoading] = useState(false);

  const register = async (data: UserDataToRegister) => {
    setLoading(true);

    try {
      const response = await axios.post("/api/users/register", data);
      const { token } = response.data;

      if (token) {
        useAuthStore.getState().setToken(token);
      }

      alert("Registration successful!");
    } catch (err) {
      const errorMessage = handleError(err);
      console.error(errorMessage);
      alert(errorMessage);
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
    showPassword,
    showPasswordHandler,
    onSubmit,
    form,
  };
};
