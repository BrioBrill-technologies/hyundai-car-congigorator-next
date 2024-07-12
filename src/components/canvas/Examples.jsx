'use client'

import { Html, useGLTF } from '@react-three/drei'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { useRouter } from 'next/navigation'
import { Suspense, useRef, useEffect, useState, act } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { cars } from '@/data/cars.js'
import * as THREE from 'three'
import LoaderScreen from './loader'
import { EffectComposer, Bloom, BrightnessContrast } from '@react-three/postprocessing'
import PostProcess from '@/templates/hooks/usePostprocess'


function Effects() {
  const { scene, camera } = useThree()
  return (
    <EffectComposer renderPriority={2} scene={scene} enabled={true} camera={camera} resolutionScale={1}>
      <Bloom mipmapBlur luminanceThreshold={1} intensity={0.9} />
      <BrightnessContrast brightness={0} contrast={0.1} />
    </EffectComposer>
  )
}


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

export function TrimsModel({ model, ...props }) {
  const { scene } = useGLTF(`/models/${model}.glb`, configureDRACOLoader)

  return (
    <Suspense fallback={null}>
      <primitive object={scene} {...props} />
    </Suspense>
  )
}

export function ExteriorModel({
  model,
  exteriorColor,
  interiorColor,
  trim,
  interior,
  removable = [],
  additions,
  playOpenAnimation,
  displayTexture,
  tailLightTexture,
  tailLightMiddleTexture,
  headLightTexture,
  bloomStrength = 1.2,
  bloomRadius = 0.8,
  bloomThreshold = 1,
  isBloomActive,
  ambientLedColor1,
  ambientLedColor2,
  activateD100,
  ...props
}) {
  const { scene, animations } = useGLTF(`/models/${model}.glb`);
  const mixerRef = useRef();
  const actionsRef = useRef({});
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef();
  const videoTextureRef = useRef();

  useEffect(() => {
    if (!videoRef.current) {
      // Create a video element
      const video = document.createElement('video');
      video.src = '/Hyundai_D100_Video.mp4'; // Replace with your video path
      video.loop = false;
      video.muted = false;
      videoRef.current = video;

      // Create a video texture
      const videoTexture = new THREE.VideoTexture(video);
      videoTexture.minFilter = THREE.LinearFilter;
      videoTexture.magFilter = THREE.LinearFilter;
      videoTexture.flipY = false;
      videoTexture.encoding = THREE.sRGBEncoding;
      videoTextureRef.current = videoTexture;
    }
  }, []);

  useEffect(() => {
    if (activateD100) {
      videoRef.current.play();
      videoRef.currentTime = 0
      console.log('play');
    } else {
      videoRef.current.pause();
      console.log('pause');
    }
  }, [activateD100]);

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh || child.isGroup || child.isObject3D) {
          if (trim === 'IONIQ 6' && interior) {
            handleInterior(child);
          } else {
            handleInterior(child);
            handleExterior(child);
          }
        }
      });
      setIsLoaded(true);
    }
  }, [scene, exteriorColor, interiorColor, interior, trim, removable, additions, displayTexture, tailLightTexture, tailLightMiddleTexture, headLightTexture, ambientLedColor1, ambientLedColor2, isBloomActive]);

  useEffect(() => {
    if (scene && animations.length) {
      const mixer = new THREE.AnimationMixer(scene);
      mixerRef.current = mixer;
      animations.forEach((clip) => {
        const action = mixer.clipAction(clip);
        action.clampWhenFinished = true;
        action.setLoop(THREE.LoopOnce);
        actionsRef.current[clip.name] = action;
      });
      playCloseAnimations();
    }
  }, [scene, animations]);

  useEffect(() => {
    if (playOpenAnimation !== isOpen) {
      playOpenAnimation ? playOpenAnimations() : playCloseAnimations();
      setIsOpen(playOpenAnimation);
    }
  }, [playOpenAnimation]);

  useFrame((state, delta) => {
    mixerRef.current?.update(delta);
  });

  const handleInterior = (child) => {
    if (interiorColor.visibleMesh.some(mesh => child.name.includes(mesh))) {
      child.visible = true;
    } else if (interiorColor.invisibleMesh.some(mesh => child.name.includes(mesh))) {
      child.visible = false;
    }

    if (child.name.includes('_top_led') || child.name.includes('dashboard_led')) {
      child.visible = isBloomActive;
      child.material.color = new THREE.Color(ambientLedColor1);
      child.material.emissive = new THREE.Color(ambientLedColor1);
      child.material.emissiveIntensity = 8;
    }
    if (child.name.includes('_bottom_led')) {
      child.visible = isBloomActive;
      child.material.color = new THREE.Color(ambientLedColor2);
      child.material.emissive = new THREE.Color(ambientLedColor2);
      child.material.emissiveIntensity = 8;
    }

    if (child.name.includes('Display2')) {
      child.material = new THREE.MeshStandardMaterial({
        map: displayTexture,
        metalness: 0.9,
        roughness: 0,
      });
    }
  };

  const handleExterior = (child) => {
    if (additions && child.name.includes(additions)) {
      child.visible = true;
    }
    if (!interior) {
      if (interiorColor.visibleMesh.some(mesh => child.name.includes(mesh))) {
        child.visible = true;
      } else if (interiorColor.invisibleMesh.some(mesh => child.name.includes(mesh))) {
        child.visible = false;
      }
    }
    if (removable.length > 0) {
      removable.forEach(removable => {
        if (child.name.includes(removable)) {
          child.visible = false;
        }
      });
    }
    if (child.name.includes('_Paints')) {
      child.material = new THREE.MeshStandardMaterial({
        color: exteriorColor,
        metalness: 0.3,
        roughness: 0.15,
        emissiveIntensity: 0,
      });
    }

    if (child.name === ('LED_Strip')) {
      child.material.color = new THREE.Color('#ffffff');
      child.material.emissive = new THREE.Color('#ffffff');
      child.material.emissiveIntensity = 10;
    }

    if (child.name.includes('Rear_glass_outer')) {
      child.material = new THREE.MeshBasicMaterial({
        map: tailLightTexture,
      });
    }

    if (child.name.includes('taillight_middle')) {
      child.material = new THREE.MeshBasicMaterial({
        map: tailLightMiddleTexture,
      });
    }
    if (child.name.includes('headlight')) {
      child.material = new THREE.MeshBasicMaterial({
        map: headLightTexture,
      });
    }

    if (child.name === 'D100_Display_1') {
      child.material = new THREE.MeshBasicMaterial({
        map: videoTextureRef.current,
      });
    }
  };

  const playCloseAnimations = () => {
    stopAllAnimations();
    playAnimation('BACK_CLOSE');
    playAnimation('FRONT_CLOSE');
  };

  const playOpenAnimations = () => {
    stopAllAnimations();
    playAnimation('BACK_OPEN');
    playAnimation('FRONT_OPEN');
  };

  const stopAllAnimations = () => {
    Object.values(actionsRef.current).forEach(action => action.stop());
  };

  const playAnimation = (clipName) => {
    const action = actionsRef.current[clipName];
    action?.reset().play();
  };

  return (
    <Suspense fallback={<LoaderScreen />}>
      {isBloomActive && (
        <PostProcess
          isBloomActive={isBloomActive}
          strength={bloomStrength}
          radius={bloomRadius}
          threshold={bloomThreshold}
        />
      )}
      <primitive object={scene} {...props} />
    </Suspense>
  );
}

