import { useState } from 'react'
import Login from './assets/Components/Login'
import './App.css'
import { Route,
  BrowserRouter as Router,
  Routes,
 } from 'react-router-dom'
 import Chat from './assets/Components/Chat-section/ChatBox'
 import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <ToastContainer />
      {/* <Login /> */}
      {/* <h1>Welcome to the App</h1> */}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/chat' element={<Chat/>} />
      </Routes>
    </div>
  )
}

export default App
