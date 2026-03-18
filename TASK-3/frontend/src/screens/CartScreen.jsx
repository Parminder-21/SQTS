import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartScreen = () => {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const checkoutHandler = () => {
    navigate('/login?redirect=/checkout');
  };

  return (
    <div className="grid grid-cols-3 animate-fade-in" style={{ gap: '2rem' }}>
      <div style={{ gridColumn: 'span 2' }}>
        <h1 style={{ marginBottom: '2rem' }}>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
            <h3 style={{ color: 'var(--text-secondary)' }}>Your cart is empty</h3>
            <Link to="/" className="btn btn-outline" style={{ marginTop: '1rem' }}>
              Go Back to Store
            </Link>
          </div>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item._id} className="glass-card flex-between" style={{ padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ width: '100px', height: '100px', overflow: 'hidden', borderRadius: '8px' }}>
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <Link to={`/product/${item._id}`} style={{ fontSize: '1.2rem', fontWeight: '600' }}>{item.name}</Link>
                </div>
                <div style={{ fontWeight: '800', fontSize: '1.2rem', color: 'var(--primary-color)' }}>₹{item.price.toLocaleString('en-IN')}</div>
                <div>
                  <select
                    style={{ width: '80px', padding: '0.5rem' }}
                    value={item.qty}
                    onChange={(e) => addToCart(item, Number(e.target.value))}
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <button className="btn btn-danger" onClick={() => removeFromCart(item._id)} style={{ padding: '0.8rem' }}>
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="glass-card" style={{ position: 'sticky', top: '100px' }}>
          <h2 style={{ borderBottom: '1px solid var(--surface-border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
            Order Summary
          </h2>
          <div className="flex-between" style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            <span>Items:</span>
            <span>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
          </div>
          <div className="flex-between" style={{ fontSize: '1.8rem', fontWeight: '800', margin: '1rem 0 2rem' }}>
            <span>Total:</span>
            <span style={{ color: 'var(--primary-color)' }}>
              ₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toLocaleString('en-IN')}
            </span>
          </div>
          <button
            className="btn btn-block"
            style={{ padding: '1rem', fontSize: '1.1rem' }}
            disabled={cartItems.length === 0}
            onClick={checkoutHandler}
          >
            Proceed To Checkout <i className="fas fa-arrow-right" style={{ marginLeft: '0.5rem' }}></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
