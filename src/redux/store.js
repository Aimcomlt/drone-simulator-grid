import { configureStore } from '@reduxjs/toolkit';
import droneReducer from './droneSlice';
import mapReducer from './mapSlice';  // 🔥 Import Map Slice
import settingsReducer from './settingsSlice'; // ✅ Import settingsSlice

const store = configureStore({
  reducer: {
    drone: droneReducer,
    map: mapReducer,  // 🔥 Add Map Reducer
    settings: settingsReducer, // ✅ Add settingsSlice to the store
  },
});

export default store;
