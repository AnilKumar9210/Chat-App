import { useEffect, useState,useContext,lazy, Suspense } from 'react'
import Login from './assets/Components/Login'
import './App.css'
import { Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
 } from 'react-router-dom'
 import Chat from './assets/Components/Chat-section/ChatBox'
 import { ToastContainer, toast } from 'react-toastify';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './assets/Configuration/Firebase'
import { Appcontext } from './assets/Context/Context'
import Profile from './assets/Components/Profile'
import { Component , captureOwnerStack } from 'react';


function App() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate ();
  const {loadUserData} = useContext (Appcontext)

  useEffect (()=>{
    onAuthStateChanged (auth,async (user)=> {
      if (user) {
        // navigate ('/chat');/
        await loadUserData (user.uid);
      } else {
        navigate('/')
      }
    })
  },[]);

  // ErrorBoundary 
  

  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/chat' element={<Chat/>} />
        <Route path='/profile' element={<Profile/>} />
      </Routes>
      {/* <Login /> */}
    </div>
  )
}

export default App
