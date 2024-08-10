"use client";
import { AuthContext } from "@/app/context/AuthContext";
import { auth } from "@/app/FirebaseConfig/firebase";
import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import Searchbar from "./Searchbar";
import Allusers from "./Allusers";
import Messages from "./Messages";
import InputBox from "./Input";

const Chat = () => {
  const { user }:any = useContext(AuthContext);

  return (
    <div className="flex border rounded-xl h-screen lg:h-[80vh] lg:w-[75rem] md:h-[80vh] md:w-[75rem] overflow-hidden">
      <div className="sidebar bg-[#3C366B] w-[50%]">
        <div className="sidebarNav flex justify-between pt-5 pb-5 bg-[#5f5a8a]">
          <span className="text-xl font-bold ml-2 hidden md:flex lg:flex">
            Chat
          </span>
          <span className="flex gap-2 ">
            <img
              src={user.photoURL}
              className="w-7 h-7 rounded-full object-cover"
              alt=""
            />
            <span className="mt-1">{user.displayName}</span>
            <button
              onClick={() => {
                signOut(auth)
                  .then(() => {
                    window.location.href = "/";
                  })
                  .catch((error) => {
                    console.error("Sign out error:", error);
                  });
              }}
              className=" mr-2 p-1 text-sm border rounded-lg bg-[#393653]"
            >
              Logout
            </button>
          </span>
        </div>
        {/* {searchbar} */}
        <Searchbar />
        <Allusers />
      </div>
      <div className="chatSide bg-[#95939a] w-full">
        <Messages />
        <InputBox />
      </div>
    </div>
  );
};

export default Chat;
