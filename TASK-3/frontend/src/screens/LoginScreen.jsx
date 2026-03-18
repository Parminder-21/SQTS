import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorHeader, setErrorHeader] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const { login, userInfo } = useAuth();

  const redirectParam = location.search ? location.search.split('=')[1] : '/';
  const redirect = redirectParam.startsWith('/') ? redirectParam : `/${redirectParam}`;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (!result.success) {
      setErrorHeader(result.error);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto' }}>
      <h1>Sign In</h1>
      {errorHeader && <div style={{ color: 'var(--danger-color)', marginBottom: '1rem' }}>{errorHeader}</div>}
      <form onSubmit={submitHandler} className="glass-card animate-fade-in">
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-block">
          Sign In
        </button>
      </form>

      <div style={{ marginTop: '1rem' }}>
        New Customer?{' '}
        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginScreen;
