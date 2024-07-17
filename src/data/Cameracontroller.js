import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';

const easeInOutQuad = (t) => {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
};

const CameraController = ({ targetPosition = [0, 0, 0], lookAtPosition = [0, 0, 0], duration = 1, onComplete, setControlsTarget }) => {
    const { camera } = useThree();
    const initialPosition = useRef(camera.position.clone());
    const targetRef = useRef(new Vector3(...targetPosition));
    const lookAtRef = useRef(new Vector3(...lookAtPosition));
    const startTimeRef = useRef(performance.now());

    useEffect(() => {
        if (Array.isArray(targetPosition) && targetPosition.length === 3) {
            targetRef.current.set(...targetPosition);
        } else {
            console.error('targetPosition must be an array of three numbers');
        }

        if (Array.isArray(lookAtPosition) && lookAtPosition.length === 3) {
            lookAtRef.current.set(...lookAtPosition);
        } else {
            console.error('lookAtPosition must be an array of three numbers');
        }

        initialPosition.current.copy(camera.position);
        startTimeRef.current = performance.now();
    }, [targetPosition, lookAtPosition, camera.position]);

    useFrame(() => {
        const elapsedTime = (performance.now() - startTimeRef.current) / 1000;
        const progress = Math.min(elapsedTime / duration, 1);
        const easedProgress = easeInOutQuad(progress);

        camera.position.lerpVectors(initialPosition.current, targetRef.current, easedProgress);
        camera.lookAt(lookAtRef.current);

        if (progress === 1) {
            if (setControlsTarget) {
                setControlsTarget(targetRef.current);
            }
            if (onComplete) {
                onComplete();
            }
        }
    });

    return null;
};

export default CameraController;