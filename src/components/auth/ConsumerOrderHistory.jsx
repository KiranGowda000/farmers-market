 import React, { useEffect, useState } from 'react';
import './ConsumerOrderHistory.css';
import { Link } from 'react-router-dom';

const ConsumerOrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const allOrders = JSON.parse(localStorage.getItem('consumerOrders')) || [];
    const currentUser = JSON.parse(localStorage.getItem('consumerUser'));

    // Filter orders by logged-in consumer's email
    const userOrders = allOrders.filter(order => order.email === currentUser?.email);
    setOrders(userOrders);
  }, []);

  return (
    <div className="order-history-container">
      <h2>🧾 Your Order History</h2>

      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Crop</th>
              <th>Qty (kg)</th>
              <th>Total (₹)</th>
              <th>Payment</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr key={idx}>
                <td>{order.orderId}</td>
                <td>{order.crop}</td>
                <td>{order.quantity}</td>
                <td>₹{order.total}</td>
                <td>{order.payment}</td>
                <td>{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Link to="/consumer-dashboard" className="back-btn">
        ← Back to Dashboard
      </Link>
    </div>
  );
};

export default ConsumerOrderHistory;
