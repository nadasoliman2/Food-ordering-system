import axios from "axios";
const API = "http://localhost:4000/api";

export function deletepayment(userId, paymentID) {
  return axios.delete(`${API}/profile/${userId}/payments/${paymentID}`);
}
