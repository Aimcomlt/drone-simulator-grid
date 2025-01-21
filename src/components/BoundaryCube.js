import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Edges } from '@react-three/drei';
import { gridShader } from '../shaders/gridShader';

const BoundaryCube = ({ objects = [] }) => {
  const boundarySize = 2000;
  const materialRef = useRef(); // Ref for shader material

  // Calculate and apply repulsion forces
  const calculateRepulsionForce = (objectPosition) => {
    const force = new THREE.Vector3();

    // Check each axis for boundary collision
    ['x', 'y', 'z'].forEach((axis) => {
      const halfSize = boundarySize / 2;
      const distanceToWall = Math.abs(objectPosition[axis]) - halfSize;

      if (distanceToWall > -10) { // Within repulsion range
        const direction = objectPosition[axis] > 0 ? -1 : 1; // Push inward
        const intensity = Math.min(10 / Math.abs(distanceToWall), 1);
        force[axis] += direction * intensity;
      }
    });

    return force;
  };

  // Apply forces in every frame
  useFrame(({ clock }) => {
    // Update the shader's time uniform for animations
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime();
    }

    // Apply repulsion force to objects
    objects.forEach((object) => {
      if (object?.position) { // Safety check for valid object
        const force = calculateRepulsionForce(object.position);
        object.position.add(force); // Apply the force
      }
    });
  });

  return (
    <mesh>
      <boxGeometry args={[boundarySize, boundarySize, boundarySize]} />
      
      <shaderMaterial
  ref={materialRef}
  transparent
  uniforms={gridShader.uniforms}
  vertexShader={gridShader.vertexShader}
  fragmentShader={gridShader.fragmentShader}
/>

      
      {/* Add edges for a Tron-like effect */}
      <Edges scale={1.01} color="cyan" />
    </mesh>
  );
};

export default BoundaryCube;
