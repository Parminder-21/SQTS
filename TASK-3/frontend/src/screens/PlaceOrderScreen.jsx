import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const PlaceOrderScreen = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  // Calculate prices
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  const placeOrderHandler = () => {
    // In a full app, this would hit the backend POST /api/orders
    alert('Order Placed Successfully! (Simulation)');
    clearCart();
    navigate('/');
  };

  return (
    <div className="grid grid-cols-3">
      <div style={{ gridColumn: 'span 2' }}>
        <h1>Order Review</h1>
        
        <div className="card" style={{ marginBottom: '1rem' }}>
          <h2>Shipping</h2>
          <p>
            <strong>Address: </strong>
            123 Main St, Springfield, IL, 62701, USA
            <br />
            <em>(Simulated from previous step)</em>
          </p>
        </div>

        <div className="card" style={{ marginBottom: '1rem' }}>
          <h2>Payment Method</h2>
          <strong>Method: </strong> PayPal / Credit Card
        </div>

        <div className="card">
          <h2>Order Items</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <div>
              {cartItems.map((item, index) => (
                <div key={index} className="flex-between" style={{ borderBottom: '1px solid #eee', padding: '0.5rem 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img src={item.image} alt={item.name} style={{ width: '40px', borderRadius: '4px' }} />
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </div>
                  <div>
                    {item.qty} x ₹{item.price.toLocaleString('en-IN')} = ₹{(item.qty * item.price).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <div className="card">
          <h2>Order Summary</h2>
          
          <div className="flex-between" style={{ borderBottom: '1px solid #eee', padding: '0.5rem 0' }}>
            <span>Items</span>
            <span>₹{itemsPrice.toLocaleString('en-IN')}</span>
          </div>
          
          <div className="flex-between" style={{ borderBottom: '1px solid #eee', padding: '0.5rem 0' }}>
            <span>Shipping</span>
            <span>₹{shippingPrice.toLocaleString('en-IN')}</span>
          </div>

          <div className="flex-between" style={{ borderBottom: '1px solid #eee', padding: '0.5rem 0' }}>
            <span>Tax</span>
            <span>₹{taxPrice.toLocaleString('en-IN')}</span>
          </div>

          <div className="flex-between" style={{ padding: '1rem 0', fontWeight: 'bold', fontSize: '1.2rem' }}>
            <span>Total</span>
            <span>₹{totalPrice.toLocaleString('en-IN')}</span>
          </div>

          <button
            className="btn btn-block"
            disabled={cartItems === 0}
            onClick={placeOrderHandler}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
