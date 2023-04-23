

// import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext.js';

export const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const {login} = useContext(AuthContext);


  const handleChange = e => {
    setInputs((prev) => ({...prev, [e.target.name]: e.target.value}))
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs)
      navigate('/')
    } catch(err) {
      setErr(err.response.data)
    }
  }
  return (
    <div className='auth'>
      <Link className='goHomeLink' to="/"><span className='goHome'>&larr;</span></Link>
      <h1>Login</h1>
      <form>
        <input required type='text' placeholder='username' name='username' onChange={handleChange}/>
        <input required type='password' placeholder='password' name='password' onChange={handleChange}/>
        <button onClick={handleSubmit}>Login</button>
        {err && <p className='err-msg'>{err}</p>}
        <span>Don't you have an account? <Link to='/register'>Register</Link></span>
      </form>
    </div>
  )
}
