import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const { register, userInfo } = useAuth();

  const redirectParam = location.search ? location.search.split('=')[1] : '/';
  const redirect = redirectParam.startsWith('/') ? redirectParam : `/${redirectParam}`;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      const result = await register(name, email, password);
      if(!result.success){
        setMessage(result.error);
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto' }}>
      <h1>Register</h1>
      {message && <div style={{ color: 'var(--danger-color)', marginBottom: '1rem' }}>{message}</div>}
      
      <form onSubmit={submitHandler} className="glass-card animate-fade-in">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            className="form-control"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-block">
          Register
        </button>
      </form>

      <div style={{ marginTop: '1rem' }}>
        Have an Account?{' '}
        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
          Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterScreen;
