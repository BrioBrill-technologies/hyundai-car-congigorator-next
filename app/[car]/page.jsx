'use client'

import { useRouter } from 'next/navigation'
import { cars } from '@/data/cars'

export default function Page({ params }) {
  let { car } = params
  car = decodeURIComponent(car)
  const router = useRouter()

  const handleSelectClick = (trim) => {
    window.ttq.track("ClickButton",
      {
        contents: [
          {
            content_id: `${car}-${trim}-trim-selection`, //Dynamic value reflecting user selection
            content_name: `${car} ${trim} Trim Selection`, //Dynamic value reflecting user selection
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
    router.push(`/${car}/${trim}/`)
  }

  return (
    <div className='mx-auto flex size-full flex-col gap-2 overflow-y-scroll'>
      <h1 className='text-center text-3xl'>{car === 'IONIQ5' ? 'IONIQ 5' : 'IONIQ 6'}</h1>
      <p className='text-center font-[HyundaiSansHead-Medium]'>Choose a Trim</p>
      <div className='flex h-fit w-full flex-row justify-evenly gap-5 overflow-x-scroll px-5'>
        {Object.keys(cars[car]).map((trim) => {
          // return only if trim is image
          if (trim === 'image') {
            return null
          }
          return (
            <div key={trim} className='h-fit'>
              {trim === 'image' ? null : (
                <div className='mx-auto mt-5 h-fit min-w-72 cursor-pointer items-center rounded-lg bg-gradient-to-br from-gray-200/40
                  to-transparent bg-clip-padding py-5 text-black backdrop-blur-sm'>
                  <video
                    className='size-full rounded-lg object-cover'
                    autoPlay
                    loop
                    muted
                    playsInline
                    type='video/mp4'
                    preload='auto'
                    poster={`/${car}/${trim}.png`}
                  >
                    <source src={`/${car}/${trim}.mp4`} type='video/mp4' />
                  </video>
                  {/* <ThreeSixty
                    amount={40}
                    imagePath={`/${cars[car][trim].threesixty}/`}
                    fileName={`${cars[car][trim].threesixty}_00{index}.png`}
                    autoplay='40'
                    loop='true'
                    paddingIndex='true'
                    style={{ backgroundColor: '#c5c5c5' }}
                  /> */}
                  <div>
                    <p className='mt-5 text-center'>{trim === 'D100PlatinumEdition' ? 'D100 Platinum Edition' : trim}</p>
                    <p className='text-center font-[HyundaiSansHead-Light] text-xs'>{cars[car][trim].description}</p>
                  </div>
                  <div
                    className={`w-full border-2 border-black py-2 text-center ${trim === 'Limited' ? 'mt-1' : 'mt-5'} cursor-pointer font-[HyundaiSansHead-Regular]`}
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
      <div className='mx-auto mt-5 flex w-1/5 flex-row items-center justify-evenly text-center font-[HyundaiSansHead-Light]' onClick={() => router.push('/')}>
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