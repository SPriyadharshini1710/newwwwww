import React, { useState, useEffect } from "react";
import { FiUser } from "react-icons/fi";
import { FaBell } from "react-icons/fa";
import axios from "axios";
import "./Footer.css";
import { useNavigate } from "react-router-dom";
const API_URL = "http://127.0.0.1:7000/api/profile/?id=1"; // Replace '1' dynamically

const Footer = () => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null);

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(API_URL);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error.response?.data || error.message);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="footer">
      {/* Profile Section */}
      <div 
        className="relative inline-block group"
        onMouseEnter={() => setShowProfile(true)} 
        onMouseLeave={() => setShowProfile(false)}
      >
        <div className="flex items-center gap-2 px-2 py-1 bg-white rounded-full border-2 border-red-400 shadow-md transition-transform duration-300 cursor-pointer hover:-translate-y-1">
          {user?.profile_image ? (
            <img src={user.profile_image} alt="User Profile" className="w-10 h-10 rounded-full object-cover border-2 border-red-400" />
          ) : (
            <FiUser className="w-10 h-10 text-gray-600" />
          )}
          <span className="font-bold text-gray-800 text-sm">
            {user ? `${user.first_name} ${user.last_name}` : "Guest User"}
          </span>
        </div>


        {/* Profile Hover Card */}
        {showProfile && (
          <div className="absolute bottom-[60px] left-1/2 -translate-x-1/2 w-48 bg-gray-400/50 backdrop-blur-md p-4 rounded-lg text-center shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
            {user?.profile_image ? (
              <img src={user.profile_image} alt="User Profile" className="w-14 h-14 rounded-full mx-auto border-2 border-white" />
            ) : (
              <img src="/images/user_5.png" alt="User Profile" className="w-14 h-14 rounded-full mx-auto border-2 border-white" />
            )}
            <h4 className="mt-2 text-gray-900 font-bold">{user?.first_name} {user?.last_name}</h4>

            <div className="flex flex-col items-center space-y-2">
              <button
                className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 
                          text-white text-sm py-1.5 px-5 rounded-full 
                          transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
                onClick={() => navigate("/profile")}
              >
                Profile
              </button>

              <button
                className="bg-gradient-to-r from-pink-400 to-red-500 hover:from-red-500 hover:to-red-600 
                          text-white text-sm py-1.5 px-5 rounded-full 
                          transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
              >
              Logout
              </button>
            </div>



          </div>
        )}
      </div>

      {/* Notifications */}
      <div className="header-icons">
        <div className="notification">
          <FaBell className="bell-icon" />
          <span className="notification-count">3</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
