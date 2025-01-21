//import React, { useMemo } from 'react';
//import * as THREE from 'three';
//import { createNoise2D } from 'simplex-noise';  // ✅ Correct import
import Anomaly from '../Anomaly';

const TronGrid = () => {
  return (
    <>
      <gridHelper
        args={[500, 100, 'rgb(0, 104, 231)', 'rgb(0, 104, 231)']}
        position={[0, 0, 0]}
        material-transparent={true}
        material-opacity={0.8} // Apply opacity
      />
      <Anomaly position={[0, 0, 0]} radius={10} />
    </>
  );
};
/*
const TronMountain = () => {
  const geometry = useMemo(() => {
    const size = 200;        // Mountain size
    const segments = 90;   // Grid detail
    const geo = new THREE.PlaneGeometry(size, size, segments, segments);
    const noise2D = createNoise2D();  // ✅ Correct usage

    // Apply noise for mountain effect
    for (let i = 0; i < geo.attributes.position.count; i++) {
      const x = geo.attributes.position.getX(i);
      const y = geo.attributes.position.getY(i);

      // Apply noise only in the central area of the grid
      const distance = Math.sqrt(x * x + y * y);
      const height =
        distance < 150
          ? noise2D(x * 0.07, y * 0.07) * (10 - distance * .06)  // ✅ Correct noise call
          : 0;

      geo.attributes.position.setZ(i, height);
    }

    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh geometry={geometry} rotation-x={-Math.PI / 2} position={[-100, 0, -100]}>
      <meshStandardMaterial
        color={'#0d0d0d'}          // Dark base color
        emissive={'rgb(0, 104, 231)'}       // Tron blue glow
        emissiveIntensity={0.8}    // Glow strength
        wireframe={true}           // Tron-style grid
      />
    </mesh>
  );
};

const TronMountain001 = () => {
  const geometry = useMemo(() => {
    const size = 200;        // Mountain size
    const segments = 200;   // Grid detail
    const geo = new THREE.PlaneGeometry(size, size, segments, segments);
    const noise2D = createNoise2D();  // ✅ Correct usage

    // Apply noise for mountain effect
    for (let i = 0; i < geo.attributes.position.count; i++) {
      const x = geo.attributes.position.getX(i);
      const y = geo.attributes.position.getY(i);

      // Apply noise only in the central area of the grid
      const distance = Math.sqrt(x * x + y * y);
      const height =
        distance < 150
          ? noise2D(x * 0.01, y * 0.01) * (10 - distance * .06)  // ✅ Correct noise call
          : 0;

      geo.attributes.position.setZ(i, height);
    }

    geo.computeVertexNormals();
    return geo;
  }, []);

  return (

    <mesh geometry={geometry} rotation-x={-Math.PI / 2} position={[100, 0, 100]}>
      <meshStandardMaterial
        color={'#0d0d0d'}          // Dark base color
        emissive={'rgb(0, 104, 231)'}       // Tron blue glow
        emissiveIntensity={0.8}    // Glow strength
        wireframe={true}           // Tron-style grid
      />
    </mesh>
  );
};

const TronMountain002 = () => {
  const geometry = useMemo(() => {
    const size = 200;        // Mountain size
    const segments = 90;   // Grid detail
    const geo = new THREE.PlaneGeometry(size, size, segments, segments);
    const noise2D = createNoise2D();  // ✅ Correct usage

    // Apply noise for mountain effect
    for (let i = 0; i < geo.attributes.position.count; i++) {
      const x = geo.attributes.position.getX(i);
      const y = geo.attributes.position.getY(i);

      // Apply noise only in the central area of the grid
      const distance = Math.sqrt(x * x + y * y);
      const height =
        distance < 150
          ? noise2D(x * 0.01, y * 0.01) * (10 - distance * .06)  // ✅ Correct noise call
          : 0;

      geo.attributes.position.setZ(i, height);
    }

    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh geometry={geometry} rotation-x={-Math.PI / 2} position={[-100, 0, 100]}>
      <meshStandardMaterial
        color={'#0d0d0d'}          // Dark base color
        emissive={'rgb(0, 104, 231)'}       // Tron blue glow
        emissiveIntensity={0.8}    // Glow strength
        wireframe={true}           // Tron-style grid
      />
    </mesh>
  );
};

const TronMountain003 = () => {
  const geometry = useMemo(() => {
    const size = 200;        // Mountain size
    const segments = 90;   // Grid detail
    const geo = new THREE.PlaneGeometry(size, size, segments, segments);
    const noise2D = createNoise2D();  // ✅ Correct usage

    // Apply noise for mountain effect
    for (let i = 0; i < geo.attributes.position.count; i++) {
      const x = geo.attributes.position.getX(i);
      const y = geo.attributes.position.getY(i);

      // Apply noise only in the central area of the grid
      const distance = Math.sqrt(x * x + y * y);
      const height =
        distance < 150
          ? noise2D(x * 0.01, y * 0.01) * (10 - distance * .06)  // ✅ Correct noise call
          : 0;

      geo.attributes.position.setZ(i, height);
    }

    geo.computeVertexNormals();
    return geo;
  }, []);

  return (

    <mesh geometry={geometry} rotation-x={-Math.PI / 2} position={[100, 0, -100]}>
      <meshStandardMaterial
        color={'#0d0d0d'}          // Dark base color
        emissive={'rgb(0, 104, 231)'}       // Tron blue glow
        emissiveIntensity={0.8}    // Glow strength
        wireframe={true}           // Tron-style grid
      />
    </mesh>
  );
};

*/

const GridMap = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={0.8} />
      <TronGrid />       {/* Base Tron grid */}
      {/*<TronMountain />    Procedural mountain 
      <TronMountain001 />
      <TronMountain002 />
      <TronMountain003 />*/}
    </>
  );
};

export default GridMap;
