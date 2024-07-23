import React, { useRef, useEffect, useState } from 'react';
import { DoubleSide, AdditiveBlending, VideoTexture } from 'three';
import { useSpring, animated } from '@react-spring/three';

const PlaneVideo = ({ position, rotation, scale, visible, videoUrl, width, height, opacityValue = 1 }) => {
    const meshRef = useRef(null);
    const videoRef = useRef(null);
    const [videoTexture, setVideoTexture] = useState(null);

    const { opacity } = useSpring({
        opacity: visible ? opacityValue : 0,
        config: { duration: 1600 },
        delay: 800,
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
                videoRef.current.currentTime = 1;
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
        <animated.mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
            <planeGeometry args={[width, height]} />
            {videoTexture && (
                <animated.meshStandardMaterial
                    map={videoTexture}
                    side={DoubleSide}
                    blending={AdditiveBlending}
                    depthWrite={false}
                    opacity={opacity}
                    transparent={true}
                />
            )}
        </animated.mesh>
    );
}

export default PlaneVideo;
