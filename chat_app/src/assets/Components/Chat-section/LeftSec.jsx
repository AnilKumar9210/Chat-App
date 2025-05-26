import { useRef, useState } from 'react'
import React from 'react'
import './LeftSec.css'

const LeftSec = () => {

  const optsRef = useRef(null);
  const [searchInput,setSearchInput] = useState (null);
  const [search,setSearch] = useState (false);
  const handleOpts = () => {
    if (optsRef.current.style.display === 'block') {
      optsRef.current.style.display = 'none';
    } else {
      optsRef.current.style.display = 'block';
    }
  }

  const handleSearch = async (e) => {
    setSearchInput (e.target.value);
  }

  return (
    <div className='left-sec'>
      <div className="search-bar">
        <img src="https://cdn.hugeicons.com/icons/search-01-stroke-standard.svg" alt="x" />
        <input type="text" name='search'placeholder='search'onChange={handleSearch}/>
      </div>
      <div className="line"></div>
      <div className="friends-list">
        <div className="friend">
          <div className="friend-info">
          <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="x" style={{height:40}}/>
            <span>John Doe</span>
          </div>
          <button onClick={handleOpts} className='friend-btn'>
            <span className='circle'></span>
            <span className='circle'></span>
            <span className='circle'></span>
          </button>
        <div className="delete" ref={optsRef}>
          Delete
        </div>
        </div>
      </div>
    </div>
  )
}

export default LeftSec
