import { useContext, useRef, useState, useEffect } from "react";
import React from "react";
import { db } from "../../Configuration/Firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  serverTimestamp,
  updateDoc,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore";
import "./LeftSec.css";
import { Appcontext } from "../../Context/Context";
import { toast } from "react-toastify";

const LeftSec = () => {
  const optsRef = useRef(null);
  const {
    userData,
    chatData,
    setChatUser,
    setMessageId,
    setMessages,
    messageId,
  } = useContext(Appcontext);
  const [user, setUser] = useState(null);
  const [showSearch, setSearch] = useState(false);

  useEffect(() => {
    if (user) {
      console.log(user);
      
    }
  }, [user]);

  const handleOpts = () => {
    if (optsRef.current.style.display === "block") {
      optsRef.current.style.display = "none";
    } else {
      optsRef.current.style.display = "block";
    }
  };

  const handleSearch = async (e) => {
    try {
      const input = e.target.value;
      console.log(e.target.value);
      console.log("hello ");
      if (input.length > 0) {
        setSearch(true);
        const userRef = collection(db, "users");
        // console.log(userRef.i)
        const q = query(userRef, where("name", "==", input.toLowerCase()));
        const querySnap = await getDocs(q);
        if (!querySnap.empty && querySnap.docs[0].data().id != userData.id) {
          console.log(chatData);
          const foundUser = querySnap.docs[0].data();
          console.log(foundUser);
          let userExist = false;
          chatData.map((user) => {
            if (user.rId == foundUser.id) {
              userExist = true;
            }
          });
          if (!userExist) {
            setUser(foundUser);
          }
        } else {
          setUser(null);
        }
      } else {
        setSearch(false);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const addChat = async () => {
  const messageRef = collection(db, "messages");
  const chatRef = collection(db, "userChats");

  try {
    const newMessageRef = doc(messageRef);

    await setDoc(newMessageRef, {
      participants: [userData.id, user.id],
      createdAt: serverTimestamp(),
      messages: [],
    });

    // ✅ Only update YOUR userChats document
    await updateDoc(doc(chatRef, userData.id), {
      chatData: arrayUnion({
        rId: user.id,
        messageSeen: true,
        messageId: newMessageRef.id,
        lastSeen: "",
        updatedAt: Date.now(),
        userName: user.name,
      }),
    });

    // ❌ SKIP updating user.id's userChats doc — you’re not allowed
    // They will see the chat once they send/receive messages or open the chat screen

  } catch (error) {
    console.error(error);
    toast.error("Error adding chat");
  }

  setSearch(false);
};

  // const addChat = async () => {
  //   const messageRef = collection(db, "messages");
  //   const chatRef = collection(db, "userChats");
  //   try {
  //     const newMessageRef = doc(messageRef);

  //     await setDoc(newMessageRef, {
  //       participants:[userData.id,user.id],
  //       createdAt: serverTimestamp(),
  //       messages: [],
  //     });


  //     await updateDoc(doc(chatRef, user.id), {
  //       chatData: arrayUnion({
  //         rId: userData.id,
  //         messageSeen: true,
  //         messageId: newMessageRef.id,
  //         lastSeen: "",
  //         updatedAt: Date.now(),
  //         userName: userData.name,
  //       }),
  //     });

  //     await updateDoc(doc(chatRef, userData.id), {
  //       chatData: arrayUnion({
  //         rId: user.id,
  //         messageSeen: true,
  //         messageId: newMessageRef.id,
  //         lastSeen: "",
  //         updatedAt: Date.now(),
  //         userName: user.name,
  //       }),
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     // toast.error(error.code.split("/")[1].split("-").join(" "));
  //     toast.error("Error adding chat");
  //   }
  //   setSearch(false);
  // };

  const setChat = (item) => {
    setMessageId(item.messageId);
    setChatUser(item);
    return
  };

  return (
    <div className="left-sec">
      <div className="search-bar">
        <img
          src="https://cdn.hugeicons.com/icons/search-01-stroke-standard.svg"
          alt="x"
        />
        <input
          type="text"
          name="search"
          placeholder="search"
          onChange={handleSearch}
        />
      </div>
      <div className="line"></div>
      {showSearch ? (
        user ? (
          <div className="friend add-friend" onClick={addChat} key={user.id}>
            <div className="friend-info">
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="x"
                style={{ height: 40 }}
              />
              <span>{user.name}</span>
            </div>
            
          </div>
        ) : (
          <div className="no-user">No user found</div>
        )
      ) : (
        <div className="friends-list">
          {chatData?.map((item, index) => (
            <div className="friend" key={index} onClick={() => setChat(item)}>
              <div className="friend-info">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt="x"
                  style={{ height: 40 }}
                />
              </div>
              <div className="userInfo">
                <span>{item.userName}</span>
              {/* <span className="lastMsg">last message</span> */}
              </div>
              {/* {button onClick={handleOpts} className="friend-btn">
                <span className="circle"></span>
                <span className="circle"></span>
                <span className="circle"></span>
              </button>
              <div className="delete" ref={optsRef}>
                Delete
              </div>} */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeftSec;
