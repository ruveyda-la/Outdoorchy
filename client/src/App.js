
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from './components/Register';
import Login from './components/Login';
import Main from './components/Main';
import Home from './components/Home';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
