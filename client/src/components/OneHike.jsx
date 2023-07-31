import {useEffect} from 'react'
import axios from 'axios'
import { Link,useNavigate,useParams } from 'react-router-dom'
import Navbar from './Navbar';
import Header from './Header'
import dayjs from 'dayjs'

const OneHike = ({user,setUser,hike,setHike, setIsEdit}) => {
    const navigate = useNavigate()
    if(!user){
        navigate('/')
    }
    
    const {id} = useParams()
    
      
    useEffect(() => {
          axios.get(`http://localhost:8000/api/hikes/${id}`)
              .then((res)=> {
                setHike(res.data)
              })
              .catch((err) => console.log(err))
        },[])

      const deleteHandler = (id) => {
          axios.delete(`http://localhost:8000/api/hikes/${id}`)
          .then((res)=> {
            console.log(res.data)
          })
          .catch((err) => console.log(err))
      }
      const editHandler = (object) => {
        setHike(object);
        setIsEdit(true);
    }

  return (
    <div style={{background:'linear-gradient(90deg, hsla(183, 21%, 50%, 1) 0%, hsla(39, 26%, 32%, 1) 100%)', paddingBottom:"60px"}} >
      <div className="row">
            <Header/>
        </div>
        <div className="row">
            <Navbar user={user} setUser={setUser} setIsEdit={setIsEdit} setHike={setHike}/>
        </div>
        < div className="card mb-3" style={{margin:"0 auto", width:'400px',borderRadius:'20px',marginTop:'50px'}}>
          <img src={`${hike.photoUrl}`} className="card-img-top" style={{maxWidth:"400px",maxHeight:"400px",borderRadius:'20px'}}alt="view" />
          <div className="card-body">
              <h5 className="card-title">{hike.trail}</h5>
              <p className="card-text"><small className="text-muted">({hike.area})</small></p>
              <p className="card-text small">When:{dayjs(hike.date).format("MM/DD/YYYY")} {hike.time}</p>
              <p className="card-text small">Level:{hike.level}</p>
              <p className="card-text small">Length:{hike.length} miles</p>
              <p className="card-text small">Elevation gain:{hike.elevation}ft</p>
              {user._id===hike.creator ?
              <div>
                <Link className="btn btn-secondary m-1" onClick={() => editHandler(hike)} to={`/update/${hike._id}`}>Update</Link>
                <Link className="btn btn-secondary m-1" onClick={() => deleteHandler(hike._id)} to={"/home"}>Cancel</Link>
              </div>
              : null
              }     
          </div>
      </div>
    </div>
  )
}

export default OneHike