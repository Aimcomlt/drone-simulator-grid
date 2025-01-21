import { createSlice } from '@reduxjs/toolkit';

const droneSlice = createSlice({
  name: 'drone',
  initialState: {
    roll: 0,
    pitch: 0,
    yaw: 0,
    throttle: 0,
    buttons: [],
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    speed: 0,  // New speed state
    heightLevel: 0,  // 🔥 Added height level
  },
  reducers: {
    updateJoystickData: (state, action) => {
      const { roll, pitch, yaw, throttle, buttons } = action.payload;
      state.roll = roll;
      state.pitch = pitch;
      state.yaw = yaw;
      state.throttle = throttle;
      state.buttons = buttons;
    },
    updateDronePosition: (state, action) => {
      state.position = action.payload;
      state.heightLevel = action.payload.y;  // 🔥 Update height level with Y position
    },
    updateDroneRotation: (state, action) => {
      state.rotation = action.payload;
    },
    updateDroneSpeed: (state, action) => {
      state.speed = action.payload;  // New reducer for speed
    },
  },
});

export const { updateJoystickData, updateDronePosition, updateDroneRotation, updateDroneSpeed } = droneSlice.actions;
export default droneSlice.reducer;
