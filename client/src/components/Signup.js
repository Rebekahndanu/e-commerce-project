import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.css'
import NavBar from './Navbar';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phone_number: '',
    username: '',
    email: '',
    password: '',
    confirm_password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5505/userRegister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log('User signed up:', data);
      navigate('/products'); 
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className='signup-container'>
      <div className="signup-navbar">
          <NavBar/>
          {/* Your NavBar content */}
      </div>
      <div className='signup-content'>
      <h1>SIGN UP</h1>

      <form onSubmit={handleSubmit} className='signup-form'>
      <input
        className='signup-input'
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <input
        className='signup-input'
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        className='signup-input'
        type="tel"
        name="phone_number"
        placeholder="Phone Number"
        value={formData.phone_number}
        onChange={handleChange}
        required
      />
      <input
        className='signup-input'
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <input
      className='signup-input'
      type="password"
      name="confirm_password"
      placeholder="Confirm Password"
      value={formData.confirm_password}
      onChange={handleChange}
      required
      />
      <button type="submit" className='signup-button'>Signup</button>
    </form>
    <div className="signup-link">
        Already have an account? <Link to="/Login">Login</Link>
    </div>
    </div>

    </div>

  );
};

export default Signup;
