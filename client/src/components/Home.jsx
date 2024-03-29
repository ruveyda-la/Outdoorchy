import React from 'react'
import Navbar from './Navbar';
import Header from './Header'
import {useNavigate, Link} from 'react-router-dom'
import { useEffect } from 'react';
import axios from 'axios'
import dayjs from 'dayjs'

const Home = ({user,setUser,hikes,setHikes,setIsEdit,setHike}) => {
    const navigate = useNavigate()
   
   
    useEffect(() => {
        if(!user){
            navigate('/')
        }
        axios.get("http://localhost:8000/api/hikes")
        .then((res)=>{
            setHikes(res.data)
        })
        .catch ((err) => console.log(err))
    })
return (
    <div style={{background:'linear-gradient(90deg, hsla(183, 21%, 50%, 1) 0%, hsla(39, 26%, 32%, 1) 100%)', paddingBottom:"60px"}}>
        <div className="row">
            <Header/>
        </div>
        <div className="row">
            <Navbar user={user} setUser={setUser} setIsEdit={setIsEdit} setHike={setHike}/>
        </div>
        <div className="row">
            <div>
            <h3 style={{color:"antiquewhite",textAlign:"center",marginTop:"10px"}}>Upcoming Hikes</h3>
            </div>
        </div>

        {hikes.map((item,_id) =>(
        <div key={_id} className="card mb-3 fst-italic" style={{margin:"0 auto",maxWidth:"740px",backgroundColor:"antiquewhite"}}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={`${item.photoUrl}`} className="img-fluid rounded-start mx-auto" style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:"50%"}} alt="view" />
                </div>
                <div className="col-md-8">
                    <div className="card-body" style={{color:"rgb(103, 88, 60)"}}>
                        <h5 className="card-title">{item.trail}</h5>
                        <p className="card-text"><small style={{color:"rgb(103, 88, 60)"}}>({item.area})</small></p>
                        <p className="card-text small">Date:{dayjs(item.date).format("MM/DD/YYYY")}</p>
                        <p className="card-text small">Time:{item.time}</p>
                        <p className="card-text small">Planned by:{item.creator.firstName} {item.creator.lastName}</p>
                        <Link className="small" to={`/view/${item._id}`} style={{color:"rgb(103, 88, 60)"}}>For details</Link>    
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