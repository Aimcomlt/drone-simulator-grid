import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import { PerspectiveCamera } from '@react-three/drei';
import useJoystick from './hooks/useJoystick';
import Drone from './components/Drone';
import Anomaly from './components/Anomaly';
import BoundaryCube from './components/BoundaryCube';
import MapManager from './components/MapManager';
import CameraManager from './components/CameraManager';
import JoystickStatus from './components/UI/JoystickStatus';
import DroneTracker from './components/UI/DroneTracker';
import MapSelector from './components/UI/MapSelector';
import GameControls from './components/UI/GameControls';
import CircularMiniMap from './components/UI/CircularMiniMap';
import MiniMap from './components/UI/MiniMap';
import DroneAutoPilot from './components/DroneAutoPilot';
import DroneOrbit from './components/DroneOrbit';

const App = () => {
  const droneRef = useRef(); // Reference for the Drone
  const anomalyRef = useRef(); // Reference for the Anomaly

  // Initialize joystick controls
  useJoystick();

  // State for focus toggle
  const [focusTarget, setFocusTarget] = useState('drone'); // 'drone' or 'anomaly'

  // State for drone behavior mode
  const [droneMode, setDroneMode] = useState('manual'); // 'manual', 'autoPilot', or 'orbit'

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        background: 'linear-gradient(180deg, #000428, rgb(0, 35, 66))', // Tron-like gradient background
      }}
    >
      {/* Toggle Focus Button */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '150px',
          padding: '10px',
          backgroundColor: 'rgba(0, 0, 0, 0.89)',
          color: 'white',
          cursor: 'pointer',
          borderRadius: '8px',
          zIndex: 100,
        }}
        onClick={() => setFocusTarget((prev) => (prev === 'drone' ? 'anomaly' : 'drone'))}
      >
        Focus: {focusTarget === 'drone' ? 'Drone' : 'Anomaly'}
      </div>

      {/* Toggle Drone Mode Button */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '275px',
          padding: '10px',
          backgroundColor: 'rgba(0, 0, 0, 0.89)',
          color: 'white',
          cursor: 'pointer',
          borderRadius: '8px',
          zIndex: 100,
        }}
        onClick={() =>
          setDroneMode((prev) =>
            prev === 'manual' ? 'autoPilot' : prev === 'autoPilot' ? 'orbit' : 'manual'
          )
        }
      >
        Mode: {droneMode === 'manual' ? 'Manual' : droneMode === 'autoPilot' ? 'AutoPilot' : 'Orbit'}
      </div>

      <Canvas shadows>
        {/* Camera Setup */}
        <PerspectiveCamera makeDefault position={[0, 5, 10]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} />
        <color attach="background" args={['#000000']} />

        <Physics gravity={[0, -9.8, 0]} iterations={10}>
          {/* Grid Map Manager */}
          <MapManager />

          {/* Drone */}
          <Drone ref={droneRef} />

          {/* Anomaly */}
          <Anomaly ref={anomalyRef} />

          {/* Boundary Cube */}
          <BoundaryCube objects={[droneRef.current]} />
        </Physics>

        {/* Camera Manager */}
        <CameraManager
          droneRef={droneRef}
          anomalyRef={anomalyRef}
          focusTarget={focusTarget}
        />

        {/* Drone Behavior Logic */}
        {droneMode === 'autoPilot' && <DroneAutoPilot droneRef={droneRef} />}
        {droneMode === 'orbit' && (
          <DroneOrbit
            droneRef={droneRef}
            anomalyRef={anomalyRef}
            radius={20}
            speed={0.5}
            height={5}
          />
        )}
      </Canvas>

      {/* UI Components */}
      <JoystickStatus />
      <DroneTracker />
      <MapSelector />
      <GameControls />
      <CircularMiniMap droneRef={droneRef} />
      <MiniMap droneRef={droneRef} />
    </div>
  );
};

export default App;
