import { useParams } from "react-router-dom";
import { useState } from "react";
import { getProductById } from "../data/foodItems";
import ReviewCard from "../Components/reviewCard";
import { useCart } from "../context/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";
import AddReviewModal from "../Components/addReviewModel";
import FloatingMessageCard from "../Components/floatingMessageCard";

export default function ProductDetails() {
  const { id } = useParams();
  const item = getProductById(id);
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("Small");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showReviewSubmitted, setShowReviewSubmitted] = useState(false);

  if (!item) {
    return <p className="text-center py-5">Product not found.</p>;
  }

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => quantity > 1 && setQuantity(quantity - 1);

  const handleAddToCart = () => {
    addToCart(item, quantity);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2500);
  };

  const handleReviewSubmit = (reviewData) => {
    console.log("Review submitted:", reviewData);
    setShowReviewModal(false);
    setShowReviewSubmitted(true);
    setTimeout(() => setShowReviewSubmitted(false), 2500);
  };

  return (
    <>
      {/* ===== Product Info Section ===== */}
      <section className="py-5">
        <div className="container" style={{ marginTop: "70px" }}>
          <div className="row align-items-center">
            <div
              className="col-lg-6"
              style={{ width: "450px", marginRight: "70px", marginLeft: "50px" }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="img-fluid rounded-4"
              />
            </div>

            <div className="col-lg-6">
              <h2 className="fw-bold mb-3">{item.name}</h2>

              <div className="d-flex align-items-center mb-3">
                <span className="text-warning me-2">⭐</span>
                <span className="fw-bold">{item.rating}</span>
              </div>

              <p className="text-muted mb-4">{item.description}</p>

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
            {item.reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
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

      {/* ✅ Floating "Added to Cart" message */}
      {showSuccess && (
      <FloatingMessageCard message={'Added to cart successfully!'}></FloatingMessageCard>
      )}

      {/* ✅ Floating "Review Submitted" message */}
      {showReviewSubmitted && (
      <FloatingMessageCard message={'Review submitted successfully!'}></FloatingMessageCard>
      )}

      {/* ✅ AddReviewModal Component */}
      <AddReviewModal
        show={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        onSubmit={handleReviewSubmit}
      />
    </>
  );
}