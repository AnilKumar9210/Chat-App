import React, { captureOwnerStack, useEffect } from 'react'
import './RightSec.css'
import { useContext ,useState} from 'react';
import { Appcontext } from '../../Context/Context';
import info from '../../../assets/Images/info.svg';
import { useNavigate } from 'react-router-dom';

const RightSec = () => {

  const navigate = useNavigate ();
  const {userData} = useContext (Appcontext);
  const [time,setTime] = useState ("yesterDay");

  useEffect (()=> {
    const lastSeen =  ()=> {
      const date =new Date(parseInt (userData.lastSeen));

      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');

      const formatted = `${Math.floor(hours/12)}:${minutes}`;
      setTime (formatted);
    }
    lastSeen ();
  },[]);

  const handleEditProfile = ()=> {
    navigate ('/profile');
  }
  return (
    <div className='right-sec'>
      <div className="current-friend">
        <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="profile" style={{width:100}} />
        <h1>{userData.name}</h1>
      <div className="status"></div>
      </div>
      <img src={info} style={{width:25}} alt="" className='edit' onClick={handleEditProfile} />
      <span className='bio' style={{fontSize:17}}>{userData.bio}</span>
      <span className="lastSeen" style={{fontSize:14}}>{time} AM</span>      
    </div>
  )
}

export default RightSec
