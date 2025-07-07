// src/components/Header.js
import React from 'react';
import { FaShoppingCart, FaBars } from 'react-icons/fa';
import avatar from '../assets/images/image-avatar.png'; // Adjust file name if different
import './Header.css';

const Header = ({ cartItems, toggleCart }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header>
    <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
        <FaBars />
      </button>
      <div className="logo">
       <h1>sneakers</h1>
       <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
        <button className="close-menu" onClick={toggleMenu} aria-label="Close menu">
          ×
        </button>
        <a href="#collections" className="nav-link" onClick={toggleMenu}>Collections</a>
        <a href="#men" className="nav-link" onClick={toggleMenu}>Men</a>
        <a href="#women" className="nav-link" onClick={toggleMenu}>Women</a>
        <a href="#about" className="nav-link" onClick={toggleMenu}>About</a>
        <a href="#contact" className="nav-link" onClick={toggleMenu}>Contact</a>
      </nav>
       </div>
       {isMenuOpen && <div className="overlay" onClick={closeMenu}></div>} 
      <div className="header-actions">
        <button
          onClick={toggleCart}
          className="cart-button"
          aria-label="View cart"
        >
          <FaShoppingCart className="cart-icon" />
          {totalItems > 0 && (
            <span className="cart-count">{totalItems}</span>
          )}
        </button>
        <img src={avatar} alt="User avatar" className="avatar" />
      </div>
    </header>
  );
};

export default Header;