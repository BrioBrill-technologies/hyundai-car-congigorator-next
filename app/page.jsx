'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { cars } from '@/data/cars.js';

const Logo = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Logo), { ssr: false });

export default function Page() {
  const [ended, setEnded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  // Check for previous visits outside useEffect
  const hasVisited = typeof window !== 'undefined' && sessionStorage.getItem('hasVisited');

  useEffect(() => {
    const trackPageView = () => {
      if (typeof window.ttq !== 'undefined') {
        console.log('Tracking page view');
        window.ttq.track("ViewContent", {
          contents: [
            {
              content_id: "hyundai-configurator-viewcontent",
              content_name: "Hyundai Configurator Home Page Load",
              content_type: "product",
              content_category: "3d configurator",
              quantity: 1
            },
          ],
          currency: "USD"
        });
      }
    };

    if (!hasVisited) {
      setShowVideo(true);
      sessionStorage.setItem('hasVisited', 'true');
    }
    setTimeout(trackPageView, 500);
  }, [hasVisited]);

  return (
    <div className='mt-2 flex h-full flex-col justify-evenly overflow-y-scroll'>
      {showVideo && (
        <video
          className={`fixed left-0 top-0 z-10 size-full object-cover ${ended ? 'fade-out' : 'block'}`}
          autoPlay
          muted
          playsInline
          onEnded={() => setEnded(true)}>
          <source src='/video/Animation_Intro.mp4' type='video/mp4' />
        </video>
      )}
      {Object.entries(cars).map(([car]) => (
        <Logo route='/trim' car={car} key={car} />
      ))}
    </div>
  );
}
