import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Home.css';

function Home() {
  const [loggedInUser, setloggedInUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setloggedInUser(localStorage.getItem('loggedInUser'));
  }, []);

  const handlelogout = () => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('token');


    const sussess = (message) =>{
      toast.error(message);
    }
    sussess("logout succesfully");

    setTimeout(() => {
      navigate('/Signup');
    }, 1000);
  };

  return (
    <div className="home">
      <h1>{loggedInUser}</h1>
      <button onClick={handlelogout}>Logout</button>
      <ToastContainer />
    </div>

    
  );
}

export default Home;
