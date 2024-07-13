'use client'

import { useRouter } from 'next/navigation'
import { cars } from '@/data/cars'
import ThreeSixty from 'react-360-view'
import styles from './style.css'

export default function Page({ car }) {
  const router = useRouter()

  const handleSelectClick = (trim) => {
    router.push(`/${car}/${trim}/`)
  }

  return (
    <div className='overflow-y-scroll size-full flex flex-col gap-2 mx-auto'>
      <h1 className='text-3xl text-center'>{car === 'IONIQ5' ? 'IONIQ 5' : 'IONIQ 6'}</h1>
      <p className='font-[HyundaiSansHead-Medium] text-center'>Choose a Trim</p>
      <div className='flex flex-row gap-5 w-full h-fit overflow-x-scroll justify-evenly px-5'>
        {Object.keys(cars[car]).map((trim) => {
          // return only if trim is image
          if (trim === 'image') {
            return null
          }
          return (
            <div key={trim} className='h-fit'>
              {trim === 'image' ? null : (
                <div className='text-black min-w-72 mx-auto py-5 items-center rounded-lg cursor-pointer h-fit mt-5
                  bg-gradient-to-br from-gray-200/40 to-transparent bg-clip-padding backdrop-filter backdrop-blur-sm'>
                  <ThreeSixty
                    amount={40}
                    imagePath={`/${cars[car][trim].threesixty}/`}
                    fileName={`${cars[car][trim].threesixty}_00{index}.png`}
                    autoplay='40'
                    loop='true'
                    paddingIndex='true'
                    style={{ backgroundColor: '#c5c5c5' }}
                  />
                  <div>
                    <p className='text-center mt-5'>{trim === 'D100PlatinumEdition' ? 'D100 Platinum Edition' : trim}</p>
                    <p className='text-xs text-center font-[HyundaiSansHead-Light]'>{cars[car][trim].description}</p>
                  </div>
                  <div
                    className={`text-center border-2 py-2 border-black w-full ${trim === 'Limited' ? 'mt-1' : 'mt-5'} font-[HyundaiSansHead-Regular] cursor-pointer`}
                    onClick={() => handleSelectClick(trim)}
                  >
                    Select {trim === 'D100PlatinumEdition' ? 'D100 Platinum Edition' : trim}
                    <span className='absolute right-5'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='2.5'
                        stroke='currentColor'
                        className='size-6'
                      >
                        <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                      </svg>
                    </span>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
      <div className='text-center w-1/5 flex flex-row mx-auto mt-5 items-center justify-evenly font-[HyundaiSansHead-Light]' onClick={() => router.push('/')}>
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
