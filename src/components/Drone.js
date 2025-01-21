import React, { useRef, useEffect, useState, forwardRef, Suspense, useCallback } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useSelector, useDispatch } from 'react-redux';
import { updateDronePosition, updateDroneRotation, updateDroneSpeed } from '../redux/droneSlice';
import Particle from './Particle';

// === Constants ===
const MAX_PARTICLES = 100;
const MAX_TILT_ANGLE = 0.58; // ~33 degrees in radians
const SMOOTHING_FACTOR = 0.1;
const MOVEMENT_SPEED = 0.001;
const ROTATION_SPEED = 0.0005;
const ANOMALY_POSITION = new THREE.Vector3(0, 0, 0);
const ANOMALY_RADIUS = 10;

const DroneModel = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { roll, pitch, yaw, throttle, buttons } = useSelector((state) => state.drone);
  const { scene } = useGLTF('/assets/models/drone.glb');
  const previousPosition = useRef(new THREE.Vector3());
  const [particles, setParticles] = useState([]);

  // === Initialize the Drone ===
  useEffect(() => {
    if (ref.current) {
      ref.current.rotation.y = Math.PI; // Rotate drone 180° to face backward
      ref.current.position.set(0, 5, 0); // Start 5 units above the grid
    }

    // Apply Tron Glow Effect
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color('#0d0d0d'),
          emissive: new THREE.Color('#00ffff'),
          emissiveIntensity: 2,
          metalness: 0.8,
          roughness: 0.2,
        });

        const edges = new THREE.EdgesGeometry(child.geometry);
        const line = new THREE.LineSegments(
          edges,
          new THREE.LineBasicMaterial({
            color: '#00ffff',
            transparent: true,
            opacity: 0.5,
            linewidth: 1,
          })
        );
        child.add(line);
      }
    });

    return () => {
      // Clean up materials and geometry
      scene.traverse((child) => {
        if (child.isMesh) {
          child.geometry.dispose();
          if (child.material.isMaterial) {
            child.material.dispose();
          } else {
            child.material.forEach((mat) => mat.dispose());
          }
        }
      });
    };
  }, [scene, ref]);

  // === Particle Firing Logic ===
  const dropParticle = useCallback(() => {
    if (particles.length >= MAX_PARTICLES) return;

    const spawnPosition = ref.current.position.clone().add(new THREE.Vector3(0, -1, 0));
    const particleRef = React.createRef();

    setParticles((prev) => [
      ...prev,
      { id: Math.random(), position: spawnPosition, ref: particleRef },
    ]);
  }, [particles, ref]);

  // Cleanup invisible particles
  useEffect(() => {
    setParticles((prev) => prev.filter((particle) => particle.ref.current?.visible !== false));
  }, [particles]);

  // === Frame Updates ===
  useFrame((state, delta) => {
    if (!ref.current) return;

    // Normalize yaw to -π to π
    ref.current.rotation.y = (ref.current.rotation.y + Math.PI) % (2 * Math.PI) - Math.PI;

    // Apply yaw rotation
    ref.current.rotation.y += (yaw - 128) * -ROTATION_SPEED;

    // Normalize yaw to 0–360 degrees for Redux
    let yawDegrees = (ref.current.rotation.y * (180 / Math.PI)) % 360;
    if (yawDegrees < 0) yawDegrees += 360;

    // Dispatch normalized yaw to Redux
    dispatch(updateDroneRotation({
      x: ref.current.rotation.x.toFixed(2),
      y: yawDegrees.toFixed(2),
      z: ref.current.rotation.z.toFixed(2),
    }));

    // Movement logic
    // Movement logic with adjusted roll calculation
    const yawRadians = ref.current.rotation.y;

    // Forward/Backward Movement (Pitch)
    ref.current.position.x += Math.sin(yawRadians) * (pitch - 512) * -MOVEMENT_SPEED;
    ref.current.position.z += Math.cos(yawRadians) * (pitch - 512) * -MOVEMENT_SPEED;

    // Left/Right Movement (Roll) with correction for orientation
    const rollFactorX = Math.cos(yawRadians) * (roll - 508) * MOVEMENT_SPEED;
    const rollFactorZ = Math.sin(yawRadians) * (roll - 508) * MOVEMENT_SPEED;

    ref.current.position.x -= rollFactorX;
    ref.current.position.z += rollFactorZ;

    // Up/Down Movement (Throttle)
    ref.current.position.y += (throttle - 156) * MOVEMENT_SPEED * 2;

    // Tilt logic
    // Tilt logic with dynamic adjustment based on drone orientation
    const pitchTiltFactor = Math.cos(yawRadians); // Forward/backward relative to yaw
       
    // Adjust rollTiltFactor to handle 180° to 360° inversion
    const rollTiltFactor = Math.sign(Math.cos(yawRadians)) * Math.sin(yawRadians); // Left/right relative to yaw

    const targetPitchTilt = ((pitch - 512) / 512) * MAX_TILT_ANGLE * pitchTiltFactor;
    const targetRollTilt = ((roll - 508) / 512) * MAX_TILT_ANGLE * rollTiltFactor;

    // Smooth tilt transitions
    ref.current.rotation.x += (-targetPitchTilt - ref.current.rotation.x) * SMOOTHING_FACTOR;
    ref.current.rotation.z += (-targetRollTilt - ref.current.rotation.z) * SMOOTHING_FACTOR;

    // Anomaly Interaction
    const dronePosition = ref.current.position;
    const distanceToAnomaly = dronePosition.distanceTo(ANOMALY_POSITION);

    if (distanceToAnomaly < ANOMALY_RADIUS) {
      const direction = dronePosition.clone().sub(ANOMALY_POSITION).normalize();
      const repulsionForce = (ANOMALY_RADIUS - distanceToAnomaly) * 0.5; // Adjust strength
      ref.current.position.add(direction.multiplyScalar(repulsionForce));
    }

    // Speed calculation
    const speed = dronePosition.distanceTo(previousPosition.current) / delta;
    previousPosition.current.copy(dronePosition);

    // Dispatch position and speed to Redux
    dispatch(updateDroneSpeed(speed.toFixed(2)));
    dispatch(updateDronePosition({
      x: dronePosition.x.toFixed(2),
      y: dronePosition.y.toFixed(2),
      z: dronePosition.z.toFixed(2),
    }));

    // Fire particle with Button 1
    if (buttons[0] === 1) {
      dropParticle();
    }
  });

  return (
    <>
      <primitive ref={ref} object={scene} scale={10} />
      {particles.map((particle) => (
        <Particle key={particle.id} ref={particle.ref} position={particle.position} />
      ))}
    </>
  );
});

const Drone = forwardRef((props, ref) => (
  <Suspense fallback={null}>
    <DroneModel ref={ref} {...props} />
  </Suspense>
));

export default Drone;
