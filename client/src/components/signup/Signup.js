import React, { useEffect, useRef, useState } from 'react';
import './styles.scss'
import { useNavigate } from "react-router-dom";
import { KEY_ACCESS_TOKEN, removeItem, setItem } from '../../utils/localStorageManager';
import {axiosClient} from '../../utils/axiosClient';

function Signup() {
  const navigate = useNavigate();
  const nameRef=useRef(null);
  const usernameRef=useRef(null);
  const emailRef=useRef(null);
  const passwordRef=useRef(null);
  const confirmPasswordRef=useRef(null);

  const [errorLine,setErrorLine]=useState('');

  useEffect(()=>{
    localStorage.clear();
  },[]);

  async function handleSubmit(event){
    event.preventDefault();
    const email=emailRef.current.value;
    const password=passwordRef.current.value;
    const confirmPassword=confirmPasswordRef.current.value;
    const username=usernameRef.current.value;
    const name=nameRef.current.value;
    if(password!=confirmPassword){
      setErrorLine('password and confirm password mismatched');
      return; 
    }
    try {
      const data=await axiosClient.post('auth/signup',{
        name,
        username,
        email,
        password
      });
      if(data.status==='ok'){
        setItem(KEY_ACCESS_TOKEN,data.result.access_token);
        navigate('/home');
      }else{
        setErrorLine(data.result);
      }      
    } catch (e) {
      console.log(e.message);
      navigate('/errorpage');
    }
  } 

  return (
    <div className='signup'>
      <div className="login-box">
  <h2>Sign Up</h2>
  <form onSubmit={handleSubmit}>
    <div className="user-box">
      <input type="text" name="" required="" ref={nameRef}/>
      <label>Full Name</label>
    </div>
    <div className="user-box">
      <input type="text" name="" required="" ref={usernameRef}/>
      <label>Select UserName</label>
    </div>
    <div className="user-box">
      <input type="text" name="" required="" ref={emailRef}/>
      <label>Email</label>
    </div>
    <div className="user-box">
      <input type="password" name="" required="" ref={passwordRef}/>
      <label>Password</label>
    </div>
    <div className="user-box">
      <input type="password" name="" required="" ref={confirmPasswordRef}/>
      <label>Confirm Password</label>
    </div>
    <a onClick={handleSubmit}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Submit
    </a>
    <p className='switch-auth-mode' onClick={()=>{navigate('/login')}}>Already Have an account? Login</p>
    <p style={{color:'red'}}>{errorLine}</p>
  </form>
</div>
    </div>
  )
}

export default Signup