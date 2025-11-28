// NavbarAdmin.jsx
import { NavLink } from "react-router-dom";

export default function NavbarAdmin() {
  return (
    
    <nav
      className="navbar navbar-expand-lg  custom-navbar-container-admin position-absolute"
      style={{ left: 0, right: 0 , background:""}}
    >
      <div className="container">
        {/* Logo */}
        <NavLink
          to=""
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
            {/* Dashboard */}
            <li className="nav-item">
              <NavLink
                to=""       // Relative link → /admin
                end         // End علشان Active يظهر بس على exact path
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
              >
                Dashboard
              </NavLink>
            </li>

            {/* Sales Report */}
            <li className="nav-item">
              <NavLink
                to="sales"   // Relative link → /admin/sales
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active text-primary fw-bold" : "")
                }
              >
                Sales Report
              </NavLink>
            </li>

            {/* Orders Report */}
            <li className="nav-item">
              <NavLink
                to="orders"  // Relative link → /admin/orders
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
              >
                Orders Report
              </NavLink>
            </li>
          </ul>
        </div>

        {/* User Info + Logout */}
        <div className="d-flex align-items-center gap-3">
          <div className="text-center">
            <img
              src="https://via.placeholder.com/50"
              alt="User"
              className="rounded-circle border border-3"
              style={{ width: "45px", height: "45px", borderColor: "#81A4A6" }}
            />
            <p className="m-0" style={{ fontSize: "0.9rem", fontWeight: "bold" }}>
              288
            </p>
          </div>

          <button
            className="btn"
            style={{
              background: "transparent",
              color: "#81A4A6",
              fontSize: "1.8rem",
              border: "none",
            }}
          >
            ➜
          </button>
        </div>
      </div>
    </nav>
  );
}
