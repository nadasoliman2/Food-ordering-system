import axios from "axios"; 
const API = "http://localhost:4000/api"; 

// body: بيانات البطاقة أو PayPal
export function postpayments(userId, body) {
  return axios.post(`${API}/profile/${userId}/payments`, body); 
}
