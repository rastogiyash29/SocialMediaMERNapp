import React, { useEffect, useRef } from 'react'
import './styles.scss'
import Post from '../posts/post/Post';
import { axiosClient } from '../../utils/axiosClient';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const titleRef=useRef(null);
  const tagsRef=useRef(null);

  useEffect(()=>{
    checkMyUser();
  },[])

  async function checkMyUser(){
    const myUserData=await axiosClient.post('user/getmyuser');
    if(!myUserData){
      window.location.replace('/login','_self');
    }
  }

  const navigate=useNavigate();

  const previewImage = (event) => {
    const imageFiles = event.target.files;
    const imageFilesLength = imageFiles.length;
    if (imageFilesLength > 0) {
        const imageSrc = URL.createObjectURL(imageFiles[0]);
        const imagePreviewElement = document.querySelector("#preview-selected-image");
        imagePreviewElement.src = imageSrc;
        imagePreviewElement.style.display = "block";
    }
  };

  var creating=false;

  async function handleCreatePost(){
    if(creating)return;
    try {
      console.log("handle create post clicked");
      creating=true;
      const newpost=await axiosClient.post('post/create',{
        caption:titleRef.current.value,
        tags:tagsRef.current.value,
      });
      navigate('/myprofile');
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <>
      <h1 style={{margin:'2rem',color:'#fff',fontSize:'2rem'}}>Create Post</h1>
      <div className='mode'>
        <div className='form-side'>
          <p>Title:</p>
          <input type="text" name="txt" placeholder="Title" required="" ref={titleRef}/>
          {/* <p>Description: </p>
          <input type="text" name="txt" placeholder="Brief your topic" required="" ref={descriptionRef}/> */}
          <p>Tags: </p>
          <input type="text" name="txt" placeholder="#_tag" required="" ref={tagsRef}/>
          <button onClick={handleCreatePost} style={{height:'40px',backgroundColor:'green',color:'#fff',width:'100%'}}>Create Post</button>
        </div>
        <div className='createpost'>      
          <h1>Select Image</h1>
          <div className="image-preview-container">
          <div className="preview">
            <img id="preview-selected-image" />
            </div>
          <label htmlFor="file-upload">Upload Image</label>
          <input type="file" id="file-upload" accept="image/*" onChange={previewImage} />
        </div>
        </div>
      </div>
    </>
  )
}

export default CreatePost