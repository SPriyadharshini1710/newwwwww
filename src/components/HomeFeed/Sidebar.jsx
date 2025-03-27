import React, { useState } from "react";
import { FiSearch, FiUser } from "react-icons/fi";
import "./Sidebar.css";

const users = [
  { id: 1, name: "Alice", lastMessage: "Hey, how are you?", profile_image: "/images/user_10.avif" },
  { id: 2, name: "Bob", lastMessage: "See you tomorrow!", profile_image: "/images/user_11.avif" },
  { id: 3, name: "Charlie", lastMessage: "", profile_image: "/images/user_5.png" },
  { id: 4, name: "David", lastMessage: "Let's catch up later.", profile_image: "/images/user_3.png" },
];

const Sidebar = ({ onSelectUser }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter users based on search
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="sidebar">
      {/* Search Bar */}
      <div className="search-container">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search user..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* User List */}
      <ul className="user-list">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <li key={user.id} className="user-item" onClick={() => onSelectUser(user)}>
              <div className="user-avatar">
                {user.profile_image ? (
                  <img src={user.profile_image} alt={user.name} />
                ) : (
                  <FiUser className="default-avatar" />
                )}
              </div>
              <div className="user-info">
                <span className="user-name">{user.name}</span>
                <span className="last-message">
                  {user.lastMessage || <i>No messages yet</i>}
                </span>
              </div>
            </li>
          ))
        ) : (
          <li className="no-users">No users found</li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
