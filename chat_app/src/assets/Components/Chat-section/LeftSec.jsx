import { useContext, useRef, useState } from 'react'
import React from 'react'
import {db} from '../../Configuration/Firebase'
import { collection, query, where, getDocs, doc, setDoc, serverTimestamp, updateDoc, arrayUnion } from 'firebase/firestore'
import './LeftSec.css'
import { Appcontext } from '../../Context/Context'
import { toast } from 'react-toastify'

const LeftSec = () => {

  const optsRef = useRef(null);
  const {userData,chatData} = useContext (Appcontext);
  const [user,setUser] = useState (null);
  const [search,setSearch] = useState (false);
  const handleOpts = () => {
    if (optsRef.current.style.display === 'block') {
      optsRef.current.style.display = 'none';
    } else {
      optsRef.current.style.display = 'block';
    }
  }

  const handleSearch = async (e) => {
    try {
      const search = e.target.value;
      console.log(e.target.value)
      if (search) {
      const userRef = collection (db,'users');
      const q = query (userRef, where ('name','==',search.toLowerCase ()));
      const querySnap = await getDocs (q);
      let userExist = false;
      if (!querySnap.empty && querySnap.docs[0].data().id != userData.id) {
        chatData.map ((user)=> {
          if (user.rId === querySnap.docs[0].data.id) {
            userExist = true;
          }
        })
        (userExist) ? setUser(querySnap.docs[0].data()) : setSearch (true); 
        // console.log(user)
      } else {
        setUser (null);
      }
    } else {
      setSearch (false);
    }
    } catch (err) {
    toast.error(err)
    }
  };


  const addChat = async ()=> {
    const messageRef = collection (db,'messages');
    const chatRef = collection (db,'userChats');
    try {
      const newMessageRef = doc (messageRef);

      await setDoc (newMessageRef, {
        createdAt:serverTimestamp (),
        messages:[],
      });

      await updateDoc (doc (chatRef,user.id), {
        chatData:arrayUnion ({
          rId:userData.id,
          messageSeen:true,
          messageId:newMessageRef.id,
          lastSeen:"",
          updatedAt:Date.now (),
        })
      })


      await updateDoc (doc (chatRef,userData.id), {
        chatData:arrayUnion ({
          rId:user.id,
          messageSeen:true,
          messageId:newMessageRef.id,
          lastSeen:"",
          updatedAt:Date.now (),
        })
      })
    } catch (error) {
      console.error(error);
      toast.error(error.code.split("/")[1].split("-").join(" "));
    }
  }

  return (
    <div className='left-sec'>
      <div className="search-bar">
        <img src="https://cdn.hugeicons.com/icons/search-01-stroke-standard.svg" alt="x" />
        <input type="text" name='search'placeholder='search'onChange={handleSearch}/>
      </div>
      <div className="line"></div>
      {search && user?<div className="friend add-friend" onClick={addChat}>
          <div className="friend-info">
          <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="x" style={{height:40}}/>
            <span>{user.name}</span>
          </div>
          <button onClick={handleOpts} className='friend-btn'>
            <span className='circle'></span>
            <span className='circle'></span>
            <span className='circle'></span>
          </button>
        <div className="delete" ref={optsRef}>
          Delete
        </div>
          </div>:
      <div className="friends-list">
        {console.log(chatData)}
        {
        chatData.map ((user)=>(<div className="friend">
          <div className="friend-info">
          <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="x" style={{height:40}}/>
            <span>{user.name}</span>
          </div>
          <button onClick={handleOpts} className='friend-btn'>
            <span className='circle'></span>
            <span className='circle'></span>
            <span className='circle'></span>
          </button>
        <div className="delete" ref={optsRef}>
          Delete
        </div>
        </div>))}
      </div>}
    </div>
  )
}

export default LeftSec
