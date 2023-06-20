import React, {useState, useEffect} from 'react'
import axios from'axios'
import {useNavigate, useParams} from 'react-router-dom'
import Navbar from './Navbar';
import Header from './Header'
const Form = (props) => {
    const {isEdit,setIsEdit,hike,setHike,user, setUser} = props
    const navigate = useNavigate()
    if(!user){
        navigate('/')
    }
    setIsEdit(window.location.pathname.includes("update"))
    const {id} = useParams()
    
    useEffect(()=>{
        if(isEdit){
          axios.get(`http://localhost:8000/api/hikes/${id}`)
              .then((res)=> {
                setHike(res.data)
              })
              .catch((err) => console.log(err))
            }

},[isEdit])

    const [errors,setErrors] = useState([])
    
    const submitHandler =(e)=>{
        e.preventDefault();
        if(!user){
            navigate('/')
        }
        isEdit?
        axios.patch(`http://localhost:8000/api/hikes/${hike._id}`,hike,{withCredentials:true})
                .then(res => {console.log(res);
                                navigate("/home")
                                setIsEdit(false)
                                setHike({})
                            })
                .catch((err) => {
                    console.log(err);
                    const errors = err.response.data.error.errors;
                    const errList=[];
                    for(const key of Object.keys(errors)){
                        errList.push(errors[key].message)
                    };
                    setErrors(errList);
                })
        :axios.post("http://localhost:8000/api/hikes",hike, {withCredentials:true})
                .then(res=>{console.log(res);
                        console.log(res.data);
                        navigate("/home")
                        })
                .catch((err) => {
                console.log(err);
                const errors = err.response.data.error.errors;
                const errList=[];
                for(const key of Object.keys(errors)){
                    errList.push(errors[key].message)
                };
                setErrors(errList);
            })
        };
        
    
    const changeHandler=(e)=>{
        setHike({
            ...hike,
            [e.target.name]:e.target.value
        })
    }
  return (
    <div style={{background:'linear-gradient(90deg, hsla(183, 21%, 50%, 1) 0%, hsla(39, 26%, 32%, 1) 100%)', paddingBottom:"60px"}}>
        <div className="row">
            <Header/>
        </div>
        <div className="row">
            <Navbar setUser={setUser} user={user}/>
        </div>
        <div className="row" style={{fontStyle:"oblique"}}>
            <div>
                {isEdit?
            <h3 style={{color:"antiquewhite",marginTop:"35px",textAlign:"center"}}>Update your hike!</h3>:<h3 style={{color:"antiquewhite",marginTop:"35px",textAlign:"center"}}>Plan a hike!</h3>
                }
            </div>
            <div className="col-6 offset-3 p-10" style={{backgroundColor:"antiquewhite",borderRadius:"10px"}}>
            <form onSubmit={submitHandler} className="rounded-5" >
                <div className="form-outline my-4" >
                    {errors && errors.map((item,idx)=>(
                    <p key={idx} onClose={()=> setErrors([])} style={{color:"red"}}>{item}</p> ))}
                </div>
                <div className="form-outline my-4">
                    <label className="form-label" htmlFor="trail" style={{color:"rgb(103, 88, 60)"}}>Trail Name:</label>
                    <input type="text" className="form-control form-control-lg shadow" name="trail" value={hike.trail} onChange={changeHandler}/>
                </div>
                <div className="form-outline form-white my-4">
                    <label className="form-label" htmlFor="area" style={{color:"rgb(103, 88, 60)"}}>Area/Park:</label>
                    <input type="text" className="form-control form-control-lg shadow" name="area" value={hike.area}  onChange={changeHandler}/>   
                </div>
                <div className="form-outline form-white my-4">
                    <label className="form-label" style={{color:"rgb(103, 88, 60)"}} htmlFor="level">Level:</label>
                    <input type="text" className="form-control form-control-lg shadow" name="level" value={hike.level} onChange={changeHandler}/>
                </div>
                <div className="form-outline form-white my-4">
                    <label className="form-label" style={{color:"rgb(103, 88, 60)"}} htmlFor="length">Length:</label>
                    <input type="text" className="form-control form-control-lg shadow" name="length" value={hike.length} onChange={changeHandler} />
                </div>
                <div className="form-outline form-white my-4">
                    <label className="form-label" style={{color:"rgb(103, 88, 60)"}} htmlFor="elevation">Elevation gain:</label>
                    <input type="text" className="form-control form-control-lg shadow"  name="elevation" value={hike.elevation} onChange={changeHandler}/>
                </div>
                <div className="form-outline form-white my-4">
                    <label className="form-label" style={{color:"rgb(103, 88, 60)"}} htmlFor="date">Date:</label>
                    <input type="date" className="form-control form-control-lg shadow"  name="date" value={hike.date} onChange={changeHandler}/>
                </div>
                <div className="form-outline form-white my-4">
                    <label className="form-label" style={{color:"rgb(103, 88, 60)"}} htmlFor="time">Time:</label>
                    <input type="text" className="form-control form-control-lg shadow"  name="time" value={hike.time} onChange={changeHandler}/>
                </div>
                <div className="form-outline form-white my-4">
                    <label className="form-label" style={{color:"rgb(103, 88, 60)"}} htmlFor="photoUrl">Photo URL:</label>
                    <input type="text" className="form-control form-control-lg shadow"  name="photoUrl" value={hike.photoUrl} onChange={changeHandler}/>
                </div>
                <div>
                    {isEdit?
                    <button className="btn btn-light mb-3 shadow" style={{color:"rgb(103, 88, 60)"}} type="submit">Update</button>:
                    <button className="btn btn-light mb-3 shadow" style={{color:"rgb(103, 88, 60)"}} type="submit">Create</button>

                    }
                </div>
            </form>       
        </div>
        </div>
    </div>
  )
}

export default Form