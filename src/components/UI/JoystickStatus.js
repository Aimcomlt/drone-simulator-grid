import React from 'react';
import { useSelector } from 'react-redux';

const JoystickStatus = () => {
  const droneState = useSelector((state) => state.drone) || {};

  const {
    roll = 0,
    pitch = 0,
    yaw = 0,
    throttle = 0,
    buttons = [], // Include buttons state
  } = droneState;

  return (
    <div style={{
      position: 'absolute',
      top: 20,
      left: 20,
      color: 'white',
      backgroundColor: 'rgba(0,0,0,0.5)',
      padding: '10px',
      borderRadius: '8px',
      fontFamily: 'monospace',
    }}>
      <h4>Joystick Status</h4>
      <p><strong>Roll:</strong> {roll}</p>
      <p><strong>Pitch:</strong> {pitch}</p>
      <p><strong>Yaw:</strong> {yaw}</p>
      <p><strong>Throttle:</strong> {throttle}</p>

      {/* Display button states */}
      <h4>Button States</h4>
      {buttons.map((pressed, index) => (
        <p key={index}>
          <strong>Button {index + 1}:</strong> {pressed ? 'Pressed' : 'Not Pressed'}
        </p>
      ))}
    </div>
  );
};

export default JoystickStatus;

