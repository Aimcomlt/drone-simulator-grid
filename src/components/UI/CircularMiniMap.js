import React, { useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useSelector } from 'react-redux';
import './CircularMiniMap.css';

// Circular MiniMap Base Component
const CircularBase = () => (
  <mesh>
    <circleGeometry args={[10, 64]} /> {/* Circular base */}
    <meshBasicMaterial
      color="#000000" // Solid color for the background
      transparent
      opacity={0.5}   // Apply transparency
    />
  </mesh>
);

// Rotating Triangle Component for Drone Orientation
const RotatingTriangle = ({ droneRef }) => {
  const triangleRef = useRef();
  const accumulatedYaw = useRef(0); // Track accumulated yaw

  // Define triangle vertices
  const vertices = new Float32Array([
    0, 0, 0,     // Tip of the triangle
    -0.5, -1, 0, // Bottom left corner
    0.5, -1, 0,  // Bottom right corner
  ]);

  // Update triangle's rotation based on the drone's yaw
  useFrame(() => {
    if (triangleRef.current && droneRef?.current) {
      const droneYaw = droneRef.current.rotation.y; // Get drone's current yaw

      // Calculate yaw delta and accumulate it
      const deltaYaw = THREE.MathUtils.euclideanModulo(droneYaw - accumulatedYaw.current, Math.PI * 2);
      if (deltaYaw > Math.PI) {
        accumulatedYaw.current -= (Math.PI * 2 - deltaYaw); // Handle counterclockwise crossing
      } else {
        accumulatedYaw.current += deltaYaw; // Handle clockwise crossing
      }

      // Apply the accumulated yaw to the triangle's rotation
      triangleRef.current.rotation.z = -accumulatedYaw.current; // Negate for 2D orientation
    }
  });

  return (
    <mesh ref={triangleRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={vertices}
          count={3}
          itemSize={3}
        />
      </bufferGeometry>
      <meshBasicMaterial color="cyan" /> {/* Updated to Tron-like cyan color */}
    </mesh>
  );
};

// Circular MiniMap Component
const CircularMiniMap = ({ droneRef }) => {
  const isGameStarted = useSelector((state) => state.settings.isGameStarted);

  const mapStyle = {
    width: '100px',
    height: '100px',
    position: 'absolute',
    bottom: '300px',
    right: '65px',
    backgroundColor: 'transparent',
    borderRadius: '50%',
    border: '2px solid white',
    overflow: 'hidden',
    zIndex: 20,
  };

  return (
    isGameStarted && (
      <div style={mapStyle}>
        <Canvas orthographic camera={{ zoom: 20, position: [0, 0, 10] }}>
          {/* Circular Base */}
          <CircularBase />

          {/* Rotating Triangle */}
          <RotatingTriangle droneRef={droneRef} />
        </Canvas>
      </div>
    )
  );
};

export default CircularMiniMap;
