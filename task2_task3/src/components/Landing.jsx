import React from 'react'
import {Link} from 'react-router-dom'
const Landing = () => {
  

  return (
    <div class="full transition">
        <div class="main">

        <div class="landingBox">
 
 <p className="h">AURA</p>
 <p class="tag">
 You bring the vibe.We frame it.
 </p>
 <div> 
 <Link to ='/login'><button type="submut">Login</button></Link> 
 <Link to ='/signup'><button type="submit">Signup</button></Link> 
 </div>
      </div>

      <div class="hero"></div>

        </div>
      
  
    </div>
  )
}

export default Landing