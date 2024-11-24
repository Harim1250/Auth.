import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();

  const [Logininfo, setLogininfo] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
  const { name, value } = e.target;
  setLogininfo((prevState) => ({
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
    console.log('Form Submitted with Data: ', Logininfo);

    const { email, password } = Logininfo;
    if (!email || !password) {
      return handleerror('All Field Are Required');
    }

    try {
      const response = await axios.post('http://localhost:5000/auth/login', Logininfo, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Handle response data directly AT THE CLIENT SIDE SERVING 
      // PASSING THE OBJECTS FROM THE CONSOLE SECTION

      const { success, message , jwtToken , name , error, } = response.data;

      if (success) {
        localStorage.setItem('token',jwtToken);
        localStorage.setItem('loggedInUser', name);
        handlesuccess(message);
        setTimeout(() => {
          navigate("/Home");
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
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            id="email"
            placeholder="Enter your Email"
            value={Logininfo.email}
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
            value={Logininfo.password}
          />
        </div>

        <button type="submit">Login</button>
        <br />

        <span>
           Don't have an account?
          <Link to="/Signup">signup</Link>
        </span>
      </form>

      <ToastContainer />
    </div>
  );
}

export default Login;
