'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { cars } from '@/data/cars.js';

const Logo = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Logo), { ssr: false });

export default function Page() {
  const [ended, setEnded] = useState(false);

  return (
    <div className='h-full flex flex-col justify-evenly overflow-y-scroll mt-2'>
      <video 
        className={`fixed top-0 left-0 size-full object-cover z-10 ${ended ? 'fade-out' : 'block'}`} 
        autoPlay 
        playsInline
        muted 
        onEnded={() => setEnded(true)}>
        <source src='/video/Animation_Intro.mp4' type='video/mp4' />
      </video>
      {Object.entries(cars).map(([car]) => (
        <Logo route='/trim' car={car} key={car} />
      ))}
    </div>
  );
}
