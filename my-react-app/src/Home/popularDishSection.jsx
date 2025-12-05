import React from "react";
import foodItems from "../data/foodItems";
import FoodCard from "../Components/FoodCard";

export default function PopularDishesSection() {
  // 🧩 Flatten restaurants → categories → items
  const allRestaurants = foodItems.flatMap((restaurant) => {
    // Combine all items from the restaurant, keeping restaurant info attached
    const allMenuItems = Object.values(restaurant.categories)
      .flat()
      .map((item) => ({
        ...item,
        restaurantId: restaurant.restaurantId,
        restaurantName: restaurant.restaurantName,
      }));

    // ✨ Select first few items (e.g. first 2)
    return allMenuItems.slice(0, 2);
  });

  // These selected items are your "popular" ones
  const popularDishes = allRestaurants;
  console.log( popularDishes )

  return (
    <section className="popular-dishes py-1">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Our Popular Dishes</h2>
          <p className="text-muted">
            Start Discovering A Lot Of Food Categories
          </p>
        </div>

        {/* Scrollable row */}
        <div className="d-flex flex-nowrap overflow-auto py-5 gap-4">
          {popularDishes.map((dish, index) => (
            <FoodCard
              key={`${dish.restaurantId}-${dish.id}`}
              id={dish.id}
              restaurantId={dish.restaurantId}
              restaurantName={dish.restaurantName}
              image={dish.image}
              name={dish.name}
              price={dish.price}
              rating={dish.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
}