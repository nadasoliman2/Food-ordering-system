import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Cart() {
    const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Sweet Green Seedless Grapes 1.5–2 lb",
      image: "/pancakes.png",
      price: 25.98,
      quantity: 1,
      originalPrice: 29.99,
    },
    {
      id: 2,
      name: "Sweet Green Seedless Grapes 1.5–2 lb",
      image: "/pancakes.png",
      price: 25.98,
      quantity: 1,
      originalPrice: 29.99,
    },
    {
      id: 3,
      name: "Sweet Green Seedless Grapes 1.5–2 lb",
      image: "/pancakes.png",
      price: 25.98,
      quantity: 1,
      originalPrice: 29.99,
    },
    {
      id: 4,
      name: "Sweet Green Seedless Grapes 1.5–2 lb",
      image: "/pancakes.png",
      price: 25.98,
      quantity: 1,
      originalPrice: 29.99,
    },

  ]);

  // quantity handlers
  const increaseQty = (id) =>
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );

  const decreaseQty = (id) =>
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );

  const removeItem = (id) =>
    setCartItems((prev) => prev.filter((item) => item.id !== id));

  // totals
  const itemsTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = 5.78;
  const subtotal = itemsTotal + deliveryFee;

  return (
    <section className="py-5 bg-light min-vh-100" >
      <div className="container" style={{marginTop:'100px'}}>
        <div className="row gy-4">
          {/* -------- Left: Cart Items -------- */}
          <div className="col-lg-8">
            <div className="bg-white p-4 rounded-3 shadow-sm">
              <h5 className="mb-4 fw-bold">Items</h5>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="d-flex align-items-center justify-content-between border-bottom py-3"
                >
                  {/* Product info */}
                  <div className="d-flex align-items-center" style={{ minWidth: "250px" }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "contain",
                        borderRadius: "10px",
                      }}
                    />
                    <div className="ms-3">
                      <h6 className="fw-bold mb-1">{item.name}</h6>
                      <small className="text-success fw-semibold">
                        ${item.price.toFixed(2)}
                      </small>
                    </div>
                  </div>

                  {/* Quantity controls */}
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-outline-secondary btn-sm rounded-circle"
                      style={{ width: "30px", height: "30px" }}
                      onClick={() => decreaseQty(item.id)}
                    >
                      −
                    </button>
                    <span className="mx-3 fw-bold">{item.quantity}</span>
                    <button
                      className="btn btn-outline-secondary btn-sm rounded-circle"
                      style={{ width: "30px", height: "30px" }}
                      onClick={() => increaseQty(item.id)}
                    >
                      +
                    </button>
                  </div>

                  {/* Remove and Price */}
                  <div className="text-end" style={{ minWidth: "120px" }}>
                    <button
                      className="btn btn-link text-danger text-decoration-none p-0 small mb-1"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                    <div className="fw-bold">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* -------- Right: Order Summary -------- */}
          <div className="col-lg-4">
            <div
              className="bg-white p-4 rounded-3 shadow-sm position-sticky"
              style={{ top: "100px" }}
            >

              <h6 className="fw-bold mb-3">Order Summary</h6>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Items total</span>
                <span>${itemsTotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Delivery fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>

              <div className="d-flex justify-content-between fw-bold">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="text-center mt-4">
                <button
                  className="btn w-100 d-flex align-items-center justify-content-center py-2 text-white"
                  style={{
                    backgroundColor: "#81A4A6",
                    borderRadius: "30px",
                    fontSize: "1.1rem",
                  }}
                >
                  <span className="me-2">Checkout</span>${subtotal.toFixed(2)}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>)
}