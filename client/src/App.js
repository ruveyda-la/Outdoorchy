
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {useState} from 'react'
import Register from './components/Register';
import Login from './components/Login';
import Main from './components/Main';
import Home from './components/Home';
import Form from './components/Form';
import OneHike from './components/OneHike';


function App() {
  const [isEdit, setIsEdit] = useState(false);

  const [hikes, setHikes]=useState([]);

  const [ hike, setHike ] = useState({})

  const [user,setUser] = useState({})
    
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main user={user} setUser={setUser}/>} />
        <Route path="/register" element={<Register setUser={setUser}/>} />
        <Route path="/login" element={<Login setUser={setUser}/>} />
        <Route path="/home" element={<Home user={user} setUser={setUser} hikes={hikes} setHikes={setHikes} setIsEdit={setIsEdit} hike={hike} setHike={setHike}/>} />
        <Route path="/create" element={<Form user={user} setUser={setUser} isEdit={isEdit} setIsEdit={setIsEdit} hikes={hikes} hike={hike} setHike={setHike}/>} />
        <Route path="/view/:id" element={<OneHike user={user} setUser={setUser} hike={hike} setHike={setHike} setIsEdit={setIsEdit}/>}/>
        <Route path="/update/:id" element={<Form user={user} setUser={setUser} isEdit={isEdit} setIsEdit={setIsEdit} hikes={hikes} hike={hike} setHike={setHike}/>} />
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
