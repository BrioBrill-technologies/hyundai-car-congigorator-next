import React, { useRef, useEffect, useState } from 'react';
import { DoubleSide, AdditiveBlending, VideoTexture } from 'three';
import { useSpring, animated } from '@react-spring/three';

const ConeVideo = ({ position, rotation, scale, visible, videoUrl }) => {
    const meshRef = useRef(null);
    const videoRef = useRef(null);
    const [videoTexture, setVideoTexture] = useState(null);

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

    useEffect(() => {
        const video = document.createElement('video');
        video.src = videoUrl;
        video.crossOrigin = 'anonymous';
        video.loop = true;
        video.muted = true; // Muted to avoid autoplay issues
        video.playsInline = true;
        videoRef.current = video;

        const texture = new VideoTexture(video);
        setVideoTexture(texture);

        if (videoRef.current) {
            if (visible) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        }

        return () => {
            video.pause();
            video.remove();
        };
    }, [videoUrl, visible]);

    return (
        <animated.mesh ref={meshRef} position={position} rotation={rotation} scale={animatedScale}>
            <coneGeometry args={[1, 2, 32]} />
            {videoTexture && (
                <animated.meshStandardMaterial
                    color={'orange'}
                    map={videoTexture}
                    side={DoubleSide}
                    blending={AdditiveBlending}
                    opacity={opacity}
                    transparent={true}
                />
            )}
        </animated.mesh>
    );
}

export default ConeVideo;
