import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { TextureLoader, sRGBEncoding, MeshBasicMaterial } from 'three';
import * as THREE from 'three';
import CameraController from '@/data/Cameracontroller';

export const Hotspot = ({ position, rotation, scale, onClick, visible, cameraTarget, enableCameraMovement = true, texture = '/icons/Pointer.png' }) => {
    const hotspotRef = useRef();
    const { camera } = useThree();
    const [baseScale] = useState(scale); // Initial scale
    const timeRef = useRef(0); // Time accumulator for animation
    const [isHotspotClicked, setIsHotspotClicked] = useState(false); // State to track hotspot click
    const [shouldReturn, setShouldReturn] = useState(false); // State to handle return animation
    const initialCameraPositionRef = useRef(camera.position.clone()); // Store initial camera position
    const [hotspotMaterial, setHotspotMaterial] = useState(null);

    useEffect(() => {
        if (isHotspotClicked && visible) {
            setIsHotspotClicked(false); // Reset the state when the hotspot is not visible
            if (enableCameraMovement) {
                setShouldReturn(true); // Trigger return animation
                setTimeout(() => {
                    setShouldReturn(false);
                }, 1500);
            }
        }
    }, [visible, isHotspotClicked, enableCameraMovement]);

    useEffect(() => {
        const loader = new TextureLoader();
        loader.load(
            texture,
            (loadedTexture) => {
                // Apply gamma correction to the texture
                loadedTexture.encoding = sRGBEncoding;
                loadedTexture.anisotropy = 16;
                loadedTexture.needsUpdate = true;
                loadedTexture.minFilter = THREE.LinearFilter;
                setHotspotMaterial(new MeshBasicMaterial({
                    map: loadedTexture,
                    transparent: true, // Ensure transparency is turned on
                    opacity: 1.0, // Ensure full opacity
                    depthWrite: false, // Prevents writing to the depth buffer
                    side: THREE.DoubleSide,
                }));
            },
            undefined,
            (err) => {
                console.error('An error occurred loading the texture:', err);
            }
        );
    }, [texture]);

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

    const handleHotspotClick = () => {
        if (enableCameraMovement) {
            initialCameraPositionRef.current.copy(camera.position); // Store the current camera position
            setIsHotspotClicked(true); // Set the state to true when the hotspot is clicked
        }
        onClick(); // Call the onClick function passed as a prop
    };

    return (
        <>
            {hotspotMaterial && (
                <mesh
                    onClick={handleHotspotClick}
                    ref={hotspotRef}
                    position={position}
                    rotation={rotation}
                    material={hotspotMaterial}
                    visible={visible} // Use the 'visible' prop to control visibility
                    enableCameraMovement={enableCameraMovement}
                >
                    <circleGeometry args={[0.5, 32]} />
                </mesh>
            )}
            {isHotspotClicked && !shouldReturn && enableCameraMovement && (
                <CameraController
                    targetPosition={cameraTarget}
                    duration={1.5}
                />
            )}
            {shouldReturn && enableCameraMovement && (
                <CameraController
                    targetPosition={initialCameraPositionRef.current.toArray()}
                    duration={1.5}
                />
            )}
        </>
    );
};
