// src/App.js
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductGallery from './components/ProductGallery';
import ProductDetails from './components/ProductDetails';
import CartModal from './components/CartModal';
import './App.css';

const App = () => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (quantity, price, productName = 'Fall Limited Edition Sneakers') => {
    if (quantity < 1 || !Number.isInteger(quantity)) return;
    const existingItem = cart.items.find((item) => item.name === productName);
    let updatedItems;

    if (existingItem) {
      updatedItems = cart.items.map((item) =>
        item.name === productName
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedItems = [...cart.items, { name: productName, quantity, price }];
    }

    const newTotal = updatedItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

    setCart({ items: updatedItems, total: newTotal });
  };

  // remove item from cart by name and update total
  const removeItem = (name) => {
  setCart((prev) => {
    const nextItems = prev.items.filter((i) => i.name !== name);
    const total = nextItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    return { items: nextItems, total };
  });
};

  const toggleCart = () => setIsCartOpen((prev) => !prev);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem('cart'));
      if (savedCart && Array.isArray(savedCart.items)) {
        setCart(savedCart);
      }
    } catch (error) {
      console.error('Failed to load cart from local storage:', error);
    }
  }, []);

  return (
    <div className="app">
        <Header cartItems={cart.items} toggleCart={toggleCart} />
      <main className="main-container">
        <ProductGallery />
        <ProductDetails addToCart={addToCart} />
      </main>
      {isCartOpen && (
        <CartModal cart={cart} removeItem={removeItem} toggleCart={toggleCart} />
      )}
    </div>
  );
};

export default App;