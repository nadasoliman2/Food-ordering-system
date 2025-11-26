import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Address from './components/address';
import Payment from './components/payment';
// Sidebar Component
const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { icon: '📦', label: 'My Orders', id: 'orders' },
    { icon: '📍', label: 'My Addresses', id: 'addresses' },
    { icon: '💳', label: 'My Payments', id: 'payments' },

  ];

  return (
    <div className="bg-white rounded shadow-sm p-4" style={{ position: 'sticky', top: '20px' }}>
      <div className="text-center mb-4">
        <div className="rounded-circle mx-auto mb-3" style={{
          width: '64px',
          height: '64px',
          background: 'linear-gradient(135deg, #fbbf24 0%, #f97316 100%)'
        }}></div>
        <p className="fw-semibold text-dark">Maryam Hendoway</p>
      </div>

      <div className="d-flex flex-column gap-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`btn btn-light w-100 text-start d-flex align-items-center gap-3 ${
              activeTab === item.id ? 'bg-success bg-opacity-10 text-success' : ''
            }`}
            style={{
              border: 'none',
              padding: '12px 16px',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            <span style={{ fontSize: '18px' }}>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <button className="btn w-100 mt-4 d-flex align-items-center justify-content-center gap-2" style={{"backgroundColor": "#69a297", color: "white"}}>
        <span>🚪</span>
        <span>Log Out</span>
      </button>
    </div>
  );
};

// Order Card Component
const OrderCard = ({ order }) => (
  <div className="card border-0 shadow-sm mb-3 hover-shadow" style={{ transition: 'all 0.2s' }}
    onMouseEnter={(e) => e.currentTarget.classList.add('shadow-lg')}
    onMouseLeave={(e) => e.currentTarget.classList.remove('shadow-lg')}
  >
    <div className="card-body">
      <div className="row mb-3">
        <div className="col-md-3">
          <p className="text-muted mb-1" style={{ fontSize: '14px' }}>Order Delivered</p>
          <p style={{ fontSize: '12px', color: '#999' }}>{order.date}</p>
        </div>

        <div className="col-md-3">
          <p className="fw-bold" style={{ fontSize: '24px', color: '#1f2937' }}>{order.amount}</p>
          <p style={{ fontSize: '12px', color: '#999' }}>{order.paymentMethod}</p>
        </div>

        <div className="col-md-3">
          <p className="text-muted mb-1" style={{ fontSize: '14px' }}>Items</p>
          <p className="fw-semibold" style={{ fontSize: '18px' }}>{order.items}</p>
        </div>

        <div className="col-md-3 d-flex align-items-center justify-content-between">
          <span className={`fw-semibold ${order.statusColor === 'text-success' ? 'text-success' : 'text-danger'}`}
            style={{ fontSize: '14px' }}>
            {order.status}
          </span>
          <button className="btn btn-link text-success p-0" style={{ fontSize: '14px', textDecoration: 'none' }}>
            View Details →
          </button>
        </div>
      </div>

      <div className="d-flex gap-2">
        {[...Array(order.items)].map((_, i) => (
          <div key={i} className="rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#fef3c7',
              fontSize: '18px'
            }}>
            🍔
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Orders List Component
const OrdersList = () => {
  const [activeFilterTab, setActiveFilterTab] = useState('All');
  
  const orders = [
    {
      id: 1,
      date: 'Apr 5, 2025, 10:07 AM',
      amount: '$64',
      paymentMethod: 'Paid with Cash',
      items: 6,
      status: 'Completed',
      statusColor: 'text-success'
    },
    {
      id: 2,
      date: 'Apr 5, 2025, 10:07 AM',
      amount: '$64',
      paymentMethod: 'Paid with Cash',
      items: 6,
      status: 'Cancelled',
      statusColor: 'text-danger'
    }
  ];

  const filterTabs = ['All', 'In Progress', 'Delivered', 'Cancelled'];

  return (
    <div>
      <h2 className="fw-bold mb-4" style={{ fontSize: '28px', color: '#1f2937' }}>My Orders</h2>

      <div className="border-bottom mb-4 d-flex gap-2">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilterTab(tab)}
            className="btn btn-link p-3 fw-semibold"
            style={{
              fontSize: '14px',
              color: activeFilterTab === tab ? '#16a34a' : '#999',
              borderBottom: activeFilterTab === tab ? '2px solid #16a34a' : 'none',
              textDecoration: 'none',
              cursor: 'pointer'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div>
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

// Main Profile Page Component
export default function Profile() {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <div className="py-5 bg-light min-vh-100 " >
      <div className="container-lg py-3" style={{ marginTop: "100px" }}>
        <div className="row g-4">
          <div className="col-lg-3">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          <div className="col-lg-9">
            {activeTab === 'orders' && <OrdersList />}
            {activeTab === 'addresses' && (
             <Address/>
            )}
            {activeTab === 'payments' && (
              <Payment/>
            )}
            {activeTab === 'settings' && (
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center">
                  <p className="text-muted">⚙️ Settings</p>
                </div>
              </div>
            )}
            {activeTab === 'help' && (
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center">
                  <p className="text-muted">💬 Help</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}