'use client'

import { InteriorModel } from '@/components/canvas/Examples'
import { useRouter, useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { Suspense, useState, useRef, useEffect } from 'react'
import { cars } from '@/data/cars'
import { Hotspot } from '@/components/canvas/Hotspot'
import { Modal } from '@/components/modal'

// files
const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex size-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 size-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})
const Interior = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Interior), { ssr: false })

export default function CarPageContent({ car, trim }) {
  const searchParams = useSearchParams()
  const exteriorColor = searchParams.get('exteriorColor') || 'defaultColor'
  trim = decodeURIComponent(trim)
  car = decodeURIComponent(car)
  const [selectedColor, setSelectedColor] = useState(Object.keys(cars[car][trim].interiorColors)[0])
  const [playOpenAnimation, setPlayOpenAnimation] = useState(false)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [showAmbient, setShowAmbient] = useState(false)
  const [selectedAmbientColor, setSelectedAmbientColor] = useState('#4c66f7')
  const [showHotspot, setShowHotspot] = useState(false)
  const [hotspotTitle, setHotspotTitle] = useState('')
  const [hotspotDescription, setHotspotDescription] = useState('')
  const [pointLightVisible, setPointLightVisible] = useState(false)
  const [pointLightColor, setPointLightColor] = useState('#ffffff')

  const audioRef = useRef(null)

  const router = useRouter()
  const handleSelectClick = () => {
    router.push(`/${car}/${trim}/summary?exteriorColor=${exteriorColor}&interiorColor=${selectedColor}`)
  }

  const handleBackClick = () => {
    router.push(`/${car}/${trim}/exterior`)
  }


  const handleEnded = () => {
    setIsAudioPlaying(false)
  }

  useEffect(() => {
    if (!showHotspot && audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsAudioPlaying(false)
    }
  }, [showHotspot])

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
  }

  const handleHotspotVisionRoof = () => {
    console.log('hello')
    setHotspotTitle('Vision Roof')
    setHotspotDescription(cars[car][trim].hotspots.interior['Vision Roof'].description)
    setShowHotspot(true)
    setTimeout(() => {
      setPlayOpenAnimation(true)
    }, 1500)
  }

  useEffect(() => {
    if (hotspotTitle === 'Vision Roof') {
      setPlayOpenAnimation(showHotspot)
    }
  }, [showHotspot])

  const handleHotspotAmbientLight = () => {
    setHotspotTitle('Ambient Lighting')
    setHotspotDescription(cars[car][trim].hotspots.interior['Ambient Lighting'].description)
    setShowHotspot(true)
    setPointLightVisible(true)
    setPointLightColor(selectedAmbientColor)
  }

  useEffect(() => {
    if (hotspotTitle === 'Ambient Lighting') {
      setShowAmbient(showHotspot)
    }
  }, [showHotspot])

  useEffect(() => {
    setPointLightColor(selectedAmbientColor)
  }, [selectedAmbientColor])


  return (
    <div>
      <h1 className='text-3xl text-center'>{car}</h1>
      <p className='text-center text-lg'>{trim}</p>
      <div className='mt-2 w-11/12 mx-auto relative rounded-xl'>
        <Modal visible={showHotspot} setVisibility={setShowHotspot} title={hotspotTitle} description={hotspotDescription} />
        <View className='h-96 sm:h-48 sm:w-full'>
          <Suspense fallback={null}>
            <group position={[0, -2, 0]}>
              <InteriorModel
                castShadow
                receiveShadow
                scale={12}
                position={[2, 0, 0]}
                color={selectedAmbientColor}
                model={cars[car][trim].interiorModel.model[selectedColor]}
                playOpenAnimation={playOpenAnimation}
              />
              <pointLight
                castShadow
                position={[0, 7, 0]}
                color={'white'}
                intensity={50}
                distance={200}
                decay={2}
                visible={true}
              />
              {/* <Sunray /> */}
              {trim !== 'SE' && (
                <Hotspot
                  position={[8, 7, 0]}
                  rotation={[0, 11, 0]}
                  scale={[1, 1, 1]}
                  visible={!showHotspot}
                  onClick={handleHotspotVisionRoof}
                  cameraTarget={[-10, 0, 0]} // Example target position
                />
              )}
              {/* Ambient Light hotspot */}
              {trim !== 'SE' && (
                <Hotspot
                  position={[-10, -3, 8]}
                  rotation={[0, 5, 0]}
                  scale={[1.3, 1.3, 1.3]}
                  visible={!showHotspot}
                  onClick={handleHotspotAmbientLight}
                  cameraTarget={[1, 0, 0]} // Example target position
                />
              )}

              <Hotspot
                position={[-10, 1, 0]}
                rotation={[0, 5, 0]}
                scale={[1, 1, 1]}
                visible={!showHotspot}
                onClick={handleHotspotAudio}
                cameraTarget={[1, 0, 0]} // Example target position
              />

              <pointLight
                position={[-7, 0, -4]}
                color={pointLightColor}
                intensity={70}
                distance={200}
                decay={2}
                visible={showHotspot && hotspotTitle === 'Ambient Lighting'}
              />

              <pointLight
                position={[-7, 0, 4]}
                color={pointLightColor}
                intensity={70}
                distance={200}
                decay={2}
                visible={showHotspot && hotspotTitle === 'Ambient Lighting'}
              />
            </group>

            <Interior color={cars[car][trim].interiorColors[selectedColor].color} />
          </Suspense>
        </View>
        <div className={`relative z-10 ${showAmbient ? 'bottom-20 flex flex-col gap-2' : 'bottom-11'}`}>
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
          {showAmbient && trim !== 'SE' && (
            <div className='flex flex-row justify-evenly overflow-x-auto px-2 py-1 rounded-full gap-5 w-11/12 bg-gray-100/70 mx-auto'>
              <div className={`size-4 bg-[#4c66f7] rounded-full ${selectedAmbientColor === '#4c66f7' ? 'border-2 border-white' : ''}`} onClick={() => setSelectedAmbientColor('#4c66f7')}>
              </div>
              <div className={`size-4 bg-[#fb7758] rounded-full ${selectedAmbientColor === '#fb7758' ? 'border-2 border-white' : ''}`} onClick={() => setSelectedAmbientColor('#fb7758')}>
              </div>
              <div className={`size-4 bg-[#daf25b] rounded-full ${selectedAmbientColor === '#daf25b' ? 'border-2 border-white' : ''}`} onClick={() => setSelectedAmbientColor('#daf25b')}>
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        className='text-center border-2 py-2 flex relative flex-row justify-center border-black w-10/12 mx-auto font-[HyundaiSansHead-Medium] cursor-pointer'
        onClick={handleSelectClick}>
        <span>Select {selectedColor}</span>
        <span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='2.5'
            stroke='currentColor'
            className='size-6 absolute right-0'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
          </svg>
        </span>
      </div>
      <div className='text-center w-1/5 flex flex-row mx-auto mt-5 items-center justify-evenly font-[HyundaiSansHead-Light]'
        onClick={handleBackClick}>
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
