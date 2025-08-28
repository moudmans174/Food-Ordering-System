// src/pages/placeorder/Placeorder.jsx
import React from "react";
import "./Placeorder.css";

const Placeorder = () => {
  return (
    <div className="placeorder">
      <h2>Place Your Order</h2>
      <div className="order-summary">
        <h3>Order Summary</h3>
        <div className="summary-row">
          <span>Items:</span>
          <span>Pizza x 2</span>
        </div>
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>$20.00</span>
        </div>
        <div className="summary-row">
          <span>Delivery Fee:</span>
          <span>$5.00</span>
        </div>
        <hr />
        <div className="summary-row total">
          <strong>Total:</strong>
          <strong>$25.00</strong>
        </div>
      </div>

      <div className="customer-info">
        <h3>Customer Information</h3>
        <form>
          <label htmlFor="name">Full Name:</label>
          <input type="text" id="name" placeholder="Enter your name" />

          <label htmlFor="address">Delivery Address:</label>
          <input type="text" id="address" placeholder="Enter Address" />

          <label htmlFor="phone">Phone Number:</label>
          <input type="text" id="phone" placeholder="Enter phone number" />

          <label htmlFor="payment">Payment Method:</label>
          <select id="payment">
            <option value="credit">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>

          <button type="submit" className="place-order-btn">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Placeorder;
