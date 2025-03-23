// src/components/ProductDetails.js
import React from "react";

const ProductDetails = ({ product, onClose }) => {
  return (
    <div className="modal" style={modalStyle}>
      <div className="modal-content" style={modalContentStyle}>
        <span className="close" onClick={onClose} style={closeStyle}>&times;</span>
        <h2>{product.equipmentName}</h2>
        <img
          src={`http://localhost:5004${product.photo}`}
          alt={product.equipmentName}
          style={{ width: "100%", height: "auto", maxHeight: "200px" }} // Adjust image size
        />
        <p>Rent: ₹{product.rent}</p>
        <p>Location: {product.place}</p>
        <p>Contact: {product.mobile}</p>
      </div>
    </div>
  );
};

// Modal styles
const modalStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "fixed",
  zIndex: 1000,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  overflow: "auto",
  backgroundColor: "rgba(0,0,0,0.5)", // Black w/ opacity
};

const modalContentStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  border: "1px solid #888",
  borderRadius: "5px",
  width: "80%", // Set a smaller width for the modal
  maxWidth: "500px", // Set a maximum width for larger screens
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Optional: Add a shadow for depth
};

const closeStyle = {
  cursor: "pointer",
  float: "right",
  fontSize: "24px",
};

export default ProductDetails;
