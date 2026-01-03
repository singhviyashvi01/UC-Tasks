import React, { useState,useEffect } from 'react'
import allposts from '../data/posts.json'
import Navbar from './Navbar'
import FullPost from './FullPost'
import Cookies from "js-cookie"
import { fetchMe } from '../api/auth'


const Profile = () => {
  
const [clicked, setClicked] = useState(null)

const [user, setUser] = useState(null);

const posts = allposts;

useEffect(() => {
  const getUser = async () => {
    const data = await fetchMe();
    
    setUser(data); 
  };
  getUser();
}, []);

  


if (clicked) {
    
    return <FullPost post={clicked.post} user={clicked.user} />
  }

  if (!user) return null;

  

  return (

    <div className="transition" >
      <Navbar/>
      <div className="profile">
         <div className="p1">
<div className="subp1"> 

<img src="/assets/user2.jpeg" className="profimg"/>

    <button className="edit">Edit Profile</button>
</div>

<div className="sub2p1">
    <p className="text-xl">@{user.name}</p>
    <p className="text-sm">{user.bio}</p>
    <div className="fpcount">
      <button className="edit fp">895 followers</button>
      <button className="edit fp">568 following</button>
      <button className="edit fp">10 posts</button>
    </div>
</div>
    </div>
    <center><hr className="line profline"></hr></center>
    <div className="p2">
  {posts.map((post, index) => {
    return (
      <img key={index} className="profposts" src={post.image}
        onClick={()=>setClicked({ post, user })} />
      );})}
</div>
    </div>
    </div>
    
 
  )
}

export default Profile