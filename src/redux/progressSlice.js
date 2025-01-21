import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  unlockedTiles: [],
  playerPosition: null,
  enemyPositions: [],
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    unlockTile: (state, action) => {
      state.unlockedTiles.push(action.payload);
    },
    setPlayerPosition: (state, action) => {
      state.playerPosition = action.payload;
    },
    setEnemyPositions: (state, action) => {
      state.enemyPositions = action.payload;
    },
  },
});

export const { unlockTile, setPlayerPosition, setEnemyPositions } = progressSlice.actions;
export default progressSlice.reducer;
