import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from './Components/Singup';
import Login from './Components/Login';
import Home from './Components/Home';
import { useState } from 'react';

function App() {
  const [Authnticate, seAuthnticatet] = useState(false);

  const PrivateRoute = ({element}) =>{
     return Authnticate ? element: <Navigate to = "/Login"/>
   }
  return (
    <div className='Appmain'> {/* Corrected className */}
      <Routes>
        {/* Redirect the root path to the login page */}
        <Route path='/' element={<Navigate to='/Login' />} />
        
        {/* Routes for login, signup, and home pages */}
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} /> {/* Corrected component name */}
        <Route path='/home' element={<PrivateRoute Element={<Home />} />} />

      </Routes>
    </div>
  );
}

export default App;
