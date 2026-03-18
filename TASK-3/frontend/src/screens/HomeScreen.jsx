import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from '../components/Product';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/products');
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h3>{error}</h3>;

  return (
    <div className="animate-fade-in">
      <section className="hero">
        <h1>Discover Premium Tech</h1>
        <p>Experience the future with our curated selection of high-end electronics, gadgets, and accessories. Uncompromised quality.</p>
        <button className="btn" style={{ margin: '0 auto' }} onClick={() => window.scrollTo({ top: 500, behavior: 'smooth' })}>
          Shop Now <i className="fas fa-arrow-down" style={{ marginLeft: '0.5rem' }}></i>
        </button>
      </section>

      <h2 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Latest Products</h2>
      {products.length === 0 ? (
        <h3>No Products Found</h3>
      ) : (
        <div className="grid grid-cols-3">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
