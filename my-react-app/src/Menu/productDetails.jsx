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
  const { restaurantName, itemName } = useParams(); // ✅ Correct param names
  const { addToCart } = useCart();

  const [item, setItem] = useState(null);
  const [recommended, setRecommended] = useState([]);

  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("Small");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showReviewSubmitted, setShowReviewSubmitted] = useState(false);

  useEffect(() => {
    async function fetchItem() {
      try {
        setLoading(true);
        const res = await getItemDetails(restaurantName, itemName);
        const data = res.data.data;

        setItem(data.item);
        setRecommended(data.recommended || []);

        await loadReviews(data.item.restaurant_name || restaurantName, data.item.item_name);
      } catch (err) {
        console.error("Error fetching item details:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchItem();
  }, [restaurantName, itemName]);

  const loadReviews = async (restaurant, item) => {
    try {
      const data = await fetchReviews(restaurant, item);
      setReviews(data.reviews || []);
      setAvgRating(data.avg_rating || 0);
      setReviewCount(data.review_count || 0);
    } catch (err) {
      console.error("Error loading reviews:", err);
    }
  };

  if (loading) return <p className="text-center py-5">Loading item details...</p>;
  if (!item) return <p className="text-center py-5">Product not found.</p>;

  const increase = () => setQuantity(quantity + 1);
  const decrease = () => quantity > 1 && setQuantity(quantity - 1);

  const handleAddToCart = async () => {
    await addToCart(item, quantity, selectedSize, restaurantName);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2500);
  };

  const handleReviewSubmit = async ({ rating, comment }) => {
    try {
      if (!rating) return alert("Please select a rating");
      await addReview({
        user_id: 1,
        restaurant_name: restaurantName,
        item_name: item.item_name,
        rating,
        review: comment,
      });
      await loadReviews(restaurantName, item.item_name);
      setShowReviewModal(false);
      setShowReviewSubmitted(true);
      setTimeout(() => setShowReviewSubmitted(false), 2500);
    } catch (err) {
      alert("Failed to submit review: " + (err.response?.data?.message || err.message));
    }
  };

  const imageUrl = item.image_url ? `/${item.image_url}` : "/restaurant.jpg";

  return (
    <>
      <section className="py-5">
        <div className="container" style={{ marginTop: "70px" }}>
          <div className="row align-items-center">
            <div
              className="col-lg-6"
              style={{ width: "450px", marginRight: "70px", marginLeft: "50px" }}
            >
              <img
                src={imageUrl}
                alt={item.item_name}
                className="img-fluid rounded-4"
                style={{ objectFit: "cover", maxHeight: "400px" }}
              />
            </div>

            <div className="col-lg-6">
              <h2 className="fw-bold mb-3">{item.item_name}</h2>
              <div className="d-flex align-items-center mb-3">
                <span className="text-warning me-2">⭐</span>
                <span className="fw-bold">
                  {avgRating} ({reviewCount})
                </span>
              </div>

              <p className="text-muted mb-4">{item.description}</p>

              {/* Quantity */}
              <div className="d-flex align-items-center mb-4">
                <button className="btn btn-dark rounded-circle" onClick={decrease}>
                  -
                </button>
                <span className="mx-4 fs-5 fw-bold">{quantity}</span>
                <button className="btn btn-dark rounded-circle" onClick={increase}>
                  +
                </button>
              </div>

              {/* Sizes */}
              <div className="d-flex gap-3 mb-4">
                {["Small", "Medium", "Large"].map((size) => (
                  <button
                    key={size}
                    className={`btn ${
                      selectedSize === size ? "btn-dark" : "btn-outline-secondary"
                    } px-4`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>

              <div className="d-flex align-items-center gap-4">
                <h3 className="fw-bold mb-0">${item.price}</h3>
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

      {/* Reviews */}
      <section className="py-5">
        <div className="container">
          <h3 className="fw-bold mb-4">Customer Reviews</h3>
          <div
            className="d-flex gap-4 pb-3"
            style={{ overflowX: "auto", whiteSpace: "nowrap" }}
          >
            {reviews.length > 0 ? (
              reviews.map((r, i) => <ReviewCard key={i} review={r} />)
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

      {/* Recommended */}
      {recommended?.length > 0 && (
        <section className="py-5">
          <div className="container">
            <h3 className="fw-bold mb-4">Recommended for You</h3>
            <div className="row g-4">
              {recommended.map((rec, idx) => (
                <div className="col-md-4" key={idx}>
                  <div className="card border-0 shadow-sm">
                    <img
                      src={`http://localhost:4000/${rec.image_url}`}
                      alt={rec.item_name}
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="fw-bold">{rec.item_name}</h5>
                      <p className="text-muted mb-1">{rec.description}</p>
                      <div className="d-flex justify-content-between">
                        <span className="fw-bold text-success">${rec.price}</span>
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

      {showSuccess && <FloatingMessageCard message="Added to cart successfully!" />}
      {showReviewSubmitted && (
        <FloatingMessageCard message="Review submitted successfully!" />
      )}

      <AddReviewModal
        show={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        onSubmit={handleReviewSubmit}
      />
    </>
  );
}