import { useState } from 'react'
import Login from './assets/Components/Login'
import './App.css'
import { Route,
  BrowserRouter as Router,
  Routes,
 } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      {/* <Login /> */}
      {/* <h1>Welcome to the App</h1> */}
      <Routes>
        <Route path='/' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
