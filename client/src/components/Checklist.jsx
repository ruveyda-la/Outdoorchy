import React from 'react'
import {useNavigate} from 'react-router-dom'

const Checklist = ({user}) => {
    const navigate = useNavigate()
    if(!user){
        navigate('/')
    }
  return (
    <div className='col-6 offset-3 mt-5'>Add a checklist for a day-hike here!!!</div>
  )
}

export default Checklist