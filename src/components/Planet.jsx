// src/components/Planet.jsx
import React, { useMemo, useRef } from 'react';
import { Sphere, MeshStandardMaterial, Stars, Line } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedTileId } from '../store/settingsSlice';
import { unlockTile } from '../store/progressSlice';
import * as THREE from 'three';

const Planet = ({ tileCount }) => {
  const dispatch = useDispatch();
  const selectedTileId = useSelector((state) => state.settings.selectedTileId);
  const unlockedTiles = useSelector((state) => state.progress.unlockedTiles);
  const hoveredTile = useSelector((state) => state.progress.hoveredTile);
  const tiles = useMemo(() => generateTiles(tileCount), [tileCount]);
  const tileRefs = useRef({});

  function generateTiles(count) {
    const tileArray = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      tileArray.push({ id: i, position: [x * 5, y * 5, z * 5] });
    }
    return tileArray;
  }

  const handleTileClick = (id) => {
    dispatch(setSelectedTileId(id));
    dispatch(unlockTile(id));
  };

  const handlePointerOver = (id) => {
    dispatch(unlockTile(id));
  };

  // Pulsating effect on hovered tile
  useFrame(() => {
    if (hoveredTile !== null && tileRefs.current[hoveredTile]) {
      const scale = 1 + Math.sin(Date.now() * 0.005) * 0.1;
      tileRefs.current[hoveredTile].scale.set(scale, scale, scale);
    }
    Object.entries(tileRefs.current).forEach(([id, mesh]) => {
      if (Number(id) !== hoveredTile) {
        mesh.scale.set(1, 1, 1);
      }
    });
  });

  // Generate connection lines between adjacent tiles
  const generateConnectionLines = () => {
    if (hoveredTile === null) return null;
    const hoveredPos = new THREE.Vector3(...tiles[hoveredTile].position);
    return tiles.map((tile) => {
      const tilePos = new THREE.Vector3(...tile.position);
      if (hoveredPos.distanceTo(tilePos) < 2) {
        return (
          <Line
            key={`line-${hoveredTile}-${tile.id}`}
            points={[hoveredPos, tilePos]}
            color="cyan"
            lineWidth={1}
            dashed
          />
        );
      }
      return null;
    });
  };

  return (
    <group>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
      {tiles.map((tile) => (
        <mesh
          key={tile.id}
          ref={(el) => (tileRefs.current[tile.id] = el)}
          position={tile.position}
          onClick={() => handleTileClick(tile.id)}
          onPointerOver={() => handlePointerOver(tile.id)}
        >
          <Sphere args={[0.2, 16, 16]}>
            <MeshStandardMaterial 
              color={hoveredTile === tile.id ? '#FFD700' : '#4CAF50'} 
              emissive={selectedTileId === tile.id ? '#FF4500' : hoveredTile === tile.id ? '#FFFF00' : '#000000'}
              emissiveIntensity={selectedTileId === tile.id ? 1 : 0.5}
            />
          </Sphere>
        </mesh>
      ))}
      {generateConnectionLines()}
    </group>
  );
};

export default Planet;
