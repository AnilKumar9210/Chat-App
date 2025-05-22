import React, { useState } from "react";
import "./Chat.css";
import { useRef } from "react";

const Chat = () => {
  
  const handleSend = ()=> {
    
  }
  return (
    <div className="chat">
      <div className="title">
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="profile"
        />
        <span>John Doe</span>
      </div>

      <div className="chat-msg">
        <div className="send-msg">
          <div className="r-msg">
          <span>Lorem ipsum dolor sit amet consectetur... </span>
          </div>
          <div className="r-msg-profile">
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" />
            <span>12:30 PM</span>
          </div>
        </div>

        <div className="receive-msg">
          <div className="l-msg-profile">
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" />
            <span>12:30 PM</span>
          </div>
          <div className="l-msg">
          <span>Lorem ipsum dolor sit amet consectetur... </span>
          </div>
        </div>
      </div>

      <div className="send">
        <input type="text" placeholder="Type a message..." />
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
