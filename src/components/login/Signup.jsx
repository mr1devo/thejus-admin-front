// Import necessary modules and components
import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css'; // Import your updated CSS file
import baseUrl from '../Api';
import { useNavigate } from 'react-router-dom';

// Define the Signup component
const Signup = () => {
  // Define initial input values
  const initialInputs = {
    "FirstName": '',
    "lastname": '',
    "email": '',
    "username": '',
    "password": '',
  };

  // Define state variables and functions
  const [inputs, setInputs] = useState(initialInputs);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Handle input changes
  const InputHandler = (event) => {
    const { name, value } = event.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  // Save data to backend
  const SaveData = () => {
    const validationErrors = validateForm(inputs);

    if (Object.keys(validationErrors).length === 0) {
    console.log("Attempting to save data:", inputs);
    axios.post(baseUrl+"/Adsignup/adminnew", inputs)
      .then((response) => {
        alert("Record Saved");
        navigate('/');
      })
      .catch((err) => console.log(err));
    }
    else{
      setErrors(validationErrors);
    }
  };

  // Handle form reset
  const handleReset = () => {
    setInputs(initialInputs);
  };

  const validateForm = (data) => {
    let errors = {};

    //validate names
    if ( !data.FirstName || data.FirstName.trim() === "") {
      errors.FirstName = "Please fill the fields";
    }
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Validate password
    if (!data.password || data.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
    return errors;
  };


  // Return the JSX content
  return (
    <center>
      <div className='container'>
        <div className='signup-form'>
          <h1 className="header-text">Create an Account</h1>
          <form>
            <div className="form-group">
              <label htmlFor="FirstName">First Name:</label>
              <input
                type="text"
                name="FirstName"
                className="input-text"
                placeholder="First Name"
                onChange={InputHandler}
                value={inputs.FirstName}
              />
              {errors.FisrtName && <p className="error">{errors.FirstName}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="lastname">Last Name:</label>
              <input
                type="text"
                name="lastname"
                className="input-text"
                placeholder="Last Name"
                onChange={InputHandler}
                value={inputs.lastname}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                className="input-text"
                placeholder="Email"
                onChange={InputHandler}
                value={inputs.email}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                name="username"
                className="input-text"
                placeholder="Username"
                onChange={InputHandler}
                value={inputs.username}
              />
              
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                className="input-text"
                placeholder="Password"
                onChange={InputHandler}
                value={inputs.password}
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <div className="form-group">
              <button type="reset" className="btn-primary-soft login-btn hover" onClick={handleReset} style={{ borderRadius: '10px' }}> 
                Reset
              </button>
              <button type="button" onClick={SaveData} className="btn-primary login-btn hover" style={{ borderRadius: '10px' }}>
                Sign Up
              </button>
            </div>

            <div className="form-group">
              <label className="sub-text">
                Already have an account?
                <a href="/" className="non-styled-link hover-link login-link">
                  Login
                </a>
              </label>
            </div>
          </form>
        </div>
      </div>
    </center>
  );
}

// Export the Signup component
export default Signup;