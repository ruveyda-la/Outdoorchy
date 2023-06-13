import React, {useState} from 'react'
import axios from'axios'
import {useNavigate} from 'react-router-dom'
import Navbar from './Navbar';
import Header from './Header'
const Form = (props) => {
    const {isEdit,setIsEdit,hike,setHike,user, setUser} = props
    const navigate = useNavigate()
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
    <div>
        <div className="row">
            <Header/>
        </div>
        <div className="row">
            <Navbar setUser={setUser} user={user}/>
        </div>
        <div className="row">
            <div className="col-10 offset-1 ">
            <h3>Plan a hike!</h3>
            </div>
            <div className="col-6 offset-3 p-10" >
            <form onSubmit={submitHandler} className="rounded-5 bg-warning">
                <div className="form-outline form-white my-4">
                    {errors && errors.map((item,idx)=>(
                    <p key={idx} onClose={()=> setErrors([])} style={{color:"red"}}>{item}</p> ))}
                </div>
                <div className="form-outline form-white my-4">
                    <label className="form-label text-white" htmlFor="trail">Trail Name:</label>
                    <input type="text" className="form-control form-control-lg shadow" name="trail" onChange={changeHandler}/>
                </div>
                <div className="form-outline form-white my-4">
                    <label className="form-label text-white" htmlFor="area">Area/Park:</label>
                    <input type="text" className="form-control form-control-lg shadow" name="area"  onChange={changeHandler}/>   
                </div>
                <div className="form-outline form-white my-4">
                    <label className="form-label text-white" htmlFor="level">Level:</label>
                    <input type="text" className="form-control form-control-lg shadow" name="level" onChange={changeHandler}/>
                </div>
                <div className="form-outline form-white my-4">
                    <label className="form-label text-white" htmlFor="length">Length:</label>
                    <input type="text" className="form-control form-control-lg shadow" name="length" onChange={changeHandler} />
                </div>
                <div className="form-outline form-white my-4">
                    <label className="form-label text-white" htmlFor="elevation">Elevation gain:</label>
                    <input type="text" className="form-control form-control-lg shadow"  name="elevation" onChange={changeHandler}/>
                </div>
                <div className="form-outline form-white my-4">
                    <label className="form-label text-white" htmlFor="date">Date:</label>
                    <input type="date" className="form-control form-control-lg shadow"  name="date" onChange={changeHandler}/>
                </div>
                <div className="form-outline form-white my-4">
                    <label className="form-label text-white" htmlFor="time">Time:</label>
                    <input type="text" className="form-control form-control-lg shadow"  name="time" onChange={changeHandler}/>
                </div>
                <div className="form-outline form-white my-4">
                    <label className="form-label text-white" htmlFor="photoUrl">Photo URL:</label>
                    <input type="text" className="form-control form-control-lg shadow"  name="photoUrl" onChange={changeHandler}/>
                </div>
                {/* < input type="hidden" name="creator" value={user} /> */}
                <div>
                    <button className="btn btn-light mb-3 shadow" type="submit">Register</button>
                </div>
            </form>       
        </div>
        </div>
    </div>
  )
}

export default Form