import React from 'react'
import './Login.css'
import background from '../Images/background1.svg'
const Login = () => {
  return (
    <div className="login-container">
        <img src={background} alt="nothing" className="back" />
    <div className='loginPage'>
        <h1>login here</h1>
      <form action='' method='post' className='loginForm'>
        <input class="input" name="text" placeholder="Enter your name..." type='text'/>
        <input class="input" name="text" placeholder="Enter e-mail..." type='email'/>
        <input class="input" name="text" placeholder="Enter password..." type='passwor'/>
      </form>
<button className='login-button'>
  <span class="span-mother">
    <span>B</span>
    <span>u</span>
    <span>t</span>
    <span>t</span>
    <span>o</span>
    <span>n</span>
  </span>
  <span class="span-mother2">
    <span>B</span>
    <span>u</span>
    <span>t</span>
    <span>t</span>
    <span>o</span>
    <span>n</span>
  </span>
</button>

    </div>
    </div>
  )
}

export default Login
