import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './settingsSlice';
import progressReducer from './progressSlice';

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    progress: progressReducer,
  },
});
