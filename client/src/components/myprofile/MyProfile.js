import React, { useEffect, useRef, useState } from 'react';
import './styles.scss';
import Post from '../posts/post/Post';
import {axiosClient} from '../../utils/axiosClient';
import { useNavigate } from "react-router-dom";
import ProfilePage from '../profilepage/ProfilePage';

function MyProfile() {

  const [posts,setPosts]=useState([]);
  const [myUserObj,setMyUserObj]=useState(null) 
  useEffect(()=>{
    fetchData();
  },[]);

  async function fetchData(){
    const data=await axiosClient.post('post/myposts');
    const userData=await axiosClient.post('user/getmyuser');
    if(data?.status==='ok'&&userData?.status==='ok'){
      setPosts(data.result);
      setMyUserObj(userData.result);
    } 
    else{
      window.location.replace('/login','_self');
    }
  } 

  return (
    <div className="main">
      <h1>My Posts</h1>
      <ul className="cards">
        {
          posts.map((post)=>(
            <li className="cards_item" key={post._id}>
              <Post postObj={post} userObj={myUserObj} myUserObj={myUserObj}/>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default MyProfile