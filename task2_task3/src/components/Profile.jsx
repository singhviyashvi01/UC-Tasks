import React, { useState, useEffect } from 'react'
import postsData from '../data/posts.json'
import Navbar from './Navbar'
import FullPost from './FullPost'
import { getMe } from '../api/auth'

const Profile = () => {

  const [clicked, setClicked] = useState(null);
  const [user, setUser] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [posts, setPosts] = useState([]);

  // Local profile overrides (editable by user)
  const [localProfile, setLocalProfile] = useState(() => ({
    username: localStorage.getItem("signupUsername") || localStorage.getItem("profileUsername") || "",
    name:     localStorage.getItem("signupName")     || localStorage.getItem("profileName")     || "",
    bio:      localStorage.getItem("profileBio")     || "",
    dob:      localStorage.getItem("profileDob")     || "",
    location: localStorage.getItem("profileLocation") || "",
  }));

  // Edit form state (initialised when modal opens)
  const [editForm, setEditForm] = useState({ ...localProfile });

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
    const fetchUser = async () => {
      try {
        const data = await getMe();
        if (data && data._id) {
          setUser(data);
          localStorage.setItem("currentUserId", data._id);
        } else {
          // API returned something unexpected — build a stub from localStorage
          const storedId = localStorage.getItem("currentUserId") || "current_user";
          setUser({ _id: storedId });
        }
      } catch (err) {
        // Network / 500 error — still show the profile using localStorage data
        const storedId = localStorage.getItem("currentUserId") || "current_user";
        setUser({ _id: storedId });
      }
      loadPosts();
    };
    fetchUser();

    // Re-load posts whenever localStorage changes (e.g. after Create Post)
    const onStorage = (e) => {
      if (e.key === "userPosts") loadPosts();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // When FullPost calls onClose, come back to Profile
  if (clicked) {
    return (
      <FullPost
        post={clicked.post}
        user={clicked.user}
        userIndex={clicked.userIndex}
        onClose={(updatedPost) => {
          if (updatedPost) {
            setPosts(prev => {
              const updated = prev.map(p => p.id === updatedPost.id ? updatedPost : p);
              localStorage.setItem("userPosts", JSON.stringify(updated));
              return updated;
            });
          }
          setClicked(null);
        }}
      />
    );
  }

  // Don't block render — user is initialised from localStorage even if API fails
  if (!user) return null;

  // Username priority: local edits > signup storage > API name
  const displayUsername = localProfile.username || user.username || user.name || "user";
  const displayName     = localProfile.name     || user.name     || displayUsername;
  const displayBio      = localProfile.bio      || user.bio      || "";
  const displayDob      = localProfile.dob;
  const displayLocation = localProfile.location;

  const currentUserId = localStorage.getItem("currentUserId") || user?._id || "current_user";
  // Show all posts (existing + newly created)
  const displayPosts = posts;

  const handleDeletePost = (e, postId) => {
    e.stopPropagation(); // Prevent opening the full post modal
    if (window.confirm("Are you sure you want to delete this post?")) {
      setPosts(prev => {
        const updated = prev.filter(p => p.id !== postId);
        localStorage.setItem("userPosts", JSON.stringify(updated));
        // Dispatch storage event so if the feed is open elsewhere, it updates
        window.dispatchEvent(new StorageEvent("storage", { key: "userPosts" }));
        return updated;
      });
    }
  };

  const openEdit = () => {
    setEditForm({ ...localProfile });
    setShowEdit(true);
  };

  const saveEdit = () => {
    localStorage.setItem("profileUsername", editForm.username);
    localStorage.setItem("profileName",     editForm.name);
    localStorage.setItem("profileBio",      editForm.bio);
    localStorage.setItem("profileDob",      editForm.dob);
    localStorage.setItem("profileLocation", editForm.location);
    setLocalProfile({ ...editForm });
    setShowEdit(false);
  };

  return (
    <div className="transition">
      <Navbar />

      {/* ── Edit Profile Modal ── */}
      {showEdit && (
        <div className="edit-modal-overlay" onClick={() => setShowEdit(false)}>
          <div className="edit-modal" onClick={e => e.stopPropagation()}>
            <p className="edit-modal-title">Edit Profile</p>

            <label className="edit-label">Username</label>
            <input className="edit-input" type="text" placeholder="@username"
              value={editForm.username}
              onChange={e => setEditForm(f => ({ ...f, username: e.target.value }))} />

            <label className="edit-label">Full Name</label>
            <input className="edit-input" type="text" placeholder="Full name"
              value={editForm.name}
              onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} />

            <label className="edit-label">Bio</label>
            <textarea className="edit-input edit-textarea" placeholder="Write a short bio…"
              value={editForm.bio}
              onChange={e => setEditForm(f => ({ ...f, bio: e.target.value }))} />

            <label className="edit-label">Date of Birth</label>
            <input className="edit-input" type="date"
              value={editForm.dob}
              onChange={e => setEditForm(f => ({ ...f, dob: e.target.value }))} />

            <label className="edit-label">Location</label>
            <input className="edit-input" type="text" placeholder="City, Country"
              value={editForm.location}
              onChange={e => setEditForm(f => ({ ...f, location: e.target.value }))} />

            <div className="edit-modal-actions">
              <button className="edit-cancel-btn" onClick={() => setShowEdit(false)}>Cancel</button>
              <button className="edit-save-btn"   onClick={saveEdit}>Save</button>
            </div>
          </div>
        </div>
      )}

      <div className="profile">
        <div className="p1">
          <div className="subp1">
            <img src="/assets/user2.jpeg" className="profimg" alt="Profile" />
            <button className="edit" onClick={openEdit}>Edit Profile</button>
          </div>

          <div className="sub2p1">
            <p className="text-xl font-bold">@{displayUsername}</p>
            {displayName && displayName !== displayUsername &&
              <p className="text-sm font-semibold">{displayName}</p>}
            {displayBio      && <p className="text-sm mt-1">{displayBio}</p>}
            {displayDob      && <p className="text-sm text-gray-500">🎂 {displayDob}</p>}
            {displayLocation && <p className="text-sm text-gray-500">📍 {displayLocation}</p>}
            <div className="fpcount">
              <button className="edit fp">895 followers</button>
              <button className="edit fp">568 following</button>
              <button className="edit fp">{displayPosts.length} posts</button>
            </div>
          </div>
        </div>

        <center><hr className="line profline" /></center>

        <div className="p2">
          {displayPosts.length > 0 ? (
            displayPosts.map((post, index) => (
              <div key={post.id || index} className="profile-post-wrapper">
                <img
                  className="profposts-img"
                  src={post.image}
                  alt={`Post ${index + 1}`}
                  onClick={() => setClicked({ post, user: { ...user, name: displayUsername }, userIndex: 1 })}
                />
                <button 
                  className="delete-post-btn" 
                  onClick={(e) => handleDeletePost(e, post.id)}
                  title="Delete Post"
                >
                  🗑️
                </button>
              </div>
            ))
          ) : (
            <div className="no-posts-container">
              <p className="no-posts-icon">📸</p>
              <p className="no-posts-text">No posts yet</p>
              <p className="no-posts-sub">Share your first photo using the 'Create Post' button above!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile