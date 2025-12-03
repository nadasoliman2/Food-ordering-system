import axios from "axios";

const API = "http://localhost:4000/api";

// Fetch all restaurants
export const getRestaurants = async () => {
  try {
    const response = await axios.get(`${API}/restaurants`);
    return response;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};

// Search restaurants by keyword
export const searchRestaurants = async (query) => {
  try {
    const response = await axios.get(`${API}/restaurants/search?q=${query}`);
    return response;
  } catch (error) {
    console.error("Error searching restaurants:", error);
    throw error;
  }
};

