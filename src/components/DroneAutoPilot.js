import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const DroneAutoPilot = ({ droneRef }) => {
  const waypoints = [
    new THREE.Vector3(0, 5, 0),
    new THREE.Vector3(10, 5, 10),
    new THREE.Vector3(20, 5, 0),
    new THREE.Vector3(10, 5, -10),
    new THREE.Vector3(0, 5, 0),
  ];

  const [currentWaypointIndex, setCurrentWaypointIndex] = useState(0);
  const progressRef = useRef(0); // Progress between waypoints

  useFrame((_, delta) => {
    if (!droneRef.current) return;

    // Get current and next waypoint
    const currentWaypoint = waypoints[currentWaypointIndex];
    const nextWaypoint =
      waypoints[(currentWaypointIndex + 1) % waypoints.length]; // Loop back to start

    // Lerp between waypoints
    progressRef.current += delta * 0.1; // Adjust speed
    const lerpPosition = new THREE.Vector3().lerpVectors(
      currentWaypoint,
      nextWaypoint,
      progressRef.current
    );
    droneRef.current.position.copy(lerpPosition);

    // Move to next waypoint when progress is complete
    if (progressRef.current >= 1) {
      progressRef.current = 0;
      setCurrentWaypointIndex((index) => (index + 1) % waypoints.length);
    }

    // Rotate the drone to face the direction of travel
    const direction = new THREE.Vector3()
      .subVectors(nextWaypoint, currentWaypoint)
      .normalize();
    droneRef.current.lookAt(
      droneRef.current.position.clone().add(direction)
    );
  });

  return null;
};

export default DroneAutoPilot;
