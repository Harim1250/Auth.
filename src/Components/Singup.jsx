import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css';
import axios from 'axios';

function Signup() {
  const navigate = useNavigate();
  const [signinfo, setSigninfo] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
  const { name, value } = e.target;
    setSigninfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleerror = (message) => {
    toast.error(message); // Display error using toast
  };

  const handlesuccess = (message) => {
    toast.success(message); // Display success message
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload
    console.log('Form Submitted with Data: ', signinfo);

    const { name, email, password } = signinfo;
    if (!name || !email || !password) {
      return handleerror('All fields are required');
    }

    try {
      const response = await axios.post('http://localhost:5000/auth/signup', signinfo, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Handle response data directly AT THE CLIENT SIDE SERVING 
      // PASSING THE OBJECTS FROM THE CONSOLE SECTION

      const { success, message , error } = response.data;

      if (success) {
        handlesuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }

      // MINIMUM PASSWORD REQURED ALLOCATION
      else if(error){
        const details = error?.details[0].message;
        handleerror(details);
      }
      else if(!success){
      handleerror(message);
      }

    } catch (err) {
      const details = err.response?.data?.error?.details?.[0]?.message || 'Signup failed: ' + err.message;
      handleerror(details);
    }
  };

  return (
    <div className="Container">
      <h1>Signup Page</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            id="name"
            autoFocus
            placeholder="Enter your Name"
            value={signinfo.name}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            id="email"
            placeholder="Enter your Email"
            value={signinfo.email}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            id="password"
            placeholder="Enter your Password"
            value={signinfo.password}
          />
        </div>

        <button type="submit">Signup</button>
        <br />

        <span>
          Already have an account?
          <Link to="/login"> Login</Link>
        </span>
      </form>

      <ToastContainer />
    </div>
  );
}

export default Signup;
