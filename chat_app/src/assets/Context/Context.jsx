// src/assets/Context/Context.jsx

import { createContext, useEffect, useState } from "react";
import { doc, getDoc, getDocs, onSnapshot, updateDoc ,collection} from "firebase/firestore";
import { auth, db } from "../Configuration/Firebase";

export const Appcontext = createContext(); // ✅ Rename for convention

const AppcontextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null); // ✅ Should be null, not []
  const [chatData, setChatData] = useState([]);
  const [messageId, setMessageId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatUser, setChatUser] = useState(null);

  const loadUserData = async (uid) => {
    const docSnap = await getDoc(doc(db, "users", uid));
    if (docSnap.exists()) {
      setUserData(docSnap.data());
    } else {
      console.warn("User not found in Firestore");
    }
  };

  useEffect(() => {
    if (!userData?.id) return;

    const interval = setInterval(async () => {
      if (auth.currentUser) {
        await updateDoc(doc(db, "users", userData.id), {
          lastSeen: Date.now(),
        });
      }
    }, 6000);

    return () => clearInterval(interval); 
  }, [userData]);

  useEffect(() => {
    if (!userData?.id) {
      setChatData([]);
      return;
    }

    const chatRef = doc(db, "userChats", userData.id);
    const unSub = onSnapshot(chatRef, async (docSnap) => {
      const chats = docSnap.data()?.chatData || [];

      const tempData = await Promise.all(
        chats.map(async (key) => {
          const userSnap = await getDoc(doc(db, "users", key.rId.trim()));
          return {
            ...key,
            userData: userSnap.data(),
          };
        })
      );

      setChatData(tempData.sort((a, b) => b.updatedAt - a.updatedAt));
    });

    return () => unSub();
  }, [userData]);

  

  const value = {
    userData,
    setUserData,
    chatData,
    setChatData,
    loadUserData,
    messages,
    setMessages,
    messageId,
    setMessageId,
    chatUser,
    setChatUser,
  };

  return (
    <Appcontext.Provider value={value}>{children}</Appcontext.Provider>
  );
};

export default AppcontextProvider;
