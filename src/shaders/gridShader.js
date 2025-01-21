import * as THREE from 'three';

export const gridShader = {
    uniforms: {
      color: { value: new THREE.Color('red') },
      opacity: { value: 0.5 },
      time: { value: 0 },
      gridSpacing: { value: 50 },
    },
    vertexShader: `
      varying vec3 vPosition;
      void main() {
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 color;
      uniform float opacity;
      uniform float time;
      uniform float gridSpacing;
      varying vec3 vPosition;
  
      void main() {
        float gridX = abs(mod(vPosition.x + time * 10.0, 50.0) - 25.0) < 0.5 ? 1.0 : 0.0;
        float gridY = abs(mod(vPosition.y + time * 10.0, 50.0) - 25.0) < 0.5 ? 1.0 : 0.0;
        float gridZ = abs(mod(vPosition.z + time * 10.0, 50.0) - 25.0) < 0.5 ? 1.0 : 0.0;
        float intensity = gridX + gridY + gridZ;
        float depthFade = 1.0 - smoothstep(0.0, 1000.0, length(vPosition));
        gl_FragColor = vec4(color, opacity * intensity * depthFade);
      }
    `,
  };
  
