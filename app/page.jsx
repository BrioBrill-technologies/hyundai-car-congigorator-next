'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { cars } from '@/data/cars.js';

const Logo = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Logo), { ssr: false });

export default function Page() {
  const [ended, setEnded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');

    if (!hasVisited) {
      setShowVideo(true);
      sessionStorage.setItem('hasVisited', 'true');
    } else {
      setTimeout(() => setShowContent(true), 20); // Small delay to ensure smooth rendering
    }

    const trackPageView = () => {
      if (typeof window.ttq !== 'undefined') {
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
          value: 50000,
          currency: "USD",
        });
      }
    };

    const timeoutId = setTimeout(trackPageView, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (ended) {
      setShowContent(true);
    }
  }, [ended]);

  return (
    <div className='mt-2 flex h-full flex-col justify-evenly overflow-y-scroll'>
      {showVideo && (
        <video
          className={`fixed left-0 top-0 z-10 w-full h-full object-cover ${ended ? 'fade-out' : 'block'}`}
          autoPlay
          muted
          playsInline
          poster='/video/Animation_Intro.png'
          preload='auto'
          onEnded={() => setEnded(true)}
        >
          <source src='/video/Animation_Intro.mp4' type='video/mp4' />
        </video>
      )}

      {showContent && Object.entries(cars).map(([car]) => (
        <Logo route='/trim' car={car} key={car} />
      ))}
    </div>
  );
}
