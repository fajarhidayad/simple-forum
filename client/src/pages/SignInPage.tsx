import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputForm from "../components/InputForm/InputForm";

interface SignInForm {
  email: string;
  password: string;
}

const schema = z.object({
  email: z
    .string({ required_error: "This field is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ required_error: "This field is required" })
    .min(8, { message: "It must have minimum 8 characters" }),
});

const SignInPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({ resolver: zodResolver(schema) });

  const onClickSubmit = (data: SignInForm) => {
    console.log(data);
  };

  return (
    <main className="bg-gray-200 h-screen w-screen flex items-center justify-center">
      <div className="bg-white w-[550px] mx-4 rounded-2xl shadow p-5 py-20 flex flex-col items-center">
        <h1 className="font-bold text-3xl md:text-4xl text-gray-800 mb-2">
          Sign In to Forum
        </h1>
        <p>
          Don't have an account?{" "}
          <Link
            to="/sign-up"
            className="text-blue-600 underline hover:text-blue-400"
          >
            Sign Up here
          </Link>
        </p>

        <form
          className="flex flex-col mt-10 self-stretch px-10"
          onSubmit={handleSubmit(onClickSubmit)}
        >
          <InputForm
            {...register("email")}
            type="email"
            placeholder="E-mail"
            errors={errors.email?.message}
          />
          <div className="my-3"></div>
          <InputForm
            {...register("password")}
            type="password"
            placeholder="Password"
            errors={errors.password?.message}
          />
          <div className="my-3"></div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-4 rounded-lg hover:bg-blue-600 active:bg-blue-700 transition-all duration-150"
          >
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
};

export default SignInPage;
