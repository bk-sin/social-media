import RegisterForm from "@/sections/RegisterForm";
import { NextPage } from "next";

const RegisterPage: NextPage = () => {
  return (
    <div className="container mx-auto py-10">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
