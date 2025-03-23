import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const speechRef = useRef(null);
  const typingTimeout = useRef(null);

  // Refs for input fields
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const roleRef = useRef(null);

  useEffect(() => {
    speakStep(1);
    nameRef.current.focus();
  }, []);

  const speak = (text, lang = "en-US") => {
    if (speechRef.current) window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const speakStep = (step) => {
    const messages = [
      "Please enter your username.",
      "Please enter your email.",
      "Please enter your password.",
      "Please confirm your password.",
      "Please select your role.",
    ];
    const translations = [
      "దయచేసి మీ వినియోగదారు పేరు నమోదు చేయండి.",
      "దయచేసి మీ ఇమెయిల్ నమోదు చేయండి.",
      "దయచేసి మీ పాస్‌వర్డ్ నమోదు చేయండి.",
      "దయచేసి మీ పాస్‌వర్డ్‌ను నిర్ధారించండి.",
      "దయచేసి మీ పాత్రను ఎంచుకోండి.",
    ];

    if (step <= messages.length) {
      setTimeout(() => speak(messages[step - 1]), 1000);
      setTimeout(() => speak(translations[step - 1], "te-IN"), 2500);
    }

    focusNextField(step);
  };

  const focusNextField = (step) => {
    setTimeout(() => {
      if (step === 1) nameRef.current.focus();
      else if (step === 2) emailRef.current.focus();
      else if (step === 3) passwordRef.current.focus();
      else if (step === 4) confirmPasswordRef.current.focus();
      else if (step === 5) roleRef.current.focus();
    }, 500);
  };

  const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      if (name === "email" && !validateEmail(value)) {
        speak("Invalid email format. Please enter a correct email.");
        speak("చెల్లుబాటు అయ్యే ఇమెయిల్‌ను నమోదు చేయండి.", "te-IN");
      }

      if (name === "confirmPassword" && formData.password !== value) {
        speak("Passwords do not match.");
        speak("పాస్‌వర్డ్‌లు సరిపోలడం లేదు.", "te-IN");
      }

      if (name === "username" && value) speakStep(2);
      if (name === "email" && validateEmail(value)) speakStep(3);
      if (name === "password" && value.length >= 6) speakStep(4);
      if (name === "confirmPassword" && value === formData.password) speakStep(5);
      if (name === "role" && value) speakStep(6);
    }, 1500);
  };

 
  
  
  const validateForm = () => {
    let newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!validateEmail(formData.email)) newErrors.email = "Invalid email format.";
    if (!formData.password) newErrors.password = "Password is required.";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters.";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm Password is required.";
    else if (formData.confirmPassword !== formData.password) newErrors.confirmPassword = "Passwords do not match.";
    if (!formData.role) newErrors.role = "Role selection is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      Object.values(errors).forEach((error) => {
        speak(error);
        speak(error, "te-IN");
      });
      return;
    }

    try {
      console.log("Submitting form", formData);
      const response = await axios.post("http://localhost:5004/api/auth/signup", formData);
      if (response.data.success) {
        speak("Signup successful! Redirecting to login...");
        speak("నమోదు విజయవంతమైంది! లాగిన్‌కు మళ్లించబడుతోంది...", "te-IN");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        speak("Signup failed. Try again.");
        speak("నమోదు విఫలమైంది. మళ్లీ ప్రయత్నించండి.", "te-IN");
      }
    } catch (error) {
      speak("Signup failed. Check your details.");
      speak("నమోదు విఫలమైంది. మీ వివరాలను తనిఖీ చేయండి.", "te-IN");
      console.error("Signup Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="border border-warning p-4 bg-white rounded shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Signup</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" className="form-control mb-3" name="username" value={formData.username} onChange={handleChange} ref={nameRef} placeholder="Username" />
          <input type="email" className="form-control mb-3" name="email" value={formData.email} onChange={handleChange} ref={emailRef} placeholder="Email" />
          <input type="password" className="form-control mb-3" name="password" value={formData.password} onChange={handleChange} ref={passwordRef} placeholder="Password" />
          <input type="password" className="form-control mb-3" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} ref={confirmPasswordRef} placeholder="Confirm Password" />
          <select className="form-control mb-3" name="role" value={formData.role} onChange={handleChange} ref={roleRef}>
            <option value="">Select Role</option>
            <option value="laborer">Laborer</option>
            <option value="admin">Admin</option>
            <option value="seller">Seller</option>
            <option value="buyer">Buyer</option>
          </select>
          <button type="submit" className="btn btn-success w-100">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
