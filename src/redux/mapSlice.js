import { createSlice } from '@reduxjs/toolkit';

const mapSlice = createSlice({
  name: 'map',
  initialState: {
    currentMap: 'grid',  // Default map
    maps: ['desert', 'forest', 'city', 'grid'],  // Available maps // 🔥 Added "grid"
  },
  reducers: {
    setMap: (state, action) => {
      state.currentMap = action.payload;
    },
  },
});

export const { setMap } = mapSlice.actions;
export default mapSlice.reducer;
