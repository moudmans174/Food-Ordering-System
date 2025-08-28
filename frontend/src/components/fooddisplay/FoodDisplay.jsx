import React, { useContext } from "react";
import "./fooddisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../fooditem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  if (!food_list || food_list.length === 0) {
    return <p>Loading menu...</p>;
  }

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (category === "ALL" || category === item.category) {
            return (
              <FoodItem
                key={item._id || index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
