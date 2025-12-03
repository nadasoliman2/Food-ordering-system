import axios from "axios";
const API = "http://localhost:4000/api";

// 📦 Get item details by restaurant and item name
export const getItemDetails = async (restaurantName, itemName) => {
  try {
    const response = await axios.get(
      `${API}/items/${restaurantName}/${itemName}`
    );
    return response;
  } catch (error) {
    console.error("Error fetching item details:", error);
    throw error;
  }
};