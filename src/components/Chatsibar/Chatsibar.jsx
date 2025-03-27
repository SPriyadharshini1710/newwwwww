import React, { useState } from "react";
import { FiArrowLeft, FiSend, FiUser, FiSmile } from "react-icons/fi";
import EmojiPicker from "emoji-picker-react";
import "./ChatSidebar.css";

const ChatSidebar = ({ user, onBack }) => {
  const [messages, setMessages] = useState([
    { sender: "Alice", text: "Hello!" },
    { sender: "You", text: "Hi, how are you?" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    setMessages([...messages, { sender: "You", text: newMessage }]);
    setNewMessage("");
  };

  const handleEmojiClick = (emoji) => {
    setNewMessage((prev) => prev + emoji.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="chat-sidebar">
      {/* Header */}
      <div className="chat-header">
        <FiArrowLeft className="back-icon" onClick={onBack} />
        <div className="user-avatar">
          {user.profile_image ? (
            <img src={user.profile_image} alt={user.name} />
          ) : (
            <FiUser className="default-avatar" />
          )}
        </div>
        <span className="user-name">{user.name}</span>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === "You" ? "message sent" : "message received"}>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        {/* Emoji Picker Toggle */}
        <FiSmile className="emoji-icon" onClick={() => setShowEmojiPicker(!showEmojiPicker)} />

        {/* Emoji Picker Component */}
        {showEmojiPicker && (
          <div className="emoji-picker">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}

        <FiSend className="send-icon" onClick={sendMessage} />
      </div>
    </div>
  );
};

export default ChatSidebar;
