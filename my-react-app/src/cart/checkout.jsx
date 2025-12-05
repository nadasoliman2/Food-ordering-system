import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getCheckoutSummaryAPI } from "../services/checkout.Api";
import { getaddress } from "../services/Address/getaddressApi";
import { getpayments } from "../services/payments/getpaymentsApi";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaMapMarkerAlt, FaCreditCard, FaShoppingBag } from "react-icons/fa";

export default function Checkout() {
  const { token } = useContext(AuthContext);

  const [summary, setSummary] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [payments, setPayments] = useState([]);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const [loading, setLoading] = useState(true);

  // ============== New Address Form ==============
  const [newAddress, setNewAddress] = useState({
    address_name: "",
    address: "",
    city: "",
    country: "",
    postal_code: "",
  });

  // ============== New Payment Form ==============
  const [newPayment, setNewPayment] = useState({
    method: "MasterCard",
    cardholder: "",
    number: "",
    exp: "",
    cvc: "",
  });

  // =============================================================
  // LOAD DATA
  // =============================================================
  useEffect(() => {
    async function loadAll() {
      try {
        setLoading(true);

        const checkoutRes = await getCheckoutSummaryAPI();
        setSummary(checkoutRes.data.data);

        const addrRes = await getaddress(token);
        if (addrRes.data.success) {
          setAddresses(addrRes.data.data.addresses);
          if (addrRes.data.data.addresses.length > 0) {
            setSelectedAddress(addrRes.data.data.addresses[0].address_id);
          }
        }

        const payRes = await getpayments(token);
        if (payRes.data.success) {
          setPayments(payRes.data.data.payments);
          if (payRes.data.data.payments.length > 0) {
            setSelectedPayment(payRes.data.data.payments[0].payment_id);
          }
        }
      } catch (err) {
        console.error("Checkout load error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadAll();
  }, [token]);

  if (loading || !summary) {
    return (
      <div className="text-center py-5" style={{ marginTop: "120px" }}>
        Loading checkout...
      </div>
    );
  }

  // totals
  const itemsTotal = summary.items
    .reduce((sum, item) => sum + parseFloat(item.subtotal), 0)
    .toFixed(2);

  const deliveryFee = parseFloat(summary.totals.delivery_fee).toFixed(2);

  const finalTotal = (parseFloat(itemsTotal) + parseFloat(deliveryFee)).toFixed(
    2
  );

  // =============================================================
  // ** ADD NEW ADDRESS **
  // =============================================================
  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/api/profile/addresses",
        newAddress,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        const newAddr = res.data.data.address;

        setAddresses([...addresses, newAddr]);
        setSelectedAddress(newAddr.address_id);
        setNewAddress({
          address_name: "",
          address: "",
          city: "",
          country: "",
          postal_code: "",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // =============================================================
  // ** ADD NEW PAYMENT **
  // =============================================================
  const handleAddPayment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/api/profile/payments",
        newPayment,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        const newPay = res.data.data.payment;

        setPayments([...payments, newPay]);
        setSelectedPayment(newPay.payment_id);

        setNewPayment({
          method: "MasterCard",
          cardholder: "",
          number: "",
          exp: "",
          cvc: "",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // =============================================================
  // PLACE ORDER
  // =============================================================
  const handlePlaceOrder = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/checkout",
        {
          address_id: selectedAddress,
          payment_id: selectedPayment,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Order Placed Successfully: " + res.data.data.order_number);
    } catch (err) {
      console.error(err);
      alert("Error placing order");
    }
  };

  // =============================================================
  // UI LAYOUT (2 Columns)
  // =============================================================
  return (
    <div className="container" style={{ paddingTop: "120px" }}>
      <h2 className="fw-bold text-center mb-4" style={{ color: "#328286" }}>
        Checkout
      </h2>

      <div className="row">
        {/* ========== RIGHT COLUMN ========== */}
        <div className="col-lg-5 mb-4">
          {/* ITEMS */}
          <div className="card shadow-sm mb-4" style={{ borderRadius: "18px" }}>
            <div
              className="card-header"
              style={{ background: "#81A4A6", color: "white" }}
            >
              <FaShoppingBag className="me-2" /> Your Items
            </div>

            <ul className="list-group list-group-flush">
              {summary.items.map((item) => (
                <li
                  key={item.ItemID}
                  className="list-group-item d-flex justify-content-between"
                >
                  <div>
                    <strong>{item.ItemName}</strong>
                    <br />
                    <small className="text-muted">
                      {item.Quantity} × ${item.Price}
                    </small>
                  </div>
                  <strong className="text-success">${item.subtotal}</strong>
                </li>
              ))}
            </ul>
          </div>

          {/* SUMMARY */}
          <div className="card shadow-sm" style={{ borderRadius: "18px" }}>
            <div
              className="card-header"
              style={{ background: "#81A4A6", color: "white" }}
            >
              Order Summary
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between">
                <span>Items Total</span>
                <strong>${itemsTotal}</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Delivery Fee</span>
                <strong>${deliveryFee}</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span className="fw-bold">Final Total</span>
                <strong className="text-success">${finalTotal}</strong>
              </li>
            </ul>
          </div>
        </div>

        {/* ========== LEFT COLUMN ========== */}
        <div className="col-lg-7">
          {/* ===================== SELECT ADDRESS ===================== */}
          <div className="card shadow-sm mb-4" style={{ borderRadius: "18px" }}>
            <div
              className="card-header"
              style={{ background: "#81A4A6", color: "white" }}
            >
              <FaMapMarkerAlt className="me-2" /> Select Address
            </div>

            <ul className="list-group list-group-flush">
              {addresses.map((addr) => (
                <li
                  key={addr.address_id}
                  className="list-group-item d-flex align-items-center"
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedAddress(addr.address_id)}
                >
                  <input
                    type="radio"
                    name="address"
                    checked={selectedAddress === addr.address_id}
                    readOnly
                    className="me-3"
                  />
                  <div>
                    <strong>{addr.address_name}</strong>
                    <br />
                    <small className="text-muted">
                      {addr.address}, {addr.city}, {addr.country}
                    </small>
                  </div>
                </li>
              ))}
            </ul>

            {/* ---------- ADD NEW ADDRESS FORM ---------- */}
            <form className="p-3" onSubmit={handleAddAddress}>
              <h6 className="fw-bold mb-3">Add New Address</h6>

              {[
                "address_name",
                "address",
                "city",
                "country",
                "postal_code",
              ].map((field, i) => (
                <input
                  key={i}
                  className="form-control mb-2"
                  placeholder={field.replace("_", " ").toUpperCase()}
                  value={newAddress[field]}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, [field]: e.target.value })
                  }
                  required
                />
              ))}

              <button className="btn btn-success w-100 mt-2">
                Save Address
              </button>
            </form>
          </div>

          {/* ===================== SELECT PAYMENT ===================== */}
          <div className="card shadow-sm mb-4" style={{ borderRadius: "18px" }}>
            <div
              className="card-header"
              style={{ background: "#81A4A6", color: "white" }}
            >
              <FaCreditCard className="me-2" /> Select Payment Method
            </div>

            <ul className="list-group list-group-flush">
              {payments.map((pay) => (
                <li
                  key={pay.payment_id}
                  className="list-group-item d-flex align-items-center"
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedPayment(pay.payment_id)}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={selectedPayment === pay.payment_id}
                    readOnly
                    className="me-3"
                  />
                  <div>
                    <strong>{pay.method}</strong> — ****{pay.last4}
                  </div>
                </li>
              ))}
            </ul>

            {/* ---------- ADD NEW PAYMENT FORM ---------- */}
            <form className="p-3" onSubmit={handleAddPayment}>
              <h6 className="fw-bold mb-3">Add New Payment</h6>

              <select
                className="form-control mb-2"
                value={newPayment.method}
                onChange={(e) =>
                  setNewPayment({ ...newPayment, method: e.target.value })
                }
              >
                <option value="MasterCard">MasterCard</option>
                <option value="PayPal">PayPal</option>
              </select>

              {newPayment.method !== "PayPal" && (
                <>
                  <input
                    className="form-control mb-2"
                    placeholder="Cardholder Name"
                    value={newPayment.cardholder}
                    onChange={(e) =>
                      setNewPayment({
                        ...newPayment,
                        cardholder: e.target.value,
                      })
                    }
                    required
                  />

                  <input
                    className="form-control mb-2"
                    placeholder="Card Number"
                    value={newPayment.number}
                    onChange={(e) =>
                      setNewPayment({ ...newPayment, number: e.target.value })
                    }
                    required
                  />

                  <input
                    className="form-control mb-2"
                    placeholder="Expiry Date"
                    type="date"
                    value={newPayment.exp}
                    onChange={(e) =>
                      setNewPayment({ ...newPayment, exp: e.target.value })
                    }
                    required
                  />

                  <input
                    className="form-control mb-2"
                    placeholder="CVC"
                    value={newPayment.cvc}
                    onChange={(e) =>
                      setNewPayment({ ...newPayment, cvc: e.target.value })
                    }
                    required
                  />
                </>
              )}

              <button className="btn btn-success w-100 mt-2">
                Save Payment
              </button>
            </form>
          </div>

          {/* ===================== PLACE ORDER ===================== */}
          <button
            className="btn w-100 py-3 mb-5"
            style={{
              background: "#328286",
              color: "white",
              fontSize: "1.2rem",
              borderRadius: "15px",
            }}
            onClick={handlePlaceOrder}
          >
            Place Order (${finalTotal})
          </button>
        </div>
      </div>
    </div>
  );
}
