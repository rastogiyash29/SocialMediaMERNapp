import React, { useEffect, useRef, useState } from 'react';
import './styles.scss';
import {axiosClient} from '../../utils/axiosClient';
import { KEY_ACCESS_TOKEN, removeItem, setItem } from '../../utils/localStorageManager';
import { useNavigate } from "react-router-dom";

function Login() {
  const emailRef=useRef(null);
  const passwordRef=useRef(null);

  const [errorLine,setErrorLine]=useState('');

  useEffect(()=>{
    localStorage.clear();
  },[]);

  const navigate = useNavigate();

  async function handleSubmit(event){
    event.preventDefault();
    const email=emailRef.current.value;
    const password=passwordRef.current.value;
    try {
      const data=await axiosClient.post('auth/login',{
        email,
        password
      });
      console.log("login data is: ",data);
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
    <div className='login'>
      <div className="login-box">
  <h2>Login</h2>
  <form onSubmit={handleSubmit}>
    <div className="user-box">
      <input type="text" name="" required="" ref={emailRef}/>
      <label>email</label>
    </div>
    <div className="user-box">
      <input type="password" name="" required="" ref={passwordRef}/>
      <label>Password</label>
    </div>
    <a onClick={handleSubmit}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Submit
    </a>
    <p className='switch-auth-mode' onClick={()=>{navigate('/signup')}}>Don't Have an account? Signup</p>
    <p style={{color:'red'}}>{errorLine}</p>
  </form>
</div>
    </div>
  )
}

export default Login