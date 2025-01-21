import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const CameraManager = ({ droneRef, anomalyRef, focusTarget = 'drone' }) => {
  const orbitRef = useRef();

  // Update OrbitControls target based on focusTarget
  useFrame(() => {
    if (orbitRef.current) {
      const targetRef = focusTarget === 'drone' ? droneRef : anomalyRef;
      if (targetRef?.current) {
        orbitRef.current.target.set(
          targetRef.current.position.x,
          targetRef.current.position.y,
          targetRef.current.position.z
        );
        orbitRef.current.update();
      }
    }
  });

  return (
    <OrbitControls
      ref={orbitRef}
      enableDamping={true}
      dampingFactor={0.05}
      minDistance={5}
      maxDistance={50}
    />
  );
};

export default CameraManager;
