import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { CheckCircle, Timer, XCircle } from "lucide-react";

export default function OrderTracker() {
  // Backend-aligned statuses
  const stages = ["Pending", "In Progress", "Completed", "Delivered"];

  const [currentStage, setCurrentStage] = useState(0);
  const [timestamps, setTimestamps] = useState([
    new Date().toLocaleString(),
  ]);
  const [orderStatus, setOrderStatus] = useState("Pending"); // track real status
  const orderId = "ORD123456";

  // Simulate backend progress
  useEffect(() => {
    if (orderStatus === "Cancelled" || orderStatus === "Delivered") return;

    const timer = setTimeout(() => {
      setCurrentStage((prev) => {
        const newStage = prev + 1;
        const nextStatus = stages[newStage] || "Delivered";
        setTimestamps((t) => [...t, new Date().toLocaleString()]);
        setOrderStatus(nextStatus);
        return newStage;
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, [orderStatus]);

  // Cancel order (frontend simulation)
  const handleCancelOrder = () => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (!confirmCancel) return;

    setOrderStatus("Cancelled");
  };

  const isCancelled = orderStatus === "Cancelled";
  const isDelivered = orderStatus === "Delivered";

  return (
    <section className="py-5 bg-light min-vh-100 d-flex justify-content-center align-items-center">
      <div
        className="bg-white shadow-sm p-5 rounded-4"
        style={{
          maxWidth: "700px",
          width: "100%",
          border: "1px solid #eaeaea",
          marginTop: "100px",
        }}
      >
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h5 className="fw-bold mb-1">{orderStatus}</h5>
            <p className="text-muted small mb-0">
              Updated at {timestamps[timestamps.length - 1]}
            </p>
          </div>

          {!isCancelled && !isDelivered && (
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={handleCancelOrder}
            >
              Cancel Order
            </button>
          )}
        </div>

        {/* Center Icon */}
        <div className="text-center my-4">
          <div
            className="d-inline-flex align-items-center justify-content-center"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "60px",
              backgroundColor: isCancelled
                ? "#f8d7da"
                : isDelivered
                ? "#d4edda"
                : "#e9f5f4",
            }}
          >
            {isCancelled ? (
              <XCircle size={70} color="#dc3545" />
            ) : isDelivered ? (
              <CheckCircle size={70} color="#28a745" />
            ) : (
              <Timer size={70} color="#5A8C89" />
            )}
          </div>
          <p className="fw-semibold mt-3 mb-0">{orderStatus}</p>
        </div>

        {/* Timeline */}
        <div className="mt-4 px-2">
          {stages.map((stage, index) => {
            const stageCompleted =
              isCancelled ? false : index <= currentStage;
            return (
              <div key={index} className="d-flex align-items-center mb-4">
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "12px",
                    backgroundColor: isCancelled
                      ? "#dc3545"
                      : stageCompleted
                      ? "#5A8C89"
                      : "#dee2e6",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "10px",
                  }}
                >
                  {stageCompleted ? "✓" : null}
                </div>

                <div>
                  <p
                    className={`mb-0 fw-semibold ${
                      stageCompleted ? "text-dark" : "text-muted"
                    }`}
                  >
                    {stage}
                  </p>
                  <small className="text-muted">
                    {timestamps[index] ? timestamps[index] : "Pending..."}
                  </small>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Info */}
        <div
          className="mt-4 p-3 rounded-3"
          style={{ backgroundColor: "#f8f9fa", border: "1px solid #eee" }}
        >
          <p className="mb-1 fw-semibold">Order ID: #{orderId}</p>
          <p className="mb-1 small text-muted">
            {isCancelled
              ? "This order was cancelled."
              : isDelivered
              ? "Delivered"
              : "Approx. " +
                (15 - currentStage * 5) +
                " mins remaining"}
          </p>
          <p className="mb-0 small text-muted">Total: $45.78</p>
        </div>
      </div>
    </section>
  );
}