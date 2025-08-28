import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, decreaseFromCart } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const DELIVERY_FEE = 5.0;

  const subtotal = food_list.reduce((acc, item) => {
    const quantity = cartItems[item._id] || 0;
    return acc + item.price * quantity;
  }, 0);

  const total = subtotal + DELIVERY_FEE;

  const goToPlaceOrder = () => {
    navigate("/place-order");
  };

  return (
    <div className="cart">
      <h2>Menu Cart</h2>
      <div className="cart-items">
        <div className="cart-items-header">
          <p>Image</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Action</p>
        </div>
        <hr />
        {food_list.map((item) => {
          if (cartItems[item._id]) {
            return (
              <div className="cart-items-row" key={item._id}>
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
                <p>${item.price.toFixed(2)}</p>
                <p>{cartItems[item._id]}</p>
                <p>${(item.price * cartItems[item._id]).toFixed(2)}</p>
                <div className="remove-buttons">
                  <span onClick={() => decreaseFromCart(item._id)}>➖</span>
                  <span onClick={() => removeFromCart(item._id)}>❌</span>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="cart-summary">
        <h3>Order Summary</h3>
        <div className="summary-row">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Delivery Fee</span>
          <span>${DELIVERY_FEE.toFixed(2)}</span>
        </div>
        <hr />
        <div className="summary-row total">
          <strong>Total</strong>
          <strong>${total.toFixed(2)}</strong>
        </div>
        <button className="place-order-btn" onClick={goToPlaceOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
