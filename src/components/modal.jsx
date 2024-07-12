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
    if (title === 'Power tilt-and-slide wide sunroof' || title === 'Blind Spot View Monitor') {
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
      className={`absolute w-full z-20 pointer-events-none ${visible ? 'fade-in block' : hasInteracted ? 'fade-out' : 'hidden'} ${showBottom ? 'bottom-44' : 'top-1'}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="text-white w-9/12 bg-black/35 rounded-lg mx-auto p-2 text-center flex flex-col justify-center pointer-events-none gap-2">
        <div className="flex flex-col gap-2">
          <p className="text-sm" id="modal-title">{title}</p>
          <p className="text-xs" id="modal-description">{description}</p>
        </div>
        <img
          src="/icons/X_Icon.png"
          alt="Close"
          className="w-6 h-6 mx-auto cursor-pointer pointer-events-auto"
          onClick={handleXClick}
          aria-label="Close"
        />
      </div>
    </div>
  );
};
