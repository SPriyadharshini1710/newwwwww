import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as solidHeart,
  faBookmark as solidBookmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as regularHeart,
  faComment,
  faPaperPlane,
  faBookmark as regularBookmark,
} from "@fortawesome/free-regular-svg-icons";
import Sidebar from "./Sidebar";
import ChatSidebar from "../Chatsibar/Chatsibar";
import Explore from "./Explore";
import Header from "./Header";
import Footer from "./Footer";
import "./HomeFeed.css";

const dummyPosts = [
  { id: 1, user_name: "John Doe", profile_image: "/images/user_10.avif", image: "/post/post_1.jpg", description: "UI Flow chart example" },
  { id: 2, user_name: "Jane Smith", profile_image: "/images/user_9.avif", description: "Exploring the newest innovations in technology." },
  { id: 3, user_name: "Alex Brown", profile_image: "/images/user_11.avif", image: "/post/post_2.jfif", description: "Experience the hustle and bustle of urban life." },
];

const Post = ({ user_name, profile_image, image, description }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [showHeart, setShowHeart] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 800);
  };

  const handleComment = () => {
    if (commentText.trim() === "") return;
    setComments([...comments, commentText]);
    setCommentText("");
  };

  return (
    <div className="post-container">
      {/* User Info */}
      <div className="post-header">
        <img src={profile_image} alt={user_name} className="user-avatar" />
        <span className="user-name">{user_name}</span>
      </div>

      {/* Post Image or Text */}
      {image ? (
        <img src={image} alt="Post" className="post-image object-cover" onClick={() => setIsImageOpen(true)}/>
      ) : (
        <p className="post-text">{description}</p>
      )}

      {/* Animated Heart */}
      {showHeart && <img src="/images/Heart.gif" alt="Heart" className="heart-animation" />}

      <div className="post-actions flex justify-between items-center p-4">
        {/* Like Button */}
        <div className="like-container flex items-center space-x-2">
          <button onClick={handleLike} className="text-red-500 hover:scale-110 transition">
            {liked ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
            )}
          </button>
          <span>{likes}</span>
        </div>

        {/* Comment Button */}
        <div className="comment-container flex items-center space-x-2">
          <button onClick={() => setShowCommentBox(!showCommentBox)} className="text-blue-500 hover:scale-110 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 1.104-.896 2-2 2H7l-4 4V4c0-1.104.896-2 2-2h14c1.104 0 2 .896 2 2v8z" />
            </svg>
          </button>
          <span>{comments.length}</span>
        </div>

        {/* Share Button (Telegram) */}
        <button className="text-cyan-500 hover:scale-110 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M21.74 3.331a1.429 1.429 0 0 0-1.482-.272L2.063 9.458c-1.312.453-1.31 2.303.003 2.755l5.454 2.024 1.358 4.741c.342 1.197 1.872 1.497 2.672.457l2.651-3.497 4.154 2.518c1.192.723 2.688-.396 2.418-1.747l-2.522-12.46a1.42 1.42 0 0 0-.11-.418z" /></svg>
        </button>

        {/* Bookmark Button */}
        <button className="text-yellow-500 hover:scale-110 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 3a2 2 0 00-2 2v16l7-3 7 3V5a2 2 0 00-2-2H5z" />
          </svg>
        </button>
      </div>

      {/* Description with Hashtag Highlighting */}
      <p className="post-description">
        {description.split(/(#[a-zA-Z0-9_]+)/g).map((part, index) => (
          part.startsWith('#') ? <span key={index} className="text-purple-500 font-semibold">{part}</span> : part
        ))}
      </p>

      {/* Comment Section */}
      {showCommentBox && (
        <div className="comment-popup">
          <input
            type="text"
            className="comment-input"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button className="comment-btn" onClick={handleComment}>
            Post
          </button>

          {/* Display Comments */}
          {comments.map((comment, index) => (
            <p key={index}>{comment}</p>
          ))}
        </div>
      )}
         {/* Fullscreen Image Modal */}
        {isImageOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
            onClick={() => setIsImageOpen(false)}
          >
            <img
              src={image}
              alt="Expanded Post"
              className="max-w-full max-h-full transform scale-0 animate-zoom"
            />
          </div>
        )}
         {/* CSS for Animation */}
    <style>
      {`
        @keyframes zoom {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }
        .animate-zoom {
          animation: zoom 0.3s ease-in-out forwards;
        }
      `}
    </style>

    </div>
  
   

   
  );
};

const HomeFeed = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="home-container">
      <Header />
      <div className="content">
        <Explore />
        <div className="feed">
          {dummyPosts.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </div>
        {selectedUser ? (
          <ChatSidebar user={selectedUser} onBack={() => setSelectedUser(null)} />
        ) : (
          <Sidebar onSelectUser={setSelectedUser} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default HomeFeed;
