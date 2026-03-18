import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
const Header = () => {
  const { cartItems } = useCart();
  const { userInfo, logout } = useAuth();
  
  return (
    <header className="header">
      <div className="container flex-between">
        <div className="logo">
          <Link to="/">
            <h2><i className="fas fa-shopping-bag" style={{ color: 'var(--primary-color)', marginRight: '0.5rem' }}></i>E-Shop Pro</h2>
          </Link>
        </div>
        <nav className="nav-links">
          <Link to="/cart">
            <i className="fas fa-shopping-cart"></i> Cart
            {cartItems.length > 0 && (
              <span className="cart-badge">
                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
              </span>
            )}
          </Link>
          {userInfo ? (
            <div style={{ display: 'inline-flex', alignItems: 'center', marginLeft: '1.5rem', cursor: 'pointer', color: '#fff', fontWeight: 500 }}>
              <i className="fas fa-user"></i>&nbsp;{userInfo.name}
              {userInfo.isAdmin && (
                <Link to="/admin" style={{ marginLeft: '1rem', color: 'var(--secondary-color)', fontSize: '0.9rem' }}>
                  Admin Dashboard
                </Link>
              )}
              <span onClick={logout} style={{ marginLeft: '1rem', color: 'var(--light-color)', fontSize: '0.9rem', cursor: 'pointer' }}>(Logout)</span>
            </div>
          ) : (
            <Link to="/login"><i className="fas fa-user"></i> Sign In</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
