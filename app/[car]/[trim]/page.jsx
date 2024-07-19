'use client'
import { ExteriorModel } from '@/components/canvas/Examples'
import dynamic from 'next/dynamic'
import * as THREE from 'three'
import { Suspense, useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { cars } from '@/data/cars'
import { Hotspot } from '@/components/canvas/Hotspot'
import { Modal } from '@/components/modal'
import NebulaComponent from '@/components/Three/Nebula'
import { useLoader, useFrame } from '@react-three/fiber'
import Cone from '@/components/Three/Cone'
import { NormalBlending, TextureLoader } from 'three'
import AnimatedCylinder from '@/components/Three/AnimatedCylinder'
import LoaderScreen from '@/components/canvas/loader'
import { Plane } from '@/components/Three/disney-particles'
import ConeVideo from '@/components/Three/ConeVideo'
import ExplosionConfetti from '@/components/Three/Confetti'
import Image from 'next/image'

const textureLoader = new THREE.TextureLoader();

const loadTexture = (url, flipY = false, encoding = THREE.sRGBEncoding) => {
    const texture = textureLoader.load(url);
    texture.flipY = flipY;
    texture.encoding = encoding;
    return texture;
}

// Menu and Audio Textures
const menuTexture = loadTexture('/img/Menu_Screen.png');
const audioTexture = loadTexture('/img/Audio_Screen.png');

// Ioniq5 Textures
const ioniq5TailLightTextureOn = loadTexture('/img/Tail_Light_On_Ioniq5.jpg');
const ioniq5TailLightTextureOff = loadTexture('/img/Tail_Light_Off_Ioniq5.jpg');
const ioniq5HeadLightTextureOn = loadTexture('/img/Head_Light_On_Ioniq5.png');
const ioniq5HeadLightTextureOff = loadTexture('/img/Head_Light_Off_Ioniq5.jpg');

// Ioniq6 Textures
const ioniq6HeadLightTextureOn = loadTexture('/img/Head_Light_On_Ioniq6.jpg');
const ioniq6HeadLightTextureOff = loadTexture('/img/Head_Light_Off_Ioniq6.jpg');
const ioniq6TailLightTextureOn = loadTexture('/img/Tail_Light_On_Ioniq6.jpg');
const ioniq6TailLightTextureOff = loadTexture('/img/Tail_Light_Off_Ioniq6.jpg');
const ioniq6CenterTailLightTextureOn = loadTexture('/img/Tail_Light_On_Center_Ioniq6.jpg');
const ioniq6CenterTailLightTextureOff = loadTexture('/img/Tail_Light_Off_Center_Ioniq6.jpg');

const generatePlanes = () => {
    return new Array(45).fill().map((_, i) => ({
        id: i,
        position: [
            (Math.random() - 0.5) * 20, // Adjusted range for x coordinate
            (Math.random() - 0.5) * 10, // Adjusted range for y coordinate
            (Math.random() - 0.5) * 25, // Adjusted range for z coordinate
        ],
        shouldTwinkle: Math.random() < 0.5, // Randomly determine if the plane should twinkle
        shouldMove: Math.random() < 0.3, // Randomly determine if the plane should move
    }));
};

const planes = generatePlanes();

const View = dynamic(
    () => import('@/components/canvas/View').then((mod) => mod.View),
    {
        ssr: false,
        loading: () => (
            <div className='fixed inset-0 z-50 flex flex-col items-center justify-center bg-white'>
                Loading...
            </div>
        ),
    }
);

const Exterior = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Exterior), { ssr: false })

const ImagePlane = ({ imageUrl, position, rotation, scale, visible, animate = false }) => {
    const texture = useLoader(TextureLoader, imageUrl);
    const meshRef = useRef();
    const [elapsed, setElapsed] = useState(0);

    useFrame((state, delta) => {
        if (animate) {
            setElapsed(elapsed + delta);
            const newY = position[1] + Math.sin(elapsed * 3) * 0.5; // Adjust the values for desired effect
            meshRef.current.position.set(position[0], newY, position[2]);
        } else {
            meshRef.current.position.set(position[0], position[1], position[2]);
        }
    });

    return (
        <mesh ref={meshRef} rotation={rotation} scale={scale}>
            <planeGeometry attach="geometry" args={[5, 5]} />
            <meshStandardMaterial
                attach="material"
                map={texture}
                transparent={true}
                blending={NormalBlending}
                visible={visible}
            />
        </mesh>
    );
};

