import React from "react";
import { useState, useEffect } from "react";
import Toppings from "./Toppings";
import { createOrder, fetchSizes } from "../Services/pizzaService";
import {
  modalStyle,
  contentStyle,
  closeButtonStyle,
} from "../Styles/pizzaDetailStyle";

const PizzaDetail = ({ pizza, onClose }) => {
  const [sizes, setSizes] = useState([]);
  const [price, setPrice] = useState(0);
  const [sizeSelected, setSizeSelected] = useState(false);
  const [updatedPrice, setUpdatedPrice] = useState(0);

  const handleSelectOrder = () => {
    createOrder(pizza, updatedPrice).catch((error) => {
      console.error("Error creating order:", error);
    });

    onClose();
  };

  const handleSizeClick = (size) => {
    setPrice(size.price);
    setSizeSelected(true);
  };

  useEffect(() => {
    console.log(sizes);
    fetchSizes()
      .then((data) => {
        setSizes(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div style={modalStyle}>
      <div style={contentStyle} className="p-3">
        <button
          style={closeButtonStyle}
          onClick={onClose}
          className="btn btn-link text-danger"
        >
          Close
        </button>
        <h2 className="mb-3">{pizza.name}</h2>
        <img
          src={`/Images/${pizza.imageTitle}`}
          width="50"
          height="50"
          alt={pizza.name}
          className="img-fluid rounded-circle mb-3"
        />
        <p>Select pizza size:</p>
        <ul className="list-group">
          {sizes.map((size) => (
            <li key={size.id} className="list-group-item">
              <button
                onClick={() => handleSizeClick(size)}
                className={`btn btn-${
                  price === size.price ? "primary" : "light"
                } btn-block`}
              >
                {size.size}
              </button>
            </li>
          ))}
        </ul>
        <Toppings sizePrice={price} updatePrice={setUpdatedPrice} />
        <div className="mt-3">
          <button
            disabled={!sizeSelected}
            onClick={handleSelectOrder}
            className="btn btn-success btn-block"
          >
            Select Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaDetail;
