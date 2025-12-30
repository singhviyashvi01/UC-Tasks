import React, { useState } from 'react'
import { registerUser } from "../api/auth"; //backend
import { useNavigate,Link } from 'react-router-dom'

const Signup = () => {

const navigate=useNavigate()
   
const emailRegex=/^[a-zA-Z0-9_]+[@][a-z]+[\.][a-z]{2,3}$/
const passRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/
const userRegex=/^[A-Za-z0-9_]{3,15}$/


const [username, setUsername] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [cpassword, setCpassword] = useState('')
const [name, setName] = useState('');
const [dob, setDob] = useState('');



const [emailError, setemailError] = useState('')
const [userError, setuserError] = useState('')
const [passwordError, setPasswordError] = useState('')
const [cPasswordError, setCPasswordError] = useState('')
const [emailValid, setemailValid] = useState('')
const [userValid, setuserValid] = useState('')
const [passwordValid, setPasswordValid] = useState('')
const [cPasswordValid, setCPasswordValid] = useState('')

const submitfn=async (e)=>{
e.preventDefault();
let v=1;

setuserError('')
setemailError('')
 setPasswordError('')
 setCPasswordError('')
 setemailValid('')
 setuserValid('')
 setPasswordValid('')
 setCPasswordValid('')



if(!emailRegex.test(email)){ 
    setemailError('Invalid Email Format')
v=0
}
if(!userRegex.test(username)){ 
    setuserError('Invalid Username:must be 3–15 chars,use letters/numbers/_ only')
v=0
}
if(!passRegex.test(password)){ 
    setPasswordError('Invalid password: must be min 8 chars and include atleast 1 uppercase, 1 number & 1 special char')
    v=0
}
if(password!=cpassword){ 
    setCPasswordError('Passwords do not match')
    v=0
}

if (v === 1) {
    const res = await registerUser({ //backend
        username: username,
        name: name,   
        email: email,
        password: password,
        
    });

if (res.error) {
        alert(res.error);
        return;
    }

alert("Registered successfully!");
    navigate("/login");
}



}



return (
    <div className='outerdiv od2 transition'>
    <div className='innerdiv'>
        <Link to='/'>
        <button class="back">
    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#30247f"><path d="M773.33-200v-157.33q0-56.67-37.66-94.34-37.67-37.66-94.34-37.66h-393L405-332.67l-47.67 47.34L120-522.67 357.33-760 405-712.67 248.33-556h393q84.34 0 141.5 57.17Q840-441.67 840-357.33V-200h-66.67Z"/></svg>
    </button>
        </Link>
   
        <p className='subheading'>Sign Up</p>
<form onSubmit={(e)=>{submitfn(e)}}>


<div className='divinput'>
<input 
  type="text" 
  placeholder="Full Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
</div>




<div className='divinput'>
<input type='text' value={email} placeholder='Email'
 onChange={(e)=>{
    setEmail(e.target.value)
    if(!emailRegex.test(e.target.value)){ 

        setemailError('Invalid Email Format')
        setemailValid('')
    }
    else{ 
        setemailValid('Valid✅')
        setemailError('')
    }
    }} />
 <p className='error'>{emailError}</p>
 <p className='valid'>{emailValid}</p>
</div>
<div className='divinput'>
<input type='text' value={username} placeholder='Username'
 onChange={(e)=>{
    setUsername(e.target.value)
    if(!userRegex.test(e.target.value)){ 
        setuserError('Invalid Username:must be 3 to 15 chars,use letters/numbers/_ only')
        setuserValid('')
    }
    else{
        setuserError('')
        setuserValid('Valid✅')

    }

 }} />
  <p className='error'>{userError}</p>
  <p className='valid'>{userValid}</p>

</div>
<div className='divinput'>
<input type='Password' value={password} placeholder='Password'
 onChange={(e)=>{
    setPassword(e.target.value)
    if(!passRegex.test(e.target.value)){ 
        setPasswordValid('')
        setPasswordError('Invalid password: must be min 8 chars and include atleast 1 uppercase, 1 number & 1 special char')
    }
    else{ 
        setPasswordValid('Valid✅')
        setPasswordError('')

    }
    }} />
 <p className='error'>{passwordError}</p>
 <p className='valid'>{passwordValid}</p>
</div>
 
<div className='divinput'>
<input type='Password' value={cpassword} placeholder='Confirm Password'
 onChange={(e)=>{setCpassword(e.target.value)
    if(password!=e.target.value){ 
        setCPasswordError('Passwords do not match')
        setCPasswordValid('')
    }
    else{ 
        setCPasswordValid('Matched✅')
        setCPasswordError('')

        
    }
 }} />
  <p className='error'>{cPasswordError}</p>
 <p className='valid'>{cPasswordValid}</p>
</div>
 

<button type='submit' class="signup">Sign Up</button>

</form>
    </div>
  <div className='innerdiv2 innerdiv' >
    <p className='subheading'>Log In</p>
    <div><p className='text-center'>Already have an account?</p><p>Sign in to your existing account.</p></div>
  <Link to='/login'> <button type='submit' className='border btn2 rounded-3xl'>Log In</button></Link>
    </div>  
    </div>
  )
}

export default Signup 