import React, { useContext, useEffect, useState } from "react";
import "./Chat.css";
import { useRef } from "react";
import { Appcontext } from "../../Context/Context";
import chatting from "../../Images/chating.png";
import { TypeAnimation } from "react-type-animation";
import {
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { db } from "../../Configuration/Firebase";
import { toast } from "react-toastify";

const Chat = () => {
  const { chatUser, messageId, userData, messages, setMessages } =
    useContext(Appcontext);
  // const [chatUser, setChatUser] = useState(false);
  const [welcome, setWelcome] = useState("");
  const [start, setStart] = useState("");
  const [index, setIndex] = useState(null);
  const [done, setDone] = useState(false);
  const [input, setInput] = useState("");
  const [toggle,setToggle] = useState(true);

  useEffect(() => {
    const msg1 = "Welcome to online chat app....";
    let index = 0;
    const interval1 = setInterval(() => {
      setWelcome((prev) => prev + msg1[index]);
      index++;
      if (index >= msg1.length) {
        clearInterval(interval1);
        setTimeout(() => {
          setDone(true);
        }, 300);
      }
    }, 100);
    return () => clearInterval(interval1);
  }, []);

  useEffect(() => {
    if (!done) {
      return;
    } else {
      const msg1 = "Tap on your friend to start a conversatoin....";
      let index = 0;
      const interval1 = setInterval(() => {
        setStart((prev) => prev + msg1[index]);
        index++;
        if (index >= msg1.length) {
          clearInterval(interval1);
        }
      }, 100);
      return () => clearInterval(interval1);
    }
  }, [done]);


  // fetching messages from firestore
  useEffect(() => {
  if (!messageId) return;

  const unSub = onSnapshot(doc(db, "messages", messageId), (res) => {
    const newMessages = [...(res.data().messages || [])].reverse();

    setMessages((prev) => {
      const same =
        JSON.stringify(prev) === JSON.stringify(newMessages);
      return same ? prev : newMessages;
    });
  });

  return () => unSub();
}, [messageId]);




  const handleSend = async () => {
    try {
      if (input && messageId) {
        await updateDoc(doc(db, "messages", messageId), {
          messages: arrayUnion({
            sId: userData.id,
            text: input,
            createdAt: new Date(),
          }),
        });

        const userIds = [userData.id, chatUser.rId];

        userIds.forEach(async (id) => {
          const userChatsRef = doc(db, "chatData", id);
          const userChatsSnapshot = await getDoc(userChatsRef);
          if (userChatsSnapshot.exists()) {
            const userChatData = userChatsSnapshot.data();
            const chatIndex = userChatData.chatData.findIndex(
              (c) => c.messageId === messageId
            );
            userChatData.chatData[chatIndex].lastMessage =
              input.slice(0, 20) + " ";
            userChatData.chatData[chatIndex].createdAt = new Date();
            if (userChatData.chatData[chatIndex].rId === userData.id) {
              userChatData.chatData[chatIndex].messageSeen = false;
            }

            await updateDoc(userChatsRef, {
              chatData: userChatData.chatData,
            });
            setInput("");
          }
        });
      }
    } catch (err) {
      toast.error(err);
    }
  };
  return !chatUser? (<div className="no-chat">
      <div>
        <img src={chatting} alt="" />
        {/* <span>{welcome}</span>
        <span>{start}</span> */}
        <TypeAnimation
          sequence={[
            "Welcome to online chat app....",
            1000,
            "Tap on your friend to start a conversatoin....",
            1000,
          ]}
          wrapper="span"
          speed={50}
          style={{ fontWeight: "lighter", display: "inline-block" }}
          repeat={Infinity}
        />
      </div>
      
    </div>
  ) : (
    <div className="chat">
      <div className="title">
        <span className="profile-letter chat-letter">{chatUser.userName[0].toUpperCase()}</span>
        <span
          onClick={() => {
            console.log(chatUser);
          }}
        >
          {chatUser.userName}
        </span>
      </div>

      <div className="chat-msg">
        {messages.map((msg, index) => {
          return (
            <div
              className={userData.id != msg.sId ? "receive-msg" : "send-msg"}
              key={index}
            >
              <div className="msg-profile">
                <span className="profile-letter">{userData.name[0].toUpperCase()}</span>
                <span>12:30 PM</span>
              </div>
              <div className="msg">
                <span>{msg.text}</span>
              </div>
            </div>
           ); 
        })}
      </div>

      <div className="send">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <div className="send-img">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            class="injected-svg"
            data-src="https://cdn.hugeicons.com/icons/image-upload-stroke-standard.svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            role="img"
            color="#ad9797"
          >
            <path
              d="M2.5 16.502L7.46967 11.5323C7.80923 11.1927 8.26978 11.002 8.75 11.002C9.23022 11.002 9.69077 11.1927 10.0303 11.5323L14 15.502M15.5 17.002L14 15.502M21.5 16.502L18.5303 13.5323C18.1908 13.1927 17.7302 13.002 17.25 13.002C16.7698 13.002 16.3092 13.1927 15.9697 13.5323L14 15.502"
              stroke="black"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M21.5 10.502V19.502C21.5 20.6065 20.6046 21.502 19.5 21.502H4.5C3.39543 21.502 2.5 20.6065 2.5 19.502V4.50195C2.5 3.39738 3.39543 2.50195 4.5 2.50195H13.5"
              stroke="black"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M15.5 5.5L18.5 2.5L21.5 5.5M18.5 3V9.5"
              stroke="black"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
          <input type="file" />
        </div>
        <button className="send-btn" onClick={handleSend}>
          send
        </button>
      </div>
    </div>
  );
};

export default Chat;
