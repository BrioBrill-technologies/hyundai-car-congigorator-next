import React, { useRef } from 'react';
import { DoubleSide, AdditiveBlending } from 'three';
import { useSpring, animated } from '@react-spring/three';
import { useVideoTexture } from '@react-three/drei';

const ConeVideo = ({ position, rotation, scale, visible, videoUrl }) => {
    const meshRef = useRef(null);

    const { animatedScale } = useSpring({
        animatedScale: visible ? scale : [0, 0, 0],
        config: { duration: 1000 },
    });

    const videoTexture = useVideoTexture(videoUrl, {
        loop: true, // Ensures the video loops
        start: true, // Starts the video automatically
    });

    return (
        <animated.mesh ref={meshRef} position={position} rotation={rotation} scale={animatedScale}>
            <coneGeometry args={[1, 2, 32]} />
            <meshStandardMaterial
                color={'orange'}
                map={videoTexture}
                side={DoubleSide}
                blending={AdditiveBlending}
                opacity={1}
                transparent={false}
            />
        </animated.mesh>
    );
}

export default ConeVideo;
