import React, { useEffect, useRef, useState } from 'react';
import './styles.scss'
import Post from './post/Post'
import {axiosClient} from '../../utils/axiosClient';

function Posts() {
  const [posts,setPosts]=useState([]);
  const [myFollowings,setMyFollowings]=useState([]);
  const [myUserObj,setMyUserObj]=useState(null) 

  useEffect(()=>{
    fetchData();
  },[]);

  async function fetchData(){
    const data=await axiosClient.post('post/all');
    const myFollowingsUsers=await axiosClient.post('user/myfollowings');
    const myUserData=await axiosClient.post('user/getmyuser');
    if(data?.status==='ok'&& myFollowingsUsers?.status==='ok' && myUserData?.status==='ok'){
      setPosts(data.result);
      setMyFollowings(myFollowingsUsers.result);
      setMyUserObj(myUserData.result);
    } 
    else{
      window.location.replace('/login','_self');
    }
  } 

  return (
    <div className="main">
  <h1>Posts </h1>
  <ul className="cards">
    {
      posts.map((post)=>(
        <li className="cards_item" key={post._id}>
          <Post postObj={post} 
          userObj={myFollowings.find(userObject=>userObject._id==post.owner)} 
          myUserObj={myUserObj}/>
        </li>
      ))
    }
    </ul>
</div>
  )
}

export default Posts