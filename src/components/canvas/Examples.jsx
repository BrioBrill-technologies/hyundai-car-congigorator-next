'use client'

import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo, useRef, useState } from 'react'
import { Line, useCursor, MeshDistortMaterial } from '@react-three/drei'
import { useRouter } from 'next/navigation'
import { cars } from '@/data/cars.js'

export const trim = ({ route = '/', ...props }) => {
  const router = useRouter()
  const [hovered, hover] = useState(false)
  useCursor(hovered)
  return (
    <mesh
      onClick={() => router.push(route)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
      {...props}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial roughness={0.5} color={hovered ? 'hotpink' : '#1fb2f5'} />
    </mesh>
  )
}

export const Logo = ({ route = '/trim', ...props }) => {
  const { car } = props
  const router = useRouter()

  return (
    <div onClick={
      () => {
        // Send Car details to the console and push the data to the route
        console.log(car)
        router.push(`/${car}/`)
      }}
      key={car}
      className='text-black w-10/12 mx-auto mb-5 items-center flex rounded-lg cursor-pointer mt-10 
          bg-gradient-to-br from-gray-200 to-[#dfdfdf] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 drop-shadow shadow-lg shadow-white'
      role='button'
      tabIndex={0}
      title={`Select ${car}`}>
      <p className='absolute top-4 left-4 text-2xl'>{car}</p>
      <div className='flex flex-col justify-center'>
        <img src={`/${cars[car].image}.png`} alt={car} className='rounded-3xl pt-10 w-10/12 mx-auto' />
        <div className='text-center border-[1px] py-2 w-full mt-5 border-black font-[HyundaiSansHead-Regular]'>
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

export function Duck(props) {
  const { scene } = useGLTF(`/${props.model}.glb`)

  return <primitive object={scene} {...props} />
}

export function Dog(props) {
  const { scene } = useGLTF('/dog.glb')

  return <primitive object={scene} {...props} />
}