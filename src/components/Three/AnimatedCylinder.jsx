import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { DoubleSide, AdditiveBlending } from 'three'
import { Sparkles } from '@react-three/drei'
import Glow from "./Glow";

const AnimatedCylinder = ({ position = [22, 10, -10.5] }) => {
    const cylinderRef = useRef();
    const [scaleDirection, setScaleDirection] = useState(1);
    useFrame(() => {
        if (cylinderRef.current) {
            cylinderRef.current.scale.y += 0.0004 * scaleDirection; // Slow down the animation
            if (cylinderRef.current.scale.y > 0.2) {
                setScaleDirection(-1);
            } else if (cylinderRef.current.scale.y < 0.1) {
                setScaleDirection(1);
            }
        }
    });

    return (
        <mesh ref={cylinderRef} position={position} scale={[1, 0.2, 1]} rotation={[2.5, 11, 0.6]}>
            <cylinderGeometry args={[1, 1, 10, 32, 1, true]} />
            <meshStandardMaterial
                color="white"
                emissive="purple"
                emissiveIntensity={2}
                side={DoubleSide}
                blending={AdditiveBlending}
                opacity={0.15} // Reduce the opacity
                transparent={true} // Enable transparency
            />
            <Glow scale={2.5} near={-10} color="#3E8EDE" />
        </mesh>
    );
};

export default AnimatedCylinder;
