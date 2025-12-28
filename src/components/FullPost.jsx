import React from 'react'
import Navbar from './Navbar'

const FullPost = ({post,user}) => {




  return (

    <div class="transition">
 <Navbar/>

 <div className="w-full min-h-screen flex justify-center fullpost ">
 <div className="fullbox">
    
    <div className="userimgname"> 
<img className="userImg" src={user.avatar}></img>
<p className="fullusername">{user.username}</p>
</div>

<div className="post">
<img className="postImg" src={post.image}></img>
</div>


<div class="likescomments">
    <p className="text-sm">❤️{post.likes} likes</p> 
    <p className="text-sm text-gray-400">
        {post.comments.length}comments
    </p>

</div>
<div className="utc">

<div className="usertimecaption">
<p className="text-lg font-extrabold">{user.username}</p>
<p>{post.caption}</p>
</div>
<p className="text-sm text-gray-400 pl-[3%]">{post.timestamp}</p>
</div>





<hr className="line"></hr>
<div className="comments">
    <p className="text-lg font-bold">Comments</p>
    { 
        post.comments.map((c)=>{ 
            return( 
                <p className="text-sm"><b className="text-sm">{c.user}</b> {c.text}</p>
            )
        })
    }
         <input className="commentbox" type="text" placeholder="add a comment"></input>
         <button className="commentpost" type="submit">Post</button>

   
     </div>
     
</div>

 </div>

 </div>
 


  )
}

export default FullPost