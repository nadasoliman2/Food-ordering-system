// ------------------ Address.jsx ------------------
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaRegEdit, FaPlus } from 'react-icons/fa';
import { getaddress } from '../../services/Address/getaddressApi';
import { postaddress } from '../../services/Address/postaddressApi';
import { putddress } from '../../services/Address/putaddressApi';
import { deleteaddress } from '../../services/Address/deleteaddressApi';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';

// ------------------ Address Card ------------------
const AddressCard = ({ address, selectedId, onSelect, onEdit, onDelete }) => (
  <div
    className="border-0 bg-white shadow-sm mb-3 hover-shadow p-3 d-flex justify-content-between align-items-center"
    style={{ transition: 'all 0.2s', cursor: 'pointer' }}
    onMouseEnter={(e) => e.currentTarget.classList.add('shadow-lg')}
    onMouseLeave={(e) => e.currentTarget.classList.remove('shadow-lg')}
  >
    <div className="d-flex align-items-center flex-grow-1" onClick={() => onSelect(address.address_id)}>
      <input
        type="radio"
        name="selectedAddress"
        checked={selectedId === address.address_id}
        readOnly
        className="form-check-input me-3"
    tyle={{
    width: '20px',
    height: '20px',
    accentColor: '#69a297', // اللون اللي هيظهر عند التحديد
    backgroundColor: 'white', // ممكن يظهر في بعض المتصفحات كخلفية
    border: '1px solid white', // يحدد حدود الدائرة
  }}
      />
      <div className="me-auto">
        <p className="fw-bold mb-1" style={{ fontSize: '16px' }}>{address.address}</p>
        <small className="text-muted">{address.city}, {address.country}</small>
      </div>
    </div>

    <div className="d-flex gap-2">
      <button className="btn btn-link text-secondary p-0 d-flex align-items-center" onClick={() => onEdit(address)}>
        <FaRegEdit className="me-1" /> 
      </button>
      <button className="btn btn-link text-danger p-0 d-flex align-items-center" onClick={() => onDelete(address.address_id)}>
       <FaTrash className="me-1" />
      </button>
    </div>
  </div>
);

// ------------------ Main Component ------------------
export default function Address() {
  const [addresses, setAddresses] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [newAddress, setNewAddress] = useState({ address: '', postal_code: '', city: '', country: '' });
  const [editAddress, setEditAddress] = useState({ address_id: null, address: '', postal_code: '', city: '', country: '' });

  // ------------------ Fetch Addresses ------------------
  const fetchAddresses = async () => {
    try {
      const res = await getaddress(1); // userId = 1
      if (res.data.success) {
        setAddresses(res.data.data.addresses);
        if (res.data.data.addresses.length > 0) {
          setSelectedId(res.data.data.addresses[0].address_id);
        }
      }
    } catch (err) {
      console.error("Error fetching addresses:", err);
    }
  };

  useEffect(() => { fetchAddresses(); }, []);

  // ------------------ Add Address ------------------
  const handleAddAddress = async () => {
    try {
      const res = await postaddress(1, newAddress);
      if (res.data.success) {
        setAddresses([...addresses, res.data.data.address]);
        setShowAddModal(false);
        setNewAddress({ address: '', postal_code: '', city: '', country: '' });
      }
    } catch (err) {
      console.error("Error adding address:", err);
    }
  };

  // ------------------ Edit Address ------------------
  const handleEditAddress = async () => {
    try {
      await putddress(1, editAddress.address_id, {
        address: editAddress.address,
        postal_code: editAddress.postal_code,
        city: editAddress.city,
        country: editAddress.country
      });
      fetchAddresses(); // تحديث القائمة بعد التعديل
      setShowEditModal(false);
    } catch (err) {
      console.error("Error editing address:", err);
    }
  };

  // ------------------ Delete Address ------------------
  const handleDeleteAddress = async (addressId) => {
    try {
      await deleteaddress(1, addressId);
      setAddresses(addresses.filter(addr => addr.address_id !== addressId));
      if (selectedId === addressId) {
        setSelectedId(addresses.length > 1 ? addresses[0].address_id : null);
      }
    } catch (err) {
      console.error("Error deleting address:", err);
    }
  };

  return (
    <div className="min-vh-100">
      <div className="container-lg py-3">
        <h2 className="fw-bold mb-4" style={{ fontSize: '28px', color: '#69a297' }}>My Addresses</h2>

        {/* Addresses List */}
        <div>
          {addresses.map(addr => (
            <AddressCard
              key={addr.address_id}
              address={addr}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onEdit={(addr) => { setEditAddress(addr); setShowEditModal(true); }}
              onDelete={handleDeleteAddress}
            />
          ))}
        </div>

        {/* Add Address Button */}
        <button className="btn mt-3 d-flex align-items-center" style={{ background:"#69a297", color:"white" }} onClick={() => setShowAddModal(true)}>
          <FaPlus className="me-2" /> Add Address
        </button>

        {/* ------------------ Add Modal ------------------ */}
        <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Address</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" value={newAddress.address} onChange={e => setNewAddress({ ...newAddress, address: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control type="text" value={newAddress.postal_code} onChange={e => setNewAddress({ ...newAddress, postal_code: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" value={newAddress.city} onChange={e => setNewAddress({ ...newAddress, city: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Country</Form.Label>
                <Form.Control type="text" value={newAddress.country} onChange={e => setNewAddress({ ...newAddress, country: e.target.value })} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button style={{ background:"#69a297", color:"white" }} onClick={handleAddAddress}>Add Address</Button>
          </Modal.Footer>
        </Modal>

        {/* ------------------ Edit Modal ------------------ */}
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Address</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" value={editAddress.address} onChange={e => setEditAddress({ ...editAddress, address: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control type="text" value={editAddress.postal_code} onChange={e => setEditAddress({ ...editAddress, postal_code: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" value={editAddress.city} onChange={e => setEditAddress({ ...editAddress, city: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Country</Form.Label>
                <Form.Control type="text" value={editAddress.country} onChange={e => setEditAddress({ ...editAddress, country: e.target.value })} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
            <Button style={{ background:"#69a297", color:"white" }} onClick={handleEditAddress}>Save Changes</Button>
          </Modal.Footer>
        </Modal>

      </div>
    </div>
  );
}
