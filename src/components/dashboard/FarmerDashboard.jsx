 // components/dashboard/FarmerDashboard.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCrop, updateCrop, deleteCrop } from '../../redux/cropsSlice';
import { useNavigate } from 'react-router-dom';
import './FarmerDashboard.css';

const FarmerDashboard = () => {
  const crops = useSelector(state => state.crops);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [newCrop, setNewCrop] = useState({ name: '', price: '', quantity: '', image: '' });
  const [editCropId, setEditCropId] = useState(null);
  const [editValues, setEditValues] = useState({});

  const handleAddCrop = () => {
    if (!newCrop.name || !newCrop.price || !newCrop.quantity || !newCrop.image) return alert('Fill all fields');
    const crop = { ...newCrop, id: Date.now(), price: parseFloat(newCrop.price), quantity: parseInt(newCrop.quantity) };
    dispatch(addCrop(crop));
    setNewCrop({ name: '', price: '', quantity: '', image: '' });
  };

  const handleUpdateCrop = (id) => {
    dispatch(updateCrop({ id, ...editValues }));
    setEditCropId(null);
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="farmer-container">
      <h2>Welcome, Farmer</h2>

      <div className="add-crop-form">
        <input type="text" placeholder="Crop Name" value={newCrop.name} onChange={e => setNewCrop({ ...newCrop, name: e.target.value })} />
        <input type="number" placeholder="Price/kg" value={newCrop.price} onChange={e => setNewCrop({ ...newCrop, price: e.target.value })} />
        <input type="number" placeholder="Quantity (kg)" value={newCrop.quantity} onChange={e => setNewCrop({ ...newCrop, quantity: e.target.value })} />
        <input type="text" placeholder="Image URL" value={newCrop.image} onChange={e => setNewCrop({ ...newCrop, image: e.target.value })} />
        <button onClick={handleAddCrop}>Add Crop</button>
      </div>

      <div className="crops-grid">
        {crops.map(crop => (
          <div className="crop-card" key={crop.id}>
            <img src={crop.image} alt={crop.name} />
            {editCropId === crop.id ? (
              <>
                <input type="text" value={editValues.name} onChange={e => setEditValues({ ...editValues, name: e.target.value })} />
                <input type="number" value={editValues.price} onChange={e => setEditValues({ ...editValues, price: parseFloat(e.target.value) })} />
                <input type="number" value={editValues.quantity} onChange={e => setEditValues({ ...editValues, quantity: parseInt(e.target.value) })} />
                <input type="text" value={editValues.image} onChange={e => setEditValues({ ...editValues, image: e.target.value })} />
                <button onClick={() => handleUpdateCrop(crop.id)}>Update</button>
              </>
            ) : (
              <>
                <h3>{crop.name}</h3>
                <p>Price: ₹{crop.price} /kg</p>
                <p>Available: {crop.quantity} kg</p>
                <p>Sold: {crop.sold || 0} kg</p>
                <button onClick={() => {
                  setEditCropId(crop.id);
                  setEditValues({
                    name: crop.name,
                    price: crop.price,
                    quantity: crop.quantity,
                    image: crop.image
                  });
                }}>Edit</button>
                <button onClick={() => dispatch(deleteCrop(crop.id))}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>

      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
};

export default FarmerDashboard;
