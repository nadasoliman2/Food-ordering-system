// في ملف services/profileorder.js (أو حيثما توجد الدالة)

import axios from "axios"; 
const API = "http://localhost:4000/api"; 

export function getOrderProfile(userId) {
  // **تمت إزالة المسافة هنا**
  return axios.get(`${API}/profile/${userId}/orders`); 
  // الصيغة الصحيحة: /api/profile/1/orders
}