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

uniform float emissiveIntensity;

vec2 rotate(vec2 uv, float rotation, vec2 mid) {
    return vec2(
        cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
        cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}

void main() {
    vec2 rotatedUv = rotate(vUv, 1.5, vec2(0.5));
    vec2 uv = vec2(rotatedUv.x, 1.0 - rotatedUv.y);

    float strength = 0.11 / (distance(vec2(uv.x, (uv.y - 0.5) * 5.0 + 0.5), vec2(0.5)));
    strength *= 0.11 / (distance(vec2(uv.y, (uv.x - 0.5) * 5.0 + 0.5), vec2(0.5)));

    vec3 blackColor = vec3(0.15);
    vec3 uvColor = vec3(uv, 1.3) * emissiveIntensity; // Apply emissive intensity
    vec3 mixedColor = mix(blackColor, uvColor, strength);

    float alpha = smoothstep(0.07, 0.6, strength);

    // Discard fragments outside the circle
    if (distance(vUv, vec2(0.5)) > 0.3) {
        discard;
    }

    float edgeDistance = distance(vUv, vec2(0.5));
    float edgeSoftness = 0.1;
    float circleMask = smoothstep(0.5, 0.5 - edgeSoftness, edgeDistance);
    gl_FragColor = vec4(mixedColor, alpha * circleMask);
}
`;

export const Plane = ({ position, shouldTwinkle, shouldMove, moveBy, moveDur, emissiveIntensity = 0.45 }) => {
    const planeMesh = useRef();
    const materialRef = useRef();
    const { camera } = useThree();
    const twinkleRef = useRef({ scale: 1, direction: 1 });
    const moveRef = useRef({
        start: new THREE.Vector3(),
        end: new THREE.Vector3(),
        duration: moveDur || 25000,
        elapsedTime: 0,
        direction: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize(),
    });

    useFrame((state, delta) => {
        if (planeMesh.current) {
            planeMesh.current.lookAt(camera.position);

            if (shouldTwinkle) {
                twinkleRef.current.scale += 0.004 * twinkleRef.current.direction;
                if (twinkleRef.current.scale >= 1.2 || twinkleRef.current.scale <= 0.8) {
                    twinkleRef.current.direction *= -1;
                }
                planeMesh.current.scale.set(twinkleRef.current.scale, twinkleRef.current.scale, twinkleRef.current.scale);
            }

            if (shouldMove) {
                let { start, end, duration, elapsedTime, direction } = moveRef.current;

                if (elapsedTime === 0) {
                    start.copy(planeMesh.current.position);
                    end.set(
                        position[0] + (moveBy ? moveBy.x : 10) * direction.x,
                        position[1] + (moveBy ? moveBy.y : 10) * direction.y,
                        position[2] + (moveBy ? moveBy.z : 10) * direction.z
                    );
                }

                elapsedTime += delta * 1000;
                if (elapsedTime >= duration) {
                    elapsedTime = 0;
                    start.copy(end);
                    direction.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
                    end.set(
                        start.x + (moveBy ? moveBy.x : 10) * direction.x,
                        start.y + (moveBy ? moveBy.y : 10) * direction.y,
                        start.z + (moveBy ? moveBy.z : 10) * direction.z
                    );
                }

                const t = elapsedTime / duration;
                planeMesh.current.position.lerpVectors(start, end, t);

                moveRef.current.elapsedTime = elapsedTime;
            }
        }

        // Update the emissive intensity uniform
        if (materialRef.current) {
            materialRef.current.uniforms.emissiveIntensity.value = emissiveIntensity;
        }
    });

    return (
        <mesh ref={planeMesh} position={position}>
            <circleGeometry args={[0.9, 32]} />
            <shaderMaterial
                ref={materialRef}
                fragmentShader={fragmentShader}
                vertexShader={vertexShader}
                transparent={true}
                opacity={0}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                depthTest={false}
                uniforms={{ emissiveIntensity: { value: emissiveIntensity } }}
            />
        </mesh>
    );
};
