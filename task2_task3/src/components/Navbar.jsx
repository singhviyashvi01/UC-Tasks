import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
  
    <div class="navbar">

 <p class="h navlogo">AURA</p>
 <div class="btndiv">
<Link to='/feed'><button class="navbtn"  onClick={()=>{window.location.href='/feed'}}>🏡 Home</button></Link>
<Link to='/discover'><button  class="navbtn">🔎 Discover</button></Link> 
<Link to='/profile'><button  class="navbtn" onClick={()=>{window.location.href='/profile'}}>👤 Profile</button></Link>
<Link to='/'><button  class="navbtn add">➕ Add Account</button></Link>

 </div>



    </div>
  )
}

export default Navbar