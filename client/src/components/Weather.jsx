import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const Weather = ({user}) => {
    const navigate = useNavigate()
    if(!user){
        navigate('/')
    }
    const url='https://api.openweathermap.org/data/2.5/weather?q=Dallas&appid=13e115867ebb824f0880aa8d393ce0a8'
  return (
    <div className="weather">
    <div className='container'>
      <div className="top">
        <div className="location">
          <p>Dallas</p>
        </div>
        <div className="temp">
          <h1>60 F</h1>
        </div>
        <div className="description">
          <p>Clouds</p>
        </div>

      </div>
      <div className="bottom">
        <div className="feels">
          <p>60 F</p>
        </div>
        <div className="humidity">
          <p>20%</p>
        </div>
        <div className="wind">
          12 mph
        </div>
      </div>
    </div>
    </div> 
  )
}

export default Weather