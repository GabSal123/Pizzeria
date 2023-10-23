const baseUrl = "https://localhost:7201/api";

async function handleApiResponse(response) {
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export async function fetchPizzas() {
  try {
    const response = await fetch(`${baseUrl}/PizzaAPI`);
    return handleApiResponse(response);
  } catch (error) {
    throw new Error("Error fetching data: " + error.message);
  }
}

export async function createOrder(pizza, updatedPrice) {
  const url = `${baseUrl}/OrderAPI?name=${pizza.name}&price=${updatedPrice}&imageTitle=${pizza.imageTitle}`;
  try {
    const response = await fetch(url, {
      method: "POST",
    });
    return handleApiResponse(response);
  } catch (error) {
    throw new Error("Error creating order: " + error.message);
  }
}

export async function fetchSizes() {
  try {
    const response = await fetch(`${baseUrl}/SizeAPI`);
    return handleApiResponse(response);
  } catch (error) {
    throw new Error("Error fetching data: " + error.message);
  }
}

export async function fetchOrders() {
  try {
    const response = await fetch(`${baseUrl}/OrderAPI`);
    return handleApiResponse(response);
  } catch (error) {
    throw new Error("Error fetching orders: " + error.message);
  }
}

export async function removeOrder(orderId) {
  const url = `${baseUrl}/OrderAPI?id=${orderId}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });
    return handleApiResponse(response);
  } catch (error) {
    throw new Error("Error removing order: " + error.message);
  }
}
