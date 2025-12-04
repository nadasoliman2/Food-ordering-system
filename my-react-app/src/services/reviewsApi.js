import axios from "axios";

const BASE_URL = "http://localhost:4000/api";

// ⭐ Get all reviews for specific item
export const fetchReviews = async (restaurantName, itemName) => {
  try {
    const encoded = encodeURIComponent(itemName);
    const url = `${BASE_URL}/reviews/${restaurantName}/${encoded}`;
    console.log("Fetching reviews from:", url);

    const res = await axios.get(url);
    console.log("Reviews response:", res.data);

    return res.data.data;
  } catch (error) {
    console.error(
      "Fetch reviews error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// ⭐ Add new review
export const addReview = async ({
  user_id,
  restaurant_name,
  item_name,
  rating,
  review,
}) => {
  try {
    const url = `${BASE_URL}/reviews/add`;
    console.log("Adding review to:", url);

    const res = await axios.post(url, {
      user_id,
      restaurant_name,
      item_name,
      rating,
      review,
    });

    console.log("Add review response:", res.data);
    return res.data;
  } catch (error) {
    console.error("Add review error:", error.response?.data || error.message);
    throw error;
  }
};
