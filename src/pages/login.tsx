import LoginForm from "@/components/sections/LoginForm";
import { NextPage } from "next";

const RegisterPage: NextPage = () => {
  return (
    <div className="container mx-auto py-10">
      <LoginForm />
    </div>
  );
};

export default RegisterPage;
