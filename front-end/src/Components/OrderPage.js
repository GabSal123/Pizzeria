import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchOrders } from "../Services/pizzaService";
import { removeOrder } from "../Services/pizzaService";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders()
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, [orders]);

  const handleRemove = async (order) => {
    try {
      await removeOrder(order.id);
      const copy = orders.filter((x) => x.id !== order.id);
      setOrders(copy);
    } catch (error) {
      console.error("Error removing order:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Orders</h1>
      <Link to="/MainPage">
        <button className="btn btn-primary mb-3">Back to Pizzas</button>
      </Link>
      <ul className="list-group">
        {orders.map((order) => (
          <li key={order.id} className="list-group-item">
            <div className="row">
              <div className="col-md-3">
                <img
                  src={`/Images/${order.imageTitle}`}
                  alt={order.name}
                  className="img-fluid"
                />
              </div>
              <div className="col-md-9">
                <h4>{order.name}</h4>
                <p>Price: {order.price.toFixed(2)}</p>
              </div>
              <div className="col-md-3">
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemove(order)}
                >
                  Remove Order
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderPage;
