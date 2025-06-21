import React from 'react'

const temp = () => {
  return (
    <div>
       !chatUser ? (
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
  ) : 
    </div>
  )
}

export default temp
