import axios from "axios";

const BASE_URL = "http://localhost:4000/api/cart";

// Add an item to cart
export function addToCartAPI(payload) {
  return axios.post(`${BASE_URL}/add`, payload);
}

// Get all items for specific user
export function getCartAPI(userId) {
  return axios.get(`${BASE_URL}/${userId}`);
}

// Delete an item from the cart entirely
export function removeFromCartAPI(payload) {
  // axios lets us supply a request body for DELETE using {data: ...}
  return axios.delete(`${BASE_URL}/remove`, { data: payload });
}

// PUT /cart/increment
export function incrementCartItemAPI(payload) {
  return axios.put(`${BASE_URL}/increment`, payload);
}

// PUT /cart/decrement
export function decrementCartItemAPI(payload) {
  return axios.put(`${BASE_URL}/decrement`, payload);
}