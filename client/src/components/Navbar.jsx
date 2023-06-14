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
            <ul className="nav border-bottom">
                <li className="nav-item">
                    <Link className="nav-link" to='/home'>Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/create' onClick={()=>createHandler()}>Plan a hike</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/checklist'>Checklist</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/weather'>Current Weather</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/' onClick={logoutHandler}>Logout</Link>
                </li>
            </ul>
        </div>
    </div>
)
}

export default Navbar