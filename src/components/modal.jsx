import { useState, useEffect } from 'react';

export const Modal = ({ visible, setVisibility, title, description }) => {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showBottom, setShowBottom] = useState(false);

  useEffect(() => {
    if (visible) {
      setHasInteracted(true);
    }
  }, [visible]);

  useEffect(() => {
    if (title === 'Power tilt-and-slide wide sunroof' || title === 'Blind Spot View Monitor' || title === 'Disney Badge') {
      setShowBottom(true);
    } else {
      setShowBottom(false);
    }
  }, [title]);

  const handleXClick = () => {
    setVisibility(false);
  };

  return (
    <div
      className={`pointer-events-none absolute z-20 w-full ${visible ? 'fade-in block' : hasInteracted ? 'fade-out' : 'hidden'} ${showBottom ? 'bottom-44' : 'top-1'}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="pointer-events-none mx-auto flex w-9/12 flex-col justify-center gap-2 rounded-lg bg-black/35 p-2 text-center text-white">
        <div className="flex flex-col gap-2">
          <p className="text-sm" id="modal-title">{title}</p>
          <p className="text-xs" id="modal-description">{description}</p>
        </div>
        <img
          src="/icons/X_Icon.png"
          alt="Close"
          className="pointer-events-auto mx-auto size-6 cursor-pointer"
          onClick={handleXClick}
          aria-label="Close"
        />
      </div>
    </div>
  );
};
