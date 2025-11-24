// Navbar.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function AppNavbar() {
  return (
<nav class="navbar navbar-expand-lg custom-navbar-container">
    <div class="container-fluid">
        <a class="navbar-brand custom-logo" href="#">Yum Yard</a>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mx-auto custom-nav-links">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Menu</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Cart</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">About Us</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Contact Us</a>
                </li>
            </ul>
        </div>
        
        <div class="d-flex align-items-center custom-actions">
            <button class="btn custom-search-btn me-3" type="button">
                <i class="bi bi-search"></i> 
                </button>

            <a href="#" class="btn me-3 custom-signin-btn">Sign In</a>
            
            <a href="#" class="btn custom-signup-btn">Sign Up</a>
        </div>
    </div>
</nav>
  );
}
