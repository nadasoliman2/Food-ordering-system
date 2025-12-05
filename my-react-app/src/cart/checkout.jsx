import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCart } from "../context/CartContext"; 

export default function Checkout() {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    address: "",
    postalCode: "",
    cardName: "",
    cardNumber: "",
    expDate: "",
    cvc: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = [
      "name",
      "email",
      "phone",
      "country",
      "city",
      "address",
      "postalCode",
    ];

    // Add card fields if payment is card
    if (paymentMethod === "card") {
      requiredFields.push("cardName", "cardNumber", "expDate", "cvc");
    }

    // Check if any are empty
    const missing = requiredFields.filter(
      (field) => formData[field].trim() === ""
    );

    if (missing.length > 0) {
      alert("Please fill in all required fields before placing order.");
      return;
    }

    // If all good:
    await clearCart();

    alert("Order placed successfully!");
    navigate("/orderStatus");
  };

  return (
    <section className="py-5 bg-light min-vh-100">
      <div className="container" style={{ marginTop: "80px", maxWidth: "700px" }}>
        <button
        style={{ color: "#81A4A6", fontWeight:"bold"}}
          className="btn btn-link text-decoration-none  text-main mb-3"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <h4 className="fw-bold mb-4">Checkout</h4>

        <form onSubmit={handleSubmit}>
          {/* Personal Info */}
          <div className="bg-white p-4 rounded-3 shadow-sm mb-4">
            <h6 className="fw-bold mb-3">Personal Information</h6>
            <div className="row g-3">
              <div className="col-md-12">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Phone Number"
                  required
                />
              </div>
            </div>
          </div>

          {/* Shipping */}
          <div className="bg-white p-4 rounded-3 shadow-sm mb-4">
            <h6 className="fw-bold mb-3">Shipping Address</h6>
            <div className="row g-3">
              <div className="col-md-6">
                <input
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Country"
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="City"
                  required
                />
              </div>
              <div className="col-md-8">
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Address"
                  required
                />
              </div>
              <div className="col-md-4">
                <input
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Postal Code"
                  required
                />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white p-4 rounded-3 shadow-sm mb-4">
            <h6 className="fw-bold mb-3">Payment Methods</h6>
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="radio"
                name="payment"
                checked={paymentMethod === "cash"}
                onChange={() => setPaymentMethod("cash")}
              />
              <label className="form-check-label">Cash On Delivery</label>
            </div>
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="radio"
                name="payment"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
              />
              <label className="form-check-label">Credit or Debit</label>
            </div>

            {paymentMethod === "card" && (
              <div className="row g-3">
                <div className="col-md-12">
                  <input
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Cardholder Name"
                    required
                  />
                </div>
                <div className="col-md-12">
                  <input
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Card Number"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    name="expDate"
                    value={formData.expDate}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="EXP Date"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    name="cvc"
                    value={formData.cvc}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="CVC"
                    required
                  />
                </div>
              </div>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="btn text-white w-100 py-2"
              style={{
                backgroundColor: "#81A4A6",
                borderRadius: "30px",
                fontSize: "1.1rem",
              }}
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}