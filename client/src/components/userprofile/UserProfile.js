import React, { useEffect, useRef, useState } from 'react';
import './styles.scss'
import {useLocation, useNavigate} from 'react-router-dom';
import Post from '../posts/post/Post';
import {axiosClient} from '../../utils/axiosClient';

function UserProfile(props) {
	const userObj=props.userObj;
	const navigate=useNavigate();
	var myUserObj=props.myUserObj;
	const [followed,setFollowed]=useState(false);

	useEffect(()=>{
		if(!myUserObj){
		  (async () => {
			const data=await axiosClient.post('user/getmyuser');
			if(data?.status==='ok'){
			  myUserObj=data.result;
			}else{
			  window.location.replace('/login','_self');
			}
		  })();
		}
		myUserObj.followings.find(uid=> uid==userObj._id)?setFollowed(true):setFollowed(false);
	  },[])

	const toProfileProfile=()=>{
		navigate('/user',{state:{userObj}});
	}

	const followBtnClicked=async()=>{
		const data=await axiosClient.post('user/follow',{user_id:userObj._id});
		console.log(data);
		setFollowed(!followed);
	}

  return (
	<div className="center">
		<div className="profile">
			<div className="image">
				<div className="circle-1"></div>
				<div className="circle-2"></div>
				<img src="https://100dayscss.com/codepen/jessica-potter.jpg" width="70" height="70" alt="Jessica Potter"/>
			</div>
			<div className="name">{userObj.name}</div>
			<div className="job">{userObj.username}</div>
			<div className="actions">
				<button className="btn" onClick={()=>{followBtnClicked()}}>{followed?'UnFollow':'Follow'}</button>
				<button className="btn" onClick={()=>{toProfileProfile()}} style={{cursor:'pointer'}}>View Posts</button>
			</div>
		</div>
		<div className="stats" onClick={()=>{toProfileProfile()}} style={{cursor:'pointer'}}>
			<div className="box">
				<span className="value">{userObj.posts.length}</span>
				<span className="parameter">Posts</span>
			</div>
			<div className="box">
				<span className="value">{userObj.followers.length}</span>
				<span className="parameter">Followers</span>
			</div>
			<div className="box">
				<span className="value">{userObj.followings.length}</span>
				<span className="parameter">Following</span>
			</div>
		</div>
  </div>
  )
}

export default UserProfile