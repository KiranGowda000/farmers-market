 import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/cartSlice';
import { updateCropQuantity } from '../redux/cropsSlice';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { QRCodeCanvas } from 'qrcode.react';
import { createRoot } from 'react-dom/client';
import './dashboard/ConsumerDashboard.css';


const SERVICE_ID = 'service_6jcfxu1';
const TEMPLATE_ID = 'template_kvj9t3j';
const PUBLIC_KEY = 'bpAifv7Dxb66X4Rtb';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [consumerUser, setConsumerUser] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('consumerUser'));
    if (user) {
      setConsumerUser(user);
      setAddress(user.address || '');
    }
  }, []);

  const getTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();
          const fullAddress = data.display_name || `${latitude}, ${longitude}`;
          setAddress(fullAddress);
        },
        (error) => {
          Swal.fire('Location Error', error.message, 'error');
        }
      );
    } else {
      Swal.fire('Not Supported', 'Geolocation is not supported by your browser.', 'info');
    }
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      return Swal.fire('Empty Cart', 'Add items to the cart before placing an order.', 'warning');
    }

    if (!address.trim()) {
      return Swal.fire('Missing Address', 'Please enter or fetch your delivery address.', 'warning');
    }

    Swal.fire({
      title: 'Select Payment Method',
      input: 'select',
      inputOptions: {
        COD: 'Cash on Delivery',
        PhonePe: 'PhonePe (UPI)',
        QR: 'Scan QR Code',
      },
      inputPlaceholder: 'Choose payment method',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const payment = result.value;
        const date = new Date().toLocaleString();
        const orderId = `ORD${Math.floor(100000 + Math.random() * 900000)}`;
        const total = getTotal();

        cartItems.forEach((item) => {
          dispatch(updateCropQuantity({ id: item.id, quantitySold: item.quantity }));
        });

        const order = {
          orderId,
          items: cartItems,
          total,
          payment,
          email: consumerUser.email,
          consumerName: consumerUser.name,
          address,
          date,
          status: 'Pending',
        };

        const previousOrders = JSON.parse(localStorage.getItem('consumerOrders')) || [];
        previousOrders.push(order);
        localStorage.setItem('consumerOrders', JSON.stringify(previousOrders));

        // Email
        emailjs.send(SERVICE_ID, TEMPLATE_ID, {
          ...order,
          items: cartItems.map((i) => `${i.name} x ${i.quantity}`).join(', '),
        }, PUBLIC_KEY);

        if (payment === 'QR') {
          const qrData = `upi://pay?pa=7975971202@axl&pn=FarmerMarket&am=${total}&cu=INR&tn=Order-${orderId}`;
          const wrapper = document.createElement('div');
          const qrContainer = document.createElement('div');
          qrContainer.id = 'qr-container';
          wrapper.appendChild(qrContainer);

          Swal.fire({
            title: '📱 Scan to Pay',
            html: wrapper,
            didOpen: () => {
              const qr = <QRCodeCanvas value={qrData} size={180} includeMargin />;
              const mountPoint = document.createElement('div');
              qrContainer.appendChild(mountPoint);
              const root = createRoot(mountPoint);
              root.render(qr);
            },
            confirmButtonText: 'Done',
          }).then(() => {
            navigate('/consumer-orders');
          });
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Order Placed',
            html: `<p><strong>Order ID:</strong> ${orderId}</p>
                   <p><strong>Payment:</strong> ${payment}</p>
                   <p><strong>Total:</strong> ₹${total}</p>
                   <p>Confirmation sent to: ${consumerUser.email}</p>`,
          }).then(() => {
            navigate('/consumer-orders');
          });
        }
      }
    });
  };

  return (
    <div className="consumer-container">
      <h2>🛒 Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="crops-grid">
            {cartItems.map((item) => (
              <div className="crop-card" key={item.id}>
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>Price: ₹{item.price}/kg</p>
                <p>Quantity: {item.quantity} kg</p>
                <p>Subtotal: ₹{item.price * item.quantity}</p>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="logout-button"
                  style={{ backgroundColor: '#f44336' }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '20px' }}>
            <label style={{ fontWeight: 'bold' }}>Delivery Address:</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your delivery address"
              rows="3"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                marginTop: '10px',
              }}
            />
            <button
              onClick={getCurrentLocation}
              style={{
                marginTop: '10px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              📍 Use Current Location
            </button>
          </div>

          <div className="cart-footer">
            <h3 style={{ marginRight: 'auto' }}>Total: ₹{getTotal()}</h3>
            <button className="checkout-button" onClick={handlePlaceOrder}>
              ✅ Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
