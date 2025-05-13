import React, { useRef, useState } from 'react'
import './Login.css'
import background from '../Images/background1.svg'
import chatting from '../Images/chating.png'
const Login = () => {
  const [loginDetails,setLoginDetails] = useState ([]);
  const [details,setDetails] = useState ({name:"",email:"",password:""});
  const [signIn,setSignIn] = useState (true)

  const nameRef = useRef ();
  const emailRef = useRef ();
  const passwordRef = useRef ();


  const submitLogin = ()=> {
    if (details["name"].length <= 3) {
      nameRef.current.style.display = 'block';
    }
    if (details["email"].length == 0) {
      emailRef.current.style.display = 'block';
    }
    if (details["password"].length <4) {
      passwordRef.current.style.display = 'block';
    }
    setLoginDetails ((prev)=>([...prev,details]));
    console.log(loginDetails)
  }

  const handleChange = (value,name)=> {
    if (name === 'name') {
      nameRef.current.style.display = 'none';
    } else if (name === 'email') {
      emailRef.current.style.display = 'none';
    } else {
      passwordRef.current.style.display = 'none';
    }
    setDetails ((prev)=>({...prev,[name]:value}));
  }
  return (
    <div className="login-container">
        <img src={chatting} alt="nothing" className="back"/>
    <div className='loginPage'>
        {signIn ? <h1 className='login'>Login</h1> : <h1 className='login'>Sign in</h1>}
      <form action='' method='post' className='loginForm'>
        {signIn ?<div>
        <input class="input" 
        name="email"
        placeholder="Enter e-mail..." type='email'
        onChange={(e)=>{handleChange (e.target.value,e.target.name)}}/>
        <span className='no-email none' ref={emailRef}>*Please enter your e-mail*</span>

        <input class="input" 
        name="password" 
        placeholder="Enter password..." type='password'
        onChange={(e)=>{handleChange (e.target.value,e.target.name)}}/>
        <span className='no-password none' ref={passwordRef}>*Please enter your password*</span>
        </div> : <div>
          <input class="input" 
        name="email" 
        placeholder="Enter e-mail..." type='email'
        onChange={(e)=>{handleChange (e.target.value,e.target.name)}}/>
        <span className='no-email none' ref={emailRef}>*Please enter your e-mail*</span>

        <input class="input" 
        name="password" 
        placeholder="Enter password..." type='password'
        onChange={(e)=>{handleChange (e.target.value,e.target.name)}}/>

        <input class="input" 
        name="password" 
        placeholder="Enter password..." type='password'
        onChange={(e)=>{handleChange (e.target.value,e.target.name)}}/>
          </div>}
      </form>
      <span className={`${!signIn ? 'none' : 'sign-in'}`} >if you don't have an account <span onClick={()=> (setSignIn ((prev)=> (!prev)))}>sign in</span></span>
{signIn ? <button className='login-button' onClick={submitLogin}>
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
 :<button className='sigin-button' onClick={submitLogin}>
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
</button>}

    </div>
    </div>
  )
}

export default Login
