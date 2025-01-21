export const vortexShader = {
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 color;
      varying vec2 vUv;
      void main() {
        float dist = length(vUv - 0.5);
        gl_FragColor = vec4(color, smoothstep(0.4, 0.1, dist) * sin(time * 3.0));
      }
    `,
  };
  