// src/components/ProductsPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext"; // Adjust the path based on your folder structure
import ProductDetails from "./ProductDetails"; // Import the ProductDetails component
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirecting to the cart

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart(); // Get addToCart function from context
  const [selectedProduct, setSelectedProduct] = useState(null); // State to manage selected product for details view
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token"); // ✅ Get token from localStorage

        if (!token) {
          console.error("❌ No token found. User may not be authenticated.");
          return;
        }

        const response = await axios.get("http://localhost:5004/api/products", {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Include token for authentication
          },
        });

        if (response.data.success) {
          setProducts(response.data.products);
        } else {
          console.error("❌ Failed to fetch products:", response.data.message);
        }
      } catch (error) {
        console.error("❌ Error fetching products:", error);
      }
    };

    fetchProducts(); // Fetch products on component mount
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product); // Add product to cart
    alert(`${product.equipmentName} has been added to your cart!`); // Notify the user
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product); // Set the selected product for details view
  };

  const handleCloseDetails = () => {
    setSelectedProduct(null); // Close the product details modal
  };

  
  const handleEditProduct = (product) => {
    localStorage.setItem("selectedProduct", JSON.stringify(product)); // ✅ Store data
    navigate(`/update-product/${product._id}`); // ✅ Navigate
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const token = localStorage.getItem("token"); // ✅ Get token from localStorage
        if (!token) {
          console.error("❌ No token found. Cannot delete product.");
          return;
        }

        const response = await axios.delete(`http://localhost:5004/api/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Fix: Add "Bearer" prefix
          },
        });

        if (response.data.success) {
          // Update the product list by filtering out the deleted product
          setProducts(products.filter((product) => product._id !== productId));
          alert("Product deleted successfully!");
        } else {
          console.error("Failed to delete product:", response.data.message);
        }
      } catch (error) {
        console.error("❌ Error deleting product:", error);
      }
    }
  };

  return (
    <div>
      <h1>Products</h1>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary" onClick={() => navigate("/cart")}>
          View Cart
        </button>
      </div>
      <div className="row">
        {products.map((product) => (
          <div className="col-12 mb-4" key={product._id}>
            <div className="card shadow-sm">
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={`http://localhost:5004${product.photo}`} // Ensure correct image source
                    alt={product.equipmentName}
                    style={{ width: "100%", height: "200px", objectFit: "cover" }} // Adjust image size
                  />
                </div>
                <div className="col-md-8 d-flex flex-column justify-content-between">
                  <div className="card-body">
                    <h5 className="card-title">{product.equipmentName}</h5>
                    <p className="card-text">Rent: ₹{product.rent}</p>
                    <p className="card-text">Location: {product.place}</p>
                    <p className="card-text">Contact: {product.mobile}</p>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-warning me-2" onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </button>
                    <button className="btn btn-info me-2" onClick={() => handleViewDetails(product)}>
                      View
                    </button>
                    <button className="btn btn-danger me-2" onClick={() => handleDeleteProduct(product._id)}>
                      Delete
                    </button>
                    <button className="btn btn-primary" onClick={() => handleEditProduct(product)}>
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Product Details Modal */}
        {selectedProduct && (
          <ProductDetails product={selectedProduct} onClose={handleCloseDetails} />
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
