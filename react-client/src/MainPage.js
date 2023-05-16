import React, { useEffect, useState } from "react";
const MainPage = ({ selectedOrders, setSelectedOrders }) => {
  const [pizzas, setPizzas] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedPizzas, setSelectedPizzas] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(null);

  useEffect(() => {
    // Fetches data when selectedOrders change
    getToppings();
    getPizzas();
    getSizes();
  }, [selectedOrders]);

  function getPizzas() {
    const url = "https://localhost:7201/api/PizzaAPI";

    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((pizzasFromServer) => {
        setPizzas(pizzasFromServer);
      })
      .catch((error) => {
        alert(error);
      });
  }

  function getToppings() {
    const url = "https://localhost:7201/api/ToppingsAPI";

    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((toppingsFromServer) => {
        console.log(toppingsFromServer);
        setToppings(toppingsFromServer);
      })
      .catch((error) => {
        alert(error);
      });
  }

  function getSizes() {
    const url = "https://localhost:7201/api/SizeAPI";

    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((sizesFromServer) => {
        console.log(sizesFromServer);
        setSizes(sizesFromServer);
      })
      .catch((error) => {
        alert(error);
      });
  }
  // Fetch the price from the server based on the selected size and toppings
  function fetchPrice(size, toppingsArray) {
    const url = `https://localhost:7201/api/SizeAPI/price?size=${encodeURIComponent(
      size
    )}${toppingsArray
      .map((topping) => `&toppings=${encodeURIComponent(topping)}`)
      .join("")}`;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error calculating price");
        }
      })
      .then((data) => {
        // Use the calculated price received from the API
        const calculatedPrice = data;
        // Create a new pizza object with properties needed
        const newPizza = {
          pizzaName: selectedPizzas[0].name, //Only one pizza can be selected at a time
          imageTitle: selectedPizzas[0].imageTitle,
          size: selectedSize,
          price: calculatedPrice,
          toppings: selectedToppings,
        };
        const updatedOrders = [...selectedOrders, newPizza]; // Add the new pizza to the existing orders

        setSelectedOrders(updatedOrders); // Update the selectedOrders state with the updated orders

        localStorage.setItem("selectedOrders", JSON.stringify(updatedOrders)); // Update the localStorage with the updated orders


        setSelectedPrice(calculatedPrice);
        //Cleans selected array when pizza is added to orders
        setSelectedPizzas([]);
      })
      .catch((error) => {
        console.error("Error fetching price:", error);
      });
  }

  return (
    <div className="container">
      <div className="row min-vh-100">
        <div className="col d-flex flex-column justify-content-center align-items-center">
          <div>
            <h1>APS.NET Core React</h1>
          </div>
          <div></div>
          <h4>Choose size</h4>
          {renderSizesInMainPage()}
          <h3>Price: {selectedPrice}</h3>
          {renderPizzasInMainPage()}
        </div>
      </div>
    </div>
  );
  function renderSizesInMainPage() {
    const handleSizeChange = (event) => {
      setSelectedSize(event.target.value);
    };

    return (
      <select value={selectedSize} onChange={handleSizeChange}>
        <option></option>
        {sizes.map((size) => (
          <option key={size.id} value={size.sizeOfPizza}>
            {size.sizeOfPizza}
          </option>
        ))}
      </select>
    );
  }

  function renderPizzasInMainPage() {
    const handleToppingChange = (event) => {
      const { value, checked } = event.target;

      // If the checkbox is checked, add the topping to the selectedToppings array
      if (checked) {
        setSelectedToppings((prevSelectedToppings) => [
          ...prevSelectedToppings,
          value,
        ]);
      } else {
        // If the checkbox is unchecked, remove the topping from the selectedToppings array
        setSelectedToppings((prevSelectedToppings) =>
          prevSelectedToppings.filter((topping) => topping !== value)
        );
      }
    };
    //Same as toppings
    const handlePizzaSelection = (event, pizza) => {
      const { checked } = event.target;

      if (checked) {
        setSelectedPizzas((prevSelectedPizzas) => [
          ...prevSelectedPizzas,
          pizza,
        ]);
      } else {
        setSelectedPizzas((prevSelectedPizzas) =>
          prevSelectedPizzas.filter((selectedPizza) => selectedPizza !== pizza)
        );
      }
      if (selectedPizzas.length === 1 && checked) {
        alert(
          "You should only select 1 pizza and then unselect if you want the other"
        );
      }
    };

    return (
      <div className="table-responsive mt-5">
        <table className="table table-border border-dark">
          <thead>
            <tr>
              <th scope="col">Pizzas!</th>
            </tr>
          </thead>
          <tbody>
            {pizzas.map((pizza, index) => (
              <tr key={pizza.id}>
                <input
                  type="checkbox"
                  onChange={(event) => handlePizzaSelection(event, pizza)}
                />

                <img
                  src={`/Images/${pizza.imageTitle}`}
                  className="w-25"
                  alt={pizza.name}
                />
                <br />
                <h3 className="mb-5">{pizza.name}</h3>
                {toppings.map((topping) => (
                  <div key={topping.id}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`toppingCheckbox-${topping.id}`}
                      value={topping.name}
                      checked={selectedToppings.includes(topping.name)}
                      onChange={handleToppingChange}
                    />
                    <label htmlFor={`toppingCheckbox-${topping.id}`}>
                      {topping.name}
                    </label>
                  </div>
                ))}
                <button
                  onClick={() => {
                    fetchPrice(selectedSize, selectedToppings);
                    console.log(selectedPizzas);
                  }}
                  type="button"
                  className="btn btn-secondary"
                >
                  Save Order!
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};
export default MainPage;
