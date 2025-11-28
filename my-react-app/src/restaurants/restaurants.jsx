// src/pages/Restaurants.jsx
import React, { useState } from "react";
import foodItems from "../data/foodItems";
import RestaurantCard from "../Components/restaurantCard";

export default function Restaurants() {
  const [searchTerm, setSearchTerm] = useState("");

  // Prepare restaurant data
  const restaurantList = foodItems.map((restaurant) => {
    const categories = Object.keys(restaurant.categories);
    const allItems = Object.values(restaurant.categories).flat();


    return {
      id: restaurant.restaurantId,
      name: restaurant.restaurantName,
      categories,
      rating: '4.5',
      imageUrl: 'restaurant.jpg'
    };
  });

  // Filter restaurants by search term (name or category)
  const filteredRestaurants = restaurantList.filter((restaurant) => {
    const nameMatch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = restaurant.categories.some((cat) =>
      cat.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return nameMatch || categoryMatch;
  });

  return (
    <div className="container py-5" style={{ paddingTop: "100px" }}>
      {/* Search bar */}
      <div className="row justify-content-center mb-4" style={{marginTop:"100px"}}>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control form-control-lg rounded-pill ps-4"
            placeholder="Search restaurants or categories (e.g., burger)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <h5 className="fw-bold mb-4">Available Restaurants</h5>

      {/* Restaurant list */}
      {filteredRestaurants.length > 0 ? (
        filteredRestaurants.map((rest) => (
          <RestaurantCard
            key={rest.id}
            id={rest.id}
            name={rest.name}
            imageUrl={rest.imageUrl}
            rating={rest.rating}
            categories={rest.categories}
          />
        ))
      ) : (
        <p className="text-center text-muted">No restaurants found.</p>
      )}
    </div>
  );
}