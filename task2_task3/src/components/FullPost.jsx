import React, { useState } from 'react'
import Navbar from './Navbar'
import user1 from '/assets/user1.jpeg';
import user2 from '/assets/user2.jpeg';
import user3 from '/assets/user3.jpeg';
import user4 from '/assets/user4.jpeg';
import user5 from '/assets/user5.jpeg';

const avatarList = [user1, user2, user3, user4, user5];

const FullPost = ({post, user, userIndex, initialIsLiked = false, onClose}) => {
  const [localPost, setLocalPost] = useState(post);
  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(initialIsLiked);
    
  const displayName = userIndex !== undefined ? `User ${userIndex + 1}` : (user?.name || localStorage.getItem("loginEmail") || "User");
  const displayUsername = userIndex !== undefined ? `user${userIndex + 1}` : (user?.name || localStorage.getItem("loginEmail") || "user");
  const avatar = userIndex !== undefined ? avatarList[userIndex % avatarList.length] : (user?.avatar || user2);

  const handleLike = () => {
    if (isLiked) {
      setLocalPost(prev => ({ ...prev, likes: prev.likes - 1 }));
      setIsLiked(false);
    } else {
      setLocalPost(prev => ({ ...prev, likes: prev.likes + 1 }));
      setIsLiked(true);
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const currentUserName = localStorage.getItem("loginEmail")?.split('@')[0] || "you";
    const newComment = {
      user: currentUserName,
      text: commentText
    };
    setLocalPost(prev => ({
      ...prev,
      comments: [...prev.comments, newComment]
    }));
    setCommentText('');
  };

  return (
    <div className="transition">
      <Navbar/>
      <div className="w-full min-h-screen flex justify-center fullpost">
        <div className="fullbox">
          {/* Back button inside the box */}
          <button className="close-btn" onClick={() => onClose && onClose(localPost, isLiked)}>
            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#30247f">
              <path d="M773.33-200v-157.33q0-56.67-37.66-94.34-37.67-37.66-94.34-37.66h-393L405-332.67l-47.67 47.34L120-522.67 357.33-760 405-712.67 248.33-556h393q84.34 0 141.5 57.17Q840-441.67 840-357.33V-200h-66.67Z"/>
            </svg>
          </button>

          <div className="userimgname"> 
            <img className="userImg" src={avatar} alt={displayName}></img>
            <p className="fullusername">@{displayUsername}</p>
          </div>

          <div className="post">
            <img className="postImg" src={localPost.image} alt="post"></img>
          </div>

          <div className="likescomments">
            <p className="text-sm cursor-pointer hover:scale-110 transition-transform" onClick={handleLike}>
              {isLiked ? '❤️' : '🤍'} {localPost.likes} likes
            </p> 
            <p className="text-sm text-gray-400">
              {localPost.comments.length} comments
            </p>
          </div>
          
          <div className="utc">
            <div className="usertimecaption">
              <p className="text-lg font-extrabold">{displayName}</p>
              <p>{localPost.caption}</p>
            </div>
            <p className="text-sm text-gray-400 pl-[3%]">{localPost.timestamp}</p>
          </div>

          <hr className="line"></hr>
          <div className="comments">
            <p className="text-lg font-bold">Comments</p>
            <div className="max-h-48 overflow-y-auto mb-4">
              { 
                localPost.comments.map((c, i)=>{ 
                  return( 
                    <p className="text-sm my-1" key={i}><b className="text-sm">{c.user}</b> {c.text}</p>
                  )
                })
              }
            </div>
            <form onSubmit={handleAddComment} className="flex flex-row gap-2 w-full px-0">
              <input 
                className="commentbox flex-grow" 
                type="text" 
                placeholder="add a comment"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button className="commentpost" type="submit">Post</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FullPost