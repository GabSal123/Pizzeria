import React from "react";
import { useState, useEffect } from "react";
import PizzaDetail from "./PizzaDetail";
import { Link } from "react-router-dom";
import { fetchPizzas } from "../Services/pizzaService";
import "bootstrap/dist/css/bootstrap.min.css";

const MainPage = () => {
  const [pizzas, setPizzas] = useState([]);
  const [selectedPizza, setSelectedPizza] = useState(null);

  useEffect(() => {
    fetch("https://localhost:7201/api/PizzaAPI");
    fetchPizzas()
      .then((data) => {
        setPizzas(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handlePizzaClick = (pizza) => {
    setSelectedPizza(pizza);
  };

  const handleClosePopup = () => {
    setSelectedPizza(null);
  };

  return (
    <div className="container mt-4">
      <h1>Select Pizzas</h1>
      <Link to="/OrderPage">
        <button className="btn btn-primary mb-3">Your Orders</button>
      </Link>
      <div className="row">
        {pizzas.map((pizza) => (
          <div key={pizza.id} className="col-md-4">
            <div className="card mb-3">
              <img
                src={`/Images/${pizza.imageTitle}`}
                className="card-img-top"
                alt={pizza.name}
                height={300}
                onClick={() => handlePizzaClick(pizza)}
              />
              <div className="card-body">
                <h5 className="card-title">{pizza.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedPizza && (
        <PizzaDetail pizza={selectedPizza} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default MainPage;
