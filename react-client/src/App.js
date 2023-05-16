import React, { useEffect, useState } from "react";
import Orders from "./Orders";
import MainPage from "./MainPage";

export default function App() {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState("MainPage");
  const goToMainPage = () => setCurrentPage("MainPage");
  const goToOrdersPage = () => setCurrentPage("Orders");
  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem("selectedOrders")) || [];
    setSelectedOrders(savedOrders);
  }, []);
 // Update localStorage when selectedOrders state changes
  useEffect(() => {
    localStorage.setItem("selectedOrders", JSON.stringify(selectedOrders));
  }, [selectedOrders]);
  return (
    <div className="container">
      <div className="row min-vh-100">
        <div className="col d-flex flex-column justify-content-center align-items-center">
          <div>
            <h2>Welcome to the Pizza Shop!</h2>
          </div>
          <nav>
            <button onClick={goToMainPage}>Select Pizzas!</button>
            <button onClick={goToOrdersPage}>Your Orders!</button>
          </nav>
          {currentPage === "MainPage" && (
            <MainPage
              selectedOrders={selectedOrders}
              setSelectedOrders={setSelectedOrders}
            />
          )}
          {currentPage === "Orders" && (
            <Orders
              selectedOrders={selectedOrders}
              setSelectedOrders={setSelectedOrders}
            />
          )}
        </div>
      </div>
    </div>
  );
}
