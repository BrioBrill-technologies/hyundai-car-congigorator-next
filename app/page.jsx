'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cars } from '@/data/cars.js';
import UAParser from 'ua-parser-js';

const Logo = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Logo), { ssr: false });

export default function Page() {
  const [ended, setEnded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showBrowserButton, setShowBrowserButton] = useState(false);
  const [browserName, setBrowserName] = useState('');
  const [osName, setOsName] = useState('');

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');

    if (!hasVisited) {
      setShowVideo(true);
      sessionStorage.setItem('hasVisited', 'true');
    } else {
      setTimeout(() => setShowContent(true), 20);
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

    const parser = new UAParser();
    const result = parser.getResult();
    console.log(`Running on browser: ${result.browser.name}, OS: ${result.os.name}`);

    setBrowserName(result.browser.name);
    setOsName(result.os.name);

    const browsersToShowButton = ['TikTok', 'Instagram', 'Edge', 'Android Browser', 'Android'];
    if (browsersToShowButton.includes(result.browser.name) && result.os.name === 'Android') {
      setShowBrowserButton(true);
    }

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (ended) {
      setShowContent(true);
    }
  }, [ended]);

  const openInDefaultBrowser = () => {
    const url = 'https://hyundai-3dconfigurator.com/';

    if (osName === 'Android') {
      const intentUrl = `intent://${url.replace(/^https?:\/\//, '')}#Intent;scheme=https;action=android.intent.action.VIEW;end;`;
      window.location.href = intentUrl;
    } else {
      window.open(url, '_blank');
    }
  };

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

      {showBrowserButton && (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-20">
          <div className="text-center">
            <Image
              src='/logo.png'
              alt="logo"
              width={75}
              height={75}
              className="mx-auto mt-2"
            />
            <button
              onClick={openInDefaultBrowser}
              className="mt-4 bg-blue-600 px-4 py-2 rounded text-white animate-pulse"
            >
              Tap to Open Configurator
            </button>
          </div>
        </div>
      )}
    </div>
  );
}