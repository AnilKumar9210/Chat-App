import React, { useEffect, useRef } from 'react'
import './Profile.css'
import { useContext , useState} from 'react'
import { Appcontext } from '../Context/Context'
import { updateDoc,doc, getDocs, collection} from 'firebase/firestore'
import { db } from '../Configuration/Firebase'
import {useNavigate} from 'react-router-dom';
// import profilePic from '../Assets/Images/profilepic.webp'
import profilePic from '../Images/profilepic.png'

const Profile = () => {
  const navigate = useNavigate ();
  const [error , setError] = useState (false);
  const [name,setName] = useState ("");
  const [bio,setBio] = useState ("");
  const {userData,setUserData} = useContext (Appcontext);
  const [links,setLinks] = useState (null);
  const [pic,setPic] = useState (profilePic);

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
      profile:pic,
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


  
  useEffect (()=> {
      const getImages = async ()=> {
        const res = await getDocs (collection (db,'profiles'));
        // setLinks (res.docs.map ((doc)=> ({...doc.data(),id:doc.id})));
        const data = res.docs.map ((doc)=> ({...doc.data(),id:doc.id}));  
        setLinks(data[0].link)
      }
    getImages ();
  },[])
  return (
    <div className='profile'>
      <div className="profile-container">
        <h1>update your profile</h1>
        <div className='container'>
        <img src={pic} alt="" />
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
      <div className='profile-images'>
        <h1>Choose your profile picture</h1>
        <div className='profile_images_container'>
          {links && links.map ((key,index)=>(
            <img  src={key} key={index} alt="" onClick={()=> {setPic(key)}} />
        
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile
