'use client'

import { Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { cars } from '@/data/cars'

const Duck = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Duck), { ssr: false })
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
const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })

export default function CarPageContent({ car, trim }) {
  const searchParams = useSearchParams()
  const exteriorColor = searchParams.get('exteriorColor') || 'defaultColor'
  const interiorColor = searchParams.get('interiorColor') || 'defaultColor'
  const router = useRouter()

  const handleBackClick = () => {
    router.push(`/${car}/${trim}/interior?color=${exteriorColor}`)
  }

  return (
    <div>
      <h1 className='text-3xl text-center'>{car}</h1>
      <p className='text-center text-lg'>{trim}</p>
      <div className='mt-2 w-11/12 mx-auto relative rounded-xl'>
        <View orbit className='h-72 sm:h-48 sm:w-full'>
          <Suspense fallback={null}>
            <Duck
              route='/trim'
              scale={2}
              position={[0, -1.6, 0]}
              model={cars[car][trim].exteriorModel.model}
            />
            <Common color={cars[car][trim].exteriorColors[exteriorColor].color} />
          </Suspense>
        </View>
        <div className='relative bottom-11 z-10'>
        </div>
      </div>
      <div className="text-left w-11/12 mx-auto mt-5">
        <div className="border-b border-black flex flex-row py-1 gap-5">
          <img    
            src={`/colors/${cars[car][trim].exteriorColors[exteriorColor].img}.png`}
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
            src={`/colors/${cars[car][trim].interiorColors[interiorColor].img}.png`}
            className="w-2/12"
            alt="Interior color"
          />
          <div className="flex flex-col">
            <p>Interior</p>
            <p>{interiorColor}</p>
          </div>
        </div>
      </div>
      <div
        className='text-center border-2 py-2 mt-2 flex relative flex-row justify-center border-black w-10/12 mx-auto font-[HyundaiSansHead-Medium] cursor-pointer'>
        <span>Finish Build</span>
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