export default function Page({ params }) {
    let { car, trim } = params
    car = decodeURIComponent(car)
    trim = decodeURIComponent(trim)
    const router = useRouter()
    const [disable, setDisable] = useState(false)
    const [start, setStart] = useState(true)
    const [exteriorColor, setExteriorColor] = useState('')
    const [interiorColor, setInteriorColor] = useState('')
    const [selectedAmbientColor, setSelectedAmbientColor] = useState(Object.keys(cars[car][trim].ambientLight)[0])
    const [selectedColor, setSelectedColor] = useState(Object.keys(cars[car][trim].exteriorColors)[0])
    const [showHotspot, setShowHotspot] = useState(false)
    const [hotspotTitle, setHotspotTitle] = useState('')
    const [hotspotDescription, setHotspotDescription] = useState('')
    const [showNebula, setShowNebula] = useState(false);
    const [showAmbient, setShowAmbient] = useState(false)
    const [showCone, setShowCone] = useState(false); // Add state for cone 
    const [cameraPosition, setCameraPosition] = useState([-60, 0, 0])
    const [minPolar, setMinPolar] = useState([Math.PI / 5])
    const [maxPolar, setMaxPolar] = useState([Math.PI / 2.5])
    const [hasPositionChanged, setHasPositionChanged] = useState(false)
    const [isAudioPlaying, setIsAudioPlaying] = useState(false)
    const [showInteriorHotspots, setShowInteriorHotspots] = useState(false)
    const [showExteriorHotspots, setShowExteriorHotspots] = useState(true)
    const [playOpenAnimation, setPlayOpenAnimation] = useState(false)
    const [isBloomActive, setIsBloomActive] = useState(false);
    const [currentTailLightTexture, setCurrentTailLightTexture] = useState(ioniq6TailLightTextureOff);
    const [currentTailCenterLightTexture, setCurrentCenterTailLightTexture] = useState(ioniq6CenterTailLightTextureOff);
    const [currentHeadLightTexture, setCurrentHeadLightTexture] = useState(ioniq5HeadLightTextureOff);
    const [activateD100, setActivateD100] = useState(false);
    const [isNatureDisplayActive, setIsNatureDisplayActive] = useState(false);
    const [isenableAutoRotate, setEnableAutoRotate] = useState(false);

    useEffect(() => {
        if (showHotspot) setDisable(true)
        else setDisable(false)
        if (car === 'IONIQ5') {
            if (showHotspot && hotspotTitle === 'LED Tail Lights') {
                setTimeout(() => {
                    setCurrentTailLightTexture(prevTexture => prevTexture === ioniq5TailLightTextureOff ? ioniq5TailLightTextureOn : ioniq5TailLightTextureOff);
                }, 1200);
            } else {
                setTimeout(() => {
                    setCurrentTailLightTexture(ioniq5TailLightTextureOff);
                }, 1200)
            }

            if (showHotspot && (hotspotTitle === 'Premium front LED accent lighting' || hotspotTitle === 'LED Projector headlights')) {
                setTimeout(() => {
                    setCurrentHeadLightTexture(prevTexture => prevTexture === ioniq5HeadLightTextureOff ? ioniq5HeadLightTextureOn : ioniq5HeadLightTextureOff);
                }, 1200);
            } else {
                setTimeout(() => {
                    setCurrentHeadLightTexture(ioniq5HeadLightTextureOff);
                }, 1200)
            }
        } else if (car === 'IONIQ6') {
            if (showHotspot && hotspotTitle === 'LED Tail Lights') {
                setTimeout(() => {
                    setCurrentTailLightTexture(prevTexture => prevTexture === ioniq6TailLightTextureOff ? ioniq6TailLightTextureOn : ioniq6TailLightTextureOff);
                    setCurrentCenterTailLightTexture(prevTexture => prevTexture === ioniq6CenterTailLightTextureOff ? ioniq6CenterTailLightTextureOn : ioniq6CenterTailLightTextureOff);
                }, 1200);
            } else {
                setTimeout(() => {
                    setCurrentTailLightTexture(ioniq6TailLightTextureOff);
                    setCurrentCenterTailLightTexture(ioniq6CenterTailLightTextureOff);
                }, 1200)
            }

            if (showHotspot && hotspotTitle === 'LED Projector headlights') {
                setTimeout(() => {
                    setCurrentHeadLightTexture(prevTexture => prevTexture === ioniq6HeadLightTextureOff ? ioniq6HeadLightTextureOn : ioniq6HeadLightTextureOff);
                }, 1200);
            } else {
                setTimeout(() => {
                    setCurrentHeadLightTexture(ioniq6HeadLightTextureOff);
                }, 1200)
            }
        }
    }, [showHotspot, hotspotTitle, car]);

    const audioRef = useRef(null)

    const toggleActivateD100 = (setActivateD100) => {
        setActivateD100(false);
        setTimeout(() => {
            setActivateD100(true);
        }, 100); // Adjust the delay as needed
    };

    const handleSelectColor = (color) => {
        if (disable) return
        if (!exteriorColor) {
            setExteriorColor(color);
            setSelectedColor(Object.keys(cars[car][trim].interiorColors)[0]);
            setCameraPosition([0.00001, 0, 0]);
            setMinPolar([Math.PI / 10])
            setMaxPolar([Math.PI / 1.5])
            setHasPositionChanged(false); // Reset this when changing position
            setShowExteriorHotspots(false)
            setShowInteriorHotspots(true)
            setEnableAutoRotate(false)
        } else if (!interiorColor) {
            setShowExteriorHotspots(false)
            setShowInteriorHotspots(false)
            setCameraPosition([-50, 0, 0]);
            setInteriorColor(color);
            setHasPositionChanged(false); // Reset this when changing position
            setMinPolar([Math.PI / 5])
            setMaxPolar([Math.PI / 2.5])
            setActivateD100(false)
            setEnableAutoRotate(true)
            window.ttq.track("ClickButton",
                {
                    contents: [
                        {
                            content_id: `${car}-${trim}-${color}-interior-trim-selection`, //Dynamic value reflecting user selection
                            content_name: `IONIQ5 Limited Trim Selection`, //Dynamic value reflecting user selection
                            content_type: "product", //Hard coded
                            content_category: "3d configurator", //Hard coded
                            quantity: 1, //Hard coded
                            price: 50000, //Dynamic value reflecting user selection
                        },
                    ],
                    value: 50000, //Dynamic value reflecting user selection
                    currency: "USD",
                }
            );
        } else {
            window.ttq.track("InitiateCheckout",
                {
                    contents: [
                        {
                            content_id: `${car}-${trim}}`, //Dynamic value reflecting user selection
                            content_name: `${car} ${trim} Abyss Ex ${exteriorColor} Int ${interiorColor}`, //Dynamic value reflecting user selection
                            content_type: "product", //Hard coded
                            content_category: "3d configurator", //Hard coded
                            quantity: 1, //Hard coded
                            price: 53000, //Dynamic value reflecting user selection
                        },
                    ],
                    value: 53000, //Dynamic value reflecting user selection
                    currency: "USD", //Hard coded
                }
            );
        }
    }

    const handleBack = () => {
        if (disable) return
        if (interiorColor) {
            setInteriorColor('')
            setSelectedColor(Object.keys(cars[car][trim].interiorColors)[0])
            setCameraPosition([0.00001, 0, 0]);
            setHasPositionChanged(false); // Reset this when changing position
            setShowExteriorHotspots(false)
            setShowInteriorHotspots(true)
            setMinPolar([Math.PI / 10])
            setMaxPolar([Math.PI / 1.9])
            setEnableAutoRotate(false)
        } else if (exteriorColor) {
            setExteriorColor('')
            setSelectedColor(Object.keys(cars[car][trim].exteriorColors)[0])
            setCameraPosition([-60, 0, 0]);
            setHasPositionChanged(false); // Reset this when changing position
            setShowExteriorHotspots(true)
            setShowInteriorHotspots(false)
            setMinPolar([Math.PI / 5])
            setMaxPolar([Math.PI / 2.5])
            setActivateD100(false)
            setEnableAutoRotate(false)
        } else {
            router.push(`/${car}`)
        }
    }

    const handleHotspotHeadLight = () => {
        if ((trim === 'Limited' || trim === 'D100PlatinumEdition' || trim === 'SEL') && (car === 'IONIQ5')) {
            setHotspotTitle('Premium front LED accent lighting')
            setHotspotDescription(cars[car][trim].hotspots.exterior['Premium front LED accent lighting'].description)
        } else {
            setHotspotTitle('LED Projector headlights')
            setHotspotDescription(cars[car][trim].hotspots.exterior['LED Projector headlights'].description)
        }
        setShowHotspot(true)
        window.ttq.track("ClickButton",
            {
                contents: [
                    {
                        content_id: `${car}-${trim}-head-Light-selection`, //Dynamic value reflecting user selection
                        content_name: `${car} ${trim} Head Light Selection`, //Dynamic value reflecting user selection
                        content_type: "product", //Hard coded
                        content_category: "3d configurator", //Hard coded
                        quantity: 1, //Hard coded
                        price: 50000, //Dynamic value reflecting user selection
                    },
                ],
                value: 50000, //Dynamic value reflecting user selection
                currency: "USD",
            }
        );
    };

    const handleHotspotCharging = () => {
        setHotspotTitle('Ultra-fast charging');
        setHotspotDescription(cars[car][trim].hotspots.exterior['Ultra-fast charging'].description);
        setShowHotspot(prev => !prev);

        // Show NebulaComponent and remove it after 5 seconds
        setTimeout(() => {
            setShowNebula(true);
        }, 1200)

        setTimeout(() => {
            setShowNebula(false);
        }, 4700);
        window.ttq.track("ClickButton",
            {
                contents: [
                    {
                        content_id: `${car}-${trim}-charging-selection`, //Dynamic value reflecting user selection
                        content_name: `${car} ${trim} Charging Selection`, //Dynamic value reflecting user selection
                        content_type: "product", //Hard coded
                        content_category: "3d configurator", //Hard coded
                        quantity: 1, //Hard coded
                        price: 50000, //Dynamic value reflecting user selection
                    },
                ],
                value: 50000, //Dynamic value reflecting user selection
                currency: "USD",
            }
        );
    };

    const handleHotspotTailLight = () => {
        setHotspotTitle('LED Tail Lights')
        setHotspotDescription(cars[car][trim].hotspots.exterior['LED Tail Lights'].description)
        setShowHotspot(true)
        window.ttq.track("ClickButton",
            {
                contents: [
                    {
                        content_id: `${car}-${trim}-Tail-Light-selection`, //Dynamic value reflecting user selection
                        content_name: `${car} ${trim} Tail-Light Selection`, //Dynamic value reflecting user selection
                        content_type: "product", //Hard coded
                        content_category: "3d configurator", //Hard coded
                        quantity: 1, //Hard coded
                        price: 50000, //Dynamic value reflecting user selection
                    },
                ],
                value: 50000, //Dynamic value reflecting user selection
                currency: "USD",
            }
        );
    };

    const handleHotspotDisneyBadge = () => {
        setHotspotTitle('Disney Badge')
        setHotspotDescription(cars[car][trim].hotspots.exterior['Disney Badge'].description)
        setShowHotspot(true)
        window.ttq.track("ClickButton",
            {
                contents: [
                    {
                        content_id: `${car}-${trim}-Disney-Badge-selection`, //Dynamic value reflecting user selection
                        content_name: `${car} ${trim} Disney Badge Selection`, //Dynamic value reflecting user selection
                        content_type: "product", //Hard coded
                        content_category: "3d configurator", //Hard coded
                        quantity: 1, //Hard coded
                        price: 50000, //Dynamic value reflecting user selection
                    },
                ],
                value: 50000, //Dynamic value reflecting user selection
                currency: "USD",
            }
        );
    };

    const handleHotspotMickyBadge = () => {
        setHotspotTitle('Micky Badge')
        setHotspotDescription(cars[car][trim].hotspots.exterior['Micky Badge'].description)
        setShowHotspot(true)
        window.ttq.track("ClickButton",
            {
                contents: [
                    {
                        content_id: `${car}-${trim}-Mickey-Badge-selection`, //Dynamic value reflecting user selection
                        content_name: `${car} ${trim} Mickey badge Selection`, //Dynamic value reflecting user selection
                        content_type: "product", //Hard coded
                        content_category: "3d configurator", //Hard coded
                        quantity: 1, //Hard coded
                        price: 50000, //Dynamic value reflecting user selection
                    },
                ],
                value: 50000, //Dynamic value reflecting user selection
                currency: "USD",
            }
        );
    };

    const handleHotspotMirror = () => {
        setHotspotTitle('Blind Spot View Monitor')
        setHotspotDescription(cars[car][trim].hotspots.exterior['Blind Spot View Monitor'].description)
        showHotspot ? setShowHotspot(false) : setShowHotspot(true)
        setShowCone(true)
        window.ttq.track("ClickButton",
            {
                contents: [
                    {
                        content_id: `${car}-${trim}-Mirror-selection`, //Dynamic value reflecting user selection
                        content_name: `${car} ${trim} Mirror Selection`, //Dynamic value reflecting user selection
                        content_type: "product", //Hard coded
                        content_category: "3d configurator", //Hard coded
                        quantity: 1, //Hard coded
                        price: 50000, //Dynamic value reflecting user selection
                    },
                ],
                value: 50000, //Dynamic value reflecting user selection
                currency: "USD",
            }
        );
    };

    // Interior Hotspots 
    const handleEnded = () => {
        setIsAudioPlaying(false)
        if (trim === 'D100PlatinumEdition') setIsNatureDisplayActive(false)
    }

    const handleHotspotAudio = () => {
        const audioArray = [
            '/audio/01_Forest_Sample.mp3',
            '/audio/03_Rain_Sample.mp3',
            '/audio/02_Wave_Sample.mp3',
        ]
        const audio = new Audio(audioArray[Math.floor(Math.random() * audioArray.length)])
        audioRef.current = audio
        audio.addEventListener('ended', handleEnded)
        audio.play()
        setIsAudioPlaying(true)
        setHotspotTitle('Interactive touch screen with sounds')
        setHotspotDescription(cars[car][trim].hotspots.interior['Interactive touch screen with sounds'].description)
        setShowHotspot(true)
        if (trim === 'D100PlatinumEdition') setIsNatureDisplayActive(true)
        window.ttq.track("ClickButton",
            {
                contents: [
                    {
                        content_id: `${car}-${trim}-touch-screen-selection`, //Dynamic value reflecting user selection
                        content_name: `${car} ${trim} Touch Screen Selection`, //Dynamic value reflecting user selection
                        content_type: "product", //Hard coded
                        content_category: "3d configurator", //Hard coded
                        quantity: 1, //Hard coded
                        price: 50000, //Dynamic value reflecting user selection
                    },
                ],
                value: 50000, //Dynamic value reflecting user selection
                currency: "USD",
            }
        );
    }

    const handleHotspotVisionRoof = () => {
        setHotspotTitle('Power tilt-and-slide wide sunroof')
        setHotspotDescription(cars[car][trim].hotspots.interior['Power tilt-and-slide wide sunroof'].description)
        setShowHotspot(true)
        setTimeout(() => {
            setPlayOpenAnimation(true)
        }, 1500)
        window.ttq.track("ClickButton",
            {
                contents: [
                    {
                        content_id: `${car}-${trim}-sunroof-selection`, //Dynamic value reflecting user selection
                        content_name: `${car} ${trim} Sunroof Selection`, //Dynamic value reflecting user selection
                        content_type: "product", //Hard coded
                        content_category: "3d configurator", //Hard coded
                        quantity: 1, //Hard coded
                        price: 50000, //Dynamic value reflecting user selection
                    },
                ],
                value: 50000, //Dynamic value reflecting user selection
                currency: "USD",
            }
        );
    }


    const handleHotspotDisneyStartup = () => {
        setHotspotTitle('D100PlatinumEdition')
        setHotspotDescription(cars[car][trim].hotspots.interior['D100PlatinumEdition'].description)
        setShowHotspot(true)
        setIsBloomActive(true)
        setActivateD100(false)
        setActivateD100(true)
        toggleActivateD100(setActivateD100);
        window.ttq.track("ClickButton",
            {
                contents: [
                    {
                        content_id: `${car}-${trim}-d-startup-selection`, //Dynamic value reflecting user selection
                        content_name: `${car} ${trim} D Startup Selection`, //Dynamic value reflecting user selection
                        content_type: "product", //Hard coded
                        content_category: "3d configurator", //Hard coded
                        quantity: 1, //Hard coded
                        price: 50000, //Dynamic value reflecting user selection
                    },
                ],
                value: 50000, //Dynamic value reflecting user selection
                currency: "USD",
            }
        );
    }

    const handleHotspotDisneyBubbles = () => {
        setHotspotTitle('D100 Edition')
        setHotspotDescription(cars[car][trim].hotspots.interior['D100 Edition'].description)
        setShowHotspot(true)
        window.ttq.track("ClickButton",
            {
                contents: [
                    {
                        content_id: `${car}-${trim}-d-bubbles-selection`, //Dynamic value reflecting user selection
                        content_name: `${car} ${trim} D Bubbles Selection`, //Dynamic value reflecting user selection
                        content_type: "product", //Hard coded
                        content_category: "3d configurator", //Hard coded
                        quantity: 1, //Hard coded
                        price: 50000, //Dynamic value reflecting user selection
                    },
                ],
                value: 50000, //Dynamic value reflecting user selection
                currency: "USD",
            }
        );
    }

    const handleHotspotAmbientLight = () => {
        setHotspotTitle('Ambient Lighting')
        setHotspotDescription(cars[car][trim].hotspots.interior['Ambient Lighting'].description)
        setShowHotspot(true)
        setIsBloomActive(true)
        window.ttq.track("ClickButton",
            {
                contents: [
                    {
                        content_id: `${car}-${trim}-ambient-selection`, //Dynamic value reflecting user selection
                        content_name: `${car} ${trim} Ambient Selection`, //Dynamic value reflecting user selection
                        content_type: "product", //Hard coded
                        content_category: "3d configurator", //Hard coded
                        quantity: 1, //Hard coded
                        price: 50000, //Dynamic value reflecting user selection
                    },
                ],
                value: 50000, //Dynamic value reflecting user selection
                currency: "USD",
            }
        );
    }

    useEffect(() => {
        if (hotspotTitle === 'Power tilt-and-slide wide sunroof') {
            setTimeout(() => {
                setPlayOpenAnimation(showHotspot)
            }, 1200)
        } else if (hotspotTitle === 'Ambient Lighting') {
            setShowAmbient(showHotspot)
            setIsBloomActive(showHotspot)
        } else if (!showHotspot && audioRef.current) {
            audioRef.current.pause()
            audioRef.current.currentTime = 0
            setIsAudioPlaying(false)
            if (trim === 'D100PlatinumEdition') setIsNatureDisplayActive(false)
        } else if (hotspotTitle === 'Premium front LED accent lighting') {
            setTimeout(() => {
                setIsBloomActive(showHotspot)
            }, 1200)
        } else if (hotspotTitle === 'Disney Badge') {
            if (showHotspot) {
                setTimeout(() => {
                    setIsBloomActive(showHotspot)
                }, 1500)
            } else {
                setTimeout(() => {
                    setIsBloomActive(showHotspot)
                }, 600)
            }
        } else if (hotspotTitle === 'D100PlatinumEdition') {
            setIsBloomActive(showHotspot)
        } else if (hotspotTitle === 'D100 Edition') {
            setIsBloomActive(showHotspot)
        }
    }, [showHotspot, hotspotTitle, trim])

    useEffect(() => {
        if (start) {
            setTimeout(() => {
                setStart(false)
            }, 10000)
        }
    }, [start])


    return (
        <div className='relative mx-auto mt-2 w-11/12 rounded-xl'>
            {start && (
                <div
                    className={`pointer-events-none absolute bottom-44 z-20 w-full ${start ? 'fade-in block' : 'fade-out'}`}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description">
                    <div className="pointer-events-none mx-auto flex w-9/12 flex-col justify-center gap-2 rounded-lg bg-black/35 p-2 text-center text-white">
                        <div className="flex flex-col gap-2">
                            <Image
                                src='/tap.png'
                                alt='tap'
                                width={25}
                                height={25}
                                className='mx-auto invert'
                            />
                            {/* <img src="/tap.png" alt='tap' className='mx-auto w-6 invert' /> */}
                            <p className='text-sm'>Tap on the hotspots to reveal more information about the car</p>
                        </div>
                    </div>
                </div>
            )}
            <Modal visible={showHotspot} setVisibility={setShowHotspot} title={hotspotTitle} description={hotspotDescription} />
            <View className={`w-full ${exteriorColor && interiorColor ? 'h-72 sm:h-48' : 'h-96'}`}>
                <Suspense fallback={<LoaderScreen />}>
                    <group position={[0, 0, 0]}>
                        <ExteriorModel
                            scale={12}
                            position={(interiorColor || !exteriorColor) ? [0, 10.7, 0] : [2.5, -1, 0]}
                            trim={car}
                            interior={exteriorColor && !interiorColor ? true : false}
                            model={cars[car][trim].exteriorModel.model}
                            exteriorColor={exteriorColor ? cars[car][trim].exteriorColors[exteriorColor].color : cars[car][trim].exteriorColors[selectedColor].color}
                            interiorColor={
                                interiorColor ? cars[car][trim].interiorColors[interiorColor].color :
                                    exteriorColor ? cars[car][trim].interiorColors[selectedColor].color : cars[car][trim].interiorColors[Object.keys(cars[car][trim].interiorColors)[0]].color}
                            removable={cars[car][trim].removables}
                            additions={cars[car][trim].additions}
                            playOpenAnimation={playOpenAnimation}
                            displayTexture={isAudioPlaying ? audioTexture : menuTexture}
                            bloomStrength={0.4}
                            bloomRadius={1.05}
                            bloomThreshold={1.9}
                            isBloomActive={isBloomActive}
                            ambientLedColor1={cars[car][trim].ambientLight[selectedAmbientColor]?.color1}
                            ambientLedColor2={cars[car][trim].ambientLight[selectedAmbientColor]?.color2}
                            tailLightTexture={currentTailLightTexture}
                            tailLightMiddleTexture={currentTailCenterLightTexture}
                            headLightTexture={currentHeadLightTexture}
                            activateD100={activateD100}
                            showNatureDisplay={isNatureDisplayActive}
                            isBubbleHotspotActive={showHotspot && hotspotTitle === 'D100 Edition'}
                            enableMickyBadge={showHotspot && hotspotTitle === 'Micky Badge'}
                            activateInterior={showInteriorHotspots}
                        />
                        <ExplosionConfetti isExploding={isenableAutoRotate} />
                        <group position={cars[car][trim].hotspots.exterior['LED Projector headlights'].position}>
                            <Hotspot
                                rotation={[0, 15, 0]}
                                scale={[2, 2, 2]}
                                visible={showExteriorHotspots && !showHotspot}
                                onClick={handleHotspotHeadLight}
                                cameraTarget={[-45, 10, 0]}
                                isHotspotClicked={showHotspot}
                                enableCameraMovement={true}
                            />

                        </group>
                        <Hotspot
                            position={cars[car][trim].hotspots.exterior['Ultra-fast charging'].position}
                            rotation={[0, 11, 0]}
                            scale={[2, 2, 2]}
                            visible={showExteriorHotspots && !showHotspot}
                            onClick={handleHotspotCharging}
                            cameraTarget={[40, 15, -30]} // Example target position
                            isHotspotClicked={showHotspot}
                            enableCameraMovement={true}
                        />

                        <Hotspot
                            position={cars[car][trim].hotspots.exterior['LED Tail Lights'].position}
                            rotation={[0, 11, 0]}
                            scale={[2, 2, 2]}
                            visible={showExteriorHotspots && !showHotspot}
                            onClick={handleHotspotTailLight}
                            cameraTarget={[40, 15, 0]} // Example target position
                            isHotspotClicked={showHotspot}
                            enableCameraMovement={true}
                        />

                        {(trim !== 'SE' && trim !== 'SEL') && (
                            <group position={[-9, 12.3, -12]}>
                                <Hotspot
                                    rotation={[0, 11, 0]}
                                    scale={[2, 2, 2]}
                                    visible={showExteriorHotspots && !showHotspot}
                                    onClick={handleHotspotMirror}
                                    cameraTarget={[50, 15, -20]} // Example target position
                                    enableCameraMovement={true}
                                />
                                <Cone position={[4, 0, -1]} rotation={[1.5, 0, 1.1]} scale={[4.5, 9, 4.5]} visible={showHotspot && hotspotTitle === 'Blind Spot View Monitor'} />
                                <ImagePlane
                                    imageUrl="/Blind_Spot_image.png"
                                    position={[15, 0.05, -6]}
                                    rotation={[0, 1.4, 0]}
                                    scale={[1.8, 1.8, 1.8]}
                                    visible={showHotspot && hotspotTitle === 'Blind Spot View Monitor'}
                                />
                            </group>
                        )}
                        {trim === 'D100PlatinumEdition' && (
                            <Hotspot
                                position={[-17, 8.2, -12.2]}
                                rotation={[0, 11, 0]}
                                scale={[2, 2, 2]}
                                visible={showExteriorHotspots && !showHotspot}
                                onClick={handleHotspotDisneyBadge}
                                cameraTarget={[-20, 10, -15]} // Example target position
                                isHotspotClicked={showHotspot}
                                enableCameraMovement={true}
                            />
                        )}
                        {trim === 'D100PlatinumEdition' && (
                            <Hotspot
                                position={[-22.6, 5, 12]}
                                rotation={[0, 11, 0]}
                                scale={[2, 2, 2]}
                                visible={showExteriorHotspots && !showHotspot}
                                onClick={handleHotspotMickyBadge}
                                cameraTarget={[-35, 5, 20]} // Example target position
                                isHotspotClicked={showHotspot}
                                enableCameraMovement={true}
                            />
                        )}

                        {showNebula && <NebulaComponent position={[0, 0, 0]} />}
                        {showNebula && <AnimatedCylinder position={cars[car][trim].hotspots.exterior['Ultra-fast charging'].cylinderPosition} />}
                        {/* Interior Hotspots */}
                        <Hotspot
                            position={[-10, 0, -0.9]}
                            rotation={[0, 5, 0]}
                            scale={[0.8, 0.8, 0.8]}
                            visible={showInteriorHotspots && !showHotspot}
                            onClick={handleHotspotAudio}
                            isAudioPlaying={isAudioPlaying}
                            cameraTarget={[1, 0, 0]} // Example target position
                            enableCameraMovement={true}
                        />
                        {(trim !== 'SE' && trim !== 'SEL') && (
                            <Hotspot
                                position={[8, 4, 0]}
                                rotation={[0, 11, 0]}
                                scale={[1, 1, 1]}
                                visible={showInteriorHotspots && !showHotspot}
                                onClick={handleHotspotVisionRoof}
                                cameraTarget={car === 'IONIQ5' ? [-9.2, 0, 0] : [-10, 0, 0]} // Example target position
                                enableCameraMovement={true}
                            />
                        )}

                        <ConeVideo
                            position={[2, 15, 0]}
                            rotation={[0, 0, 0]}
                            scale={[7, 25, 20]}
                            visible={showHotspot && hotspotTitle === 'Power tilt-and-slide wide sunroof'}
                            videoUrl="/Sun_Ray.mp4"
                            opacityValue={car === 'IONIQ5' ? 0.57 : 0.83}
                        />

                        {trim !== 'SE' && (
                            <Hotspot
                                position={[-9, -4, 8]}
                                rotation={[0, 5, 0]}
                                scale={[1.1, 1.1, 1.1]}
                                visible={showInteriorHotspots && !showHotspot}
                                onClick={handleHotspotAmbientLight}
                                cameraTarget={[1, 0, 0]} // Example target position
                                enableCameraMovement={false}
                            />
                        )}
                        {trim === 'D100PlatinumEdition' && (
                            <Hotspot
                                position={[-10, 0, 1.3]}
                                rotation={[0, 5, 0]}
                                scale={[0.8, 0.8, 0.8]}
                                visible={showInteriorHotspots && !showHotspot}
                                onClick={handleHotspotDisneyStartup}
                                cameraTarget={[1, 0, 0]} // Example target position
                                enableCameraMovement={true}
                            />
                        )}

                        {trim === 'D100PlatinumEdition' && (
                            <Hotspot
                                position={[-3, -2, 8]}
                                rotation={[0, 5, 0]}
                                scale={[0.8, 0.8, 0.8]}
                                visible={showInteriorHotspots && !showHotspot}
                                onClick={handleHotspotDisneyBubbles}
                                cameraTarget={[-0.1, 0, -8]} // Example target position
                                enableCameraMovement={true}
                            />
                        )}

                        <group>
                            <ImagePlane
                                imageUrl="/img/Micky_badge_Interior_Image.png"
                                position={[-3.5, -5, 5]}
                                rotation={[0, 3.4, 0]}
                                scale={[0.7, 0.7, 0.7]}
                                animate={true}
                                visible={showHotspot && hotspotTitle === 'D100 Edition'}
                            />
                            <ImagePlane
                                imageUrl="/img/Micky_Door_Leather_Image.png"
                                position={[1, 1, 8]}
                                rotation={[0, 3.4, 0]}
                                scale={[0.85, 0.85, 0.85]}
                                animate={true}
                                visible={showHotspot && hotspotTitle === 'D100 Edition'}
                            />
                            <ImagePlane
                                imageUrl="/img/Micky_Headrest_Image.png"
                                position={[5, 4, 5]}
                                rotation={[0, 3.4, 0]}
                                scale={[0.7, 0.7, 0.7]}
                                animate={true}
                                visible={showHotspot && hotspotTitle === 'D100 Edition'}
                            />
                            <ImagePlane
                                imageUrl="/img/Micky_Armrest_Image.png"
                                position={[4, -0.5, 0]}
                                rotation={[0, 3.4, 0]}
                                scale={[0.45, 0.45, 0.45]}
                                animate={true}
                                visible={showHotspot && hotspotTitle === 'D100 Edition'}
                            />
                        </group>

                        <pointLight
                            position={[0, 7.7, -10]}
                            color={cars[car][trim].ambientLight[selectedAmbientColor]?.color1 || '#ffffff'}
                            intensity={car === 'IONIQ5' ? 4 : 1}
                            distance={500}
                            decay={0.2}
                            visible={showHotspot && hotspotTitle === 'Ambient Lighting'}
                        />
                        <pointLight
                            position={[-4, -7, 0]}
                            color={cars[car][trim].ambientLight[selectedAmbientColor]?.color2 || '#ffffff'}
                            intensity={car === 'IONIQ5' ? 4 : 1}
                            distance={500}
                            decay={0.2}
                            visible={showHotspot && hotspotTitle === 'Ambient Lighting'}
                        />
                    </group>
                    {hotspotTitle === 'D100PlatinumEdition' && showHotspot && planes.map((plane) => (
                        <Plane
                            key={plane.id}
                            position={plane.position}
                            shouldTwinkle={plane.shouldTwinkle}
                            shouldMove={plane.shouldMove}
                        />
                    ))}

                    <Exterior
                        color={exteriorColor ? cars[car][trim].exteriorColors[exteriorColor].color : cars[car][trim].exteriorColors[selectedColor].color}
                        cameraPosition={cameraPosition}
                        hasPositionChanged={hasPositionChanged}
                        setHasPositionChanged={setHasPositionChanged}
                        minPolar={minPolar}
                        maxPolar={maxPolar}
                        enableGround={(interiorColor || !exteriorColor) ? true : false}
                        enableAutoRotate={isenableAutoRotate}
                    />
                </Suspense>
            </View>
            <div className='relative bottom-11 z-10'>
                {!exteriorColor && (
                    <div className='mx-auto flex w-11/12 flex-row justify-evenly gap-5 overflow-x-auto rounded-full bg-gray-100/70 px-2 py-1'>
                        {Object.keys(cars[car][trim].exteriorColors).map((color) => (
                            <Image
                                key={color}
                                src={`/colors/${cars[car][trim].exteriorColors[color].image}.png`}
                                alt={color}
                                width={25}
                                height={25}
                                onClick={() => {
                                    setSelectedColor(color)
                                    window.ttq.track(`${color}_ColorClick`,
                                        {
                                            contents: [
                                                {
                                                    content_id: `${car}-${trim}-${color}-color-selection`, //Dynamic value reflecting user selection
                                                    content_name: `${car} ${trim} ${color} Color Selection`, //Dynamic value reflecting user selection
                                                    content_type: "product", //Hard coded
                                                    content_category: "3d configurator", //Hard coded
                                                    quantity: 1, //Hard coded
                                                    price: 50000, //Dynamic value reflecting user selection
                                                },
                                            ],
                                            value: 50000, //Dynamic value reflecting user selection
                                            currency: "USD",
                                        }
                                    );
                                }
                                }
                                className={`${selectedColor === color ? 'rounded-full border-2 border-white' : ''}`}
                            />
                        ))}
                    </div>
                )}
                {exteriorColor && !interiorColor && (
                    <div className='mx-auto flex w-11/12 flex-row justify-evenly gap-5 overflow-x-auto rounded-full bg-gray-100/70 px-2 py-1'>
                        {!showAmbient && (
                            <>
                                {Object.keys(cars[car][trim].interiorColors).map((color) => (
                                    <Image
                                        key={color}
                                        src={`/colors/${cars[car][trim].interiorColors[color].image}.png`}
                                        alt={color}
                                        width={25}
                                        height={25}
                                        onClick={() => {
                                            setSelectedColor(color)
                                            window.ttq.track(`${color}_ColorClick`,
                                                {
                                                    contents: [
                                                        {
                                                            content_id: `${car}-${trim}-${color}-color-selection`, //Dynamic value reflecting user selection
                                                            content_name: `${car} ${trim} ${color} Color Selection`, //Dynamic value reflecting user selection
                                                            content_type: "product", //Hard coded
                                                            content_category: "3d configurator", //Hard coded
                                                            quantity: 1, //Hard coded
                                                            price: 50000, //Dynamic value reflecting user selection
                                                        },
                                                    ],
                                                    value: 50000, //Dynamic value reflecting user selection
                                                    currency: "USD",
                                                }
                                            );
                                        }
                                        }
                                        className={`${selectedColor === color ? 'rounded-full border-2 border-white' : ''}`}
                                    />
                                ))}
                            </>
                        )}
                        {showAmbient && (
                            <>
                                {Object.keys(cars[car][trim].ambientLight).map((color) => (
                                    <Image
                                        key={color}
                                        src={`/colors/ambient/${cars[car][trim].ambientLight[color].image}.png`}
                                        alt={color}
                                        width={25}
                                        height={25}
                                        onClick={() => {
                                            setSelectedAmbientColor(color)
                                            window.ttq.track(`${color}_AmbientColorClick`,
                                                {
                                                    contents: [
                                                        {
                                                            content_id: `${car}-${trim}-${color}-ambient-selection`, //Dynamic value reflecting user selection
                                                            content_name: `${car} ${trim} ${color} Ambient Selection`, //Dynamic value reflecting user selection
                                                            content_type: "product", //Hard coded
                                                            content_category: "3d configurator", //Hard coded
                                                            quantity: 1, //Hard coded
                                                            price: 50000, //Dynamic value reflecting user selection
                                                        },
                                                    ],
                                                    value: 50000, //Dynamic value reflecting user selection
                                                    currency: "USD",
                                                }
                                            );
                                        }
                                        }
                                        className={`${selectedAmbientColor === color ? 'rounded-full border-2 border-white' : ''}`}
                                    />
                                ))}
                            </>
                        )}
                    </div>
                )}
            </div>
            {exteriorColor && interiorColor && (
                <div className="mx-auto mt-5 w-11/12 text-left">
                    <div className="flex flex-row gap-5 border-b border-black py-1">
                        <Image
                            src={`/colors/${cars[car][trim].exteriorColors[exteriorColor].image}.png`}
                            alt="Exterior color"
                            width={50}
                            height={50}
                        />
                        <div className="flex flex-col">
                            <p>Exterior</p>
                            <p>{exteriorColor}</p>
                        </div>
                    </div>
                    <div className="flex flex-row gap-5 border-b border-black py-1">
                        <Image
                            src={`/colors/${cars[car][trim].interiorColors[interiorColor].image}.png`}
                            alt="Interior color"
                            width={50}
                            height={50}
                        />
                        <div className="flex flex-col">
                            <p>Interior</p>
                            <p>{interiorColor}</p>
                        </div>
                    </div>
                </div>
            )}
            <div className={`relative mx-auto flex w-10/12 cursor-pointer flex-row justify-center border-2 border-black py-2 text-center font-[HyundaiSansHead-Medium]
                ${exteriorColor && interiorColor ? 'mt-5' : ''}
                ${disable ? 'pointer-events-none opacity-50 ' : 'opacity-100'}`}
                onClick={() => handleSelectColor(selectedColor)}>
                <span>{interiorColor && exteriorColor ? 'Finish Build' : `Select ${selectedColor}`}</span>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokewtrimth='2.5'
                    stroke='currentColor'
                    className='absolute right-0 size-6'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
            </div>
            <div className={`mx-auto flex w-1/5 flex-row items-center justify-evenly text-center font-[HyundaiSansHead-Light]
                ${exteriorColor && interiorColor ? 'mt-1' : 'mt-5'}
                ${disable ? 'pointer-events-none opacity-50 ' : 'opacity-100'}`} onClick={handleBack}>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='size-4'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                </svg>
                <p>Back</p>
            </div>
        </div>
    )
}
