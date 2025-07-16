import React, { useRef, useState ,useContext} from 'react'
import './Login.css'
import background from '../Images/background1.svg'
import chatting from '../Images/chating.png'
import { useNavigate } from 'react-router-dom'  
import { signin,login,resetPassword } from '../Configuration/Firebase'
import { Appcontext } from '../Context/Context'

const Login = () => {
  const {userData,setUserData} = useContext (Appcontext)
  const navigate = useNavigate ();
  const [username,setUserName] = useState ("");
  const [email,setEmail] = useState ("");
  const [password,setPassword] = useState ("");
  const [signIn,setSignIn] = useState (true)

  const nameRef = useRef ();
  const emailRef = useRef ();
  const passwordRef = useRef ();

  const onSubmitHandler = async (e)=> {
    e.preventDefault ();
    let done = false;
    if (!signIn){
      await signin (username,email,password);
      done = true;
    } else {
      const res = await login (email,password);
      if (res) {
        setUserData (res)
        if (userData.name && userData.email) {
          navigate ('/chat');
        } else {
          navigate ('/profile');
        }
        done = true;
      }
    }
    if (done){
      setEmail ("");
      setPassword ("");
      setUserName ("");
    }
  }

  
  return (
    <div className="login-container">
        <img src={chatting} alt="nothing" className="back"/>
    <div className='loginPage'>
        {signIn ? <h1 className='login'>Login</h1> : <h1 className='login'>Sign in</h1>}
      <form action='' method='post' className='loginForm' onSubmit={onSubmitHandler}>
        {signIn ?<div>
        <input className="input" 
        name="email"
        placeholder="Enter e-mail..." type='email'
        onChange={(e)=>{setEmail (e.target.value)}}/>
        <span className='no-email none' ref={emailRef}>*Please enter your e-mail*</span>
        <input className="input" 
        name="password" 
        placeholder="Enter password..." type='password'
        onChange={(e)=>{setPassword (e.target.value)}}/>
        <span className='no-password none' ref={passwordRef}>*Please enter your password*</span>
        <input type="submit" value={signIn ? "Login" : "Sign-in"} className='submit-btn' />
        </div> : <div>
          <input className="input" 
        name="email" 
        placeholder="Enter e-mail..." type='email'
        onChange={(e)=>{setEmail (e.target.value)}}/>
        <span className='no-email none' ref={emailRef}>*Please enter your e-mail*</span>

        <input className="input" 
        name="name" 
        placeholder="Enter username..." type='text'
        onChange={(e)=>{setUserName (e.target.value)}}/>

        <input className="input" 
        name="password" 
        placeholder="Enter password..." type='password'
        onChange={(e)=>{setPassword (e.target.value)}}/>
        <input type="submit" value="Sign-in" className="submit-btn" />
        
          </div>}
      </form>
      <span className={`${!signIn ? 'none' : 'sign-in'}`} >if you don't have an account <span onClick={()=> (setSignIn ((prev)=> (!prev)))}>sign in</span></span>
      <span className={`${!signIn ? 'none' : 'sign-in'}`} >Forgot password ? <span onClick={()=> {resetPassword (email)}}>reset here</span></span>
{/* {signIn ? <button className='login-button' onClick={onSubmitHandler}>
  <span class="span-mother">
    <span>L</span>
    <span>o</span>
    <span>g</span>
    <span>i</span>
    <span>n</span>
  </span>
  <span class="span-mother2">
    <span>L</span>
    <span>o</span>
    <span>g</span>
    <span>i</span>
    <span>n</span>
  </span>
</button>
 :<button className='sigin-button' >
  <span class="span-mother">
    <span>S</span>
    <span>i</span>
    <span>g</span>
    <span>n</span>
    <span>i</span>
    <span>n</span>
  </span>
  <span class="span-mother2">
     <span>S</span>
    <span>i</span>
    <span>g</span>
    <span>n</span>
    <span>i</span>
    <span>n</span>
  </span>
</button>} */}
{}

    </div>
    </div>
  )
}

export default Login
