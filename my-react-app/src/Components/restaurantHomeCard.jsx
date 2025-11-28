import { useNavigate } from "react-router-dom";

export default function RestaurantHomeCard({ name, image, id }) {
  const navigate = useNavigate();

  return (
    <button
      className="category-card text-center d-flex flex-column align-items-center justify-content-center mx-2"
      style={{
        backgroundColor: "#EDF3F3",
        borderRadius: 80,
        border: "none",
        width: "100px",
        height: "150px",
        padding: "10px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        transition: "transform 0.2s",
      }}
      onClick={() => navigate(`/menu/${id}`)} // ✅ navigate to menu
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <div
        className="category-image-wrapper mb-1"
        style={{
          marginTop: "-0.5rem",
      
        }}
      >
        <img
          src={image}
          alt={name}
          className="img-fluid rounded-circle"
          style={{
            width: "70px",
            height: "70px",
            objectFit: "cover",
          }}
        />
      </div>

      <h6
        className="category-name mt-2 fw-bold text-dark text-center"
        style={{ paddingBottom: 10, fontSize: "0.9rem" }}
      >
        {name}
      </h6>
    </button>
  );
}