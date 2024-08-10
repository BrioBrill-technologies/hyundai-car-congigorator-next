'use client'

import { useGLTF } from '@react-three/drei'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { useRouter } from 'next/navigation'
import { Suspense, useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { cars } from '@/data/cars.js'
import * as THREE from 'three'
import PostProcess from '@/templates/hooks/usePostprocess'
import Image from 'next/image'
import { ContactShadows } from '@react-three/drei'


// Configure DRACOLoader for useGLTF
const configureDRACOLoader = loader => {
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('/draco/gltf/')
  loader.setDRACOLoader(dracoLoader)
}
// Preload the model
useGLTF.preload('/models/Ioniq5_Master_Model.glb', configureDRACOLoader)
useGLTF.preload('/models/Ioniq6_Master_Model.glb', configureDRACOLoader)

export const Logo = ({ route = '/trim', car, ...props }) => {
  const router = useRouter()

  return (
    <div onClick={() => {
      const trackClick = () => {
        if (typeof window.ttq !== 'undefined') {
          window.ttq.track("AddToCart",
            {
              contents: [
                {
                  content_id: `${car}-selection`, //Dynamic value reflecting user selection
                  content_name: `${car} Selection`, //Dynamic value reflecting user selection
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
      };
      setTimeout(trackClick, 100);
      router.push(`/${car}/`)
    }}
      key={car}
      className='mx-auto mb-5 flex w-10/12 cursor-pointer items-center rounded-lg bg-gradient-to-br
          from-gray-200/40 to-[#dfdfdf] bg-clip-padding text-black shadow-lg shadow-white drop-shadow backdrop-blur-sm'
      role='button'
      tabIndex={0}
      title={`Select ${car}`}>
      <p className='absolute left-4 top-4 text-2xl'>{car === 'IONIQ5' ? 'IONIQ 5' : 'IONIQ 6'}</p>
      <div className='flex flex-col justify-center'>
        <Image
          src={`/${cars[car].image}.png`}
          alt={car}
          width={250}
          height={200}
          className='mx-auto w-10/12 rounded-lg pt-10'
        />
        <div className='mt-5 w-full border border-black py-2 text-center font-[HyundaiSansHead-Regular]'>
          Select {car === 'IONIQ5' ? 'IONIQ 5' : 'IONIQ 6'}
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

export function ExteriorModel({
  model,
  exteriorColor,
  interiorColor,
  trim,
  interior,
  removable = [],
  additions = [],
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
  isBubbleHotspotActive,
  showNatureDisplay,
  enableMickyBadge,
  activateInterior = false,
  ...props
}) {
  const { scene, animations } = useGLTF(`/models/${model}.glb`, configureDRACOLoader);
  const mixerRef = useRef();
  const actionsRef = useRef({});
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef();
  const videoTextureRef = useRef();
  const modelRef = useRef();
  const targetPosition = useRef(new THREE.Vector3(2.5, -1, 0));
  const clock = useRef(new THREE.Clock());

  useEffect(() => {
    const video = document.createElement('video');
    video.src = '/Hyundai_D100_Video.mp4'; // Replace with your video path
    video.loop = false;
    video.muted = false;
    video.playsInline = true;
    videoRef.current = video;

    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.flipY = false;
    videoTexture.encoding = THREE.sRGBEncoding;
    videoTextureRef.current = videoTexture;
  }, []);

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh || child.isGroup || child.isObject3D) {
          if (activateInterior === true) {
            if (child.name === 'D_sunroof' || child.name === 'L_sunroof') {
              child.visible = false;
            }
          } else {
            // Then set visibility based on the trim
            if (additions.includes('TRIM_D100')) {
              if (child.name === 'D_sunroof') {
                child.visible = true;
              }
            } else if (additions.includes('TRIM_LIMITED') || additions.includes('TRIM_LMTD')) {
              if (child.name === 'L_sunroof') {
                child.visible = true;
              }
            } else if (additions.includes('TRIM_SE')) {
              if (child.name === 'D_sunroof' || child.name === 'L_sunroof') {
                child.visible = activateInterior;
              }
            }
          }
          if (trim === 'IONIQ6' && interior) {
            handleInterior(child);
          } else {
            handleInterior(child);
            handleExterior(child);
          }
        }
      });
      setIsLoaded(true);
    }
  }, [
    scene,
    exteriorColor,
    interiorColor,
    interior,
    trim,
    removable,
    additions,
    displayTexture,
    showNatureDisplay,
    tailLightTexture,
    tailLightMiddleTexture,
    headLightTexture,
    ambientLedColor1,
    ambientLedColor2,
    isBloomActive,
    activateInterior,
  ]);

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
  }, [playOpenAnimation, isOpen]);

  useEffect(() => {
    if (activateD100) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [activateD100]);

  useFrame((state, delta) => {
    mixerRef.current?.update(delta);

    if (modelRef.current && trim === 'IONIQ5') {
      targetPosition.current.set(isBubbleHotspotActive ? 5 : -1, 0, 0);
      modelRef.current.position.lerp(targetPosition.current, 0.1);
    }

    const elapsedTime = clock.current.getElapsedTime();
    const t = (Math.sin(elapsedTime * 2) + 1) / 2;

    const greyishA = new THREE.Color(0x808080);
    const lightWhiteA = new THREE.Color(0xF5F5F5);
    const greyishB = new THREE.Color(0xdfdce4);
    const lightWhiteB = new THREE.Color(0x000000);

    const colorA = new THREE.Color().lerpColors(greyishA, lightWhiteA, t);
    const colorB = new THREE.Color().lerpColors(lightWhiteB, greyishB, t);
    additions.forEach((additions) => {
      if (additions === 'TRIM_D100') {
        scene.traverse((child) => {
          if (child.name === 'shell_4Shape_D_Badge') {
            child.material.color = colorA;
            child.material.emissive = colorA;
            child.material.emissiveIntensity = 10;
          }
          if (child.name.includes('Micky_Badge')) {
            child.visible = enableMickyBadge;
            child.material.color = colorB;
            child.material.emissive = colorB;
            child.material.emissiveIntensity = 1.9;
          }
        });
      }
    });
  });

  const handleInterior = (child) => {
    if (interiorColor.visibleMesh.some((mesh) => child.name.includes(mesh))) {
      child.visible = true;
    } else if (interiorColor.invisibleMesh.some((mesh) => child.name.includes(mesh))) {
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

    if (child.name.includes('Display2') || child.name.includes('D100_Nature_Display')) {
      child.material = new THREE.MeshStandardMaterial({
        map: displayTexture,
        metalness: 0.9,
        roughness: 0,
      });
      if (child.name.includes('D100_Nature_Display')) {
        child.visible = showNatureDisplay;
      }
    }
  };

  const handleExterior = (child) => {
    additions.forEach((additions) => {
      if (child.name.includes(additions)) {
        child.visible = true;
      }
    });

    if (!interior) {
      if (interiorColor.visibleMesh.some((mesh) => child.name.includes(mesh))) {
        child.visible = true;
      } else if (interiorColor.invisibleMesh.some((mesh) => child.name.includes(mesh))) {
        child.visible = false;
      }
    }
    removable.forEach((removable) => {
      if (child.name.includes(removable)) {
        child.visible = false;
      }
    });
    if (child.name.includes('_Paints')) {
      child.material = new THREE.MeshStandardMaterial({
        color: exteriorColor,
        metalness: 0.5,
        roughness: 0.15,
        emissiveIntensity: 0,
      });
    }
    if (child.name === 'LED_Strip') {
      child.material.color = new THREE.Color('#ffffff');
      child.material.emissive = new THREE.Color('#ffffff');
      child.material.emissiveIntensity = 6;
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
      child.visible = !showNatureDisplay;
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
    Object.values(actionsRef.current).forEach((action) => action.stop());
  };

  const playAnimation = (clipName) => {
    const action = actionsRef.current[clipName];
    action?.reset().play();
  };

  return (
    <Suspense>
      {isBloomActive && (
        <PostProcess
          isBloomActive={isBloomActive}
          strength={bloomStrength}
          radius={bloomRadius}
          threshold={bloomThreshold}
        />
      )}
      <group ref={modelRef}>
        <primitive object={scene} {...props} />
      </group>
      {(!interior) && <ContactShadows renderOrder={2} frames={10} resolution={1024} scale={120} blur={2} opacity={0.8} far={70} />}
    </Suspense>
  );
}
