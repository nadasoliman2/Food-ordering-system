import axios from "axios";

const BASE_URL = "http://localhost:4000/api/cart";

// ✅ POST /cart/add  → add to cart
export function addToCartAPI(payload) {
  return axios.post(`${BASE_URL}/add`, payload);
}

// ✅ GET /cart/:user_id → get cart items
export function getCartAPI(userId) {
  return axios.get(`${BASE_URL}/${userId}`);
}