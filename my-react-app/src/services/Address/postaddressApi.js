import axios from "axios"; 
const API = "http://localhost:4000/api"; 

// body = { address, postal_code, city, country }
export function postaddress(userId, body) {
  return axios.post(`${API}/profile/${userId}/addresses`, body);
}
