import React from 'react'
import Navbar from './Navbar'
import user1 from '/assets/user1.jpeg';
import user2 from '/assets/user2.jpeg';
import user3 from '/assets/user3.jpeg';
import user4 from '/assets/user4.jpeg';
import user5 from '/assets/user5.jpeg';

const FullPost = ({post,user}) => {
    
    const userAvatars = {
        "695898438c93b05eaaa22ca9": user1,
        "69581ce9e10b3b60d09b2225": user2,
        "695130a6e19beb0f6163aebf": user3,
        "6909db84831c617a3d8b27cc":user4,
        "69528555ea0e4086cb1f09c4":user5,
      }

  return (

    <div class="transition">
 <Navbar/>

 <div className="w-full min-h-screen flex justify-center fullpost ">
 <div className="fullbox">
    
    <div className="userimgname"> 
<img className="userImg" src={userAvatars[user._id]}></img>
<p className="fullusername">@{user.name}</p>
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
<p className="text-lg font-extrabold">{user.name}</p>
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