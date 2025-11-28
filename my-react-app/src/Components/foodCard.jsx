import React from "react";
import { useNavigate } from "react-router-dom";

export default function FoodCard({
  id,
  restaurantId,
  restaurantName,
  image,
  name,
  price,
  rating,
}) {
  const navigate = useNavigate();

  const handleShowItem = () => {
    navigate(`/product/${id}`);
  
  };

  return (
    <div
      className="card shadow-sm rounded-4 p-3 position-relative border-0"
      style={{
        width: "16rem",
        backgroundColor: "#EDF3F3",
        minWidth: "16rem",
      }}
    >
      {/* Product image */}
      <div className="d-flex justify-content-start" style={{ marginTop: "-4rem" }}>
        <img
          src={image}
          alt={name}
          className="img-fluid"
          style={{
            width: "10rem",
            height: "10rem",
            objectFit: "contain",
            filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))",
          }}
        />
      </div>

      {/* Rating badge */}
      <div className="position-absolute top-0 end-0 d-flex align-items-center gap-1 p-2">
        <span className="text-warning fs-5">★</span>
        <span className="text-secondary fw-medium">{rating}</span>
      </div>

      {/* Item info */}
      <div className="text-start mt-3 mb-5">
        {/* ✅ added mb-5 to create space for bottom section */}
        <h5 className="fw-semibold text-dark mb-1">{name}</h5>
        <p className="text-muted small mb-3">
          Available in:{" "}
          <span style={{ fontWeight: "bold" }}>{restaurantName}</span>
        </p>
      </div>

      {/* Bottom section pinned visually at bottom */}
      <div
        className="d-flex justify-content-between align-items-center position-absolute bottom-0 start-0 w-100 px-3 pb-3"
        style={{}}
      >
        <button
          className="btn text-white"
          style={{
            backgroundColor: "#6CA89E",
            borderRadius: "20px",
            padding: "6px 16px",
            fontWeight: 500,
          }}
          onClick={handleShowItem}
        >
          Show Item
        </button>
        <span className="fw-semibold fs-5 text-dark">${price}</span>
      </div>
    </div>
  );
}