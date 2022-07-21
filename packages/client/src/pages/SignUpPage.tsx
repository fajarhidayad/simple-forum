import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputForm from "../components/InputForm/InputForm";
import { trpc } from "../utils/trpc";
import { useAppDispatch } from "../app/hooks";
import { signIn } from "../features/auth/authSlice";

interface SignUpForm {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

const schema = z.object({
  firstName: z
    .string({ required_error: "This field is required" })
    .min(3, { message: "Minimum 3 characters" })
    .max(32, { message: "Maximum 32 characters" }),
  lastName: z
    .string({ required_error: "This field is required" })
    .min(3, { message: "Minimum 3 characters" })
    .max(32, { message: "Maximum 32 characters" }),
  username: z
    .string({ required_error: "This field is required" })
    .min(3, { message: "Minimum 3 characters" })
    .max(32, { message: "Maximum 32 characters" }),
  email: z
    .string({ required_error: "This field is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ required_error: "This field is required" })
    .min(8, { message: "It must have minimum 8 characters" }),
});

const SignUpPage: React.FC = () => {
  const signUpMutation = trpc.useMutation("auth.signUp");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({ resolver: zodResolver(schema) });

  const onSignUp = (data: SignUpForm) => {
    signUpMutation.mutateAsync({
      ...data,
    });
  };

  const onSuccessSignUp = () => {
    if (signUpMutation.isSuccess) {
      dispatch(signIn(signUpMutation.data));
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    onSuccessSignUp();
  }, [signUpMutation.isSuccess]);

  return (
    <main className="bg-gray-200 h-screen w-screen flex items-center justify-center">
      <div className="bg-white w-[550px] mx-4 rounded-2xl shadow p-5 py-20 flex flex-col items-center">
        <h1 className="font-bold text-3xl md:text-4xl text-gray-800 mb-2">
          Sign Up
        </h1>
        <p>
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 underline hover:text-blue-400"
          >
            Sign In here
          </Link>
        </p>

        <form
          className="flex flex-col mt-10 self-stretch px-10"
          onSubmit={handleSubmit(onSignUp)}
        >
          <div className="flex space-x-3">
            <InputForm
              type="text"
              placeholder="First Name"
              {...register("firstName")}
              errors={errors.firstName?.message}
            />
            <InputForm
              type="text"
              placeholder="Last Name"
              {...register("lastName")}
              errors={errors.lastName?.message}
            />
          </div>
          <div className="my-3"></div>
          <InputForm
            type="text"
            placeholder="Username"
            {...register("username")}
            errors={errors.username?.message}
          />
          <div className="my-3"></div>
          <InputForm
            type="email"
            placeholder="E-mail"
            {...register("email")}
            errors={errors.email?.message}
          />
          <div className="my-3"></div>
          <InputForm
            type="password"
            placeholder="Password"
            {...register("password")}
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

export default SignUpPage;
