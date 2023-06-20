import React, {useState } from 'react';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';


const Register = ({setUser}) => {

    const navigate = useNavigate()
    const [errors,setErrors] = useState([])

    const [userInfo,setUserInfo] = useState({})

    const changeHandler = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]:e.target.value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/register", userInfo,{withCredentials:true})
        .then(res => {
            console.log("logged user" + res.data.user);
            setUser(res.data.user)
            navigate("/home")
        })
        .catch(err => {
            console.log(err);
            const errors = err.response.data.errors;
                const errList=[];
                for(const key of Object.keys(errors)){
                    errList.push(errors[key].message)
                };
                setErrors(errList);
                        
        })
    }
    return (
    <div className="mx-auto" style={{background:'linear-gradient(90deg, hsla(183, 21%, 50%, 1) 0%, hsla(39, 26%, 32%, 1) 100%)', height:"100vh",paddingTop:'75px'}}>
        <div className="col-6 offset-3" >
            <form onSubmit={submitHandler}>
                <div className="text-white mt-20">
                    <h2 className=''>Create an Account</h2>
                </div>
                <div className="form-outline form-white my-4">
                    {errors && errors.map((item,idx)=>(
                    <p key={idx} onClose={()=> setErrors([])} style={{color:"red"}}>{item}</p> ))}
                </div>
                <div className="form-outline form-white my-4">
                    <label className="form-label text-white" htmlFor="firstName">First Name:</label>
                    <input type="text" className="form-control form-control-lg shadow" name="firstName" onChange={changeHandler}/>
                </div>
                <div className="form-outline form-white my-4">
                    <label className="form-label text-white" htmlFor="lastName">Last Name:</label>
                    <input type="text" className="form-control form-control-lg shadow" name="lastName"  onChange={changeHandler}/>   
                </div>
                <div className="form-outline form-white my-4">
                    <label className="form-label text-white" htmlFor="typeEmail">E-mail:</label>
                    <input type="email" id="typeEmail" className="form-control form-control-lg shadow" name="email" onChange={changeHandler}/>
                </div>
                <div className="form-outline form-white my-4">
                    <label className="form-label text-white" htmlFor="typePassword">Password:</label>
                    <input type="password" id="typePassword" className="form-control form-control-lg shadow" name="password" onChange={changeHandler} />
                </div>
                <div className="form-outline form-white my-4">
                    <label className="form-label text-white" htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password" id="confirmPassword" className="form-control form-control-lg shadow"  name="confirmPassword" onChange={changeHandler}/>
                </div>
                <div >
                    <button className="btn btn-light mb-3 shadow" type="submit">Register</button><br/>
                    <Link to="/login" className="text-white">Already have an account?</Link>
                </div>
            </form>       
        </div>
    </div>
  )
}

export default Register