// services/profileorder.js
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const API = "http://localhost:4000/api";

export function useOrderProfileService() {
  const { token } = useContext(AuthContext);

  const getOrderProfile = () => {
    return axios.get(`${API}/profile/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return { getOrderProfile };
}
