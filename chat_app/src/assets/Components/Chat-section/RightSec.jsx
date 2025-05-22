import React from 'react'
import './RightSec.css'

const RightSec = () => {
  return (
    <div className='right-sec'>
      <div className="current-friend">
        <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="profile" style={{width:100}} />
        <h1>John Doe</h1>
      <div className="status"></div>
      </div>
      <span className="lastSeen">last seen : 12:30 AM</span>      
    </div>
  )
}

export default RightSec
