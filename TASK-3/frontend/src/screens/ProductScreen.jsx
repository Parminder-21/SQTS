import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';


const ProductScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    addToCart(product, qty);
    navigate(`/cart`);
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h3>{error}</h3>;
  if (!product.name) return <h2>Product not found</h2>;

  return (
    <div className="animate-fade-in">
      <Link className="btn btn-outline" to="/" style={{ marginBottom: '2rem' }}>
        <i className="fas fa-arrow-left" style={{ marginRight: '0.5rem' }}></i> Back to Products
      </Link>
      <div className="grid grid-cols-2" style={{ gap: '3rem' }}>
        <div className="product-image-container" style={{ borderRadius: 'var(--border-radius-lg)', height: '100%', minHeight: '400px' }}>
          <img src={product.image} alt={product.name} className="product-image" />
        </div>
        
        <div className="glass-card" style={{ padding: '2.5rem', margin: 0 }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{product.name}</h2>
          
          <div style={{ margin: '1rem 0', fontSize: '2rem', fontWeight: '800', color: 'var(--primary-color)' }}>
            ₹{product.price.toLocaleString('en-IN')}
          </div>

          <p style={{ marginBottom: '2rem', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>{product.description}</p>
          
          <div style={{ padding: '1.5rem', background: 'var(--bg-color)', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--surface-border)' }}>
            <div className="flex-between" style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--surface-border)', marginBottom: '1rem' }}>
              <strong>Status:</strong>
              <span style={{ color: product.countInStock > 0 ? 'var(--success-color)' : 'var(--danger-color)', fontWeight: 'bold' }}>
                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            
            {product.countInStock > 0 && (
              <div className="flex-between" style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--surface-border)', marginBottom: '1.5rem' }}>
                <strong>Qty:</strong>
                <select 
                  style={{ width: '100px' }}
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            <button 
              className="btn btn-block" 
              style={{ padding: '1rem', fontSize: '1.1rem' }}
              disabled={product.countInStock === 0}
              onClick={addToCartHandler}
            >
              <i className="fas fa-shopping-cart"></i> Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
