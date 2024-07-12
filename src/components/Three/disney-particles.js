import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
#define PI 3.1415926535897932384626433832795
varying vec2 vUv;

vec2 rotate(vec2 uv, float rotation, vec2 mid) {
    return vec2(
        cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
        cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}

void main() {
    vec2 rotatedUv = rotate(vUv, 1.5, vec2(0.5)); // Change rotation angle to 1.5 radians
    // Adjust UV coordinates for smooth transitions at the borders
    vec2 uv = vec2(rotatedUv.x, 1.0 - rotatedUv.y); // Invert Y-axis to match the plane orientation

    float strength = 0.11 / (distance(vec2(uv.x, (uv.y - 0.5) * 5.0 + 0.5), vec2(0.5))); // Increase the divisor for larger size
    strength *= 0.11 / (distance(vec2(uv.y, (uv.x - 0.5) * 5.0 + 0.5), vec2(0.5))); // Increase the divisor for larger size

    // Final color
    vec3 blackColor = vec3(0.15);
    vec3 uvColor = vec3(uv, 1.3);
    vec3 mixedColor = mix(blackColor, uvColor, strength);

    // Control transparency based on strength
    float alpha = smoothstep(0.07, 0.6, strength); // Adjust the threshold values as needed

    gl_FragColor = vec4(mixedColor, alpha);
}
`;

export const Plane = ({ position, shouldTwinkle, shouldMove, moveBy, moveDur }) => {
    const planeMesh = useRef();
    const { camera } = useThree();
    const twinkleRef = useRef({ scale: 1, direction: 1 });
    const moveRef = useRef({
        start: null,
        end: null,
        duration: moveDur || 25000,
        elapsedTime: 0,
        direction: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize(),
    });

    useFrame((state, delta) => {
        if (planeMesh.current) {
            planeMesh.current.lookAt(camera.position);

            if (shouldTwinkle) {
                // Update the scale value
                twinkleRef.current.scale += 0.004 * twinkleRef.current.direction;

                // Reverse the direction when the scale reaches the min or max value
                if (twinkleRef.current.scale >= 1.2 || twinkleRef.current.scale <= 0.8) {
                    twinkleRef.current.direction *= -1;
                }

                // Apply the updated scale to the plane
                planeMesh.current.scale.set(
                    twinkleRef.current.scale,
                    twinkleRef.current.scale,
                    twinkleRef.current.scale
                );
            }
            if (shouldMove) {
                let { start, end, duration, elapsedTime, direction } = moveRef.current;

                if (!start || !end) {
                    // Initialize start and end positions
                    start = planeMesh.current.position.clone();
                    end = new THREE.Vector3(
                        position[0] + (moveBy ? moveBy.x : 10) * direction.x,
                        position[1] + (moveBy ? moveBy.y : 10) * direction.y,
                        position[2] + (moveBy ? moveBy.z : 10) * direction.z
                    );
                    moveRef.current = { start, end, duration, elapsedTime: 0, direction };
                } else {
                    // Update the elapsed time
                    elapsedTime += delta * 1000;

                    if (elapsedTime >= duration) {
                        // Reset the elapsed time and update start, end, and direction
                        elapsedTime = 0;
                        start.copy(end);
                        direction.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
                        end = new THREE.Vector3(
                            start.x + (moveBy ? moveBy.x : 10) * direction.x,
                            start.y + (moveBy ? moveBy.y : 10) * direction.y,
                            start.z + (moveBy ? moveBy.z : 10) * direction.z
                        );
                    }

                    // Interpolate between start and end positions
                    const t = elapsedTime / duration;
                    planeMesh.current.position.lerpVectors(start, end, t);

                    moveRef.current = { start, end, duration, elapsedTime, direction };
                }
            }
        }
    });

    return (
        <mesh ref={planeMesh} position={position}>
            <planeGeometry args={[1.8, 1.8]} />
            <shaderMaterial
                fragmentShader={fragmentShader}
                vertexShader={vertexShader}
                transparent={true}
                depthTest={true}
                opacity={0}
            />
        </mesh>
    );
};