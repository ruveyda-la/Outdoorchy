import React, {useState} from 'react'
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';


const Login = ({setUser}) => {
    const navigate = useNavigate()
    const [errors,setErrors] = useState([])

    const [loginInfo,setLoginInfo] = useState({
        email:"",
        password:""
    })

    const changeHandler = (e) => {
        setLoginInfo({
            ...loginInfo,
            [e.target.name]:e.target.value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/login", loginInfo,{withCredentials:true})
        .then(res => {
            console.log("RES",res.data);
            setUser(res.data)
            navigate("/home")
            
            
        })
        .catch(err => {
            console.log("HERE",err);
            const errors = err.response.data.errors;
                const errList=[];
                for(const key of Object.keys(errors)){
                    errList.push(errors[key].message)
                };
                setErrors(errList);
                        
        })
    }

return (
    <div className="mx-auto" style={{background:'linear-gradient(180deg, hsla(183, 21%, 50%, 1) 0%, hsla(39, 26%, 32%, 1) 100%)', height:"100vh",paddingTop:'75px'}}>
        <div className="col-6 offset-3" >
            <form onSubmit={submitHandler}>
                <div className=" text-white mt-20">
                    <h2 className=''>Login</h2>
                </div>
                <div className="form-outline form-white my-4">
                {errors && <p onClose={()=> setErrors([])} style={{color:"red"}}>{errors}</p> }
                    
                </div>
                <div className="form-outline form-white my-4">
                    <label className="form-label text-white" htmlFor="typeEmail">E-mail:</label>
                    <input type="email" id="typeEmail" className="form-control form-control-lg shadow" name="email" onChange={changeHandler}/>
                </div>
                <div className="form-outline form-white my-4">
                    <label className="form-label text-white" htmlFor="typePassword">Password:</label>
                    <input type="password" id="typePassword" className="form-control form-control-lg shadow" name="password" onChange={changeHandler}/>
                </div>
                
                <div >
                    <button className="btn btn-light mb-3 shadow" type="submit">Submit</button><br/>
                    <Link to="/register" className="text-white">New to Outdoorchy?</Link>
                </div>
            </form>       
        </div>
    </div>
)
}

export default Login