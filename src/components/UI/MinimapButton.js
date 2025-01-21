import React, { useState } from 'react';
import MiniMap from './MiniMap'; // Import the Minimap component

const MinimapButton = ({ dronePosition }) => {
  const [isMinimapVisible, setIsMinimapVisible] = useState(false);

  const toggleMinimap = () => {
    setIsMinimapVisible((prev) => !prev);
  };

  return (
    <div style={{ position: 'absolute', bottom: 20, left: 120, zIndex: 10 }}>
      {/* Button to toggle the minimap */}
      <button
        onClick={toggleMinimap}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          border: 'none',
          padding: '10px 15px',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        Toggle MiniMap
      </button>

      {/* Minimap component */}
      {isMinimapVisible && <MiniMap dronePosition={dronePosition} />}
    </div>
  );
};

export default MinimapButton;
