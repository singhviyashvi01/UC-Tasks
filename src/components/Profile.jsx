import React, { useState } from 'react'
import users from '../data/users.json'
import allposts from '../data/posts.json'
import Navbar from './Navbar'
import FullPost from './FullPost'

const Profile = () => {
  
const [clicked, setClicked] = useState(null)

  const user=users[1]
  const posts=allposts.filter(p=>p.user_id==user.user_id)

  if (clicked) {
    
    return <FullPost post={clicked.post} user={clicked.user} />
  }

  return (
    <div class="transition" >
      <Navbar/>
      <div className="profile">
         <div className="p1">
<div className="subp1"> 
    <img src={users[1].avatar} className="profimg"></img>
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
      {/* <img className="profposts" src={prof1}></img>
      <img className="profposts" src={prof2}></img>
      <img className="profposts" src={prof3}></img>
      <img  className="profposts" src={prof4}></img>
      <img className="profposts" src={prof5}></img>
      <img className="profposts" src={prof6}></img> */}

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