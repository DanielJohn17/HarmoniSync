"use client";

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FaLock, FaUser } from 'react-icons/fa';
import "./login.css";

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Form submitted');
    postLogin();
  };

  const postLogin = async () => {
    const response = await fetch('http://127.0.0.1:5000/api/v1/users/sign_in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password})});
    
    const data = await response.json();
    if (data.error) {
      console.log(data.error);
    } else {
      console.log(data.message);
    }
  }

  return (
      <div className="login-main">
              <div className="login-wrapper">
        <h2 className="login-header">Login</h2>

        <button className="button-connect">
        <FontAwesomeIcon icon={faGoogle} className="icon" />
          Connect with Google
        </button>
        <button className="button-connect">
        <FontAwesomeIcon icon={faFacebook} className="icon" />
          Connect with Facebook
        </button>

        <hr/>

        <div className="form">
          <input type="text" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
          <FaUser className="icon" />
        </div>

        <div className="form">
          <input type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
          <FaLock className="icon" />
        </div>

        <div className="remember-forget">
          <label><input type="checkbox" />Remember Me</label>
          <a href="#">Forgot password?</a>
        </div>

        <button type="submit" className="login-button" onClick={handleSubmit}>Login</button>
        
        <div className="create-account">
          <p>Don't have an account? <a href="/register" className="create">Create Account</a></p>
        </div>
      </div>
      </div>
  )
}

export default Login
