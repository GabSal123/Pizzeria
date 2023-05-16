import { useState, useEffect } from 'react';

const Orders = ({ selectedOrders, setSelectedOrders }) => {
  const [selectedPizzas, setSelectedPizzas] = useState([]);

  useEffect(() => {
    // Load selected pizzas from localStorage on component mount
    const savedPizzas = JSON.parse(localStorage.getItem('selectedOrders')) ?? [];
    setSelectedPizzas(savedPizzas);
  }, []);

  useEffect(() => {
    // Update selected pizzas when selectedOrders prop changes
    setSelectedPizzas(selectedOrders);
  }, [selectedOrders]);

  const deleteOrders = () => {
     // Clear selected orders and remove from localStorage
    setSelectedOrders([]);
    localStorage.removeItem('selectedOrders');
  };
    return (
    <div>
      <h2>Selected Pizzas:</h2>
      {selectedPizzas.length>0 && <button onClick={deleteOrders}>Delete Your Orders!</button>}
      <ul>
        {selectedPizzas.map((pizza) => (
          <li key={pizza.id}>
            
            <img src={`/Images/${pizza.imageTitle}`} alt={pizza.name} className="w-25" />
            <h3>{pizza.name}</h3>
            <p>Size: {pizza.size}</p>
            <p>Price: {pizza.price}</p>
            <p>Toppings: {pizza.toppings.join(', ')}</p>
          </li>

        ))}

      </ul>
    </div>
  );
};

export default Orders;
