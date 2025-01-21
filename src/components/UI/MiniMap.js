import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useSelector } from 'react-redux';
import './MiniMap.css';
import * as THREE from 'three';

// Marker for the drone's position in the MiniMap
const MinimapDroneMarker = ({ dronePosition }) => {
  const markerRef = useRef();

  useFrame(() => {
    if (markerRef.current && dronePosition) {
      markerRef.current.position.set(
        dronePosition.x * 0.01, // Scale X position for MiniMap
        -dronePosition.z * 0.01, // Scale Z position (flipped for 2D)
        0
      );
    }
  });

  return (
    <mesh ref={markerRef}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshBasicMaterial color="red" />
    </mesh>
  );
};

// Horizontal Y-axis marker to show drone's height relative to the grid
const YAxisMarker = ({ droneY }) => {
  const lineRef = useRef();

  useFrame(() => {
    if (lineRef.current) {
      lineRef.current.position.y = droneY * 0.01; // Scale Y position for MiniMap
    }
  });

  return (
    <line ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={new Float32Array([-10, 0, 0, 10, 0, 0])} // Horizontal line
          count={2}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="yellow" />
    </line>
  );
};

// Main MiniMap component
const MiniMap = ({ droneRef }) => {
  const isGameStarted = useSelector((state) => state.settings.isGameStarted);
  const dronePosition = droneRef?.current?.position || new THREE.Vector3(0, 0, 0);

  const mapStyle = {
    width: '200px',
    height: '200px',
    position: 'absolute',
    bottom: '80px',
    right: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '8px',
    border: '2px solid white',
    overflow: 'hidden',
    zIndex: 20,
  };

  return (
    isGameStarted && (
      <div style={mapStyle}>
        <Canvas orthographic camera={{ zoom: 50, position: [0, 0, 10] }}>
          {/* MiniMap grid */}
          <gridHelper args={[20, 20, 'cyan', 'gray']} />

          {/* Drone Marker */}
          <MinimapDroneMarker dronePosition={dronePosition} />

          {/* Y-Axis Marker */}
          <YAxisMarker droneY={dronePosition.y} />
        </Canvas>
      </div>
    )
  );
};

export default MiniMap;
