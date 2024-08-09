import React, { useContext, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/app/FirebaseConfig/firebase";
import { AuthContext } from "@/app/context/AuthContext";

const Searchbar = () => {
  const [username, setUsername] = useState("");
  const [suser, setSuser] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);

  const { user } = useContext(AuthContext);

  const handleSearch = async () => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("name", "==", username));

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc: any) => {
          setSuser(doc.data());
          setErr(null); // Clear error if user is found
        });
      } else {
        setSuser(null); // No user found
        setErr("No user found with that name");
      }
    } catch (error: any) {
      setErr(error.message);
      setSuser(null); // Reset user if there's an error
    }
  };

  const handleKey = (e) => {
    if (e.code === "Enter") {
      handleSearch();
    }
  };

  const handleSelect = async (e) => {

    const combinedId =
      user.uid > suser.uid ? user.uid + suser.uid : suser.uid + user.uid;

    try {
      const docRef = doc(db, "chats", combinedId);
      console.log(combinedId);

      const res = await getDoc(docRef);

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(docRef, { messages: [] });

        //create user chats
        const userDocRef = doc(db, "userChats", user.uid);
        await updateDoc(userDocRef, {
          [combinedId + ".userInfo"]: {
            uid: suser.uid,
            displayName: suser.name,
            photoURL: suser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        const suserDocRef = doc(db, "userChats", suser.uid);
        await updateDoc(suserDocRef, {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error: any) {
      setErr(error);
    }
    setSuser(null)
    setUsername("")
  };
  return (
    <div className="searchbar flex flex-col mt-2">
      <input
        type="text"
        placeholder="Find a user"
        className="bg-[#3C366B] p-1 rounded text-white placeholder-gray-400 focus:outline-none"
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={handleKey}
        value={username}
      />
      {suser ? (
        <div
          className="searchUser flex mt-2 p-1 hover:bg-gray-600/30"
          onClick={handleSelect}
        >
          <img
            src={suser.photoURL}
            className="w-12 h-12 rounded-full object-cover"
            alt="User Profile"
          />
          <div className="flex flex-col w-full justify-center ml-1">
            <span>{suser.name}</span>
          </div>
        </div>
      ) : (
        err && <p className="text-red-500">{err}</p>
      )}
      <hr className="border-t border-gray-300 mt-2" />
    </div>
  );
};

export default Searchbar;
