import React from 'react'
import {useNavigate} from 'react-router-dom'

const Weather = ({user}) => {
    const navigate = useNavigate()
    if(!user){
        navigate('/')
    }
  return (
    <div className='col-6 offset-3 mt-5'>Implement Weather API here!</div>
  )
}

export default Weather