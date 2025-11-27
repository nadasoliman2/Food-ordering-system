import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaRegEdit, FaPlus } from 'react-icons/fa';

// بيانات العناوين كمثال
const addresses = [
  { id: 1, label: "Home", street: "2972 Westheimer Rd", cityState: "Santa Ana, Illinois 85488", isSelected: true },
  { id: 2, label: "My Grandparent's House", street: "2972 Westheimer Rd", cityState: "Santa Ana, Illinois 85488", isSelected: false },
  { id: 3, label: "Office", street: "2972 Westheimer Rd", cityState: "Santa Ana, Illinois 85488", isSelected: false },
];

const AddressCard = ({ address }) => (
  <div
    className=" border-0 shadow-sm mb-3 hover-shadow p-3 d-flex justify-content-between align-items-center"
    style={{ transition: 'all 0.2s', cursor: 'pointer' }}
    onMouseEnter={(e) => e.currentTarget.classList.add('shadow-lg')}
    onMouseLeave={(e) => e.currentTarget.classList.remove('shadow-lg')}
  >
    <div className="d-flex align-items-center flex-grow-1">
      {/* Radio Button */}
      <input
        type="radio"
        name="selectedAddress"
        checked={address.isSelected}
        readOnly
        className="form-check-input me-3"
        style={{ width: '20px', height: '20px' }}
      />

      {/* عنوان */}
      <div className="me-auto">
        <p className="fw-bold mb-1" style={{ fontSize: '16px' }}>{address.label}</p>
        <small className="text-muted">{address.street}, {address.cityState}</small>
      </div>
    </div>

    {/* زر التعديل */}
    <button className="btn btn-link text-secondary p-0 d-flex align-items-center">
      <FaRegEdit className="me-1" /> Edit
    </button>
  </div>
);


// Address Page Component
export default function Address() {
  return (
    <div className=" min-vh-100">
      <div className="container-lg py-3">
        <h2 className="fw-bold mb-4" style={{ fontSize: '28px', color: '#1f2937' }}>My Addresses</h2>

        {/* كروت العناوين */}
        <div>
          {addresses.map(addr => (
            <AddressCard key={addr.id} address={addr} />
          ))}
        </div>

        {/* زر إضافة عنوان جديد */}
        <button className="btn btn-outline-success mt-3 d-flex align-items-center">
          <FaPlus className="me-2" /> Add Address
        </button>
      </div>
    </div>
  );
}
