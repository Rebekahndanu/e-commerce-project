import React, { useState } from 'react';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    phonenumber: '',
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call API to authenticate user using formData
    try {
      const response = await fetch('your-backend-url/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      // Handle success response
      console.log('User logged in:', data);
      // Redirect or perform any other actions after successful login
    } catch (error) {
      // Handle error
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        email="email"
        username="name"
        phonenumber="number"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        email="email"
        type="password"
        username="name"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
