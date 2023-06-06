import React from 'react'
import './ErrorPage.scss'
import { useNavigate } from "react-router-dom";

function ErrorPage() {

    const leftImage="https://blog.stackfindover.com/wp-content/uploads/2021/03/image-left.png";
    const rightImage="https://blog.stackfindover.com/wp-content/uploads/2021/03/right-shape.png";
    const navigate = useNavigate();

  return (
    <div className="errorpage_container">
        <div className="wrapper">
            <div className="container">
                <div className="grid-row">
                    <div className="colmun colmun-left">
                        <img src={leftImage} alt="image-left"></img>
                        <h1 className="px-spc-b-20">We can't find the page you are looking for.</h1>
                        <span className="px-spc-b-20">This page has been relocated or removed.</span>

                        <button className="go-home" onClick={()=> {navigate('/home')}}><i className="fa fa-home"></i> Go Home</button>
                    </div>
                    <div className="colmun colmun-right">
                        <img src={rightImage} alt="right-shape"></img>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ErrorPage