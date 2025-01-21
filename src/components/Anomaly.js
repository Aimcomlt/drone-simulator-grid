import React, { forwardRef, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useSphere } from '@react-three/cannon';
import { vortexShader } from '../shaders/vortexShader';

const Anomaly = forwardRef(({ position = [0, 0, 0], radius = 5 }, ref) => {
  const [sphereRef] = useSphere(() => ({
    args: [radius],
    position,
    type: 'Static',
  }));

  const vortexRef = useRef();

  // Apply dynamic repulsion force
  useFrame(() => {
    sphereRef.current?.children?.forEach((obj) => {
      const objPosition = obj.position;
      const direction = objPosition.clone().sub(new THREE.Vector3(...position)).normalize();
      const distance = objPosition.distanceTo(new THREE.Vector3(...position));
      if (distance < radius) {
        const force = direction.multiplyScalar((radius - distance) * 0.5);
        obj.applyForce(force.toArray(), [0, 0, 0]);
      }
    });

    if (vortexRef.current) {
      vortexRef.current.material.uniforms.time.value += 0.01; // Animate shader
    }
  });

  return (
    <group ref={ref}>
      {/* Anomaly Vortex */}
      <mesh ref={vortexRef} position={position}>
        <sphereGeometry args={[radius * 0.8, 64, 64]} />
        <shaderMaterial
          args={[vortexShader]}
          uniforms={{ time: { value: 0 }, color: { value: new THREE.Color('#00ffff') } }}
        />
      </mesh>

      {/* Particle Effect */}
      <points position={position}>
        <sphereGeometry args={[radius, 64, 64]} />
        <pointsMaterial size={0.1} color="#00ffff" />
      </points>
    </group>
  );
});

export default Anomaly;
