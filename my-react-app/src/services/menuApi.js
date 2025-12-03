import axios from "axios";

const API = "http://localhost:4000/api";

// 📋 Get a restaurant’s full menu by restaurant name
export const getRestaurantMenu = async (restaurantName) => {
  try {
    const response = await axios.get(`${API}/restaurants/${restaurantName}/menu`);
    return response;
  } catch (error) {
    console.error("Error fetching restaurant menu:", error);
    throw error;
  }
};

// 🔎 Search menu items inside a specific restaurant
export const searchRestaurantItems = async (restaurantName, query) => {
  try {
    const response = await axios.get(
      `${API}/restaurants/${restaurantName}/search-items?q=${query}`
    );
    return response;
  } catch (error) {
    console.error("Error searching restaurant items:", error);
    throw error;
  }
};