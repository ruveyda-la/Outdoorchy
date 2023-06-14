import React from 'react';
import {Link} from'react-router-dom';
import videoBack from '../assets/videoBack.mp4'

const Main = ({user,setUser}) => {
   
  return (
    <div className='main'>
        <div className="overlay"></div>
        <video src={videoBack} autoPlay loop muted />
        <div className="content">      
                <p>Welcome to Outdoorchy!</p>
                <p>Let's dive into new adventures!</p>
                <Link style={{color:'antiquewhite',fontWeight:'500'}} to="/login">Login</Link>
                <Link style={{color:'antiquewhite',fontWeight:'500'}} to="/register">Register</Link>
        </div>

    </div>
  )
}

export default Main