import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import MenuFoodCard from "../Components/menuFoodCard";
import { getProductsByRestaurant } from "../data/foodItems";

export function Menu() {
  const { restaurantId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [restaurantMenu, setRestaurantMenu] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [restaurantDetails, setRestaurantDetails] = useState(null);

  // ✅ Fetch the restaurant’s data
  useEffect(() => {
    const data = getProductsByRestaurant(restaurantId);
    setRestaurantMenu(data);

    if (data.length > 0) {
      // Use the first item to get name + image (since all share the same restaurant)
      setRestaurantDetails({
        id: data[0].restaurantId,
        name: data[0].restaurantName,
        imageUrl: "/restaurant.jpg",
      });

      // Extract restaurant‑specific categories
      const uniqueCategories = [...new Set(data.map((item) => item.category))];
      setAvailableCategories(["All", ...uniqueCategories]);
    }
  }, [restaurantId]);

  const filteredCategories = availableCategories.filter((cat) =>
    cat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedItems =
    selectedCategory === "All"
      ? restaurantMenu
      : restaurantMenu.filter((item) => item.category === selectedCategory);

  return (
    <section className="py-5">
      <div className="container" style={{ paddingTop: "80px" }}>

        {/* 🏪 Restaurant Header */}
        {restaurantDetails && (
          <div className="text-center mb-5">
            <img
              src={restaurantDetails.imageUrl}
              alt={restaurantDetails.name}
              className="rounded-4 mb-3"
              style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
                border: "3px solid #81A4A6",
              }}
            />
            <h2 className="fw-bold">{restaurantDetails.name}</h2>
          </div>
        )}

        {/* 🔍 Category Search Bar */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-6">
            <div className="position-relative">
              <input
                type="text"
                className="form-control form-control-lg rounded-pill ps-5"
                placeholder="Search food categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i
                className="bi bi-search position-absolute"
                style={{
                  left: "20px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "20px",
                  color: "#6c757d",
                }}
              ></i>
            </div>
          </div>
        </div>

        {/* 🍴 Dynamic Categories */}
        <div className="overflow-auto mb-5" style={{ whiteSpace: "nowrap" }}>
          <div className="d-inline-flex gap-4 pb-3" style={{marginTop:'5px'}}>
            {filteredCategories.map((category, index) => (
              <div
                key={index}
                className="text-center"
                onClick={() => setSelectedCategory(category)}
                style={{
                  cursor: "pointer",
                  minWidth: "80px",
                  opacity: selectedCategory === category ? 1 : 0.7,
                  transform:
                    selectedCategory === category ? "scale(1.1)" : "scale(1)",
                  transition: "all 0.3s",
                }}
              >
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2"
                  style={{
                    width: "60px",
                    height: "60px",
                    border:
                      selectedCategory === category
                        ? "3px solid #81A4A6"
                        : "none",
                    backgroundColor:
                      selectedCategory === category ? "#81A4A6" : "#f8f9fa",
                  }}
                >
                  <span style={{ fontSize: "30px" }}>🍽️</span>
                </div>
                <small
                  className={`${
                    selectedCategory === category ? "fw-bold" : ""
                  }`}
                >
                  {category}
                </small>
              </div>
            ))}
          </div>
        </div>

        {/* 🧾 Menu Items */}
        <div>
          {displayedItems.length > 0 ? (
            <>
              <h4 className="mb-4">
                {selectedCategory === "All"
                  ? "All Menu Items"
                  : `Available ${selectedCategory} Items`}
              </h4>
              <div className="row g-4">
                {displayedItems.map((item) => (
                  <MenuFoodCard key={item.id} item={item} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-5 text-muted">
              No items found for this category.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}