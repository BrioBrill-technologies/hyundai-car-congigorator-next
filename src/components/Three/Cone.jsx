import React from 'react';
import { DoubleSide, AdditiveBlending } from 'three';
import { useSpring, animated } from '@react-spring/three';

const Cone = ({ position, rotation, scale, visible }) => {
    const { animatedScale } = useSpring({
        animatedScale: visible ? scale : [0, 0, 0],
        config: { duration: 1000 },
    });

    return (
        <animated.mesh position={position} rotation={rotation} scale={animatedScale}>
            <coneGeometry args={[1, 2, 32]} />
            <meshStandardMaterial
                color="white"
                side={DoubleSide}
                blending={AdditiveBlending}
                opacity={0.07}
                transparent={true}
            />
        </animated.mesh>
    );
}

export default Cone;