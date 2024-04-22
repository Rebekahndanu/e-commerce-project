// import React from "react";

// const Login = () => {
//     return(
//         <div>
//             <h1>Login</h1>
//         </div>
//     )
// }
// export default Login

import './Login.css'
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import NavBar from './Navbar';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5505/userLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
        const data = await response.json();
        const { access_token } = data; // Extract the JWT token from the response
        localStorage.setItem('access_token', access_token); // Store the token in local storage
        console.log('User logged in:', data);
        navigate('/home');
      } else {
        console.error('Login failed:', response.statusText);
        // Handle login failure (e.g., display error message to the user)
      }
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login failure (e.g., display error message to the user)
    }
  };

  return (
    <div className='login-container'>
            <div className='login-content'>
            <h1 className='login-h1'>LOGIN</h1>
            <form onSubmit={handleSubmit} className='login-form'>
                    <input
                      className="login-input"
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                    <input
                      className="login-input"
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <button type="submit" className="login-button">Login</button>
             </form>
             <div className="signup-link">
                Don't have an account? <Link to="/Signup">Sign up</Link>
            </div>
            </div>

    </div>

  );
};

export default Login;
