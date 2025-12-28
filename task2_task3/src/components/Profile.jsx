import React, { useState,useEffect } from 'react'
// import users from '../data/users.json'
import allposts from '../data/posts.json'
import Navbar from './Navbar'
import FullPost from './FullPost'
import Cookies from "js-cookie"


const Profile = () => {
  
const [clicked, setClicked] = useState(null)

const [user, setUser] = useState(null);

const posts = user? allposts.filter(p => p.user_id === user.user_id): [];

  if (clicked) {
    
    return <FullPost post={clicked.post} user={clicked.user} />
  }

  useEffect(() => {
    const fetchMe = async () => {
      const token = Cookies.get("token");
  const res = await fetch(
        "https://task4-authdb.onrender.com/auth/me",
    { headers: {
            Authorization: `Bearer ${token}`,  //
          },
        });
const data = await res.json();
      setUser(data);
     }
   fetchMe();}, []);
  

  return (
    <div class="transition" >
      <Navbar/>
      <div className="profile">
         <div className="p1">
<div className="subp1"> 

<img src={user?.avatar || "https://i.pravatar.cc/150"} className="profimg"/>

    <button className="edit">Edit Profile</button>
</div>

<div className="sub2p1">
    <p className="text-3xl font-bold">{user.name}</p>
    <p className="text-xl">@{user.username}</p>
    <p className="text-sm">{user.bio}</p>
    <div className="fpcount">
      <button className="edit fp">895 followers</button>
      <button className="edit fp">568 following</button>
      <button className="edit fp">6 posts</button>
    </div>
</div>
    </div>
    <center><hr className="line profline"></hr></center>
    <div className="p2"> 

      {posts.map(post=>{
        return(
          <img className="profposts" src={post.image}
          onClick={()=>{ setClicked({post,user})}}
          />
        )
      }
    )
      }


    </div>
    </div>
    </div>
    
 
  )
}

export default Profile