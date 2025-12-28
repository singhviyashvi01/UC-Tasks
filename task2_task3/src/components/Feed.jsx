import React, { useEffect, useState } from 'react'
import usersData from '../data/users.json'
import postsData from '../data/posts.json'
import Navbar from './Navbar'
import FullPost from './FullPost'




const Feed = () => {

const [users, setUsers] = useState([])
const [posts, setPosts] = useState([])
const [clicked, setClicked] = useState(null)

useEffect(() => {

    setUsers(usersData)
    setPosts(postsData)
    console.log(posts)

}, [])

if(clicked){ 
  return(
    <FullPost 
    post={clicked.post}
    user={clicked.user} />
  )
}


const getUser=(p_user_id)=>{ 
return users.find((user)=>user.user_id==p_user_id)
}

return (

    <div class="transition">
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
  <img className="userImg"src={user.avatar}></img>
  <p><b>{user.username}</b></p>
</div>

<div className="post">
<img className="postImg" src={post.image}></img>
</div>
<div className="likescommentscaption">
<div class="likescomments"><p className="text-sm">❤️{post.likes} likes</p>
 <p className="text-sm text-gray-400">
 <span class="material-symbols-outlined">comment</span>
  {post.comments.length}
  </p></div>
<p>{post.caption}</p>
</div>

</div>

    
    </div>
  )
  

  }

  )
}

</div>
</div>






  )
}

export default Feed