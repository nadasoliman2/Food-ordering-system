// src/Components/RestaurantCard.jsx
import React from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function RestaurantCard({ id, name, rating, imageUrl, categories }) {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate(`/menu/${id}`);
  };

  return (
    <div className="restaurant-card d-flex justify-content-between align-items-center p-3 my-3 rounded-4" style={{backgroundColor: '#EDF3F3'}}>
      {/* Left side - image, name, rating */}
      <div className="d-flex align-items-center">
        <img
          src={imageUrl}
          alt={name}
          className="rounded-4 me-3"
          style={{ width: "60px", height: "60px", objectFit: "cover" }}
        />
        <div>
          <h5 className="fw-bold mb-1">{name}</h5>
          <div className="d-flex align-items-center text-muted mb-2">
            <FaStar className="me-1" color="#FFC107" />
            <span>{rating}</span>
          </div>

          {/* Categories */}
          <div className="d-flex flex-wrap gap-2">
            {categories && categories.length > 0 ? (
              categories.map((cat, i) => (
                <span key={i} className="badge bg-light text-dark border">
                  {cat}
                </span>
              ))
            ) : (
              <small className="text-muted">No categories</small>
            )}
          </div>
        </div>
      </div>

      {/* Explore Button */}
      <button
        className="btn btn-secondary rounded-pill px-3 d-flex align-items-center"
        onClick={handleExploreClick}
      >
        Explore Menu <span className="ms-2">›</span>
      </button>
    </div>
  );
}