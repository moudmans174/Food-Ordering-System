import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Add = () => {
  const url = 'http://localhost:4000';

  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Salad'
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!image) {
      toast.error("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('category', data.category);
    formData.append('image', image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setData({
          name: '',
          description: '',
          price: '',
          category: 'Salad'
        });
        setImage(null);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Error submitting form");
      console.error("Submission error:", error);
    }
  };

  return (
    <div className='add'>
      <ToastContainer />
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor='image'>
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt='Upload Preview'
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type='file'
            id='image'
            hidden
            required
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type='text'
            name='name'
            placeholder='Type Here'
            required
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name='description'
            rows="6"
            placeholder='Write content here'
            required
          />
        </div>

        <div className='add-category-pice'>
          <div className="add-category flex-col">
            <p>Product category</p>
            <select
              onChange={onChangeHandler}
              name='category'
              value={data.category}
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type='number'
              name='price'
              placeholder='$20'
              required
            />
          </div>
        </div>

        <button type='submit' className='add-btn'>Add</button>
      </form>
    </div>
  );
};

export default Add;
