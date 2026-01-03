import React, { useEffect, useState } from 'react'
// import usersData from '../data/users.json'
import postsData from '../data/posts.json'
import Navbar from './Navbar'
import FullPost from './FullPost'
import Cookies from 'js-cookie';
import { getMe,getAllUsers } from '../api/auth'
import user1 from '/assets/user1.jpeg';
import user2 from '/assets/user2.jpeg';
import user3 from '/assets/user3.jpeg';
import user4 from '/assets/user4.jpeg';
import user5 from '/assets/user5.jpeg';


const Feed = () => {



const [user, setUser] = useState(null);
const [users, setUsers] = useState([])
const [posts, setPosts] = useState([])
const [clicked, setClicked] = useState(null)

const userAvatars = {
  "695898438c93b05eaaa22ca9": user1,
  "69581ce9e10b3b60d09b2225": user2,
  "695130a6e19beb0f6163aebf": user3,
  "6909db84831c617a3d8b27cc":user4,
  "69528555ea0e4086cb1f09c4":user5,
}

useEffect(() => {
  const fetchData = async () => {
    const currentUser = await getMe();
    setUser(currentUser); 
    const allUsers = await getAllUsers();
    setUsers(allUsers);
  setPosts(postsData); 
  };

  fetchData();

  // setUsers(usersData); 
  // setPosts(postsData); 
}, []);

if(clicked){ 
  return(
    <FullPost 
    post={clicked.post}
    user={clicked.user} />
  )
}


const getUser=(p_user_id)=>{ 
return users.find((user)=>user._id==p_user_id)
}

return (


    <div className="transition">
<Navbar/>

<div className="feed"
>

{
posts.map((post)=>{
  const user=getUser(post.user_id)

  return (
    <div>
      
      <div className="feedbox"
      onClick={()=>setClicked({post,user})}>

<div className="userimgname"> 
    <img className="userImg"src={userAvatars[user._id]}></img>
  <p><b>@{user.name}</b></p>
</div>

<div className="post">
<img className="postImg" src={post.image}></img>
</div>
<div className="likescommentscaption">
<div class="likescomments"><p className="text-sm">❤️{post.likes} likes</p>
 <p className="text-sm text-gray-400">
 <span className="material-symbols-outlined">comment</span>
  {post.comments.length}
  </p></div>
<p>{post.caption}</p>
</div>

</div>

    
    </div>
  )} )
}

</div>
</div>






  )
}

export default Feed