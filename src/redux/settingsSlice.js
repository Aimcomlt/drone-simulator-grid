import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tileCount: 6,
  enemyCount: 1,
  allyCount: 0,
  selectedTileId: null,
  isGameStarted: false, // ✅ Add isGameStarted to the state
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTileCount: (state, action) => {
      state.tileCount = action.payload;
    },
    setEnemyCount: (state, action) => {
      state.enemyCount = action.payload;
    },
    setAllyCount: (state, action) => {
      state.allyCount = action.payload;
    },
    setSelectedTileId: (state, action) => {
      state.selectedTileId = action.payload;
    },
    startGame: (state) => {
      state.isGameStarted = true; // ✅ Start the game
    },
    endGame: (state) => {
      state.isGameStarted = false; // ✅ End the game
    },
  },
});

export const {
  setTileCount,
  setEnemyCount,
  setAllyCount,
  setSelectedTileId,
  startGame,
  endGame,
} = settingsSlice.actions;
export default settingsSlice.reducer;
