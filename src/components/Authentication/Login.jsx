import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
const API_URL = "http://127.0.0.1:7000/api"; // Django API URL

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${API_URL}/login/`, { email, password });
      localStorage.setItem("token", response.data.token);
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };


  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
            <div className="input-group">
                <label>Password:</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={isPasswordVisible ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  onClick={togglePasswordVisibility}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                  }}
                >
                  {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-button">Login</button>
        </form>

        <div className="login-footer">
          {/* <Link to="/forgot-password">Forgot Password?</Link> |  */}
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
