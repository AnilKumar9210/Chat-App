import React, { useRef, useState ,useContext} from 'react'
import './Login.css'
import background from '../Images/background1.svg'
import chatting from '../Images/chating.png'
import { useNavigate } from 'react-router-dom'  
import { signin,login } from '../Configuration/Firebase'
import { Appcontext } from '../Context/Context'

const Login = () => {
  const {userData} = useContext (Appcontext)
  const navigate = useNavigate ();
  const [username,setUserName] = useState ("");
  const [email,setEmail] = useState ("");
  const [password,setPassword] = useState ("");
  const [signIn,setSignIn] = useState (true)

  const nameRef = useRef ();
  const emailRef = useRef ();
  const passwordRef = useRef ();

  const onSubmitHandler = (e)=> {
    e.preventDefault ();
    if (!signIn){
      signin (username,email,password);
    } else {
      login (email,password);
    }
    if (userData.name && userData.email) {
      navigate ('/chat');
    } else {
      navigate ('/profile');
    }
  }

  // const handleChange = (value,name)=> {
  //   if (name === 'name') {
  //     nameRef.current.style.display = 'none';
  //   } else if (name === 'email') {
  //     emailRef.current.style.display = 'none';
  //   } else {
  //     passwordRef.current.style.display = 'none';
  //   }
  //   setDetails ((prev)=>({...prev,[name]:value}));
  // }
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
        <input type="submit" className='submit-btn' />
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
        <input type="submit" value="" className="submit-btn" />
        
          </div>}
      </form>
      <span className={`${!signIn ? 'none' : 'sign-in'}`} >if you don't have an account <span onClick={()=> (setSignIn ((prev)=> (!prev)))}>sign in</span></span>
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

    </div>
    </div>
  )
}

export default Login
