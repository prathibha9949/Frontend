// src/components/Cart.js
import React from "react";
import { useCart } from "../context/CartContext"; // Import cart context

const Cart = () => {
  const { cart, removeFromCart } = useCart(); // Get cart data from context

  return (
    <div>
      <h1>Your Cart</h1>
      <div className="row">
        {cart.length > 0 ? (
          cart.map((product) => (
            <div className="col-md-6 mb-4" key={product._id}>
              <div className="card shadow-sm">
                <img
                  src={`http://localhost:5004${product.photo}`}
                  alt={product.equipmentName}
                  style={{ width: "350px", height: "140px", objectFit: "cover", borderRadius: "8px"}}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.equipmentName}</h5>
                  <p>Rent: ₹{product.rent}</p>
                  <p>Location: {product.place}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeFromCart(product._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
