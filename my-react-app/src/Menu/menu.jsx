import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import MenuFoodCard from "../Components/menuFoodCard";
import { getRestaurantMenu, searchRestaurantItems } from "../services/menuApi";

export function Menu() {
  const { restaurantName } = useParams();
  const decodedRestaurantName = decodeURIComponent(restaurantName);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [restaurantMenu, setRestaurantMenu] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch full menu
  useEffect(() => {
    async function fetchMenuData() {
      try {
        setLoading(true);
        const res = await getRestaurantMenu(decodedRestaurantName);
        console.log("Menu response:", res.data);

        const categories = res.data.data.categories || [];
        const allItems = categories.flatMap((cat) =>
          cat.items.map((item) => ({
            ...item,
            category_name: cat.category_name,
            RestaurantName: decodedRestaurantName,
          }))
        );

        setRestaurantMenu(allItems);
        setAvailableCategories(["All", ...categories.map((cat) => cat.category_name)]);
        setRestaurantDetails({
          name: decodedRestaurantName,
          imageUrl:
            categories[0]?.image_url
              ? `http://localhost:4000/${categories[0].image_url}`
              : "/restaurant.jpg",
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchMenuData();
  }, [decodedRestaurantName]);

  // ✅ Search handler (debounced)
  useEffect(() => {
    const delay = setTimeout(async () => {
      if (!searchTerm.trim()) {
        const res = await getRestaurantMenu(decodedRestaurantName);
        const categories = res.data.data.categories || [];
        const allItems = categories.flatMap((cat) =>
          cat.items.map((item) => ({
            ...item,
            category_name: cat.category_name,
            RestaurantName: decodedRestaurantName,
          }))
        );
        setRestaurantMenu(allItems);
        return;
      }

      try {
        const res = await searchRestaurantItems(decodedRestaurantName, searchTerm);
        const results = res.data.data.results || [];
        const normalized = results.map((item) => ({
          ...item,
          RestaurantName: decodedRestaurantName,
        }));
        setRestaurantMenu(normalized);
      } catch (e) {
        console.error(e);
      }
    }, 500);
    return () => clearTimeout(delay);
  }, [searchTerm, decodedRestaurantName]);

  const displayedItems =
    selectedCategory === "All"
      ? restaurantMenu
      : restaurantMenu.filter((item) => item.category_name === selectedCategory);

  return (
    <section className="py-5">
      <div className="container" style={{ paddingTop: "80px" }}>
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

        {/* Search bar */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-6">
            <div className="position-relative">
              <input
                type="text"
                className="form-control form-control-lg rounded-pill ps-5"
                placeholder="Search food items..."
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

        {/* Categories */}
        <div className="overflow-auto mb-5" style={{ whiteSpace: "nowrap" }}>
          <div className="d-inline-flex gap-4 pb-3" style={{ marginTop: "5px" }}>
            {availableCategories.map((category, index) => (
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

        {/* Menu items */}
        {loading ? (
          <div className="text-center py-5 text-muted">Loading...</div>
        ) : displayedItems.length > 0 ? (
          <div className="row g-4">
            {displayedItems.map((item, index) => (
              <MenuFoodCard key={index} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-5 text-muted">
            No items found matching your search.
          </div>
        )}
      </div>
    </section>
  );
}