import axios from "axios";
const API = "http://localhost:4000/api";

// body = { address, postal_code, city, country }
export function deleteaddress(userId, addressId) {
  return axios.delete(`${API}/profile/${userId}/addresses/${addressId}`);
}
