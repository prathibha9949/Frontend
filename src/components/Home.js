import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  return (
    <div className="container text-center my-5">
      {/* Big Banner Image */}
      <img
        src="C:\Users\kotta\Downloads\WhatsApp Image 2025-03-16 at 2.01.17 PM.jpeg"  // Replace with the actual image path
        alt="Banner"
        className="img-fluid"
        style={{ width: "100%", maxHeight: "500px", objectFit: "cover" }}
      />
      {/* Text below the image */}
      <div className="mt-4">
        <h1 className="fw-bold text-success">Welcome to Our Agriculture Platform</h1>
        <p className="text-muted">
          Connect, rent equipment, and innovate. Discover how we empower farmers and businesses.
        </p>
      </div>
    </div>
  );
};

export default Home;
