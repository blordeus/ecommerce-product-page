// src/App.js
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ProductGallery from "./components/ProductGallery";
import ProductDetails from "./components/ProductDetails";
import CartModal from "./components/CartModal";
import "./App.css";

const App = () => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen((prev) => !prev);

  // add
  const addToCart = (
    quantity,
    price,
    productName = "Fall Limited Edition Sneakers",
  ) => {
    
    setCart((prev) => {
      const existing = prev.items.find((i) => i.name === productName);
      const nextItems = existing
        ? prev.items.map((i) =>
            i.name === productName
              ? { ...i, quantity: i.quantity + quantity }
              : i,
          )
        : [...prev.items, { name: productName, price, quantity }];

      const total = nextItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
      return { items: nextItems, total };
    });
  };

  // remove item from cart by name and update total
  const removeItem = (name) => {
    setCart((prev) => {
      const nextItems = prev.items.filter((i) => i.name !== name);
      const total = nextItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
      return { items: nextItems, total };
    });
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem("cart"));
      if (savedCart && Array.isArray(savedCart.items)) {
        setCart(savedCart);
      }
    } catch (error) {
      console.error("Failed to load cart from local storage:", error);
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
        <CartModal
          cart={cart}
          removeItem={removeItem}
          toggleCart={toggleCart}
        />
      )}
    </div>
  );
};

export default App;
