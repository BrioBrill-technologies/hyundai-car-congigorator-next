'use client'

import { forwardRef, Suspense, useImperativeHandle, useRef, useEffect, useState } from 'react'
import { OrbitControls, Environment, PerspectiveCamera, View as ViewImpl } from '@react-three/drei'
import { Three } from '@/helpers/components/Three'
import { useLoader, useThree, useFrame } from '@react-three/fiber'
import { TextureLoader, EquirectangularReflectionMapping, Vector3 } from 'three'

function Environment1({ texture }) {
  const { scene } = useThree()
  texture.mapping = EquirectangularReflectionMapping
  scene.background = texture
  return null
}

const Exterior = ({ color, cameraPosition, minPolar, maxPolar, enableGround, enableAutoRotate }) => {
  const cameraRef = useRef()
  const orbitControlsRef = useRef()
  const texture = useLoader(TextureLoader, '/envmaps/images/Environment-Map-Empty-Warehouse2K.jpg')

  const [hasPositionChanged, setHasPositionChanged] = useState(false)

  useEffect(() => {
    if (cameraRef.current && orbitControlsRef.current && !hasPositionChanged) {
      const camera = cameraRef.current
      const controls = orbitControlsRef.current

      camera.position.set(...cameraPosition)
      controls.target.set(cameraPosition[0], cameraPosition[1], cameraPosition[2])
      controls.update()

      setHasPositionChanged(true)
    }
  }, [cameraPosition, hasPositionChanged])

  useEffect(() => {
    if (orbitControlsRef.current) {
      const controls = orbitControlsRef.current
      controls.minPolarAngle = minPolar
      controls.maxPolarAngle = maxPolar
      controls.autoRotate = enableAutoRotate
      controls.update()
    }
  }, [minPolar, maxPolar])

  return (
    <>
      {color && <color attach='background' args={[color]} />}
      <directionalLight intensity={6} color='white' position={[-4, 5, 2]} />
      <ambientLight intensity={2} />
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        fov={76}
        position={cameraPosition}
      />
      <OrbitControls
        ref={orbitControlsRef}
        enableZoom={true}
        autoRotateSpeed={3.0}
        minPolarAngle={minPolar}
        maxPolarAngle={maxPolar}
        target={[0, 0, 0]}
        autoRotate={enableAutoRotate}
      />
      <Environment1 texture={texture} />
      <Environment
        files="/envmaps/hdr/Environment-Map-Empty-Warehouse2K.hdr"
        ground={enableGround ? { height: 25, radius: 100, scale: 200 } : null}
      />
    </>
  )
}


const Summary = ({ color }) => {
  const texture = useLoader(TextureLoader, '/envmaps/images/Environment-Map-Empty-Warehouse2K.jpg')

  return (
    <Suspense fallback={null}>
      {color && <color attach='background' args={[color]} />}
      <directionalLight intensity={6} color='white' position={[4, 5, 2]} />
      <ambientLight intensity={2} />
      <PerspectiveCamera makeDefault fov={60} position={[-50, 0, 40]} />
      <OrbitControls
        enableZoom={false}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2.5}
        target={[-2, 0.3, 0]}
        autoRotate={true}
        autoRotateSpeed={1.0}
        enablePan={false}
        enableRotate={false}
      />
      <Environment1 texture={texture} />
      <Environment files="/envmaps/hdr/Environment-Map-Empty-Warehouse2K.hdr" ground={{ height: 20, radius: 200, scale: 200 }} />
    </Suspense>
  )
}

const Interior = ({ color = 'white' }) => {
  const texture = useLoader(TextureLoader, '/envmaps/images/Environment-Map-Empty-Warehouse2K.jpg');

  return (
    <Suspense fallback={null}>
      {color && <color attach='background' args={[color]} />}
      <directionalLight
        intensity={10} // Reduced intensity
        color='white'
        position={[0, 8, 0]}
      />
      <ambientLight intensity={1.5} />
      <PerspectiveCamera makeDefault fov={70} position={[0.00001, 0, 0]} />
      <OrbitControls
        enableZoom={true}
        minPolarAngle={Math.PI / 10}
        maxPolarAngle={Math.PI / 1.9}
        target={[0, 0, 0]}
      />
      <Environment1 texture={texture} />
      <Environment files="/envmaps/hdr/Environment-Map-Empty-Warehouse2K.hdr" ground={{ height: 10, radius: 100, scale: 200 }} />
    </Suspense>
  );
}

const Common = ({ color }) => {
  return (
    <Suspense fallback={null}>
      {color && <color attach='background' args={[color]} />}
      <directionalLight intensity={6} color='white' position={[4, 5, 2]} />
      <ambientLight intensity={2} />
      <PerspectiveCamera makeDefault fov={60} position={[-6, 0, 6]} />
      <OrbitControls
        enableZoom={false}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2.5}
        target={[0, 0, 0]}
        autoRotate={true}
        autoRotateSpeed={1.0}
        enablePan={false}
        enableRotate={false}
      />
    </Suspense>
  )
}


const View = forwardRef(({ children, ...props }, ref) => {
  const localRef = useRef(null)
  useImperativeHandle(ref, () => localRef.current)

  return (
    <>
      <div ref={localRef} {...props} />
      <Three>
        <ViewImpl track={localRef}>
          {children}
        </ViewImpl>
      </Three>
    </>
  )
})
View.displayName = 'View'

export { Common, View, Exterior, Interior, Summary }
