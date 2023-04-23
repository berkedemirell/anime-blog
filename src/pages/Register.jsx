
import { Link, useNavigate } from 'react-router-dom'
import React from 'react'
import { useState } from 'react';
import axios from 'axios';

export const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleChange = e => {
    setInputs((prev) => ({...prev, [e.target.name]: e.target.value}))
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", inputs);
      navigate('/login')
    } catch(err) {
      setErr(err.response.data)
    }
  }

  return (
    <div>
      <div className='auth'>
      <Link className='goHomeLink' to="/"><span className='goHome'>&larr;</span></Link>
      <h1>Register</h1>
      <form>
        <input required type='text' placeholder='username' name='username' onChange={handleChange}/>
        <input required type='email' placeholder='email' name='email' onChange={handleChange}/>
        <input required type='password' placeholder='password' name='password' onChange={handleChange}/>
        <button onClick={handleSubmit}>Register</button>
        {err && <p className='err-msg'>{err}</p>}
        <span>Do you have an account? <Link to='/login'>Login</Link></span>
      </form>
    </div>
    </div>
  )
}
