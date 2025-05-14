import React from 'react'
import RightSec from './RightSec'
import LeftSec from './LeftSec'
import Chat from './Chat'
import './ChatBox.css'

const ChatBox = () => {
  return (
    <div className='chat-box'>
      <LeftSec/>
      <Chat/>
      <RightSec/>      
    </div>
  )
}

export default ChatBox
