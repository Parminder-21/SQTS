import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container flex-center">
        <p>Copyright &copy; E-Shop Pro {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
