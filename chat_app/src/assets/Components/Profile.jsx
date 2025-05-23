import React from 'react'
import './Profile.css'

const Profile = () => {
  return (
    <div className='profile'>
      <div className="profile-container">
        <h1>Create your profile</h1>
        <form action="">
            <input type="text" className='profile-name' placeholder='Enter your name'/>
            <textarea name="" id="" placeholder='Enter your bio'></textarea>
            <input type="submit" value="" />
        </form>
      </div>
    </div>
  )
}

export default Profile
