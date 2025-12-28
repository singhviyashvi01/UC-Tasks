import React from 'react'
import Navbar from './Navbar'
import usersData from '../data/users.json'

const Discover = () => {

const disPeople=usersData.filter(u=>u.user_id!=2)


  return (
    <div class="transition">
      <Navbar/>
      <div className="discover">
<p className="text-3xl font-extrabold mb-5">People you may know🕵🏻‍♂️</p>
<div className="discover2">
{disPeople.map((frnd)=>{
  return(
    <div className="box"> 
  <img src={frnd.avatar} className="disimg"></img>
  <div className="disname"> 
    <div>
    <p className="font-bold">{frnd.name}</p>
    <p className="text-lg">@{frnd.username}</p>
    </div>
    <button className="edit follow">Follow</button>
  </div>
  </div>
  )

})}
</div>


      </div>
    </div>
  )
}

export default Discover