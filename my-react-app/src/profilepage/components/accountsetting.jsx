import React, { useEffect, useState } from "react";
import { getaccount } from "../../services/accountApi";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Accountsetting() {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const fetchAcc = async () => {
      try {
        const res = await getaccount(1); // user id
        setAccount(res.data.data.account);
      } catch (err) {
        console.log("Error fetching account:", err);
      }
    };
    fetchAcc();
  }, []);

  if (!account) return <p>Loading...</p>;

  const { username, email, phone_number, address, marketing_opt, role } = account;
console.log(account)
  return (
    <div className="container">
      <h3 className="fw-bold mb-4" style={{color:" #69a297"}}>Account Settings</h3>

      <div className="row g-4">

        {/* ------------- Box 1: User Info ------------- */}
        <div className="col-md-6">
          <div className="p-4 bg-white shadow-sm rounded">
            <h5 className="fw-bold mb-3" style={{color:" #69a297"}}>User Info</h5>
            <p><strong>Username:</strong> {username}</p>
            <p><strong>Email:</strong> {email}</p>
          </div>
        </div>

        {/* ------------- Box 2: Contact Info ------------- */}
        <div className="col-md-6">
          <div className="p-4 bg-white shadow-sm rounded">
            <h5 className="fw-bold mb-3" style={{color:" #69a297"}}>Contact Info</h5>
            <p><strong>Phone Number:</strong> {phone_number}</p>
          </div>
        </div>

        {/* ------------- Box 3: Address Details ------------- */}
        <div className="col-md-6">
          <div className="p-4 bg-white shadow-sm rounded">
            <h5 className="fw-bold mb-3" style={{color:" #69a297"}}>Address Details</h5>
            <p><strong>Street Address:</strong> {address.address}</p>
            <p><strong>Postal Code:</strong> {address.postal_code}</p>
            <p><strong>City:</strong> {address.city}</p>
            <p><strong>Country:</strong> {address.country}</p>
          </div>
        </div>

        {/* ------------- Box 4: Preferences ------------- */}
        <div className="col-md-6">
          <div className="p-4 bg-white shadow-sm rounded">
            <h5 className="fw-bold mb-3" style={{color:" #69a297"}}>Preferences</h5>
            <p><strong>Receive Marketing Emails:</strong> {marketing_opt ? "Yes" : "No"}</p>
            <p><strong>Role:</strong> {role}</p>
          </div>
        </div>

      </div>
    </div>
  );
}

