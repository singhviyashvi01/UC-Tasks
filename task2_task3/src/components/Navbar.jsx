import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getMe } from '../api/auth'
import postsData from '../data/posts.json'
import Cookies from 'js-cookie'

const Navbar = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getMe();
        if (user) {
          setCurrentUser(user);
          localStorage.setItem("currentUserId", user._id || "current_user");
        }
      } catch (err) {
        console.error("Failed to fetch user in Navbar:", err);
      }
    };
    fetchUser();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const MAX_SIZE = 800; // compress image to fit within 800px box
          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Export as compressed JPEG to save localStorage space
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.6);
          setImage(compressedDataUrl);
          setImagePreview(compressedDataUrl);
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please select or upload an image!");
      return;
    }

    const currentUserId = localStorage.getItem("currentUserId") || (currentUser && currentUser._id) || "current_user";
    const newPost = {
      id: Date.now(),
      user_id: currentUserId,
      image: image,
      caption: caption,
      likes: 0,
      timestamp: "Just now",
      comments: []
    };

    // Get current posts list from localStorage, default to postsData
    const stored = localStorage.getItem("userPosts");
    const currentPosts = stored ? JSON.parse(stored) : postsData;

    // Identify and clean up massive base64 images from old posts to drastically reduce the 8.7MB payload
    const cleanedPosts = currentPosts.map(post => {
      // If a post has a base64 image larger than ~300KB (approx 400,000 chars), strip it
      if (post.image && typeof post.image === 'string' && post.image.startsWith('data:image') && post.image.length > 400000) {
        console.warn(`Stripping oversized image from old post: ${post.id}`);
        return { ...post, image: 'https://via.placeholder.com/800x800?text=Image+Removed+(Too+Large)' };
      }
      return post;
    });

    // Add new post to the top of the feed
    let updated = [newPost, ...cleanedPosts];

    try {
      // First, try to stringify to catch any circular references or JSON errors
      const stringifiedPayload = JSON.stringify(updated);
      const payloadSizeKb = (new Blob([stringifiedPayload]).size / 1024).toFixed(2);
      console.log(`Attempting to save post. Payload size: ${payloadSizeKb} KB`);

      // Prevent saving if payload is dangerously close to 5MB browser limits (4500 KB)
      if (payloadSizeKb > 4500) {
        alert(`Cannot save! The total data size (${payloadSizeKb} KB) exceeds the safe limit. Please clear your old posts.`);
        return;
      }

      localStorage.setItem("userPosts", stringifiedPayload);
      console.log("Post successfully saved to localStorage.");

    } catch (err) {
      console.error("🚨 CRITICAL SAVE ERROR 🚨", err);
      console.error("Error Name:", err.name);
      console.error("Error Message:", err.message);

      if (err instanceof TypeError) {
        alert("Failed to save post: JSON stringify error (possible circular reference). Check console for details.");
      } else if (err.name === 'QuotaExceededError' || err.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
        alert(`Storage limit exceeded. The payload size was ${err?.payloadSizeKb || 'unknown'} KB. Please check console for details.`);
      } else {
        alert(`Unexpected error saving post: ${err.message}`);
      }
      return; // Stop form submission
    }

    // Manually dispatch storage event so same-tab listeners (Profile) pick it up
    window.dispatchEvent(new StorageEvent("storage", { key: "userPosts" }));

    // Reset state
    setCaption('');
    setImage('');
    setImagePreview('');
    setShowCreate(false);

    // Always navigate to feed so the new post is instantly visible
    window.location.href = '/feed';
  };

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("currentUserId");
    window.location.href = '/';
  };

  return (
    <div className="navbar">
      <Link to="/" className="logo-link">
        <p className="h navlogo">AURA</p>
      </Link>

      <div className="btndiv">
        <Link to='/feed'><button className="navbtn" onClick={() => { window.location.href = '/feed' }}>🏡 Home</button></Link>
        <Link to='/discover'><button className="navbtn">🔎 Discover</button></Link>
        <Link to='/profile'><button className="navbtn" onClick={() => { window.location.href = '/profile' }}>👤 Profile</button></Link>
        <button className="navbtn add" onClick={() => setShowCreate(true)}>➕ Create Post</button>
        <button className="navbtn" onClick={handleLogout} style={{ backgroundColor: '#ffdaee', color: '#dc2626' }}>Logout</button>
      </div>

      {/* ── Create Post Modal ── */}
      {showCreate && (
        <div className="create-modal-overlay" onClick={() => setShowCreate(false)}>
          <div className="create-modal" onClick={e => e.stopPropagation()}>
            <p className="create-modal-title">Create New Post ✨</p>
            <form onSubmit={handleCreatePost}>

              <div className="file-upload-container">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input"
                  id="create-post-file"
                />
                <label htmlFor="create-post-file" className="add-image-btn">
                  📸 Add Image
                </label>
              </div>

              {imagePreview && (
                <div className="image-preview-container">
                  <img src={imagePreview} alt="Preview" className="post-image-preview" />
                </div>
              )}

              <textarea
                className="create-input create-textarea"
                placeholder="Add a caption..."
                value={caption}
                onChange={e => setCaption(e.target.value)}
              />

              <div className="create-modal-actions">
                <button type="button" className="create-cancel-btn" onClick={() => setShowCreate(false)}>Cancel</button>
                <button type="submit" className="create-submit-btn">Post</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar