import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * @param {Object} options
 * @param {Boolean | undefined} options.isExploding Enable exploding
 * @param {Number | undefined} options.amount The amount of particles
 * @param {Number | undefined} options.rate Increases or decreases the frequency for particles. Don't set it too high.
 * @param {Number | undefined} options.radius The radius of each explosion.
 * @param {Number | undefined} options.areaWidth The area width for explosion.
 * @param {Number | undefined} options.areaHeight The area height for explosion.
 * @param {Number | undefined} options.fallingHeight Height for the particles to fall from
 * @param {Number | undefined} options.fallingSpeed The speed of particles
 * @param {(Number)[] | undefined} options.colors Array of Hex color codes for particles. Example: [0x0000ff, 0xff0000, 0xffff00]
 * @param {Boolean | undefined} options.enableShadows Enable particle shadows. Set false for better performance.
 *
 */

export default function ExplosionConfetti(
  {
    isExploding = false,
    amount = 35,
    rate = 0.5, // be careful with this number. Can freeze your app
    radius = 15,
    areaWidth = 6,
    fallingHeight = 50,
    colors = [0x0000ff, 0xff0000, 0xffff00, 0x129f66],
    enableShadows = false
  },
  props
) {
  const groupRef = useRef()
  const [booms, setBooms] = useState([])

  rate = rate / 100
  const geometry = new THREE.PlaneGeometry(0.03, 0.03, 1, 1)

  function explode() {
    const boom = new THREE.Object3D()
    boom.life = Math.random() * 5 + 5
    boom.position.x = -(areaWidth / 2) + areaWidth * Math.random()
    boom.position.y = 33 // Set initial height to 33 units
    boom.position.z = -(areaWidth / 2) + areaWidth * Math.random()
    groupRef.current.add(boom)
    booms.push(boom)

    for (let i = 0; i < amount; i++) {
      const material = new THREE.MeshBasicMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        side: THREE.DoubleSide
      })
      const particle = new THREE.Mesh(geometry, material)
      particle.castShadow = enableShadows
      boom.add(particle)

      particle.life = 1

      particle.destination = {}
      particle.destination.x = (Math.random() - 0.5) * (radius * 4) // Increase the spread in x direction
      particle.destination.y = (Math.random() - 0.5) * (radius * 4) // Increase the spread in y direction
      particle.destination.z = (Math.random() - 0.5) * (radius * 4) // Increase the spread in z direction

      particle.rotation.x = Math.random() * 360
      particle.rotation.y = Math.random() * 360
      particle.rotation.z = Math.random() * 360

      particle.scale.set(15, 30, 15)

      particle.rotateSpeedX = Math.random() * 0.8 - 0.4
      particle.rotateSpeedY = Math.random() * 0.8 - 0.4
      particle.rotateSpeedZ = Math.random() * 0.8 - 0.4
    }

    boom.dispose = function () {
      for (let i = 0; i < boom.children.length; i++) {
        const particle = boom.children[i]
        particle.material.dispose()
        particle.geometry.dispose()
        boom.remove(particle)
      }
      groupRef.current.remove(boom)
    }
  }

  useFrame(() => {
    if (isExploding && Math.random() < rate) explode()

    let particleAmount = 0

    for (let i = 0; i < booms.length; i++) {
      const boom = booms[i]

      for (let k = 0; k < boom.children.length; k++) {
        let particle = boom.children[k]

        particle.destination.y -= THREE.MathUtils.randFloat(0.2, 0.6) // Increase the fall speed
        particle.life -= THREE.MathUtils.randFloat(0.01, 0.02) // Decrease the life span quicker

        const speedX = (particle.destination.x - particle.position.x) / 100 // Increase the speed in x direction
        const speedY = (particle.destination.y - particle.position.y) / 100 // Increase the speed in y direction
        const speedZ = (particle.destination.z - particle.position.z) / 100 // Increase the speed in z direction

        particle.position.x += speedX
        particle.position.y += speedY
        particle.position.z += speedZ

        particle.rotation.y += particle.rotateSpeedY
        particle.rotation.x += particle.rotateSpeedX
        particle.rotation.z += particle.rotateSpeedZ

        particle.material.opacity -= THREE.MathUtils.randFloat(0.01, 0.02) // Fade out faster

        if (particle.position.y < -fallingHeight) {
          particle.material.dispose()
          particle.geometry.dispose()
          boom.remove(particle)
          particle = null
        }
      }

      if (boom.children.length <= 0) {
        boom.dispose()
        setBooms(booms.filter((b) => b !== boom))
      }
      particleAmount += boom.children.length
    }
  })

  return <group ref={groupRef} />
}
