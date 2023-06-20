import React, {useEffect} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'

const Navbar = ({user,setUser,setIsEdit,setHike}) => {
    useEffect(() => {
        axios.get('http://localhost:8000/api/user-current',{ withCredentials: true })
            .then(res => {
                console.log("logged in user",res);

                setUser(res.data);
            })
            .catch(err => {
                console.log('current user error',err);
                setUser("")
            });
    },[]);

    const createHandler = () => {
        setIsEdit(false);
        setHike({});

    }

    const logoutHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/logout",{},{withCredentials:true})
        .then(res => {
            console.log(res.data);
            setUser(null);
            window.location.href = '/'
        })
        .catch(err => 
            console.log(err))
    }
return (
    <div>
        <div className="col-10 offset-1 ">
            <ul className="nav border-bottom border-top">
                <li className="nav-item">
                    <Link className="nav-link" to='/home' style={{color:"antiquewhite"}}>Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/create' onClick={()=>createHandler()} style={{color:"antiquewhite"}}>Plan a hike</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/checklist' style={{color:"antiquewhite"}}>Checklist</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/weather' style={{color:"antiquewhite"}}>Current Weather</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/' onClick={logoutHandler} style={{color:"antiquewhite"}}>Logout</Link>
                </li>
            </ul>
        </div>
    </div>
)
}

export default Navbar