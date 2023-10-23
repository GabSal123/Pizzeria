import React from "react";
import { useState, useEffect } from "react";

const Toppings = ({ sizePrice, updatePrice }) => {
  const [toppings, setToppings] = useState([]);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [price, setPrice] = useState(sizePrice);

  useEffect(() => {
    console.log(toppings);
    fetch("https://localhost:7201/api/ToppingsAPI")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setToppings(data);
        console.log(toppings);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleToppingChange = (topping) => {
    if (selectedToppings.includes(topping)) {
      setSelectedToppings((prevSelectedToppings) =>
        prevSelectedToppings.filter((item) => item !== topping)
      );
    } else {
      setSelectedToppings((prevSelectedToppings) => [
        ...prevSelectedToppings,
        topping,
      ]);
    }
  };

  useEffect(() => {
    console.log(toppings);
    fetch(
      `https://localhost:7201/api/PizzaAPI/price?sizePrice=${sizePrice}&toppingsCount=${selectedToppings.length}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPrice(data);
        updatePrice(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [selectedToppings, sizePrice]);

  return (
    <div>
      <h3>Select Toppings:</h3>
      <ul>
        {toppings.map((topping) => (
          <li key={topping.id}>
            <label>
              <input
                type="checkbox"
                value={topping.name}
                checked={selectedToppings.includes(topping.name)}
                onChange={() => handleToppingChange(topping.name)}
              />
              {topping.name}
            </label>
          </li>
        ))}
      </ul>
      <p>Selected Toppings: {selectedToppings.join(", ")}</p>
      <p>Price: {price}</p>
    </div>
  );
};

export default Toppings;
