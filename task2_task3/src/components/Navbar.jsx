import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
  
    <div className="navbar">

 <p className="h navlogo">AURA</p>
 <div className="btndiv">
<Link to='/feed'><button className="navbtn"  onClick={()=>{window.location.href='/feed'}}>🏡 Home</button></Link>
<Link to='/discover'><button  className="navbtn">🔎 Discover</button></Link> 
<Link to='/profile'><button  className="navbtn" onClick={()=>{window.location.href='/profile'}}>👤 Profile</button></Link>
<Link to='/'><button  className="navbtn add">➕ Add Account</button></Link>

 </div>



    </div>
  )
}

export default Navbar