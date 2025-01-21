import React, { forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Particle = forwardRef(({ position }, ref) => {
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.position.y -= delta * 5;  // Move particle down
      ref.current.material.opacity -= delta;  // Fade particle

      if (ref.current.material.opacity <= 0) {
        ref.current.visible = false;  // Hide particle when invisible
      }
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.2, 8, 8]} />
      <meshBasicMaterial color="orange" transparent opacity={1} />
    </mesh>
  );
});

export default Particle;
