import foodItems from "../data/foodItems"; 
import RestaurantHomeCard from "../Components/restaurantHomeCard";

export default function RestaurantsSection() {
  return (
    <section className="food-category-carousel py-5">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <h2 className="fw-bold">Explore Restaurants</h2>
          <p className="text-muted">Start Discovering A Lot Of Special Restaurants</p>
        </div>

        {/* Carousel */}
        <div className="position-relative d-flex align-items-center">
          <div className="d-flex flex-nowrap overflow-auto py-3">
            {foodItems.map((restaurant, index) => (
              <RestaurantHomeCard
                id={restaurant.restaurantId}
                name={restaurant.restaurantName}
                image={restaurant.restaurantImage || "restaurant.jpg"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}