import React, { useEffect, useState } from 'react'
import postsData from '../data/posts.json'
import Navbar from './Navbar'
import FullPost from './FullPost'
import { getMe, getAllUsers } from '../api/auth'
import { useNavigate } from 'react-router-dom'
import user1 from '/assets/user1.jpeg';
import user2 from '/assets/user2.jpeg';
import user3 from '/assets/user3.jpeg';
import user4 from '/assets/user4.jpeg';
import user5 from '/assets/user5.jpeg';

const avatarList = [user1, user2, user3, user4, user5];

const Feed = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [clicked, setClicked] = useState(null);
  const [likedPosts, setLikedPosts] = useState(new Set());

  const loadPosts = () => {
    const storedPosts = localStorage.getItem("userPosts");
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    } else {
      localStorage.setItem("userPosts", JSON.stringify(postsData));
      setPosts(postsData);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = await getMe();
      setUser(currentUser);
      if (currentUser) {
        localStorage.setItem("currentUserId", currentUser._id || "current_user");
      }
      const allUsers = await getAllUsers();
      setUsers(allUsers || []);
      loadPosts();
    };
    fetchData();

    // Re-load posts when Navbar saves a new post in this tab
    const onStorage = (e) => {
      if (e.key === "userPosts") loadPosts();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  if (clicked) {
    const isCurrentlyLiked = likedPosts.has(clicked.post.id);
    return (
      <FullPost 
        post={clicked.post} 
        user={clicked.user} 
        userIndex={clicked.userIndex} 
        initialIsLiked={isCurrentlyLiked}
        onClose={(updatedPost, finalIsLiked) => {
          if (updatedPost) {
            setPosts(prev => {
              const updated = prev.map(p => p.id === updatedPost.id ? updatedPost : p);
              localStorage.setItem("userPosts", JSON.stringify(updated));
              return updated;
            });
            setLikedPosts(prev => {
              const copy = new Set(prev);
              if (finalIsLiked) {
                copy.add(updatedPost.id);
              } else {
                copy.delete(updatedPost.id);
              }
              return copy;
            });
          }
          setClicked(null);
        }}
      />
    );
  }

  const getUser = (p_user_id) => {
    const currentUserId = localStorage.getItem("currentUserId") || user?._id || "current_user";
    if (p_user_id === currentUserId) {
      const displayName = localStorage.getItem("signupUsername") || localStorage.getItem("profileUsername") || user?.username || user?.name || "user";
      return {
        _id: p_user_id,
        name: displayName,
        username: displayName,
        email: user?.email || ""
      };
    }
    return users.find((u) => u._id === p_user_id);
  };

  // Get up to 3 suggested users (not the current user)
  const suggestedUsers = users
    .filter((u) => u._id !== user?._id)
    .slice(0, 3);

  const toggleFeedLike = (postId) => {
    const isCurrentlyLiked = likedPosts.has(postId);
    setPosts(prev => {
      const updated = prev.map(p => {
        if (p.id === postId) {
          return { ...p, likes: isCurrentlyLiked ? p.likes - 1 : p.likes + 1 };
        }
        return p;
      });
      localStorage.setItem("userPosts", JSON.stringify(updated));
      return updated;
    });
    setLikedPosts(prev => {
      const copy = new Set(prev);
      if (isCurrentlyLiked) {
        copy.delete(postId);
      } else {
        copy.add(postId);
      }
      return copy;
    });
  };

  return (
    <div className="transition">
      <Navbar />
      
      {/* Suggestions sidebar */}
      {suggestedUsers.length > 0 && (
        <div className="suggestions-box">
          <p className="suggestions-title">Suggested for you 🕵🏻‍♂️</p>
          <div>
            {suggestedUsers.map((su, index) => {
              const userIndex = users.indexOf(su);
              const avatar = avatarList[userIndex % avatarList.length];
              return (
                <div className="suggestion-item" key={su._id || index}>
                  <img className="suggestion-avatar" src={avatar} alt={`User ${userIndex + 1}`} />
                  <div className="suggestion-info">
                    <p className="suggestion-name">User {userIndex + 1}</p>
                    <p className="suggestion-handle">@user{userIndex + 1}</p>
                  </div>
                  <button className="edit follow suggestion-follow">Follow</button>
                </div>
              );
            })}
          </div>
          <button className="show-more-btn" onClick={() => navigate('/discover')}>Show More</button>
        </div>
      )}

      <div className="feed">
        {posts.map((post, postIndex) => {
          const postUser = getUser(post.user_id);
          const currentUserId = localStorage.getItem("currentUserId") || user?._id || "current_user";
          const isCurrentUser = post.user_id === currentUserId;
          // Use user2.jpeg (index 1) for current user profile pic, otherwise fallback to index calculations
          const userIndex = isCurrentUser ? 1 : (postUser ? users.indexOf(postUser) : postIndex);
          const avatar = avatarList[userIndex % avatarList.length];
          const isFeedPostLiked = likedPosts.has(post.id);

          const displayUserHandle = isCurrentUser
            ? (localStorage.getItem("signupUsername") || localStorage.getItem("profileUsername") || user?.username || user?.name || "user")
            : `user${userIndex + 1}`;

          return (
            <div key={post.id}>
              <div className="feedbox" onClick={() => setClicked({ post, user: postUser, userIndex })}>

                <div className="userimgname">
                  <img className="userImg" src={avatar} alt={`User ${userIndex + 1}`} />
                  <p><b>@{displayUserHandle}</b></p>
                </div>

                <div className="post">
                  <img className="postImg" src={post.image} alt="post" />
                </div>

                <div className="likescommentscaption">
                  <div className="likescomments">
                    <p 
                      className="text-sm cursor-pointer hover:scale-105 transition-transform" 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFeedLike(post.id);
                      }}
                    >
                      {isFeedPostLiked ? '❤️' : '🤍'} {post.likes} likes
                    </p>
                    <p className="text-sm text-gray-400">
                      <span className="material-symbols-outlined">comment</span>
                      {post.comments.length}
                    </p>
                  </div>
                  <p>{post.caption}</p>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Feed