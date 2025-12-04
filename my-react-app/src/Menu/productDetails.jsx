// src/pages/ProductDetails.jsx
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReviewCard from "../Components/reviewCard";
import { useCart } from "../context/CartContext";
import AddReviewModal from "../Components/addReviewModel";
import FloatingMessageCard from "../Components/floatingMessageCard";
import { getItemDetails } from "../services/itemApi";
import { fetchReviews, addReview } from "../services/reviewsApi";

export default function ProductDetails() {
  const { restaurantId, itemName } = useParams(); // navigated as /product/:restaurantId/:itemName
  const { addToCart } = useCart();

  const [item, setItem] = useState(null);
  const [recommended, setRecommended] = useState([]);

  // ⭐ NEW states for reviews
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("Small");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showReviewSubmitted, setShowReviewSubmitted] = useState(false);

  // ✅ Fetch product details from API
  useEffect(() => {
    async function fetchItem() {
      try {
        setLoading(true);
        const res = await getItemDetails(restaurantId, itemName);
        console.log("Item details:", res.data);

        const data = res.data.data;

        setItem({
          ...data.item,
        });

        setRecommended(data.recommended || []);

        // ⭐ GET reviews from API
        await loadReviews(data.item.RestaurantName, data.item.ItemName);
      } catch (error) {
        console.error("Error fetching item details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchItem();
  }, [restaurantId, itemName]);

  // ⭐ Function to fetch reviews alone
  const loadReviews = async (restaurant, item) => {
    try {
      console.log("Loading reviews for:", restaurant, item);
      const data = await fetchReviews(restaurant, item);
      console.log("Reviews loaded:", data);

      setReviews(data.reviews || []);
      setAvgRating(data.avg_rating || 0);
      setReviewCount(data.review_count || 0);
    } catch (err) {
      console.error("Error loading reviews:", err);
      // Don't show alert, just log the error
    }
  };

  if (loading) {
    return <p className="text-center py-5">Loading item details...</p>;
  }

  if (!item) {
    return <p className="text-center py-5">Product not found.</p>;
  }

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => quantity > 1 && setQuantity(quantity - 1);

  // ✅ Add to cart with backend data
  const handleAddToCart = async () => {
    await addToCart(item, quantity, selectedSize, item.RestaurantName);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2500);
  };

  const handleReviewSubmit = async ({ rating, comment }) => {
    try {
      if (!rating) {
        alert("Please select a rating");
        return;
      }

      console.log("Submitting review:", { rating, comment });

      const response = await addReview({
        user_id: 1, // TODO: replace when auth added
        restaurant_name: item.RestaurantName,
        item_name: item.ItemName,
        rating,
        review: comment,
      });

      console.log("Review submitted successfully:", response);

      // Reload reviews to show the new one
      await loadReviews(item.RestaurantName, item.ItemName);

      setShowReviewModal(false);
      setShowReviewSubmitted(true);
      setTimeout(() => setShowReviewSubmitted(false), 2500);
    } catch (err) {
      console.error("Review submit error:", err);
      alert(
        "Failed to submit review: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  const imageUrl = item.ImageURL
    ? `http://localhost:4000/${item.ImageURL}`
    : "/restaurant.jpg";

  return (
    <>
      {/* ===== Product Info Section ===== */}
      <section className="py-5">
        <div className="container" style={{ marginTop: "70px" }}>
          <div className="row align-items-center">
            <div
              className="col-lg-6"
              style={{
                width: "450px",
                marginRight: "70px",
                marginLeft: "50px",
              }}
            >
              <img
                src={imageUrl}
                alt={item.ItemName}
                className="img-fluid rounded-4"
                style={{ objectFit: "cover", maxHeight: "400px" }}
              />
            </div>

            <div className="col-lg-6">
              <h2 className="fw-bold mb-3">{item.ItemName}</h2>

              <div className="d-flex align-items-center mb-3">
                <span className="text-warning me-2">⭐</span>
                <span className="fw-bold">
                  {avgRating} ({reviewCount})
                </span>
              </div>

              <p className="text-muted mb-4">{item.ItemDescription}</p>

              {/* Quantity Controls */}
              <div className="d-flex align-items-center mb-4">
                <button
                  className="btn btn-dark rounded-circle"
                  style={{ width: "40px", height: "40px" }}
                  onClick={handleDecrease}
                >
                  -
                </button>
                <span className="mx-4 fs-5 fw-bold">{quantity}</span>
                <button
                  className="btn btn-dark rounded-circle"
                  style={{ width: "40px", height: "40px" }}
                  onClick={handleIncrease}
                >
                  +
                </button>
              </div>

              {/* Size Options */}
              <div className="d-flex gap-3 mb-4">
                {["Small", "Medium", "Large"].map((size) => (
                  <button
                    key={size}
                    className={`btn ${
                      selectedSize === size
                        ? "btn-dark"
                        : "btn-outline-secondary"
                    } px-4`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>

              <div className="d-flex align-items-center gap-4">
                <h3 className="fw-bold mb-0">${item.Price}</h3>
                <button
                  className="btn btn-lg px-5 text-white"
                  style={{
                    backgroundColor: "#7FA9A3",
                    borderRadius: "30px",
                  }}
                  onClick={handleAddToCart}
                >
                  Add to Cart 🛒
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Reviews Section ===== */}
      <section className="py-5">
        <div className="container">
          <h3 className="fw-bold mb-4">Customer Reviews</h3>
          <div
            className="d-flex gap-4 pb-3"
            style={{
              overflowX: "auto",
              whiteSpace: "nowrap",
              scrollBehavior: "smooth",
            }}
          >
            {reviews.length > 0 ? (
              reviews.map((review, i) => <ReviewCard key={i} review={review} />)
            ) : (
              <p className="text-muted">No reviews yet.</p>
            )}
          </div>
        </div>
        <button
          className="btn btn-lg px-5 text-white"
          style={{
            backgroundColor: "#7FA9A3",
            borderRadius: "30px",
            marginLeft: "75%",
            marginTop: "30px",
          }}
          onClick={() => setShowReviewModal(true)}
        >
          Add Review
        </button>
      </section>

      {/* ⭐ Recommended Items */}
      {recommended && recommended.length > 0 && (
        <section className="py-5">
          <div className="container">
            <h3 className="fw-bold mb-4">Recommended for You</h3>
            <div className="row g-4">
              {recommended.map((rec, index) => (
                <div className="col-md-4" key={index}>
                  <div className="card border-0 shadow-sm">
                    <img
                      src={`http://localhost:4000/${rec.image_url}`}
                      alt={rec.item_name}
                      className="card-img-top"
                      style={{
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "10px 10px 0 0",
                      }}
                    />
                    <div className="card-body">
                      <h5 className="fw-bold">{rec.item_name}</h5>
                      <p className="text-muted mb-1">{rec.description}</p>
                      <div className="d-flex justify-content-between">
                        <span className="fw-bold text-success">
                          ${rec.price}
                        </span>
                        <small className="text-muted">
                          ⭐ {rec.avg_rating} ({rec.review_count})
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ✅ Floating messages */}
      {showSuccess && (
        <FloatingMessageCard message="Added to cart successfully!" />
      )}
      {showReviewSubmitted && (
        <FloatingMessageCard message="Review submitted successfully!" />
      )}

      {/* ✅ Add Review Modal */}
      <AddReviewModal
        show={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        onSubmit={handleReviewSubmit}
      />
    </>
  );
}
