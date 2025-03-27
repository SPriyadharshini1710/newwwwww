import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import axios from "axios";
import "./Header.scss";

const dummyUsers = [
  { id: 1, name: "Alice", profile_image: "/images/user_9.avif" },
  { id: 2, name: "Bob", profile_image: "/images/user_3.png" },
  { id: 3, name: "Charlie", profile_image: "/images/user_10.avif" },
  { id: 4, name: "David", profile_image: "/images/user_4.png" },
  { id: 5, name: "Ravi", profile_image: "/images/user_11.avif" },
  { id: 6, name: "Uma", profile_image: "/images/user_2.png" },
  { id: 7, name: "Prdeep", profile_image: "/images/user_1.png" },
  { id: 8, name: "Prdeep", profile_image: "/images/user_5.png" },
  { id: 9, name: "Prdeep", profile_image: "/images/user_2.png" },
  { id: 10, name: "Prdeep", profile_image: "/images/user_6.jpg" },
  { id: 11, name: "Prdeep", profile_image: "/images/user_7.jpg" },
  { id: 12, name: "Prdeep", profile_image: "/images/user_8.jpg" },
  { id: 13, name: "Prdeep", profile_image: "/images/user_9.avif" },
  { id: 14, name: "Prdeep", profile_image: "/images/user_10.avif" },
  { id: 15, name: "Prdeep", profile_image: "/images/user_11.avif" },
  { id: 16, name: "Prdeep", profile_image: "/images/user_1.png" },
  { id: 17, name: "Prdeep", profile_image: "/images/user_1.png" },
  { id: 15, name: "Prdeep", profile_image: "/images/user_1.png" },
  { id: 16, name: "Prdeep", profile_image: "/images/user_1.png" },
  { id: 17, name: "Prdeep", profile_image: "/images/user_1.png" },
];

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:7000/api/profile/?id=1");
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error.response?.data || error.message);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="header-content">
      <h1 className="logo">
        So
        <span className="text-gradient">C</span>
        <span className="text-gradient">i</span>
        al Med
        <span className="text-gradient">i</span>
        a
      </h1>


      {/* Stories Section */}
      <div className="stories-wrapper">
        <div className="stories-container">
          {/* User's Profile Story (with + icon) */}
          <div className="story user-story">
            <div className="story-border">
              {user?.profile_image ? (
                <img src={user.profile_image} alt="User" className="story-image" />
              ) : (
                <FiUser className="story-icon" />
              )}
            </div>
            <FaPlus className="add-icon" />
          </div>

          {/* Dummy Stories */}
          {dummyUsers.map((user) => (
            <div key={user.id} className="story">
              <div className="avatar-online">
                <img src={user.profile_image} alt={user.name} className="story-image" />
              </div>
            </div>
          ))}
        </div>
      </div>

      
    </div>
  );
};

export default Header;
