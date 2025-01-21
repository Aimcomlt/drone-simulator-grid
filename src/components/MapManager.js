import React, { Suspense, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGLTF } from '@react-three/drei';
import GridMap from './maps/GridMap';  // ✅ Correct import

const MapLoader = ({ mapName }) => {
    const { scene } = useGLTF(mapName !== 'grid' ? `/assets/maps/${mapName}.glb` : '/assets/maps/desert.glb');
    
    return mapName === 'grid' ? <GridMap /> : <primitive object={scene} />;
  };
  

const MapManager = () => {
  const { currentMap } = useSelector((state) => state.map);
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);  // Force reload on map change
  }, [currentMap]);

  return (
    <Suspense fallback={null}>
      <MapLoader key={key} mapName={currentMap} />
    </Suspense>
  );
};

export default MapManager;
