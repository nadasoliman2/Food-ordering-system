import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { CheckCircle, Timer } from "lucide-react";

export default function OrderTracker() {
  // Order stages
  const stages = [
    "Order is Placed",
    "Order is Being Prepared",
    "Order is On The Way",
    "Order is Delivered",
  ];

  // State
  const [currentStage, setCurrentStage] = useState(0);
  const [timestamps, setTimestamps] = useState([new Date().toLocaleString()]); // first timestamp when placed

  useEffect(() => {
    // simulate stage progress every 5 seconds
    if (currentStage < stages.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStage((prev) => {
          const newStage = prev + 1;
          setTimestamps((t) => [...t, new Date().toLocaleString()]);
          return newStage;
        });
      }, 5000); // change every 5 sec
      return () => clearTimeout(timer);
    }
  }, [currentStage]);

  return (
    <section className="py-5 bg-light min-vh-100 d-flex justify-content-center align-items-center">
      <div
        className="bg-white shadow-sm p-5 rounded-4"
        style={{
          maxWidth: "700px",
          width: "100%",
          border: "1px solid #eaeaea",
          marginTop:'100px'
        }}
      >
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h5 className="fw-bold mb-1">{stages[currentStage]}</h5>
            <p className="text-muted small mb-0">
              Updated at {timestamps[timestamps.length - 1]}
            </p>
          </div>
        </div>

        {/* Center Icon */}
        <div className="text-center my-4">
          <div
            className="d-inline-flex align-items-center justify-content-center"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "60px",
              backgroundColor:
                currentStage === stages.length - 1 ? "#d4edda" : "#e9f5f4",
            }}
          >
            {currentStage === stages.length - 1 ? (
              <CheckCircle size={70} color="#28a745" />
            ) : (
              <Timer size={70} color="#5A8C89" />
            )}
          </div>
          <p className="fw-semibold mt-3 mb-0">{stages[currentStage]}</p>
        </div>

        {/* Timeline */}
        <div className="mt-4 px-2">
          {stages.map((stage, index) => (
            <div key={index} className="d-flex align-items-center mb-4">
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "12px",
                  backgroundColor:
                    index <= currentStage ? "#5A8C89" : "#dee2e6",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "10px",
                }}
              >
                {index < currentStage ? "✓" : index === currentStage ? (
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "5px",
                      backgroundColor: "#fff",
                    }}
                  ></div>
                ) : null}
              </div>

              <div>
                <p
                  className={`mb-0 fw-semibold ${
                    index <= currentStage ? "text-dark" : "text-muted"
                  }`}
                >
                  {stage}
                </p>
                <small className="text-muted">
                  {timestamps[index] ? timestamps[index] : "Pending..."}
                </small>
              </div>
            </div>
          ))}
        </div>

        {/* Optional bottom info */}
        <div
          className="mt-4 p-3 rounded-3"
          style={{ backgroundColor: "#f8f9fa", border: "1px solid #eee" }}
        >
          <p className="mb-1 fw-semibold">Order ID: #ORD123456</p>
          <p className="mb-1 small text-muted">
            Estimated Delivery: {currentStage === stages.length - 1
              ? "Delivered"
              : "Approx. " + (15 - currentStage * 5) + " mins remaining"}
          </p>
          <p className="mb-0 small text-muted">Total: $45.78</p>
        </div>
      </div>
    </section>
  );
}