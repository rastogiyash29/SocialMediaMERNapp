import React, { useRef, useState } from 'react'
import './styles.scss'
import { Link } from 'react-router-dom'
import {axiosClient} from '../../utils/axiosClient';
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

    function myFunction() {
        const navRef=document.getElementById("myTopnav");
        if (navRef.className === "topnav") {
            navRef.className += " responsive";
        } else {
            navRef.className = "topnav";
        }
      }

      async function logout(){
        myFunction();
        try {
          const data=await axiosClient.post('auth/logout');
          if(data.status==='ok'){
            localStorage.clear();
            navigate('/login');
          }     
        } catch (e) {
          console.log(e.message);
          navigate('/errorpage');
        }
      }

  return (
    <div className="topnav" id="myTopnav" > 
        <Link to='/home' onClick={myFunction}>Home</Link>
        <Link to='/search' onClick={myFunction}>Search</Link>
        <Link to='/myprofile' onClick={myFunction}>Profile</Link>
        <Link to='/login' onClick={logout}>Logout</Link>
        <Link to='/createpost' onClick={myFunction}>Create-Post</Link>
        <Link className='icon'><i className="fa fa-bars" onClick={myFunction}></i></Link>
  </div>
  )
}

export default Navbar