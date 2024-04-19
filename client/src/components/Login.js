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
import NavBar from './Navbar';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call API to create new user using formData
    try {
      const response = await fetch('http://127.0.0.1:5505//userLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      // Handle success response
      console.log('User logged in:', data);
    } catch (error) {
      // Handle error
      console.error('Login failed:', error);
    }
  };

  return (
    <div className='login-container'>

            <div className="login-navbar">
                <NavBar/>
                {/* Your NavBar content */}
            </div>

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
            </div>

    </div>

  );
};

export default Login;