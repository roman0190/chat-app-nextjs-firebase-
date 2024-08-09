import { AuthContext } from "@/app/context/AuthContext";
import { ChatContext } from "@/app/context/ChatContext";
import { db } from "@/app/FirebaseConfig/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";

const Allusers = () => {
  //chats == allusers
  const [chats, setChats] = useState([]);

  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", user.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    user.uid && getChats();
  }, [user.uid]);

  const handleSelect = (u) => {
    dispatch({type:"CHANGE_USER",payload:u})
  };
  return (
    <>
        <div
          className="allUser h-full overflow-y-scroll "
          >
          {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
          <div key={chat[0]}  onClick={() => handleSelect(chat[1].userInfo)} className="user flex mt-2 p-1 hover:bg-gray-600/30 rounded-lg">
            <img
              src={chat[1].userInfo.photoURL}
              className="w-11 h-11 rounded-full object-cover"
              alt=""
            />
            <div className="flex flex-col w-full justify-center ml-1">
              <span>{chat[1].userInfo.displayName}</span>
              <span className="text-xs">
                {chat[1].lastMessage?.text}
              </span>
            </div>
          </div>
      ))}
        </div>
    </>
  );
};

export default Allusers;
