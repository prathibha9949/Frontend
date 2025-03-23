import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    speak("Please enter your email and password to login.");
    emailRef.current.focus();
  }, []);

  const speak = (text, lang = "en-US") => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log("🔹 Sending login request:", formData);
      const response = await axios.post("http://localhost:5004/api/auth/login", formData);
      console.log("🔹 Response from backend:", response.data.role);

      if (response.data?.success === true) {
      
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);

        speak("Login successful! Redirecting you now.");

        //const userRole = response.data.role.toLowerCase();
        const userRole = response.data.role ? response.data.role.toLowerCase() : null;

        console.log("🔹 User role received:", userRole);

        setTimeout(() => {
          switch (userRole) {
            case "seller":
              navigate("/add-product");
              break;
            case "buyer":
              navigate("/buyer-dashboard");
              break;
            case "admin":
              navigate("/admin-dashboard");
              break;
            default:
              navigate("/products");
          }
        }, 500);
      } else {
        console.log("❌ Backend returned failure:", response.data.message);
        setError(response.data.message || "Login failed. Check your credentials.");
        speak("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("❌ Login error:", error);
      setError("Login failed! Please check your credentials.");
      speak("Login failed! Please check your credentials.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow col-12 col-md-6 col-lg-4">
        <h3 className="text-center mb-3">Login</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control mb-3 rounded-pill"
              name="email"
              value={formData.email}
              onChange={handleChange}
              ref={emailRef}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control mb-3 rounded-pill"
              name="password"
              value={formData.password}
              onChange={handleChange}
              ref={passwordRef}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
