"use client";
import { auth, db, storage } from "@/app/FirebaseConfig/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState<any>("");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState<any>("");

  const handleSignUp = async (e:any) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, `images/${res.user.uid}.png`);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          setError(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName: name,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              name,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
            setProgress(progress);
            window.location.href ="/"
          });
        }
      );
    } catch (error: any) {
      setError(error.message);
    }
  };
  return (
    <div className="min-h-screen flex md:justify-between justify-center text-black bg-white overflow-hidden">
      <div className="flex flex-col justify-center items-center md:items-end lg:pr-[13rem] w-[60%] ">
        <div className="flex flex-col font-serif w-[404px] h-[638px]">
          <h1 className=" text-4xl">Get Started Now</h1>
          <span className=" mt-1 mb-[5rem] text-lg">
            Enter your Credentials to create your account
          </span>
          <span>Name</span>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Enter Your Full-Name"
            className=" border border-[#D9D9D9] h-[32px] w-[404px] rounded-lg pl-2 bg-white"
          />
          <span className="mt-5">Email address</span>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter Your Email"
            className=" border border-[#D9D9D9] h-[32px] w-[404px] rounded-lg pl-2 bg-white"
          />
          <span className="mt-5">Password</span>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter Your Password"
            className=" border border-[#D9D9D9] h-[32px] w-[404px] rounded-lg pl-2 bg-white"
          />
          <input
            type="file"
            onChange={(e:any) => setFile(e.target.files[0])}
            id="file"
            className="hidden"
          />
          <label className="flex cursor-pointer mt-5" htmlFor="file">
            <img src="/profile.png" alt="upload img" className="w-10 h-10" />
            <span className="mt-2 pl-2 text-[#8da4f1]">Add an avater</span>
          </label>
          <button
            onClick={handleSignUp}
            className={`bg-[#3A5B22] h-[32px] w-[404px] mt-5 rounded-lg text-white hover:text-slate-700 hover:bg-lime-400 ${Boolean(progress) && 'loading'}`}
          >
            <strong>SignUp</strong>
          </button>
          <div className="error flex justify-center text-red-500 font-medium">
            {error}
          </div>
          <div className="flex items-center mt-10 mb-10">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="px-3 text-gray-500">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>
          <div className="flex justify-between">
            <div className="flex border border-[#D9D9D9] rounded-lg items-center w-[190px] h-[32px] justify-center cursor-pointer hover:text-gray-400 hover:bg-green-200">
              <img src="/apple.png" alt="" className="w-7 h-7" />
              <span className="pt-1">Signin with Apple</span>
            </div>
            <div className="flex border border-[#D9D9D9] rounded-lg items-center w-[190px] h-[32px] justify-center cursor-pointer hover:text-gray-400 hover:bg-green-200">
              <img src="/google.png" alt="" className="w-6 h-6" />
              <span>Signin with Google</span>
            </div>
          </div>
          <div className="mt-5  flex justify-center items-center ">
            Have an account?{" "}
            <a href="/auth/sign-in" className=" underline ml-1 text-blue-700">
              Sign In
            </a>
          </div>
        </div>
      </div>
      <div className="hidden md:flex justify-end w-[720px] ">
        <img src="/side.png" alt="img" className="w-[720px] h-full" />
      </div>
    </div>
  );
};

export default SignUp;
