 // src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Use 'react-dom/client' for React 18/19+
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';

// Create a root for React 18/19
const root = ReactDOM.createRoot(document.getElementById('root')); // This is the updated method
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
