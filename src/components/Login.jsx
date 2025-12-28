import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { loginUser } from "../api/auth";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";//instead of link using useNavigate


const Login = () => {

    const navigate = useNavigate();


    const [email, setEmail] = useState('')
const [password, setPassword] = useState('')


const submitfn = async (e) => {
    e.preventDefault();
    const res = await loginUser({ email, password });
    if (res.token) {
      Cookies.set("token", res.token);
      navigate("/feed");
    } else {
      alert( "Login failed");
    }
  };

  return (
    <div className='outerdiv transition'>
<div className='innerdiv'>
<Link to='/'>
<button class="back">
    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#30247f"><path d="M773.33-200v-157.33q0-56.67-37.66-94.34-37.67-37.66-94.34-37.66h-393L405-332.67l-47.67 47.34L120-522.67 357.33-760 405-712.67 248.33-556h393q84.34 0 141.5 57.17Q840-441.67 840-357.33V-200h-66.67Z"/></svg>
    </button>
</Link>


    <p className='subheading'>Log in</p>
<form className='form' onSubmit={(e)=>{submitfn(e)}}>
<div> 
<input 
type='text' 
value={email}
placeholder='Email' 
onChange={(e)=>{
    setEmail(e.target.value)
    
}}>
</input>
</div>
<div>
<input 
type='password' 
value={password} 
onChange={(e)=>{
    setPassword(e.target.value)
}}
placeholder='Password'
>
</input>
</div>

<a href="#">Forgot Password?</a>

<button type='submit' class="signup">Login</button>
</form>
    </div>
    <div className='innerdiv innerdiv2 h-20 text-white'>
        <p className='subheading'>Create Account</p>
        <p >Don't have an account? Sign Up to create one!</p>
        <Link to='/signup'> <button type='submit' className='btn2 border rounded-3xl '>Sign Up</button></Link>
       </div>
    </div>
  )
}

export default Login