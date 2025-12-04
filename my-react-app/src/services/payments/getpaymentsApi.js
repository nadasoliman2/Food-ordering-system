
import axios from "axios"; 
const API = "http://localhost:4000/api"; 

export function getpayments(userId) {
  return axios.get(`${API}/profile/${userId}/payments`); 
}