// src/components/QuantitySelector.js
import React from 'react';
import './QuantitySelector.css';

const QuantitySelector = ({ quantity, setQuantity }) => {
  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => {
    if (quantity > 0) setQuantity((prev) => prev - 1);
  };

  return (
    <div className="quantity-selector">
      <button
        type="button"
        onClick={decrement}
        className="quantity-button"
        aria-label="Decrease quantity"
        disabled={quantity <= 0}
      >
        -
      </button>
      <span className="quantity" aria-live="polite">{quantity}</span>
      <button
        type="button"
        onClick={increment}
        className="quantity-button"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;