import React from 'react';
import { useFrame } from '@react-three/fiber';

const DroneOrbit = ({ droneRef, anomalyRef, radius = 10, speed = 0.5, height = 5 }) => {
  useFrame(({ clock }) => {
    if (!droneRef.current || !anomalyRef.current) return;

    // Calculate orbit position
    const elapsedTime = clock.getElapsedTime();
    const angle = elapsedTime * speed;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = height;

    // Update drone position
    droneRef.current.position.set(x, y, z);

    // Make the drone face the Anomaly
    droneRef.current.lookAt(anomalyRef.current.position);
  });

  return null;
};

export default DroneOrbit;
