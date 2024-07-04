import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import Nebula, { SpriteRenderer } from 'three-nebula';
import particleJson from '../../data/my-particle-system.json';

const NebulaComponent = ({ position }) => {
    const { scene } = useThree();
    const nebulaRef = useRef();

    useEffect(() => {
        let isMounted = true;
        let nebula;

        const setupNebula = async () => {
            const loaded = await Nebula.fromJSONAsync(particleJson, THREE);
            const nebulaRenderer = new SpriteRenderer(scene, THREE);
            nebula = loaded.addRenderer(nebulaRenderer);
            nebulaRef.current = nebula;

            const animate = () => {
                if (isMounted) {
                    nebula.update();
                    requestAnimationFrame(animate);
                }
            };

            animate();
        };

        setupNebula();

        // const destroyNebula = () => {
        //     if (nebula) {
        //         // Stop the animation loop
        //         isMounted = false;
        
        //         // Remove all emitters from the scene
        //         nebulaRef.current.emitters.forEach((emitter) => {
        //             // Stop emitter's updates
        //             emitter.destroy();
        //             emitter.removeAllParticles();
        //         });
        
        //         // Destroy the Nebula instance
        //         nebula.destroy();
        //         nebulaRef.current = null;
        //     }
        // };

        // return destroyNebula;
    }, [scene]);

    useEffect(() => {
        if (nebulaRef.current) {
            nebulaRef.current.emitters.forEach((emitter) => {
                emitter.position.value = new THREE.Vector3(...position);
            });
        }
    }, [position]);

    return null;
};

export default NebulaComponent;
