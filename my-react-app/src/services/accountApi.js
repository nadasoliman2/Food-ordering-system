
import axios from "axios"; 
const API = "http://localhost:4000/api"; 

export function getaccount(userId) {
  return axios.get(`${API}/profile/${userId}/account`); 
}