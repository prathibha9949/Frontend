// src/components/ProductList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductDetails from "./ProductDetails"; // Import modal component

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5004/api/products")
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>All Products</h1>
      <div className="row">
        {products.map((product) => (
          <div
            className="col-md-6 mb-4"
            key={product._id}
            onClick={() => setSelectedProduct(product)} // Open modal on click
            style={{ cursor: "pointer" }}
          >
            <div className="card shadow-sm">
              <img
                src={`http://localhost:5004${product.photo}`}
                alt={product.equipmentName}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.equipmentName}</h5>
                <p>Rent: ₹{product.rent}</p>
                <p>Location: {product.place}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show Modal When a Product is Clicked */}
      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)} // Close modal
        />
      )}
    </div>
  );
};

export default ProductList;
