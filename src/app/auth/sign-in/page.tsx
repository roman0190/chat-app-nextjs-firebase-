"use client";
import { appleProvider, auth, provider } from "@/app/FirebaseConfig/firebase";
import {
  GoogleAuthProvider,
  OAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";

const SignIn = () => {
   
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        window.location.href = "/chat";
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleGoogle = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then(() => {
        window.location.href = "/chat";
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  
  return (
    <div className="min-h-screen flex md:justify-between justify-center text-black bg-white">
      <div className="flex flex-col justify-center items-center md:items-end lg:pr-[13rem] w-[60%] ">
        <div className="flex flex-col font-serif w-[404px] h-[583px]">
          <h1 className="text-4xl">Welcome Back!</h1>
          <span className="mt-1 mb-[5rem] text-lg">
            Enter your Credentials to access your account
          </span>
          <span>Email address</span>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter Your Email"
            className="border border-[#D9D9D9] h-[32px] w-[404px] rounded-lg pl-2 bg-white"
          />
          <span className="mt-5">Password</span>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter Your Password"
            className="border border-[#D9D9D9] h-[32px] w-[404px] rounded-lg pl-2 bg-white"
          />
          <div className="mt-5 flex items-center">
            <input type="checkbox" id="remember" className="mr-1" />
            <label htmlFor="remember">Remember for 30 days</label>
          </div>
          <button
            onClick={handleSignIn}
            className="bg-[#3A5B22] h-[32px] w-[404px] mt-5 rounded-lg text-white hover:text-slate-700 hover:bg-lime-400"
          >
            <strong>Sign In</strong>
          </button>
          {error && (
            <div className="error flex justify-center text-red-500 font-medium mt-2">
              {error}
            </div>
          )}
          <div className="flex items-center mt-10 mb-10">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="px-3 text-gray-500">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>
          <div className="flex justify-between">
            <div
              className="flex border border-[#D9D9D9] rounded-lg items-center w-[190px] h-[32px] justify-center cursor-pointer hover:text-gray-400 hover:bg-green-200"
            >
              <img
                src="/apple.png"
                alt="Sign in with Apple"
                className="w-7 h-7"
              />
              <span className="pt-1">Sign in with Apple</span>
            </div>
            <div
              onClick={handleGoogle}
              className="flex border border-[#D9D9D9] rounded-lg items-center w-[190px] h-[32px] justify-center cursor-pointer hover:text-gray-400 hover:bg-green-200"
            >
              <img
                src="/google.png"
                alt="Sign in with Google"
                className="w-6 h-6"
              />
              <span>Sign in with Google</span>
            </div>
          </div>
          <div className="mt-5 flex justify-center items-center">
            Don’t have an account?{" "}
            <a href="/auth/sign-up" className="underline ml-1 text-blue-700">
              Sign Up
            </a>
          </div>
        </div>
      </div>
      <div className="hidden md:flex justify-end w-[720px]">
        <img
          src="/side.png"
          alt="Side illustration"
          className="w-[720px] h-full"
        />
      </div>
    </div>
  );
};

export default SignIn;
