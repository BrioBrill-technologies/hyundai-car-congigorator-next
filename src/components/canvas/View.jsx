'use client'

import { forwardRef, Suspense, useImperativeHandle, useRef, useEffect, useState, useMemo } from 'react'
import { OrbitControls, Environment, PerspectiveCamera, View as ViewImpl } from '@react-three/drei'
import { Three } from '@/helpers/components/Three'
import { useLoader, useThree } from '@react-three/fiber'
import { TextureLoader, EquirectangularReflectionMapping } from 'three'

const Environment1 = ({ texture }) => {
  const { scene } = useThree()
  useEffect(() => {
    texture.mapping = EquirectangularReflectionMapping
    scene.background = texture
  }, [texture, scene])
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
  }, [minPolar, maxPolar, enableAutoRotate])

  const lightProps = useMemo(() => ({
    directional: { intensity: 6, color: 'white', position: [-4, 5, 2] },
    ambient: { intensity: 2 }
  }), [])

  return (
    <>
      {color && <color attach='background' args={[color]} />}
      <directionalLight {...lightProps.directional} />
      <ambientLight {...lightProps.ambient} />
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        fov={76}
        position={cameraPosition}
      />
      <OrbitControls
        ref={orbitControlsRef}
        enableZoom={false}
        autoRotateSpeed={3.0}
        minPolarAngle={minPolar}
        maxPolarAngle={maxPolar}
        target={[0, 0, 0]}
        autoRotate={enableAutoRotate}
        enablePan={false}
        enableRotate={true}
      />
      <Environment1 texture={texture} />
      <Environment
        files="/envmaps/hdr/Environment-Map-Empty-Warehouse2K.hdr"
        ground={enableGround ? { height: 25, radius: 120, scale: 200 } : null}
      />
    </>
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

export { View, Exterior }