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
import EmojiPicker from "emoji-picker-react";
import smile from "../../Images/smile.png";
import profilePic from "../../Images/profilepic.png";

const Chat = () => {
  const { chatUser, messageId, userData, messages, setMessages, user } =
    useContext(Appcontext);
  // const [chatUser, setChatUser] = useState(false);
  const [welcome, setWelcome] = useState("");
  const [start, setStart] = useState("");
  const [done, setDone] = useState(false);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);
  const [showPicker,setShowPicker] = useState (false);
  const inputRef = useRef(null);


  const handleEmojiClick = (emojiData) => {
    const emoji = emojiData.emoji;

    const cursorPos = inputRef.current.selectionStart;
    const textBefore = input.slice(0, cursorPos);
    const textAfter = input.slice(cursorPos);
    const newMessage = textBefore + emoji + textAfter;

    setInput(newMessage);

    setTimeout(() => {
      inputRef.current.focus();
      inputRef.current.selectionStart = cursorPos + emoji.length;
      inputRef.current.selectionEnd = cursorPos + emoji.length;
    }, 0);
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

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
        const same = JSON.stringify(prev) === JSON.stringify(newMessages);
        return same ? prev : newMessages;
      });
    });

    return () => unSub();
  }, [messageId]);

  useEffect(() => {}, [messages]);

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
        console.log(user);

        userIds.forEach(async (id) => {
          const userChatsRef = doc(db, "userChats", id);
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
            console.log("updated chat data", userChatData.chatData[chatIndex]);

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

  return !chatUser ? (
    <div className="no-chat">
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
        <img className="profile-letter" src={chatUser.profile?chatUser.profile:profilePic} alt="" />
        <span
          onClick={() => {
            console.log(chatUser);
          }}
        >
          {chatUser.userName}
        </span>
      </div>

      <div className="chat-msg" ref={chatRef}>
        {messages.map((msg, index) => {
          return (
            <div
              className={userData.id != msg.sId ? "receive-msg" : "send-msg"}
              key={index}
            >
              <div className="msg-profile">
                <span className="profile-letter">
                  {userData.name[0].toUpperCase()}
                </span>
              </div>
              <div className="msg">
                <span>{msg.text}</span>
                <span className="time">12:30 PM</span>
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
          ref={inputRef}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <div className="emoji-picker">
          <div  onClick={()=> {setShowPicker (prev=> !prev)}}>
            <img style={{width:32}} src={smile} alt="emoji" />
          </div>
        </div>
        {showPicker && (
        <div style={{ position: "absolute", bottom: "50px", zIndex: 1000 }}>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
        <button className="send-btn" onClick={handleSend}>
          <span className='text'>
          <svg
            viewBox="0 0 16 16"
            class="bi bi-send-fill"
            height="22"
            width="22"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"></path>
          </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Chat;
