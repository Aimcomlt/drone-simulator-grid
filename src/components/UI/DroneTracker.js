import React from 'react';
import { useSelector } from 'react-redux';

const DroneTracker = () => {
  const { position, rotation, speed, heightLevel } = useSelector((state) => state.drone);

    // 🔥 Determine height status relative to Tron Grid (Y = 0)
    const heightStatus = heightLevel > 0
    ? `${heightLevel} units ABOVE grid`
    : heightLevel < 0
    ? `${Math.abs(heightLevel)} units BELOW grid`
    : 'At GRID level';

  return (
    <div style={{
      position: 'absolute',
      top: 20,
      right: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      padding: '15px',
      borderRadius: '8px',
      color: 'white',
      width: '250px', // Fixed width for consistent layout
      fontFamily: 'monospace'
    }}>
      <h4>Drone Tracker</h4>
      <div>
        <strong>Position:</strong>
        <p>X: {position.x}</p>
        <p>Y: {position.y}</p>
        <p>Z: {position.z}</p>
      </div>
      <div>
        <strong>Rotation:</strong>
        <p>Pitch (X): {rotation.x}°</p>
        <p>Yaw (Y): {rotation.y}°</p>
        <p>Roll (Z): {rotation.z}°</p>
      </div>
      <div>
        <strong>Speed:</strong>
        <p>{speed} units/sec</p>
      </div>
      <div>
        <strong>Height Level:</strong>
        <p>{heightStatus}</p>  {/* 🔥 Height relative to the Tron grid */}
      </div>
    </div>
  );
};

export default DroneTracker;
