import RegisterForm from "@/sections/RegisterForm";
import axios from "axios";
import { NextPage } from "next";
import { useState } from "react";

const RegisterPage: NextPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    setError(null);

    try {
      await axios.post("/api/users/register", {
        username,
        email,
        password,
      });
      alert("Registration successful!");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Error during registration");
      }
    }
  };

  return (
    <div className="container mx-auto py-10">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
