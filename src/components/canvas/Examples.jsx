'use client'

import { useGLTF } from '@react-three/drei'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { useRouter } from 'next/navigation'
import { Suspense, useRef, useEffect, useState } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { cars } from '@/data/cars.js'
import * as THREE from 'three'

// Configure DRACOLoader for useGLTF
const configureDRACOLoader = loader => {
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('/draco/gltf/')
  loader.setDRACOLoader(dracoLoader)
}

export const Logo = ({ route = '/trim', car, ...props }) => {
  const router = useRouter()

  return (
    <div onClick={() => {
      router.push(`/${car}/`)
    }}
      key={car}
      className='text-black w-10/12 mx-auto items-center flex rounded-lg cursor-pointer mb-5
          bg-gradient-to-br from-gray-200/40 to-[#dfdfdf] bg-clip-padding backdrop-filter backdrop-blur-sm drop-shadow shadow-lg shadow-white'
      role='button'
      tabIndex={0}
      title={`Select ${car}`}>
      <p className='absolute top-4 left-4 text-2xl'>{car}</p>
      <div className='flex flex-col justify-center'>
        <img src={`/${cars[car].image}.png`} alt={car} className='rounded-3xl pt-10 w-10/12 mx-auto' />
        <div className='text-center border py-2 w-full mt-5 border-black font-[HyundaiSansHead-Regular]'>
          Select {car}
          <span className='absolute right-5'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  )
}

export function Duck({ model, playOpenAnimation, ...props }) {
  const { scene } = useGLTF(`/models/${model}.glb`, configureDRACOLoader)
  const { animations } = useGLTF(`/models/${model}.glb`)
  const mixerRef = useRef()
  const [isOpen, setIsOpen] = useState(false)
  const actionsRef = useRef({})

  useEffect(() => {
    if (scene) {
      const mixer = new THREE.AnimationMixer(scene)
      mixerRef.current = mixer

      // Initialize actions
      animations.forEach(clip => {
        const action = mixer.clipAction(clip)
        action.clampWhenFinished = true
        action.setLoop(THREE.LoopOnce)
        actionsRef.current[clip.name] = action
      })

      // Play initial close animations
      playCloseAnimations()
    }
  }, [scene, animations])

  useEffect(() => {
    if (playOpenAnimation !== isOpen) {
      if (playOpenAnimation) {
        playOpenAnimations()
      } else {
        playCloseAnimations()
      }
      setIsOpen(playOpenAnimation)
    }
  }, [playOpenAnimation])

  useFrame((state, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta)
    }
  })

  const playCloseAnimations = () => {
    stopAllAnimations()
    playAnimation('Back_close')
    playAnimation('Front_close')
  }

  const playOpenAnimations = () => {
    stopAllAnimations()
    playAnimation('Back_open')
    playAnimation('Front_open')
  }

  const stopAllAnimations = () => {
    Object.values(actionsRef.current).forEach(action => {
      action.stop()
    })
  }

  const playAnimation = (clipName) => {
    const action = actionsRef.current[clipName]
    if (action) {
      action.reset().play()
    } else {
      console.warn(`Animation ${clipName} not found`)
    }
  }

  return (
    <Suspense fallback={null}>
      <primitive object={scene} {...props} />
    </Suspense>
  )
}
