import React, { useEffect, useRef } from 'react'
import './Profile.css'
import { useContext , useState} from 'react'
import { Appcontext } from '../Context/Context'
import { updateDoc,doc } from 'firebase/firestore'
import { db } from '../Configuration/Firebase'
import {useNavigate} from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate ();
  const [error , setError] = useState (false);
  const [name,setName] = useState ("");
  const [bio,setBio] = useState ("");
  const {userData,setUserData} = useContext (Appcontext);


  const handleProfileUpdate = async (e)=> {
    e.preventDefault ();
    if (name.trim () === "" || bio.trim () === "") {
      setError(true);
      return;
    }
    setError (false);
    const updatedData = {
      ...userData,
      name:name.toLowerCase (),
      bio:bio,
      lastSeen:Date.now ().toString (),
    }
    console.log(userData)
    const docRef = doc (db,'users',userData.id);
    await updateDoc (docRef,updatedData)
    .then (()=> {
      setUserData (updatedData);
      console.log("data updated successfully");
    })
    .catch ((err)=> {
      console.log(err);
    });

    navigate ('/chat');
  }
  return (
    <div className='profile'>
      <div className="profile-container">
        <h1>update your profile</h1>
        <form className="content__form">
        <div className="content__inputs">
          <label>
            <input required="" type="text" onChange={(e)=>setName(e.target.value)}/>
            <span className='text-lable'>Enter your name</span>
          </label>
          <label>
            <input required="" type="text" onChange={(e)=>setBio (e.target.value)}/>
            <span className='text-lable'>Enter your bio</span>
          </label>
        </div>
        {error &&<span className='error-msg'>*Enter valid details*</span>}
        <button onClick={handleProfileUpdate}>update</button>
      </form>
      </div>
    </div>
  )
}

export default Profile
