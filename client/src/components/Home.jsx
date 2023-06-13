import React from 'react'
import Navbar from './Navbar';
import Header from './Header'
import {useNavigate, Link} from 'react-router-dom'
import { useEffect } from 'react';
import axios from 'axios'

const Home = ({user,setUser,hikes,setHikes}) => {
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
            <Navbar user={user} setUser={setUser}/>
        </div>
        <div className="row">
            <div className="col-10 offset-1">
            <h3>Upcoming Hikes</h3>
            </div>
        </div>

        {hikes.map((item,_id) =>(
        <div key={_id} className="card mb-3 fst-italic" style={{maxWidth: "500px" ,margin:"0 auto"}}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={`${item.photoUrl}`} className="img-" alt="view" />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{item.trail}</h5>
                        <p className="card-text"><small className="text-muted">({item.area})</small></p>
                        <p className="card-text">Date:{item.date}</p>
                        <p className="card-text">Time:{item.time}</p>
                        <p className="card-text">Planned by:{item.creator.firstName} {item.creator.lastName}</p>
                        <Link to={`/view/${item._id}`}>For details</Link>
                        
                        
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