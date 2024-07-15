import React, { useRef } from 'react';
import { DoubleSide, AdditiveBlending } from 'three';
import { useSpring, animated } from '@react-spring/three';
import { useVideoTexture } from '@react-three/drei';

const ConeVideo = ({ position, rotation, scale, visible, videoUrl }) => {
    const meshRef = useRef(null);

    const { opacity } = useSpring({
        opacity: visible ? 0.8 : 0,
        config: { duration: 2700 },
        delay: 700,
    });

    const { animatedScale } = useSpring({
        animatedScale: visible ? scale : [0, 0, 0],
        config: { duration: 1700 },
        delay: 700,
    });

    const videoTexture = useVideoTexture(videoUrl, {
        loop: true,
        start: true,
    });

    return (
        <animated.mesh ref={meshRef} position={position} rotation={rotation} scale={animatedScale}>
            <coneGeometry args={[1, 2, 32]} />
            <animated.meshStandardMaterial
                color={'orange'}
                map={videoTexture}
                side={DoubleSide}
                blending={AdditiveBlending}
                opacity={opacity}
                transparent={true}
            />
        </animated.mesh>
    );
}

export default ConeVideo;
