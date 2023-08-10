import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import Navbar from './Navbar';
import Header from './Header'

const Weather = ({user,setUser,setIsEdit,setHike}) => {
    const navigate = useNavigate()
    if(!user){
        navigate('/')
    }

    const [data,setData] = useState({})
    const [location,setLocation] = useState('')
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=13e115867ebb824f0880aa8d393ce0a8`

    const searchLocation = (event)=> {
      if(event.key === 'Enter'){
        axios.get(url).then((response) => {
          setData(response.data)
          console.log(response.data)
        })
        setLocation('')
      }
      
    }
  return (
    <div className="weather">
      <div className="row">
            <Header/>
        </div>
        <div className="row">
            <Navbar user={user} setUser={setUser} setIsEdit={setIsEdit} setHike={setHike}/>
        </div>
      <div className="search">
        <input
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder="Enter a City"
        type="text" />
      </div>
    <div className='container'>
      <div className="top">
        <div className="location">
          <p>{data.name}</p>
        </div>
        <div className="temp">
          {data.main ? <h1>{data.main.temp.toFixed()} °F</h1>:null}
          
        </div>
        <div className="description">
          {data.weather? <p>{data.weather[0].main}</p>:null }
        </div>

      </div>

      {data.name !== undefined &&
      <div className="bottom">
        <div className="feels">
          {data.main? <p className="bold">{data.main.feels_like.toFixed()} °F</p>:null}
          <p>Feels Like</p>
        </div>
        <div className="humidity">
          {data.main? <p className="bold">{data.main.humidity.toFixed()} % </p>:null}
          <p>Humidity</p>
        </div>
        <div className="wind">
          {data.wind? <p className="bold">{data.wind.speed.toFixed()} mph</p> : null}
          <p>Wind Speed</p>
        </div>
      </div>
      }

    </div>
    </div> 
  )
}

export default Weather