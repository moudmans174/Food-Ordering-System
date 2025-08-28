import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {
  const url = 'http://localhost:4000';
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error('Failed to fetch list');
        console.error('API returned success: false');
      }
    } catch (error) {
      toast.error('Network error while fetching list');
      console.error('Axios error:', error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list">
      <h2>Food List</h2>
      {list.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <div className="food-grid">
          {list.map((item, index) => (
            <div className="food-card" key={index}>
              <img
                src={`${url}/uploads/${item.image}`}
                alt={item.name}
                className="food-image"
              />
              <h3>{item.name}</h3>
              <p className="category">{item.category}</p>
              <p className="price">${item.price}</p>
              <p className="description">{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default List;
