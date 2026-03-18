import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AdminScreen = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    } else {
      // Dummy fetch for admin products right now
      const fetchProducts = async () => {
        const dummyProducts = [
          {
            _id: '1',
            name: 'Airpods Wireless Bluetooth Headphones',
            price: 89.99,
            category: 'Electronics',
            brand: 'Apple',
          },
          {
            _id: '2',
            name: 'iPhone 13 Pro 256GB Memory',
            price: 1099.99,
            category: 'Electronics',
            brand: 'Apple',
          },
        ];
        setProducts(dummyProducts);
      };
      fetchProducts();
    }
  }, [userInfo, navigate]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      alert(`Deleted product ${id} (Simulation)`);
      setProducts(products.filter(p => p._id !== id));
    }
  };

  const createProductHandler = () => {
    alert('Create product simulated');
  };

  return (
    <div>
      <div className="flex-between">
        <h1>Products</h1>
        <button className="btn" onClick={createProductHandler}>
          <i className="fas fa-plus"></i> Create Product
        </button>
      </div>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', backgroundColor: '#fff', boxShadow: 'var(--box-shadow)' }}>
        <thead>
          <tr style={{ backgroundColor: 'var(--primary-color)', color: '#fff', textAlign: 'left' }}>
            <th style={{ padding: '1rem' }}>ID</th>
            <th style={{ padding: '1rem' }}>NAME</th>
            <th style={{ padding: '1rem' }}>PRICE</th>
            <th style={{ padding: '1rem' }}>CATEGORY</th>
            <th style={{ padding: '1rem' }}>BRAND</th>
            <th style={{ padding: '1rem' }}></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '1rem' }}>{product._id}</td>
              <td style={{ padding: '1rem' }}>{product.name}</td>
              <td style={{ padding: '1rem' }}>₹{product.price}</td>
              <td style={{ padding: '1rem' }}>{product.category}</td>
              <td style={{ padding: '1rem' }}>{product.brand}</td>
              <td style={{ padding: '1rem' }}>
                <button className="btn" style={{ marginRight: '0.5rem', background: 'var(--secondary-color)' }}>
                  <i className="fas fa-edit"></i>
                </button>
                <button className="btn btn-danger" onClick={() => deleteHandler(product._id)}>
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminScreen;
