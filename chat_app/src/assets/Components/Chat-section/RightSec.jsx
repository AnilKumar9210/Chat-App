import React, { captureOwnerStack, useEffect } from 'react'
import './RightSec.css'
import { useContext ,useState} from 'react';
import { Appcontext } from '../../Context/Context';
import info from '../../../assets/Images/info.svg';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../Configuration/Firebase';
import profilePic from '../../Images/profilepic.png';

const RightSec = () => {

  const navigate = useNavigate ();
  const {userData} = useContext (Appcontext);
  const [time,setTime] = useState ("yesterDay");
  const {setChatUser,setUserData,setChatData,chatUser} = useContext (Appcontext);

  const lastSeen = (timestamp) => {
  if (!timestamp) {
    setTime("yesterday");
    return;
  }

  let ms;
  if (typeof timestamp === "object" && timestamp.toMillis) {
    ms = timestamp.toMillis();
  } else {
    ms = Number(timestamp);
  }

  const date = new Date(ms);
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const realHours = hours % 12 || 12; // Convert 0 to 12
  const amPm = hours >= 12 ? 'PM' : 'AM';

  const formatted = `${realHours}:${minutes} ${amPm}`;
  setTime(formatted);
};
useEffect(() => {
  if (chatUser?.lastSeen) {
    lastSeen(chatUser.lastSeen);
  } else if (userData?.lastSeen) {
    lastSeen(userData.lastSeen);
  }
}, [chatUser, userData]);


  const handleLogout = ()=> {
    logout ();
    setChatUser (null);
  setUserData (null);
  setChatData([]);
  setChatUser(null);
    navigate ('/');
  }

  const handleEditProfile = ()=> {

    navigate ('/profile');
  }
  return (!chatUser?<div className='right-sec'>
      <div className="current-friend">
        <img className="profile-max" src={userData.profile?userData.profile:profilePic} alt="" />
        <h1>{userData.name}</h1>
      </div>
      <img src={info} style={{width:25}} alt="" className='edit' onClick={handleEditProfile} />
      <span className='bio' style={{fontSize:17}}>{userData.bio}</span>
      <span className="lastSeen" style={{fontSize:14}}>{time}</span>  
      <button className='logout-btn' onClick={handleLogout}>Log out</button>    
    </div>:
    <div className='right-sec'>
      <div className="current-friend">
        <img className="profile-max" src={chatUser.profile?chatUser.profile:profilePic} alt="" />
        <h1>{chatUser.userName}</h1>
      </div>
      <img src={info} style={{width:25}} alt="" className='edit' onClick={handleEditProfile} />
      <span className='bio' style={{fontSize:17}}>{chatUser.bio}</span>
      <span className="lastSeen" style={{fontSize:14}}>{time}</span>  
      <button className='logout-btn' onClick={handleLogout}>Log out</button>    
    </div>
  )
}

export default RightSec
