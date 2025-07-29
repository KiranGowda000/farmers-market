 // src/redux/cropsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cropsSlice = createSlice({
  name: 'crops',
  initialState: [],
  reducers: {
    addCrop: (state, action) => {
      state.push({ ...action.payload, sold: 0 }); // initialize sold
    },
    updateCrop: (state, action) => {
      const { id, name, price, quantity, image } = action.payload;
      const existingCrop = state.find(crop => crop.id === id);
      if (existingCrop) {
        existingCrop.name = name;
        existingCrop.price = price;
        existingCrop.quantity = quantity;
        existingCrop.image = image;
      }
    },
    deleteCrop: (state, action) => {
      return state.filter(crop => crop.id !== action.payload);
    },
    updateCropQuantity: (state, action) => {
      const { id, quantitySold } = action.payload;
      const crop = state.find(c => c.id === id);
      if (crop) {
        crop.quantity -= quantitySold;
        crop.sold += quantitySold;
      }
    }
  }
});

export const { addCrop, updateCrop, deleteCrop, updateCropQuantity } = cropsSlice.actions;
export default cropsSlice.reducer;
