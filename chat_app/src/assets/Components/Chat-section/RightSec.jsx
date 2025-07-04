import React, { captureOwnerStack, useEffect } from 'react'
import './RightSec.css'
import { useContext ,useState} from 'react';
import { Appcontext } from '../../Context/Context';
import info from '../../../assets/Images/info.svg';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../Configuration/Firebase';

const RightSec = () => {

  const navigate = useNavigate ();
  const {userData} = useContext (Appcontext);
  const [time,setTime] = useState ("yesterDay");
  const {setChatUser,setUserData,setChatData} = useContext (Appcontext);

  useEffect (()=> {
    const lastSeen =  ()=> {
      const date =new Date(parseInt (userData.lastSeen));

      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const realHours = hours > 12 ? hours - 12 : hours;
      const amPm = hours >= 12 ? 'PM' : 'AM';

      const formatted = `${realHours}:${minutes} ${amPm}`;
      setTime (formatted);
    }
    lastSeen ();
  },[]);

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
  return (
    <div className='right-sec'>
      <div className="current-friend">
        <span className="profile-letter profile-max">{userData.name[0].toUpperCase()}</span>
        <h1>{userData.name}</h1>
      <div className="status"></div>
      </div>
      <img src={info} style={{width:25}} alt="" className='edit' onClick={handleEditProfile} />
      <span className='bio' style={{fontSize:17}}>{userData.bio}</span>
      <span className="lastSeen" style={{fontSize:14}}>{time}</span>  
      <button className='logout-btn' onClick={handleLogout}>Log out</button>    
    </div>
  )
}

export default RightSec
