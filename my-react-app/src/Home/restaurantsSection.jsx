// src/sections/RestaurantsSection.jsx
import { useEffect, useState } from "react";
import RestaurantHomeCard from "../Components/restaurantHomeCard";
import { getRestaurants } from "../services/restaurantApi"; // ✅ import the API call
import "bootstrap/dist/css/bootstrap.min.css";

export default function RestaurantsSection() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all restaurants from API when component mounts
  useEffect(() => {
    async function fetchRestaurants() {
      try {
        setLoading(true);
        const res = await getRestaurants();
        console.log("Restaurants API Response:", res.data);
        setRestaurants(res.data.data.restaurants || []);
      } catch (err) {
        console.error("Error fetching restaurants:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchRestaurants();
  }, []);

  return (
    <section className="food-category-carousel py-5">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <h2 className="fw-bold">Explore Restaurants</h2>
          <p className="text-muted">
            Start Discovering A Lot Of Special Restaurants
          </p>
        </div>

        {/* Carousel */}
        {loading ? (
          <p className="text-center text-muted py-4">Loading restaurants...</p>
        ) : restaurants.length === 0 ? (
          <p className="text-center text-muted py-4">
            No restaurants found.
          </p>
        ) : (
          <div className="position-relative d-flex align-items-center" style={{justifyContent:"center"}}>
            <div className="d-flex flex-nowrap overflow-auto py-3">
              {restaurants.map((restaurant, index) => (
                <RestaurantHomeCard
                  key={index}
                  name={restaurant.restaurant_name}
                  image={
                    restaurant.image_url
                      ? `${restaurant.image_url}`
                      : "/restaurant.jpg"
                  }
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}