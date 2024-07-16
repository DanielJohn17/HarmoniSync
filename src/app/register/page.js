"use client";

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FaLock, FaUser, FaEnvelope } from 'react-icons/fa';
import "./register.css";

function Register() {
  // State management for form inputs
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [DOB, setDOB] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Basic validation
    if (
        !email.includes("@") ||
        !email.includes(".") ||
        email.length === 0 ||
        email.length > 50
    ) {
        // Set the error state to true
        setEmailError(true);
        return;
    } 

    if (password !== confirmPassword) {
        // Set the error state to true
        setPasswordError(true);
        return;
    } else {
        setPasswordError(false);
    }
    alert('Form submitted');
    postRegister();
  };

  const postRegister = async () => {
    const response = await fetch('http://127.0.0.1:5000/api/v1/users/sign_up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName,
        email,
        DOB,
        password,
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.log(data.error);
    } else {
      console.log(data);
    }
  }


  return (
    <div className="register-main">
    <div className="register-wrapper">
      <h2 className="register-header">Register</h2>

      <button className="button-connect">
        <FontAwesomeIcon icon={faGoogle} className="icon" />
        Connect with Google
      </button>
      <button className="button-connect">
        <FontAwesomeIcon icon={faFacebook} className="icon" />
        Connect with Facebook
      </button>

      <hr />

      <form onSubmit={handleSubmit}>
        <p className="form-text">Fullname</p>
        <div className="form">
          <input
            type="text"
            placeholder="Fullname"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <FaUser className="icon" />
        </div>

        <p className="form-text">Email</p>
        <div className={`form ${emailError ? 'error' : ''}`}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FaEnvelope className="icon" />
        </div>

        <p className="form-text">Date of Birth</p>
        <div className="form">
          <input
            type="date"
            placeholder="Date of Birth"
            value={DOB}
            onChange={(e) => setDOB(e.target.value)}
            required
          />
        </div>

        <p className="form-text">Password</p>
        <div className={`form ${passwordError ? 'error' : ''}`}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FaLock className="icon" />
        </div>

        <p className="form-text">Confirm Password</p>
        <div className={`form ${passwordError ? 'error' : ''}`}>
          <input
            type="password"
            placeholder={passwordError ? "Passwords do not match" : "Confirm Password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <FaLock className="icon" />
        </div>

        <button type="submit" className="login-button">Register</button>
      </form>

      <div className="login-account">
        <p>Already have an account? <a href="/login" className="create">Login</a></p>
      </div>
    </div>
    </div>
  );
}

export default Register;
