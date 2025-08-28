// StoreContext.jsx
import React, { createContext, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (id) => {
    setCartItems((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const decreaseFromCart = (id) => {
    setCartItems((prev) => {
      const currentQty = prev[id] || 0;
      if (currentQty <= 1) {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      }
      return {
        ...prev,
        [id]: currentQty - 1,
      };
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  return (
    <StoreContext.Provider
      value={{
        cartItems,
        addToCart,
        decreaseFromCart,
        removeFromCart,
        food_list,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
