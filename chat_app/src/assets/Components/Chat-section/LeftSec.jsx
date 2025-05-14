import React from 'react'
import './LeftSec.css'

const LeftSec = () => {
  return (
    <div className='left-sec'>
      <div className="search-bar">
        <img src="https://cdn.hugeicons.com/icons/search-01-stroke-standard.svg" alt="x" />
        <input type="text" name='search'placeholder='search'/>
      </div>
      <div className="line"></div>
      <div className="friends-list">
        <div className="friend">
          <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="x" style={{height:40}}/>
          <div className="friend-name">
            <h3>John Doe</h3>
          </div>
          <button>:</button>
        </div>
      </div>
    </div>
  )
}

export default LeftSec
