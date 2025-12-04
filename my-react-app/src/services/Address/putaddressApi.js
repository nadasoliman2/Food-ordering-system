import axios from "axios";
const API = "http://localhost:4000/api";

// body = { address, postal_code, city, country }
export function putddress(userId, addressId, body) {
  return axios.put(`${API}/profile/${userId}/addresses/${addressId}`, body);
}
