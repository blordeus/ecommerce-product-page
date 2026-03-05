// src/components/CartModal.js
import React from 'react';
import './CartModal.css';

const CartModal = ({ cart, removeItem, toggleCart }) => {
  return (
    <div className="cart-modal">
      <div className="cart-content">
        <h2 className="cart-title">Cart</h2>
        {cart.items.length === 0 ? (
          <p className="cart-empty">Your cart is empty.</p>
        ) : (
          <>
            {cart.items.map((item, index) => (
              <div key={index} className="cart-item">
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
            <button
              onClick={toggleCart}
              className="checkout-button"
            >
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;

// // src/components/CartModal.js
// import React from 'react';
// import './CartModal.css';

// const CartModal = ({ cart, removeItem, toggleCart }) => {
//   return (
//     <div className="cart-modal">
//       <div className="cart-content">
//         <h2 className="cart-title">Cart</h2>
//         {cart.items.length === 0 ? (
//           <p className="cart-empty">Your cart is empty.</p>
//         ) : (
//           <>
//             {cart.items.map((item, index) => (
//               <div key={index} className="cart-item">
//                 <img src={image1} alt={item.name} className="cart-item-image" />
//                 <div className="cart-item-details">
//                   <p className="cart-item-name">{item.name}</p>
//                   <p className="cart-item-price">
//                     ${item.price.toFixed(2)} x {item.quantity} <span className="total">${(item.price * item.quantity).toFixed(2)}</span>
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => removeItem(item.name)}
//                   className="remove-button"
//                   aria-label={`Remove ${item.name} from cart`}
//                 >
//                   <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg"><path d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z" fill="#C3CAD9" fillRule="evenodd"/></svg>
//                 </button>
//               </div>
//             ))}
//             <p className="cart-total">Total: <span>${cart.total.toFixed(2)}</span></p>
//             <button
//               onClick={toggleCart}
//               className="checkout-button"
//             >
//               Checkout
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CartModal;