"use client";
import { AuthContext } from "@/app/context/AuthContext";
import { ChatContext } from "@/app/context/ChatContext";
import { db, storage } from "@/app/FirebaseConfig/firebase";
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useContext, useState } from "react";
import { v4 as uuid } from "uuid";
const InputBox = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { user }:any = useContext(AuthContext);
  const { data }:any = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, `images/${uuid()}.png`);

      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          //   setError(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  SenderId: user.uid,
                  date: Timestamp.now(),
                  img:downloadURL
                }),
              }); 
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          SenderId: user.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db,"userChats",user.uid),{
        [data.chatId+".lastMessage"]:{
            text
        },
        [data.chatId+".date"]:serverTimestamp()
    })

    await updateDoc(doc(db,"userChats",data.user.uid),{
        [data.chatId+".lastMessage"]:{
            text
        },
        [data.chatId+".date"]:serverTimestamp()
    })

    
    setImg(null)
    setText('')
  };
  
  const handleKey = (e:any) => {
    if (e.code === "Enter") {
      handleSend();
    }
  };
  return (
    <div className="inputSection flex bg-slate-500 h-[7vh] ">
      <div className="relative flex items-center w-full">
        <input
          onChange={(e) => setText(e.target.value)}
          type="text-area"
          placeholder="Type something..."
          className="bg-white w-full h-full p-2 pr-12 text-black"
          value={text}
          onKeyDown={handleKey}
        />
        <input
          type="file"
          onChange={(e:any) => setImg(e.target.files[0])}
          className="hidden"
          id="file"
          aria-label="Upload file"
          onKeyDown={handleKey}
        />
        <label htmlFor="file" className="absolute right-2 cursor-pointer">
          <img src="/imgicon.png" className="w-10 h-10" alt="Upload icon" />
        </label>
      </div>
      <button onClick={handleSend} className="w-16 bg-slate-700">
        send
      </button>
    </div>
  );
};

export default InputBox;
