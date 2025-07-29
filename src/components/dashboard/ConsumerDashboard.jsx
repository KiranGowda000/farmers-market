 import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { updateCropQuantity } from '../../redux/cropsSlice';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';
import { QRCodeCanvas } from 'qrcode.react';
import { createRoot } from 'react-dom/client';
import './ConsumerDashboard.css';

const SERVICE_ID = 'service_6jcfxu1';
const TEMPLATE_ID = 'template_kvj9t3j';
const PUBLIC_KEY = 'bpAifv7Dxb66X4Rtb';

const ConsumerDashboard = () => {
  const crops = useSelector((state) => state.crops);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showInput, setShowInput] = useState(null);
  const [quantityInput, setQuantityInput] = useState({});
  const [search, setSearch] = useState('');

  const consumerUser = JSON.parse(localStorage.getItem('consumerUser'));
  const name = consumerUser?.name || 'Customer';
  const email = consumerUser?.email || 'customer@example.com';

  const handleLogout = () => {
    navigate('/');
  };

  const handleAddClick = (id) => {
    setShowInput(id);
  };

  const handleAddToCart = (crop) => {
    const qty = parseInt(quantityInput[crop.id]);

    if (!qty || qty <= 0) {
      return Swal.fire('⚠️ Invalid Quantity', 'Please enter a valid quantity.', 'warning');
    }

    if (qty > crop.quantity) {
      return Swal.fire('❌ Not Enough Stock', 'Reduce quantity.', 'error');
    }

    dispatch(addToCart({ id: crop.id, name: crop.name, price: crop.price, quantity: qty, image: crop.image }));
    dispatch(updateCropQuantity({ id: crop.id, quantitySold: qty }));

    setShowInput(null);
    setQuantityInput({ ...quantityInput, [crop.id]: '' });

    Swal.fire({
      toast: true,
      position: 'bottom-end',
      icon: 'success',
      title: 'Item added to cart',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const filteredCrops = crops.filter((crop) =>
    crop.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="consumer-container">
      {/* Navbar */}
      <div className="navbar">
        <div className="nav-left">
          <Link to="/cart" className="cart-icon" title="Cart">🛒</Link>
        </div>
        <div className="nav-center">
          <h2>Welcome, {name}</h2>
        </div>
        <div className="nav-right">
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search for crops..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      {/* Crops grid */}
      <div className="crops-grid">
        {filteredCrops.length > 0 ? (
          filteredCrops.map((crop) => (
            <div className="crop-card" key={crop.id}>
              <div className="offer-badge">10% OFF</div>
              <img src={crop.image} alt={crop.name} />
              <h3>{crop.name}</h3>
              <p>₹{crop.price} /kg</p>
              <p>Available: {crop.quantity} kg</p>

              {showInput === crop.id ? (
                <>
                  <input
                    type="number"
                    min="1"
                    placeholder="Quantity"
                    value={quantityInput[crop.id] || ''}
                    onChange={(e) =>
                      setQuantityInput({ ...quantityInput, [crop.id]: e.target.value })
                    }
                    className="quantity-input"
                  />
                  <div className="cart-buttons">
                    <button onClick={() => handleAddToCart(crop)} className="add-confirm-btn">Add to Cart</button>
                    <button onClick={() => setShowInput(null)} className="cancel-btn">Cancel</button>
                  </div>
                </>
              ) : (
                <button onClick={() => handleAddClick(crop.id)} className="add-btn">Add</button>
              )}
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', marginTop: '30px', fontWeight: 'bold' }}>No crops found for "{search}"</p>
        )}
      </div>
    </div>
  );
};

export default ConsumerDashboard;
