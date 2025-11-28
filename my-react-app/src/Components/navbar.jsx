// Navbar.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";

export default function AppNavbar() {
  const location = useLocation();


  const isRestaurantActive =
    location.pathname.startsWith("/restaurants") ||
    location.pathname.startsWith("/menu") ||
    location.pathname.startsWith("/product");

  return (
    <nav
      className="navbar navbar-expand-lg custom-navbar-container position-absolute"
      style={{ left: 0, right: 0 }}
    >
      <div className="container">
        <NavLink
          to="/"
          className="navbar-brand custom-logo"
          style={{ color: "#81A4A6", fontSize: "2rem" }}
        >
          Yum Yard
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto custom-nav-links">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/restaurants"
                className={
                  "nav-link" +
                  (isRestaurantActive ? " active text-primary fw-bold" : "")
                }
              >
                Restaurants
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
              >
                Cart
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
              >
                About Us
              </NavLink>
            </li>

            {/* ⭐ Contact Us → About + Scroll using NavLink */}
            <li className="nav-item">
              <NavLink
                to="/about#about-contact-section"
                className={({ isActive }) =>
                  "nav-link" +
                  (isActive && window.location.hash === "#about-contact-section"
                    ? " active"
                    : "")
                }
                onClick={(e) => {
                  if (window.location.pathname === "/about") {
                    e.preventDefault();
                    const el = document.getElementById("about-contact-section");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                    window.history.replaceState(
                      null,
                      "",
                      "/about#about-contact-section"
                    );
                  }
                }}
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="d-flex align-items-center custom-actions">
          <NavLink to="/auth/login" className="btn me-3 custom-signin-btn">
            Sign In
          </NavLink>

          <NavLink
            to="/auth/register"
            className="btn custom-signup-btn "
            style={{
              background: "#81A4A6",
              color: "white",
              borderRadius: "20px",
            }}
          >
            Sign Up
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