export function InteriorModel({ model, playOpenAnimation, color, ...props }) {
  const { scene } = useGLTF(`/models/${model}.glb`, configureDRACOLoader)
  const { animations } = useGLTF(`/models/${model}.glb`)
  const mixerRef = useRef()
  const [isOpen, setIsOpen] = useState(false)
  const actionsRef = useRef({})

  if (color) {
    scene.traverse((child) => {
      if (child.isMesh) {
        if (child.name.includes('Ambient')) {
          child.material.color = color
          child.material.emissive = color
          child.material.emissiveIntensity = 7;
        }
      }
    })
  }

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
    }
  }

  return (
    <Suspense fallback={null}>
      <primitive object={scene} {...props} />
    </Suspense>
  )
}

export function SummaryModel({ model, color, ...props }) {
  const { scene } = useGLTF(`/models/${model}.glb`, configureDRACOLoader)

  useEffect(() => {
    if (scene) {
      // Apply color to all meshes
      scene.traverse((child) => {
        if (child.isMesh) {
          if ((child.name.includes('Paint') || child.name === 'Roof_SE' || child.name === 'Left_Mirror' || child.name === 'Right_Mirror' || child.name === 'Right_Mirrorless_Panel' || child.name === 'Left_Mirrorless_Panel')) {
            child.material = new THREE.MeshStandardMaterial({
              color,
              metalness: 0.3,
              roughness: 0.15,
            })
          }
        }
      })
    }
  }, [scene, color])

  return (
    <Suspense fallback={null}>
      <primitive object={scene} {...props} />
    </Suspense>
  )
}

export function Sunray({ ...props }) {
  const { scene } = useGLTF(`/models/Sunray.glb`, configureDRACOLoader)

  useEffect(() => {
    if (scene) {
      // Apply color to all meshes
      scene.traverse((child) => {
        if (child.isMesh) {
          if ((child.name === 'Cube')) {
            // child.material = new THREE.MeshStandardMaterial({
            //   color,
            //   metalness: 0.3,
            //   roughness: 0.15,
            // })
          }
        }
      })
    }
  }, [scene])

  return (
    <Suspense fallback={null}>
      <primitive object={scene} {...props} />
    </Suspense>
  )
}