'use client'
import { ExteriorModel } from '@/components/canvas/Examples'
import dynamic from 'next/dynamic'
import { Suspense, useState } from 'react'
import { useRouter } from 'next/navigation'
import { cars } from '@/data/cars'
import { Hotspot } from '@/components/canvas/Hotspot'
import { Modal } from '@/components/modal'
import NebulaComponent from '@/components/Three/Nebula'
import { useLoader } from '@react-three/fiber'
import Cone from '@/components/Three/Cone'
import { NormalBlending, TextureLoader } from 'three'
import { ContactShadows } from '@react-three/drei'
import AnimatedCylinder from '@/components/Three/AnimatedCylinder'


const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex size-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 size-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokewtrimth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})

const Exterior = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Exterior), { ssr: false })

const ImagePlane = ({ imageUrl, position, rotation, scale, visible }) => {
  const texture = useLoader(TextureLoader, imageUrl);
  return (
    <mesh position={position} rotation={rotation} scale={scale}>
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
    const [exteriorColor, setExteriorColor] = useState('')
    const [interiorColor, setInteriorColor] = useState('')
    const [selectedColor, setSelectedColor] = useState(Object.keys(cars[car][trim].exteriorColors)[0])
    const [showHotspot, setShowHotspot] = useState(false)
    const [hotspotTitle, setHotspotTitle] = useState('')
    const [hotspotDescription, setHotspotDescription] = useState('')
    const [showNebula, setShowNebula] = useState(false);
    const [showCone, setShowCone] = useState(false); // Add state for cone visibility

    const handleSelectColor = (color) => {
        if(!exteriorColor) {
            setExteriorColor(color)
            setSelectedColor(Object.keys(cars[car][trim].interiorColors)[0])
        } else {
            setInteriorColor(color)
        }
    }

    const handleBack = () => {
        if (interiorColor) {
            setInteriorColor('')
            setSelectedColor(Object.keys(cars[car][trim].exteriorColors)[0])
        } else if (exteriorColor) {
            setExteriorColor('')
        } else {
            router.push(`/${car}`)
        }
    }

    const handleHotspotHeadLight = () => {
        if ((trim === 'Limited' || trim === 'D100 Platinum Edition') && car === 'IONIQ5') {
        setHotspotTitle('Premium front LED accent lighting')
        setHotspotDescription(cars[car][trim].hotspots.exterior['Premium front LED accent lighting'].description)
        } else {
        setHotspotTitle('LED Projector headlights')
        setHotspotDescription(cars[car][trim].hotspots.exterior['LED Projector headlights'].description)
        }
        setShowHotspot(true)
    };

    const handleHotspotCharging = () => {
        setHotspotTitle('Ultra-fast charging');
        setHotspotDescription(cars[car][trim].hotspots.exterior['Ultra-fast charging'].description);
        setShowHotspot(prev => !prev);

        // Show NebulaComponent and remove it after 5 seconds
        setShowNebula(true);
        setTimeout(() => {
        setShowNebula(false);
        }, 5000);
    };

    const handleHotspotMirror = () => {
        setHotspotTitle('Blind Spot View Monitor')
        setHotspotDescription(cars[car][trim].hotspots.exterior['Blind Spot View Monitor'].description)
        showHotspot ? setShowHotspot(false) : setShowHotspot(true)
        setShowCone(true)
    };
    
    return (
        <div className='mt-2 w-11/12 mx-auto relative rounded-xl'>
            <Modal visible={showHotspot} setVisibility={setShowHotspot} title={hotspotTitle} description={hotspotDescription} />
            <View className={`w-full ${exteriorColor && interiorColor ? 'h-72 sm:h-48' : 'h-96'}`}>
            <Suspense fallback={null}>
                <group position={[0, 0.3, 0]}>
                <ExteriorModel
                    scale={12}
                    position={[0, 2, 0]}
                    model={cars[car][trim].exteriorModel.model}
                    color={exteriorColor ? cars[car][trim].exteriorColors[exteriorColor].color : cars[car][trim].exteriorColors[selectedColor].color}
                    removable={cars[car][trim].removables}
                />
                <group position={[-29, 8, 7]}>
                    <Hotspot
                    rotation={[0, 15, 0]}
                    scale={[2, 2, 2]}
                    visible={!showHotspot}
                    onClick={handleHotspotHeadLight}
                    cameraTarget={[-45, 10, 10]}
                    isHotspotClicked={showHotspot}
                    />
                    {(trim === 'Limited' || trim === 'D100 Platinum Edition') && car === 'IONIQ5' && (
                    <ImagePlane
                        imageUrl="/Premium_LED_Image.png"
                        position={[0, 4, 0]}
                        rotation={[0, -1.3, 0]}
                        scale={[1, 1, 1]}
                        visible={showHotspot}
                    />
                    )}
                </group>
                <Hotspot
                    position={[21.5, 10, -11]}
                    rotation={[0, 11, 0]}
                    scale={[2, 2, 2]}
                    visible={!showHotspot}
                    onClick={handleHotspotCharging}
                    cameraTarget={[40, 15, -20]} // Example target position
                    isHotspotClicked={showHotspot}
                />
                {trim !== 'SE' && (
                    <group position={[-7, 12.3, -12]}>
                    <Hotspot
                        rotation={[0, 11, 0]}
                        scale={[2, 2, 2]}
                        visible={!showHotspot}
                        onClick={handleHotspotMirror}
                        cameraTarget={[50, 15, -20]} // Example target position
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
                {showNebula && <NebulaComponent />}
                {showNebula && <AnimatedCylinder />}
                </group>
                <ContactShadows renderOrder={2} frames={1} resolution={1024} scale={120} blur={2} opacity={0.8} far={70} />
                <Exterior color={exteriorColor ? cars[car][trim].exteriorColors[exteriorColor].color : cars[car][trim].exteriorColors[selectedColor].color} />
            </Suspense>
            </View>
            <div className='relative bottom-11 z-10'>
                {!exteriorColor && (
                    <div className='flex flex-row justify-evenly overflow-x-auto px-2 py-1 rounded-full gap-5 w-11/12 bg-gray-100/70 mx-auto'>
                        {Object.keys(cars[car][trim].exteriorColors).map((color) => (
                        <img
                            key={color}
                            alt={color}
                            onClick={() => setSelectedColor(color)}
                            src={`/colors/${cars[car][trim].exteriorColors[color].image}.png`}
                            className={`w-1/12 lg:w-1/12 ${selectedColor === color ? 'border-2 border-white rounded-full' : ''}`}
                        />
                        ))}
                    </div>
                )}
                {exteriorColor && !interiorColor && (
                    <div className='flex flex-row justify-evenly overflow-x-auto px-2 py-1 rounded-full gap-5 w-11/12 bg-gray-100/70 mx-auto'>
                        {Object.keys(cars[car][trim].interiorColors).map((color) => (
                        <img
                            key={color}
                            alt={color}
                            onClick={() => setSelectedColor(color)}
                            src={`/colors/${cars[car][trim].interiorColors[color].image}.png`}
                            className={`w-1/12 lg:w-1/12 ${selectedColor === color ? 'border-2 border-white rounded-full' : ''}`}
                        />
                        ))}
                    </div>
                )}
            </div>
            {exteriorColor && interiorColor && (
                <div className="text-left w-11/12 mx-auto mt-5">
                    <div className="border-b border-black flex flex-row py-1 gap-5">
                    <img    
                        src={`/colors/${cars[car][trim].exteriorColors[exteriorColor].image}.png`}
                        className="w-2/12"
                        alt="Exterior color"
                    />
                    <div className="flex flex-col">
                        <p>Exterior</p>
                        <p>{exteriorColor}</p>
                    </div>
                    </div>
                    <div className="border-b border-black flex flex-row py-1 gap-5">
                    <img
                        src={`/colors/${cars[car][trim].interiorColors[interiorColor].image}.png`}
                        className="w-2/12"
                        alt="Interior color"
                    />
                    <div className="flex flex-col">
                        <p>Interior</p>
                        <p>{interiorColor}</p>
                    </div>
                </div>
      </div>
            )}
            <div className={`text-center border-2 py-2 flex relative flex-row justify-center border-black w-10/12 mx-auto font-[HyundaiSansHead-Medium] cursor-pointer ${
                exteriorColor && interiorColor ? 'mt-5' : ''
            }`}
                onClick={() => handleSelectColor(selectedColor)}>
                <span>Select {selectedColor}</span>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokewtrimth='2.5'
                    stroke='currentColor'
                    className='size-6 absolute right-0'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
            </div>
            <div className='text-center w-1/5 flex flex-row mx-auto mt-1 items-center justify-evenly font-[HyundaiSansHead-Light]' onClick={handleBack}>
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
