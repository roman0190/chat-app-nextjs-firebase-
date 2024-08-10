"use client";
import { AuthContext } from "@/app/context/AuthContext";
import { ChatContext } from "@/app/context/ChatContext";
import { db } from "@/app/FirebaseConfig/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data }:any = useContext(ChatContext);
  const { user }:any = useContext(AuthContext);

  useEffect(() => {
    if (!data.chatId) return; // Ensure chatId is valid before proceeding

    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      if (doc.exists()) {
        setMessages(doc.data().messages || []); // Safely access messages array
      }
    });

    return () => {
      unSub(); // Cleanup the listener on unmount
    };
  }, [data.chatId]);

  return (
    <>
      {data.chatId ? (
        <>
          <div className="chatNav flex items-center justify-between pl-2 bg-[#3C366B] h-[4.4rem] font-light">
            <span className="flex gap-2 items-center">
              <img
                src={data.user?.photoURL}
                className="w-10 h-10 rounded-full object-cover"
                alt="User"
              />
              {data.user?.displayName}
            </span>
            <span className="space-x-2">
              <i>icon</i>
              <i>icon</i>
              <i>..</i>
            </span>
          </div>
          <div className="chat-container bg-slate-400 h-[86%] lg:h-[83%] md:h-[83%] p-2 flex flex-col overflow-y-auto">
            {messages.map((m:any) => (
              <div key={m.id} className="messages flex flex-col h-full justify-end">
                <div
                  className={`singleText flex ${
                    m.SenderId === user.uid ? "flex-row-reverse" : ""
                  } gap-2 mt-2`}
                >
                  <div className="flex-shrink-0">
                    <img
                      src={
                        m.SenderId === user.uid
                          ? user.photoURL
                          : data.user.photoURL
                      }
                      className="w-9 h-9 rounded-full object-cover"
                      alt="Profile"
                    />
                  </div>
                  <div className="bg-white rounded max-w-xs break-words overflow-hidden">
                    {m.text && (
                      <div className="bg-white text-black p-2">{m.text}</div>
                    )}
                    {m.img && (
                      <div>
                        <img src={m.img} alt="Sent image" />
                      </div>
                    )}
                  </div>
                  <span className="font-thin text-xs text-white self-end">
                    {new Date(m.date.seconds * 1000).toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <span className="text-gray-500">Select a User to start messaging</span>
        </div>
      )}
    </>
  );
};

export default Messages;