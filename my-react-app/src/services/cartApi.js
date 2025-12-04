import axios from "axios";

const BASE_URL = "http://localhost:4000/api/cart";

// Add an item to cart
export function addToCartAPI(payload) {
  return axios.post(`${BASE_URL}/add`, payload);
}

// Get all items for a specific user
export function getCartAPI(userId) {
  return axios.get(`${BASE_URL}/${userId}`);
}

// Delete an item from the cart
export function removeFromCartAPI(payload) {
  return axios.delete(`${BASE_URL}/remove`, { data: payload });
}

// Increase quantity by 1
export function incrementCartItemAPI(payload) {
  return axios.put(`${BASE_URL}/increment`, payload);
}

// Decrease quantity by 1
export function decrementCartItemAPI(payload) {
  return axios.put(`${BASE_URL}/decrement`, payload);
}