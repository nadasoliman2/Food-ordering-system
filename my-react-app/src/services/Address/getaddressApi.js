
import axios from "axios"; 
const API = "http://localhost:4000/api"; 

export function getaddress(userId) {
  // **تمت إزالة المسافة هنا**
  return axios.get(`${API}/profile/${userId}/addresses`); 
  // الصيغة الصحيحة: /api/profile/1/orders
}