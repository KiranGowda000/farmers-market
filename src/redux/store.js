 // src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import cropsReducer from './cropsSlice';
import cartReducer from './cartSlice'; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    crops: cropsReducer,
    cart: cartReducer, 
  },
});

export default store;
