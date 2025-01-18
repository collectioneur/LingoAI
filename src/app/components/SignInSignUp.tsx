"use client";
import { useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import Image from "next/image";
import { useAuth } from "@/app/context/authContext";
import createUserDocument from "../firebase/data/createUserDocument";

interface SignInSignUpProps {
  toggleOpenSignIn: () => void;
}

const SignInSignUp = ({ toggleOpenSignIn }: SignInSignUpProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  let userId = useAuth().userId;

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (isSignUp) {
        const res = await createUserWithEmailAndPassword(
          formData.email,
          formData.password
        );
        if (res?.user) {
          await createUserDocument(res.user);
        }
        setIsSignUp(false);
      } else {
        const res = await signInWithEmailAndPassword(
          formData.email,
          formData.password
        );
        if (res?.user) {
          await createUserDocument(res.user);
        }
        toggleOpenSignIn();
      }
      setFormData({ email: "", password: "" });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen w-full fixed flex items-center justify-center  bg-[#0000005d] z-[1000]">
      <div className="backdrop-blur relative bg-background p-8 rounded-[15px] shadow-inner shadow-foreground max-w-sm w-full  overflow-hidden border-foreground">
        <div className="rounded-full bg-customblue absolute w-[150px] h-[150px] blur-[100px] z-[-10] bottom-[-50px] right-[-20px]"></div>
        <button
          className="absolute right-[15px] top-[15px] button"
          onClick={toggleOpenSignIn}
        >
          <Image src="/close-icon.svg" width={15} height={15} alt="close" />
        </button>
        <h2 className="text-2xl font-thin text-center text-foreground mb-6">
          Welcome to LingoAI
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-foreground placeholder:text-foreground placeholder:opacity-50
               rounded-full shadow-sm focus:ring-foreground focus:border-foreground text-foreground bg-background"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-foreground"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-foreground placeholder:text-foreground placeholder:opacity-50 rounded-full shadow-sm focus:ring-foreground focus:border-foreground text-foreground bg-background"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-foreground button text-background font-bold py-2 rounded-full shadow-lg transition duration-300"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <p className="mt-4 text-sm text-[#ffffff55] text-center">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-foreground button font-medium"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignInSignUp;
