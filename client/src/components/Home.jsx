import React from 'react'
import Navbar from './Navbar';
import Header from './Header'
import {useNavigate, Link} from 'react-router-dom'
import { useEffect } from 'react';
import axios from 'axios'

const Home = ({user,setUser,hikes,setHikes,setIsEdit,setHike}) => {
    const navigate = useNavigate()
    if(!user){
        navigate('/')
    }
    useEffect(() => {
        axios.get("http://localhost:8000/api/hikes")
        .then((res)=>{
            setHikes(res.data)
        })
        .catch ((err) => console.log(err))
    })
return (
    <div>
        <div className="row">
            <Header/>
        </div>
        <div className="row">
            <Navbar user={user} setUser={setUser} setIsEdit={setIsEdit} setHike={setHike}/>
        </div>
        <div className="row">
            <div className="col-10 offset-1">
            <h3>Upcoming Hikes</h3>
            </div>
        </div>

        {hikes.map((item,_id) =>(
        <div key={_id} className="card mb-3 col-10 offset-1 fst-italic" style={{margin:"0 auto",maxHeight:"300px"}}>
            <div className="row ">
                <div className="col-md-6">
                    <img src={`${item.photoUrl}`} className="img-fluid rounded-start mx-auto" style={{maxWidth:"100%",maxHeight:"100%"}}alt="view" />
                </div>
                <div className="col-md-6">
                    <div className="card-body">
                        <h5 className="card-title">{item.trail}</h5>
                        <p className="card-text"><small className="text-muted">({item.area})</small></p>
                        <p className="card-text small">Date:{item.date}</p>
                        <p className="card-text small">Time:{item.time}</p>
                        <p className="card-text small">Planned by:{item.creator.firstName} {item.creator.lastName}</p>
                        <Link className="small" to={`/view/${item._id}`}>For details</Link>
                        
                        
                    </div>
                </div>
            </div>
        </div>

))
}
    </div>
    )
}

export default Home