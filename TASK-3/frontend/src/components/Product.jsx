import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  return (
    <div className="card product-card animate-fade-in">
      <Link to={`/product/${product._id}`}>
        <div className="product-image-container">
          <img src={product.image} alt={product.name} className="product-image" />
        </div>
      </Link>
      <div className="product-body">
        <Link to={`/product/${product._id}`}>
          <h3 className="product-title">{product.name}</h3>
        </Link>
        <div className="product-rating">
          <i className="fas fa-star"></i> {product.rating} ({product.numReviews} reviews)
        </div>
        <div className="product-price">
          ₹{product.price.toLocaleString('en-IN')}
        </div>
      </div>
    </div>
  );
};

export default Product;
