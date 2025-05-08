// src/redux/cryptoSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { initialCryptoData } from '../data/sampleData';

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: {
    assets: initialCryptoData,
  },
  reducers: {
    updateCryptoData: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.assets.findIndex(asset => asset.id === id);
      if (index !== -1) {
        state.assets[index] = { ...state.assets[index], ...updates };
      }
    },
  },
});

export const { updateCryptoData } = cryptoSlice.actions;

// Selectors
export const selectAllCryptos = state => state.crypto.assets;
export const selectCryptoById = (state, id) => 
  state.crypto.assets.find(asset => asset.id === id);

export default cryptoSlice.reducer;