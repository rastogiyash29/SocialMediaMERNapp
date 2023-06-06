import React, { useEffect, useRef, useState } from 'react'
import './styles.scss'
import { AiOutlineHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { axiosClient } from '../../../utils/axiosClient';

function Post(props) {
  const likeRef=useRef(null);
  const postObj=props.postObj;
  const userObj=props.userObj;
  var myUserObj=props.myUserObj;
  const navigate = useNavigate();
  const [likesCount,setLikesCount]=useState(0);
  var liked=false;

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
    setLikesCount(postObj.likes.length);
    liked=postObj.likes.find(likedby=> likedby=='yash')?true:false;
  },[])

  const userProfile=()=>{
    navigate('/user',{state:{userId:postObj.owner}});
  }

  async function likeBtnClicked(){
    console.log(myUserObj);
  }

  return (
    <div className="card">
    <div className="user" onClick={()=>{userProfile()}} style={{cursor:'pointer'}}>
        <img src="https://i.pravatar.cc/40?img=1" alt="user__image" className="user__image"/>
        <div className="user__info">
          <h5 style={{fontSize:'1.2rem'}}>{userObj.name}</h5>
          <small>{userObj.username}</small>
        </div>
      </div>
    <div className="card__header">
      <img src="https://source.unsplash.com/600x400/?computer" alt="card__image" className="card__image" width="600"/>
    </div>
    <div className="card__body">
      <span className="tag tag-blue">{postObj.tags}</span>
      <h4>{postObj.caption}</h4>
    </div>
    {/* <div className="card__footer" onClick={()=>{likeBtnClicked()}} style={{cursor:'pointer'}}>
      <AiOutlineHeart className='unlike' ref={likeRef}/><p>{likesCount}</p>
    </div> */}
  </div>
  )
}

export default Post