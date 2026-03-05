// src/components/CartModal.js
import React from "react";
import "./CartModal.css";

const money = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

const CartModal = ({ cart, removeItem, toggleCart }) => {
  return (
    <div className="cart-modal">
      <div className="cart-content">
        <h2 className="cart-title">Cart</h2>
        {cart.items.length === 0 ? (
          <p className="cart-empty">Your cart is empty.</p>
        ) : (
          <>
            {cart.items.map((item) => (
              <div key={item.name} className="cart-item">
                <p>{item.name}</p>
                <p>
                  ${item.price} x {item.quantity} = $
                  {(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeItem(item.name)}
                  className="remove-button"
                  aria-label={`Remove ${item.name} from cart`}
                >
                  Remove
                </button>
              </div>
            ))}
            <p className="cart-total">Total: ${cart.total.toFixed(2)}</p>
            <button onClick={toggleCart} className="checkout-button">
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;

