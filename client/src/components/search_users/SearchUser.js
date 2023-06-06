import React, { useEffect, useRef, useState } from 'react'
import './styles.scss'
import SearchBar from '../searchbar/SearchBar'
import UserProfile from '../userprofile/UserProfile'
import {axiosClient} from '../../utils/axiosClient';

function SearchUser() {

  const[users,setUsers] =useState([]);
  const [myUserObj,setMyUserObj]=useState(null) 
  useEffect(()=>{
    fetchData();
  },[]);

  async function fetchData(){
    const userData=await axiosClient.post('user/getmyuser');
    if(userData?.status==='ok'){
      setMyUserObj(userData.result);
    } 
    else{
      window.location.replace('/login','_self');
    }
  } 

  async function handleChange(usernameQuery){
    try{
      const data=await axiosClient.post('user/find',{
        usernamequery:usernameQuery
      });
      if(data?.status==='ok'){
        setUsers(data.result);
      }
    }catch(e){
      console.log(e.message);
    }
  }

  return (
    <div className='search-user'>
        <h1>User Profiles </h1>
        <SearchBar searchHint={"Search users by username..."} parentFunction={handleChange}/>
        <div className="main">
          <ul className="cards">
            {
              users.map((user)=>(
                <li className="cards_item" key={user._id}>
                  <UserProfile userObj={user} myUserObj={myUserObj}/>
                </li>
              ))
            }
          </ul>
        </div>
    </div>
  )
}

export default SearchUser