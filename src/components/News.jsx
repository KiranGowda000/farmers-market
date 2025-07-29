// src/pages/News.jsx
import React from 'react';
import './News.css';
import { Link } from 'react-router-dom';
import news1 from '../assets/news1.jpg';
import news2 from '../assets/news2.jpg';
import news3 from '../assets/news3.jpg';





const News = () => {
  return (
    <div className="news-container">
      <h1>Farmers Market News</h1>
      <p>Stay up to date with the latest updates and stories from FarmFresh Market!</p>

      <div className="news-articles">
        <div className="news-card">
          
          <img src={news1} alt="News 1" />

          <h3>Local Farmers Celebrate Record Harvest</h3>
          <p>Thanks to good weather and improved techniques, local farmers report a 20% increase in yield this season.</p>
        </div>

        <div className="news-card">
        <img src={news2} alt="News 2" />
           <h3>New Organic Stall Opens This Weekend</h3>
          <p>Fresh, certified organic vegetables and fruits now available from our newest vendor at the market.</p>
        </div>

        <div className="news-card">
        <img src={news3} alt="News 3" />
        <h3>Workshops on Sustainable Farming</h3>
          <p>Join our weekend workshops to learn about composting, water conservation, and organic practices.</p>
        </div>
      </div>

      <Link to="/" className="back-home-button">Back to Home</Link>
    </div>
  );
};

export default News;
