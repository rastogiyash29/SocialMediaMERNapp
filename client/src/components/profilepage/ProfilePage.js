import './styles.scss'
import {useLocation} from 'react-router-dom';
import Post from '../posts/post/Post'
import {axiosClient} from '../../utils/axiosClient';
import React, { useEffect, useRef, useState } from 'react';

function ProfilePage() {
  const location = useLocation();
  var userObjLoc=location.state.userObj;
  var userIdLoc=location.state.userId;
  const [userObj,setUserObj]=useState(null);
  const [posts,setPosts]=useState([]);
  const [myUserObj,setMyUserObj]=useState(null);

  // Loading Progress=> myUser >> targetUser >> targetPosts
  useEffect(()=>{
    if(!userIdLoc&&!userObjLoc){
      window.location.replace('/error','_self');
    }
    loadMyUser();
  },[]);

  //load MyUser at first after loading object
  useEffect(()=>{
    if(myUserObj){
      fetchData();
    }
  },[myUserObj]);

  //load posts after loading object
  useEffect(()=>{
    if(userObj){
      if(userObj._id==myUserObj._id){
        window.location.replace('/myprofile','_self');
      }
      loadPosts();
    }
  },[userObj]);

  async function loadPosts(){
    const data=await axiosClient.post('post/postsofuser',{user_id:userObj._id});
    if(data?.status==='ok'){
      setPosts(data.result);
    } 
    else{
      window.location.replace('/error','_self');
    }
  }

  async function loadMyUser(){
    const myUserData=await axiosClient.post('user/getmyuser');
    if(myUserData?.status==='ok'){
      setMyUserObj(myUserData.result);
    } 
    else{
      window.location.replace('/error','_self');
    }
  }

  async function fetchData(){
    if(!userObjLoc){
      const userData=await axiosClient.post('user/get',{user_id:userIdLoc});
      if(userData?.status==='ok'){
        setUserObj(userData.result);
        userObjLoc=userData.result;
      } 
      else{
        window.location.replace('/error','_self');
      }
    }else{
      setUserObj(userObjLoc);
    }
  } 

  return (
    <div className='profilepage'>
        <div className="main">
        <h1>{userObj?userObj.name:'Loading'}</h1>
        <ul className="cards">
        {
          posts.map((post)=>(
          <li className="cards_item" key={post._id}>
            <Post postObj={post} userObj={userObj} myUserObj={myUserObj}/>
          </li>
          ))
        }
      </ul>
</div>
    </div>  
  )
}

export default ProfilePage