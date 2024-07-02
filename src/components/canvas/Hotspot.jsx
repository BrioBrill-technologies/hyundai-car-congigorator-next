import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { TextureLoader, Vector3 } from 'three';
import * as THREE from 'three';
import CameraController from '@/data/Cameracontroller';

export const Hotspot = ({ position, rotation, scale, onClick, visible, cameraTarget }) => {
    const hotspotRef = useRef();
    const { camera } = useThree();
    const [baseScale] = useState(scale); // Initial scale
    const timeRef = useRef(0); // Time accumulator for animation
    const [isHotspotClicked, setIsHotspotClicked] = useState(false); // State to track hotspot click
    const [shouldReturn, setShouldReturn] = useState(false); // State to handle return animation
    const initialCameraPositionRef = useRef(camera.position.clone()); // Store initial camera position

    useEffect(() => {
        if (isHotspotClicked && visible) {
            setIsHotspotClicked(false); // Reset the state when the hotspot is not visible
            setShouldReturn(true); // Trigger return animation after 5 seconds
            setTimeout(() => {
                setShouldReturn(false);
            }, 1500);
        }
    }, [visible, isHotspotClicked]);

    useFrame((state, delta) => {
        if (hotspotRef.current) {
            hotspotRef.current.lookAt(camera.position);

            // Update the time accumulator
            timeRef.current += delta;

            // Calculate the new scale based on a sine wave
            const scaleFactor = 0.9 + 0.1 * Math.sin(timeRef.current * 3); // Adjust the multiplier and frequency as needed
            hotspotRef.current.scale.set(
                baseScale[0] * scaleFactor,
                baseScale[1] * scaleFactor,
                baseScale[2] * scaleFactor
            );
        }
    });

    const hotspotMaterial = new THREE.MeshBasicMaterial({
        map: new TextureLoader().load('/icons/Pointer.png'),
        transparent: true,
    });

    const handleHotspotClick = () => {
        initialCameraPositionRef.current.copy(camera.position); // Store the current camera position
        setIsHotspotClicked(true); // Set the state to true when the hotspot is clicked
        onClick(); // Call the onClick function passed as a prop
    };

    return (
        <>
            <mesh
                onClick={handleHotspotClick}
                ref={hotspotRef}
                position={position}
                rotation={rotation}
                material={hotspotMaterial}
                visible={visible} // Use the 'visible' prop to control visibility
            >
                <boxGeometry args={[1, 1, 1]} />
            </mesh>
            {isHotspotClicked && !shouldReturn && (
                <CameraController
                    targetPosition={cameraTarget}
                    duration={1.5}
                />
            )}
            {shouldReturn && (
                <CameraController
                    targetPosition={initialCameraPositionRef.current.toArray()}
                    duration={1.5}
                />
            )}
        </>
    );
};
